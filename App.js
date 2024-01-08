import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./MyTabs";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    // route 라고 생각하면됨
  );
}
