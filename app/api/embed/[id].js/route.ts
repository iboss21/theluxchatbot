import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // This would be the JavaScript code that creates and injects the chatbot widget
  // In a production environment, this would be a minified JS file
  const embedScript = `
    (function() {
      // Get the script tag that loaded this script
      const script = document.currentScript;
      
      // Get configuration from data attributes
      const config = {
        chatbotId: "${id}",
        position: script.dataset.position || "bottom-right",
        theme: script.dataset.theme || "light",
        primaryColor: script.dataset.primaryColor || "#7C3AED",
        width: parseInt(script.dataset.width || "350"),
        height: parseInt(script.dataset.height || "500"),
        autoOpen: script.dataset.autoOpen === "true",
        autoOpenDelay: parseInt(script.dataset.autoOpenDelay || "3") * 1000
      };
      
      // Create styles
      const style = document.createElement("style");
      style.textContent = \`
        .thelux-chatbot-widget {
          position: fixed;
          z-index: 9999;
          max-height: 100vh;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .thelux-chatbot-widget.bottom-right {
          bottom: 20px;
          right: 20px;
        }
        .thelux-chatbot-widget.bottom-left {
          bottom: 20px;
          left: 20px;
        }
        .thelux-chatbot-widget.top-right {
          top: 20px;
          right: 20px;
        }
        .thelux-chatbot-widget.top-left {
          top: 20px;
          left: 20px;
        }
        .thelux-chatbot-widget.collapsed {
          height: 60px !important;
          width: 60px !important;
          border-radius: 30px;
        }
        .thelux-chatbot-toggle {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          background-color: \${config.primaryColor};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 9998;
        }
        .thelux-chatbot-toggle svg {
          width: 24px;
          height: 24px;
        }
        .thelux-chatbot-iframe {
          border: none;
          width: 100%;
          height: 100%;
          background-color: \${config.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        }
      \`;
      document.head.appendChild(style);
      
      // Create toggle button
      const toggleButton = document.createElement("div");
      toggleButton.className = "thelux-chatbot-toggle";
      toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      document.body.appendChild(toggleButton);
      
      // Create widget container
      const widget = document.createElement("div");
      widget.className = "thelux-chatbot-widget collapsed " + config.position;
      widget.style.width = config.width + "px";
      widget.style.height = config.height + "px";
      document.body.appendChild(widget);
      
      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.className = "thelux-chatbot-iframe";
      iframe.src = window.location.origin + "/embed/" + config.chatbotId + "?theme=" + config.theme + "&primaryColor=" + encodeURIComponent(config.primaryColor);
      widget.appendChild(iframe);
      
      // Toggle functionality
      let isOpen = false;
      
      function toggleWidget() {
        isOpen = !isOpen;
        if (isOpen) {
          widget.classList.remove("collapsed");
          toggleButton.style.display = "none";
        } else {
          widget.classList.add("collapsed");
          setTimeout(() => {
            toggleButton.style.display = "flex";
          }, 300);
        }
      }
      
      toggleButton.addEventListener("click", toggleWidget);
      
      // Handle clicks on the collapsed widget
      widget.addEventListener("click", function(e) {
        if (widget.classList.contains("collapsed")) {
          toggleWidget();
        }
      });
      
      // Auto-open functionality
      if (config.autoOpen) {
        setTimeout(function() {
          if (!isOpen) toggleWidget();
        }, config.autoOpenDelay);
      }
      
      // Expose API
      window.TheLUXChatbot = {
        open: function() {
          if (!isOpen) toggleWidget();
        },
        close: function() {
          if (isOpen) toggleWidget();
        },
        toggle: toggleWidget
      };
    })();
  `

  return new NextResponse(embedScript, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

