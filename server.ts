import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// System prompt grounding the AI shopping assistant with complete catalog and price list
const SYSTEM_PROMPT = `
You are the warm, polite, and attentive AI Shopping Assistant for a handmade boutique craft studio.
The business creates handmade and customized products for weddings, birthdays, Haldi functions, special occasions, and gifting. All products are handmade with care, creativity, and attention to detail.

CATALOG & PRODUCTS:
1. Pipe-Cleaner Flowers (Everlasting, soft chenille stem florals that never wilt):
- Daisy: ₹60 each
- Tulip: ₹100 each
- Sunflower: ₹100 each
- Rose: ₹120 each
- Lily: ₹130 each
- Lavender bunch (bunch of 3): ₹120
- Hibiscus: ₹140 each
- Double Layer Daisy: ₹100 each
- Large Tulip: ₹150 each
- Large Sunflower: ₹200 each
- Wrapped Single Flower (with premium craft wrapping & satin bow): ₹150 – ₹180
- Wrapped 4 Flowers bouquet: ₹200 – ₹250
- Premium Customized Bouquet (arranged with wrapping, greenery, ribbons & gift tag): Starting from ₹999+

2. Customized Bouquets:
- Tailored combinations of any pipe-cleaner flowers, foliage, Korean wrapping paper, satin ribbon, greeting card.

3. Customized Gifts:
- Personalized photo frames, keepsake boxes, curated birthday/anniversary memory boxes.

4. Bangles:
- Handcrafted silk thread bangles, floral Haldi bangles, pearl embellished bangles, bridal wrist sets.

5. Earrings:
- Handmade floral earrings, fabric tassel earrings, Haldi/Mehendi occasion jewelry, clay & bead earrings.

6. Embroidery Work:
- Hand-embroidered floral hoops, wedding date keepsake hoops, personalized name hoops, baby birth announcement hoops.

7. Gift Hampers:
- Haldi gift hamper (floral jewelry, mini bouquet, organic haldi/sweets), bridesmaid proposal hamper, bridal morning hamper, birthday gift hamper.

RULES FOR YOUR RESPONSES:
- Always be gentle, helpful, encouraging, and clear about pricing.
- Keep answers concise, scannable, and practical (use bullet points when listing items or budget breakdowns).
- When a customer mentions a budget (e.g., "I have ₹500. What bouquet can I get?"), calculate exact, realistic combinations from the price list that fit within or near their stated budget.
  * For example, for ₹500:
    - Option A (Floral Bunch): 1 Sunflower (₹100) + 2 Tulips (₹200) + 1 Lavender bunch (₹120) + 1 Daisy (₹60) = ₹480
    - Option B (Wrapped Bouquet): A Wrapped 4-Flower Bouquet (approx ₹220) + 2 extra Roses (₹240) = ₹460
    - Option C (Haldi/Gift Pair): 1 Rose (₹120) + 1 Double Layer Daisy (₹100) + Handcrafted Floral Earring set (from ₹250) = ₹470
- Explain customization: Customers can choose flower types, petal colors (pink, lilac, pastel yellow, peach, cream, red, blue, etc.), stem count, wrap color, and add custom notes.
- Explain ordering process:
  1. Explore products or calculate a custom bouquet.
  2. Fill in the "Custom Order Form" on the website with details (budget, date, color, required item).
  3. Click "Send Order on WhatsApp" to connect directly with the artisan and confirm your custom order.
- Orders for Haldi, weddings, and bulk events should be placed 5-10 days in advance.
- Mention that prices are in Indian Rupees (₹).
- Never make up fake phone numbers, addresses, or links. Direct customers to the Custom Order Form and WhatsApp button on the website.
`;

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.warn('Could not initialize GoogleGenAI with key:', err);
    }
  }

  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://deepumomentacreations.app.n8n.cloud/webhook/8795fdc9-14fd-4981-bf37-434182af2fc2/chat';

  async function getAssistantReply(
    message: string,
    conversationHistory?: any[],
    sessionId?: string
  ): Promise<{ reply: string; source: string }> {
    // 1. Attempt to query the n8n Chatbot Webhook
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const n8nRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: message,
          sessionId: sessionId || 'session-guest',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (n8nRes.ok) {
        const n8nData: any = await n8nRes.json().catch(() => null);
        // Only accept if n8n didn't return an error message
        const isError =
          !n8nData ||
          (typeof n8nData.message === 'string' && n8nData.message.toLowerCase().includes('error')) ||
          (typeof n8nData.output === 'string' && n8nData.output.toLowerCase().includes('error in workflow'));

        if (!isError) {
          const reply = n8nData.output || n8nData.text || (typeof n8nData === 'string' ? n8nData : null);
          if (reply && typeof reply === 'string' && reply.trim().length > 0) {
            return { reply, source: 'n8n' };
          }
        }
      }
    } catch {
      // n8n workflow fallback
    }

    // 2. If n8n has an error or is unreachable, use Gemini 3.8 Flash
    if (ai) {
      try {
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(conversationHistory)) {
          for (const item of conversationHistory.slice(-6)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'assistant') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'I would love to help you customize your order! Please check our product cards or fill out the custom order form.';
        return { reply, source: 'gemini' };
      } catch (apiErr: any) {
        console.error('Gemini API call fallback:', apiErr?.message);
      }
    }

    // 3. Fallback to intelligent rule-based knowledge engine
    const fallbackReply = generateFallbackReply(message);
    return { reply: fallbackReply, source: 'knowledge_engine' };
  }

  // Assistant Chat Route
  app.post('/api/assistant/chat', async (req, res) => {
    try {
      const { message, conversationHistory, sessionId } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }

      const result = await getAssistantReply(message, conversationHistory, sessionId);
      res.json(result);
    } catch (error: any) {
      console.error('Error handling chat:', error);
      res.status(500).json({
        reply: 'I am here to help you customize bouquets, check prices, and prepare gifts for your special moments! You can also fill out the custom order form below.',
        source: 'error_fallback',
      });
    }
  });

  // n8n Chatbot Webhook Proxy Route
  // Intercepts n8n requests so "Error in workflow" is caught and gracefully answered
  app.post('/api/n8n/chat', async (req, res) => {
    try {
      const { action, chatInput, message, sessionId } = req.body || {};

      // Handle session restoration
      if (action === 'loadPreviousSession') {
        try {
          const n8nRes = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
          });
          if (n8nRes.ok) {
            const data = await n8nRes.json().catch(() => null);
            if (data && !data.message?.toLowerCase?.().includes('error')) {
              res.json(data);
              return;
            }
          }
        } catch {}
        res.json({ data: [] });
        return;
      }

      const text = chatInput || message || '';
      if (!text || typeof text !== 'string') {
        res.json({
          output: 'Hello! 👋 Welcome to Deepu Momenta Creations. How can I help you customize your bouquets, flowers, or gifts today?',
        });
        return;
      }

      const result = await getAssistantReply(text, [], sessionId);
      res.json({ output: result.reply });
    } catch (error: any) {
      console.error('Error handling n8n chat:', error);
      res.json({
        output: 'I am here to assist with pipe-cleaner flowers, bouquet customizer options, and handcrafted gifts! Please let me know what you would like to create.',
      });
    }
  });

  // Serve static assets or vite middlewares
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

function generateFallbackReply(rawQuery: string): string {
  const query = rawQuery.toLowerCase();

  // Check budget query
  const budgetMatch = query.match(/(?:budget|have|around|under|₹|rs\.?|inr)\s*(\d+)/i) || query.match(/(\d+)\s*(?:rupees|rs|bucks|inr)/i);
  if (budgetMatch || query.includes('budget') || query.includes('500') || query.includes('1000') || query.includes('300')) {
    const amount = budgetMatch ? parseInt(budgetMatch[1], 10) : 500;
    if (amount <= 200) {
      return `For ₹${amount}, you can get:\n• 1 Wrapped Single Flower (₹150–₹180), featuring a Rose (₹120) or Lily (₹130) in craft wrap\n• Or individual stems: 1 Tulip (₹100) + 1 Daisy (₹60) = ₹160\n• Or 1 Large Sunflower (₹200).\n\nEvery piece is hand-twisted with soft pipe cleaners! Would you like to order one via our Custom Order Form?`;
    } else if (amount <= 350) {
      return `For ₹${amount}, here are lovely options:\n• Wrapped 4 Flowers Bouquet (₹200–₹250) with pastel paper & satin bow\n• 1 Sunflower (₹100) + 1 Tulip (₹100) + 1 Lavender bunch (₹120) = ₹320\n• 2 Roses (₹240) + 1 Daisy (₹60) = ₹300.\n\nYou can select your favorite flower colors in the Custom Order Form!`;
    } else if (amount <= 600) {
      return `With a budget of ₹${amount}, you have wonderful bouquet combinations:\n• Combination 1: 1 Large Sunflower (₹200) + 2 Tulips (₹200) + 1 Daisy (₹60) = ₹460\n• Combination 2: Wrapped 4 Flowers Bouquet (₹220) + 2 extra Roses (₹240) = ₹460\n• Combination 3: 2 Roses (₹240) + 1 Hibiscus (₹140) + 1 Lavender bunch (₹120) = ₹500 exact!\n\nUse our Custom Order Form or click "Send Order on WhatsApp" to discuss your preferred colors!`;
    } else {
      return `For ₹${amount}, you can create a magnificent arrangement:\n• Premium Customized Bouquet (starting from ₹999+) with 8-12 assorted blooms (Roses, Tulips, Sunflowers, Lilies, Lavender), lush foliage, designer Korean wrap, and gift card.\n• Or a Gift Hamper combining handmade bangles/earrings + customized pipe cleaner floral bunch!\n\nTell us your occasion (Haldi, Wedding, Birthday) in the Custom Order Form so we can tailor the color palette!`;
    }
  }

  if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('list')) {
    return `Here is our Pipe-Cleaner Flower Price List:\n• Daisy – ₹60\n• Tulip – ₹100\n• Sunflower – ₹100\n• Rose – ₹120\n• Lily – ₹130\n• Lavender bunch (3) – ₹120\n• Hibiscus – ₹140\n• Double Layer Daisy – ₹100\n• Large Tulip – ₹150\n• Large Sunflower – ₹200\n• Wrapped single flower – ₹150–₹180\n• Wrapped 4 flowers – ₹200–₹250\n• Premium customized bouquet – ₹999+\n\nCustomized gifts, embroidery hoops, bangles, and hampers are priced based on design details!`;
  }

  if (query.includes('haldi') || query.includes('wedding') || query.includes('bangle') || query.includes('ceremony')) {
    return `For Haldi & Wedding ceremonies, we create:\n• Handcrafted floral Haldi bangles & jewelry sets\n• Cheerful yellow sunflower & marigold-style pipe-cleaner bunches\n• Personalized bridesmaid favors & gift hampers\n• Hand-embroidered wedding date / couple keepsake hoops.\n\nWe recommend placing bulk wedding orders 7-10 days in advance. You can specify the event date in our Custom Order Form!`;
  }

  if (query.includes('custom') || query.includes('order') || query.includes('how to order') || query.includes('process')) {
    return `Ordering is simple and direct:\n1. Browse our catalog and flower price list\n2. Scroll to the "Custom Order Form"\n3. Enter your name, required product, preferred color, budget, and needed date\n4. Click "Send Order on WhatsApp" to send your pre-filled details directly to our studio.\n\nWe will confirm your design, color shades, and delivery timeline!`;
  }

  if (query.includes('cleaner') || query.includes('material') || query.includes('last') || query.includes('wash') || query.includes('care')) {
    return `Pipe-cleaner flowers are handcrafted from high-density, ultra-soft chenille stems wrapped over florist wire. Unlike fresh flowers, they are everlasting—they never wilt, need no water, and stay vibrant for years! To care for them, simply blow away dust or gently brush with a soft cloth. Keep away from direct water soaking.`;
  }

  return `Hello! I am your Handcrafted Studio Assistant. I can help you with:\n• Exact prices for our pipe-cleaner flowers & bouquets\n• Bouquet recommendations matching your budget (e.g. "I have ₹500")\n• Haldi, wedding, and birthday gift ideas\n• Customization options (colors, flower types, wrapping style)\n• Step-by-step guidance on ordering via WhatsApp.\n\nHow can I help you make someone smile today?`;
}

startServer();
