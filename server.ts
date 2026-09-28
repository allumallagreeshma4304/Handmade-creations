import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://deepumomentacreations.app.n8n.cloud/webhook/8795fdc9-14fd-4981-bf37-434182af2fc2/chat';

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // n8n Chat proxy to safely forward requests and intercept "Error in workflow"
  app.post('/api/n8n/chat', async (req, res) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const n8nRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Instance-Id': 'c4768dc3a5b3b90ce935162f40305e273eae061d61f3ce5c594593b900fd4d6c',
        },
        body: JSON.stringify(req.body),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data: any = await n8nRes.json().catch(() => null);

      // If n8n succeeded with a valid response, return it directly
      if (
        n8nRes.ok &&
        data &&
        !data.message?.toLowerCase?.().includes('error') &&
        (data.output || data.text || Array.isArray(data.data))
      ) {
        res.json(data);
        return;
      }

      // Handle session restoration failure safely
      if (req.body?.action === 'loadPreviousSession') {
        res.json({ data: [] });
        return;
      }

      // If n8n returns "Error in workflow" or fails, present a clean helpful studio message
      res.json({
        output:
          'Hello! 👋 Thank you for reaching out to Deepu Momenta Creations. Our artisan is taking custom orders directly! You can place your custom order using the Custom Order Form below or message us directly on WhatsApp at +91 93902 44788.',
      });
    } catch {
      if (req.body?.action === 'loadPreviousSession') {
        res.json({ data: [] });
        return;
      }
      res.json({
        output:
          'Hello! 👋 Thank you for reaching out to Deepu Momenta Creations. Feel free to use our Custom Order Form on this page or message us directly on WhatsApp at +91 93902 44788.',
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

startServer();
