import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";
import * as Icon from "react-native-feather";
import React from "react";
import Animated, {
  FadeInUp,
  Easing,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";

export default function SignUpScreen({navigation}) {
  return (
    
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        hidden={false}
      />
      <StatusBar backgroundColor={"white"} />
      <Animated.Image
        style={styles.image}
        source={require("../../images/splash/undraw_pfp.png")}
        resizeMode="center"
        entering={FadeInUp.springify()
          .duration(1000)
          .easing(Easing.ease)
          .damping(10)
          .stiffness(200)}
      />
      <View style={{ marginTop: -20 }}>
        <Animated.View
          style={styles.textFieldContainer}
          entering={FadeInLeft.springify()
            .easing(Easing.ease)
            .damping(10)
            .stiffness(200)}
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
        >
          <Icon.Mail
            stroke={"#6C63FF"}
            width={25}
            height={25}
            style={{ margin: 10 }}
          />
          <TextInput
            placeholder="Email"
            backgroundColor="transparent"
            placeholderTextColor={"#6C63FF"}
            style={{ paddingLeft: -10, fontSize: 15 }}
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
          />
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Animated.Text
          style={{
            textAlign: "center",
            marginTop: 10,
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
        >
          Sign Up
        </Animated.Text>
      </TouchableOpacity>
      <Animated.Text style={{ marginTop: 100 }}
      entering={FadeInDown.springify()
        .easing(Easing.ease)
        .damping(10)
        .stiffness(200)
        .delay(500)
      }>
        <Text>Already have a account?</Text>
        <Text
          style={{
            color: "#6C63FF",
            fontWeight: "600",
            margin:10
          }}
          onPress={()=>navigation.replace('Login')}
        >
          Login
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
    margin: 5,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#6C63FF",
    borderRadius: 30,
    alignItem: "center",
    marginTop: 10,
  },
});
