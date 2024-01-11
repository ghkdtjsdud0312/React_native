import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // 밑에 탭바
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native"; // 화면을 그려주는 컴포넌트
import { useFocusEffect } from "@react-navigation/native"; // useEffect와 비슷함(포커싱이 될 때 활성화 됨)
import { Feather, FontAwesome5, Octicons, AntDesign } from "@expo/vector-icons"; // 하단 아이콘 사용
import { WebView } from "react-native-webview"; // 브라우저 화면을 집어 넣는 것
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location"; // 안드로이드 위치 권한 추가

const HOME_URL = "https://workoutbuddys.store/";
const BOARD_URL = "https://workoutbuddys.store/schedule";
const CHATTING_URL = "https://workoutbuddys.store/freechat";
const MAP_URL = "https://workoutbuddys.store/kakaomap";
const SETTING_URL = "https://workoutbuddys.store/mypage";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator // 하단 탭 바 영역
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        activeTintColor: "#04BF8A",
      }}>
      <Tab.Screen // 홈 화면 만드는 것
        name="Home"
        component={HomeMenu}
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#DFEDE9",
          tabBarInactiveTintColor: "#04BF8A",
          headerShown: false, // false라 안하면 바가 생김
          tabBarIcon: ({ color, size }) => (
            <Feather name={"home"} color={color} size={size} /> // 아이콘 종류 이름 / expo vector-icons 사용
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Board}
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#DFEDE9",
          tabBarInactiveTintColor: "#04BF8A",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"calendar"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={Chatting}
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#DFEDE9",
          tabBarInactiveTintColor: "#04BF8A",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"message1"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#DFEDE9",
          tabBarInactiveTintColor: "#04BF8A",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"map-marker-alt"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Setting}
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#DFEDE9",
          tabBarInactiveTintColor: "#04BF8A",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name={"person"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // 포커싱 되는 시점에 url을 주입한다. -> 로딩될 때 실행 됨
  useFocusEffect(
    React.useCallback(() => {
      webViewRef.current.injectJavaScript(`location.href='${HOME_URL}'`);
      setLoading(false);
    }, [])
  );

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: HOME_URL }} // 있어야 뜸
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Board({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: BOARD_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Chatting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: CHATTING_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Map({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // 안드로이드 지도 띄울 떄 권한 주기
  useEffect(() => {
    async function requestLocationPermission() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          console.log("Location permission granted");
        } else {
          console.log("Location permission denied");
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    }

    requestLocationPermission();
  }, []);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: MAP_URL }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        mixedContentMode="always"
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Setting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: SETTING_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 다 차지함
    marginTop: StatusBar.currentHeight || 0, // StatusBar에 높이만큼 띄거나 붙여라
    marginBottom: -86, // 탭 바 내리기
  },
  tabBarStyle: {
    backgroundColor: "#ffffff", // 하단바 배경색
    ...Platform.select({
      ios: {
        height: 70,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 5,
      },
      android: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        // marginBottom: 10, // 안드로이드에서는 marginBottom을 제외
      },
    }),
  },
});
