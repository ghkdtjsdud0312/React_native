import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./MyTabs";

export default function App() {
  return (
    // route 라고 생각하면됨
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
