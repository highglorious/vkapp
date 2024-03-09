import { View, Panel, PanelHeader, Spinner } from "@vkontakte/vkui";

import "@vkontakte/vkui/dist/vkui.css";

//import styles from "App.module.css";

import { useGroups } from "./hooks/useGroups";

import { UserGroups } from "./components/UserGroups";
import { Filter } from "./components/Filter";

export function App() {
  const { isError, isLoading } = useGroups();

  const Content = () => {
    if (isLoading) return <Spinner size="large" style={{ margin: "20px 0" }} />;
    if (isError) return <div>failed to load</div>;
    return <UserGroups />;
  };

  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader>VK Test App</PanelHeader>
        <Filter />
        <Content />
      </Panel>
    </View>
  );
}
