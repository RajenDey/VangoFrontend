import React, { useEffect } from 'react';

type ComfyUIWrapperProps = {
  workflow: any;
  api_url: string;
  ws_url: string;
}

const ComfyUIWrapper = ({ workflow, api_url, ws_url }: ComfyUIWrapperProps) => {
  useEffect(() => {
    const initializeApp = async () => {
      const { app } = await import('../public/comfyui_web/scripts/app.js');
      const { api } = await import('../public/comfyui_web/scripts/api.js');

      api.api_url = api_url;
      api.websocket_url = ws_url;

      (window as any).app = app;
      if (app && app.setup) {
        await app.setup(workflow);
      }
      (window as any).graph = app.graph;
    };

    // Load the scripts sequentially and execute them
    const loadScripts = async () => {
      await new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = "/comfyui_web/lib/litegraph.core.js";
        script1.onload = resolve;
        script1.onerror = reject;
        document.body.appendChild(script1);
      });

      await new Promise((resolve, reject) => {
        const script2 = document.createElement('script');
        script2.src = "/comfyui_web/lib/litegraph.extensions.js";
        script2.onload = resolve;
        script2.onerror = reject;
        document.body.appendChild(script2);
      });
    };

    const loadStyles = async () => {
      const link = document.createElement('link');
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/comfyui_web/style.css";
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel = "stylesheet";
      link2.type = "text/css";
      link2.href = "/comfyui_web/lib/litegraph.css";
      document.head.appendChild(link2);
    }
    
    loadScripts().then(loadStyles).then(initializeApp);
  }, []);

  return (
    <div></div>
  );
}

export default ComfyUIWrapper;
