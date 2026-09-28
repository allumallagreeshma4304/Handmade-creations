import React, { useEffect, useState } from 'react';

const N8N_WEBHOOK_URL = 'https://deepumomentacreations.app.n8n.cloud/webhook/8795fdc9-14fd-4981-bf37-434182af2fc2/chat';

export const N8nChatWidget: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Ensure n8n chat CSS stylesheet is loaded
    if (!document.getElementById('n8n-chat-style')) {
      const link = document.createElement('link');
      link.id = 'n8n-chat-style';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Load n8n chat ES module bundle from CDN
    let isCancelled = false;

    // Use dynamic import evaluator so TypeScript doesn't try to locate local module
    const dynamicImport = new Function('url', 'return import(url)');
    dynamicImport('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then((module: any) => {
        if (isCancelled) return;
        const { createChat } = module;

        if (typeof createChat === 'function') {
          createChat({
            webhookUrl: N8N_WEBHOOK_URL,
            webhookConfig: {
              method: 'POST',
              headers: {},
            },
            showWelcomeScreen: false,
            defaultLanguage: 'en',
            initialMessages: [
              'Hello! 👋 Welcome to Deepu Momenta Creations. How can I help you customize your bouquets, flowers, or gifts today?'
            ],
            i18n: {
              en: {
                title: 'Deepu Momenta Creations',
                subtitle: 'Artisan Flowers & Custom Gifts',
                footer: '',
                getStarted: 'Start Chatting',
                inputPlaceholder: 'Type a message or budget...',
              },
            },
          });
          setLoaded(true);
        }
      })
      .catch((err: unknown) => {
        console.warn('Could not load official @n8n/chat bundle from CDN, in-app assistant will continue serving queries:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
};
