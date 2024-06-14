import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as Icon from "react-native-feather";
import Animated, {
  FadeInUp,
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import AuthService from '../../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from "../../context/userContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {isLoggedIn,setIsLoggedIn,setUserState} = useUser();
  //ajaypanaskar8@gmail.com
  //Ilovemykid
  // "email": "yadavrahul@gmail.com",
  // "password" : "Helloworld@123"

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await AuthService.login(username, password);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);
      setUserState(data);
      navigation.replace('Starter');
    } catch (e) {
      setError('Login failed. Please check your credentials.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={"white"}
        hidden={false}
      />
      <Animated.Image
        style={styles.image}
        source={require("../../images/splash/undraw_personal_information.png")}
        resizeMode="center"
        entering={FadeInUp.springify()
          .duration(2000)
          .easing(Easing.ease)
          .damping(10)
          .stiffness(200)}
        exiting={FadeInRight}
      />
      <View style={{ marginTop: -20 }}>
        <Animated.View
          style={styles.textFieldContainer}
          entering={FadeInLeft.springify()
            .easing(Easing.ease)
            .damping(10)
            .stiffness(200)}
          exiting={FadeInRight}
        >
          <Icon.User
            stroke={"#6C63FF"}
            width={25}
            height={25}
            style={{ margin: 10 }}
          />
          <TextInput
            placeholder="UserName"
            backgroundColor="transparent"
            placeholderTextColor={"#6C63FF"}
            style={{ paddingLeft: -10, fontSize: 15 }}
            value={username}
            onChangeText={setUsername}
          />
        </Animated.View>
        <Animated.View
          style={styles.textFieldContainer}
          entering={FadeInLeft.springify()
            .easing(Easing.ease)
            .damping(10)
            .stiffness(200)
            .delay(100)
          }
          exiting={FadeInRight}
        >
          <Icon.Lock
            stroke={"#6C63FF"}
            width={25}
            height={25}
            style={{ margin: 10 }}
          />
          <TextInput
            placeholder="Password"
            backgroundColor="transparent"
            placeholderTextColor={"#6C63FF"}
            style={{ paddingLeft: -10, fontSize: 15 }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Animated.View>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Animated.Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "500",
            }}
            entering={FadeInDown.springify()
              .easing(Easing.ease)
              .damping(10)
              .stiffness(200)
              .delay(100)
            }
            exiting={FadeInRight}
          >
            Login
          </Animated.Text>
        )}
      </TouchableOpacity>
      <Animated.Text style={{ marginTop: 120 }}
        entering={FadeInDown.springify()
          .easing(Easing.ease)
          .damping(10)
          .stiffness(200)
          .delay(500)
        } exiting={FadeInRight}>
        <Text>Don't have an account? </Text>
        <Text
          style={{
            color: "#6C63FF",
            fontWeight: "600",
          }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    marginTop: 90,
  },
  textFieldContainer: {
    width: 300,
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#6C63FF",
    flexDirection: "row",
    alignItems: 'center',  // Fixes alignment of the text inside
    margin: 5,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",  // Centers the text inside the button
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
