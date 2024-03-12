import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
bridge.send("VKWebAppInit");
createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
