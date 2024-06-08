import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/SignUp/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";
import BoardingScreen from "./screens/BoardingScreen";
import ItemDescription from "./screens/ItemDescription";
import { UserProvider } from "./context/userContext";
import { ProductProvider } from "./context/productContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Boarding" component={BoardingScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ animation: "fade" }}
            />
            <Stack.Screen
              name="ItemDescription"
              component={ItemDescription}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
