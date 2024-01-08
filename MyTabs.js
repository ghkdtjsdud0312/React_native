import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // 밑에 탭바
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from "react-native"; // 화면을 그려주는 컴포넌트
import { useFocusEffect } from "@react-navigation/native"; // useEffect와 비슷함(포커싱이 될 때 활성화 됨)
import { Feather, FontAwesome5 } from "@expo/vector-icons"; // 하단 아이콘 사용
import { WebView } from "react-native-webview"; // 브라우저 화면을 집어 넣는 것
import Spinner from "react-native-loading-spinner-overlay";
const HOME_URL = "https://movieverse2024.site";
const BOARD_URL = "https://daum.net";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator // 하단 탭 바 영역
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        activeTintColor: "#e91e63",
      }}>
      <Tab.Screen // 홈 화면 만드는 것
        name="Home"
        component={HomeMenu}
        options={{
          headerShown: false, // false라 안하면 바가 생김
          tabBarIcon: ({ color, size }) => (
            <Feather name={"home"} color={color} size={size} /> // 아이콘 종류 이름 / expo vector-icons 사용
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"clipboard"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"rocketchat"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"settings"} color={color} size={size} />
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
      webViewRef.current.injectJavaScript(`location.href=${HOME_URL}`);
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
      <Text>안녕하세요. 여기는 Chatting 입니다.</Text>
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
      <Text>안녕하세요. 여기는 Setting 입니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 다 차지함
    marginTop: StatusBar.currentHeight || 0, // StatusBar에 높이만큼 띄거나 붙여라
  },
  tabBarStyle: {
    ...Platform.select({
      ios: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10,
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

// 아이콘
// 탭 바 연결 부분 연결하기
