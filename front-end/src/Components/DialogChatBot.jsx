import React, { useEffect, useRef, useState } from 'react';

const DialogflowChatbot = () => {
  const containerRef = useRef(null);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (!customElements.get('dialogflow-chatbot')) {
      class DialogflowChatbotElement extends HTMLElement {
        connectedCallback() {
          this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
          <body>
              <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css">
            <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
            <df-messenger
              project-id="codetogive-433416"
              agent-id="ddfff596-08ac-4519-86c8-b05f1f61236b"
              language-code="en"
              max-query-length="-1"
              allow-feedback="all">
              <df-messenger-chat-bubble
              chat-title="Zubin">
              </df-messenger-chat-bubble>
            </df-messenger>
          </body>
          `;

          const style = document.createElement('style');
          style.textContent = `
            df-messenger {
              z-index: 999;
              position: fixed;
              --df-messenger-font-color: #000;
              --df-messenger-font-family: 'Google Sans';
              --df-messenger-chat-background: #f3f6fc;
              --df-messenger-message-user-background: #d3e3fd;
              --df-messenger-message-bot-background: #fff;
              bottom: 16px;
              right: 16px;
            }
          `;
          this.shadowRoot.appendChild(style);
        }
      }
      customElements.define('dialogflow-chatbot', DialogflowChatbotElement);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
      script.async = true;

      containerRef.current.appendChild(script);

      return () => {
        containerRef.current.removeChild(script);
      };
    }
  }, []);

  if (scriptError) {
    return <div>Error loading Dialogflow Messenger script.</div>;
  }

  return (
    <div ref={containerRef}>
      <dialogflow-chatbot></dialogflow-chatbot>
    </div>
  );
};

export default DialogflowChatbot;