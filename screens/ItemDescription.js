import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../color";
import { ArrowLeft } from "react-native-feather";
export default function ItemDescription({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={"dark-content"}
        backgroundColor={Colors.primary}
        hidden={false}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.pop()}
      >
        <ArrowLeft height={30} width={30} stroke={"black"} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            source={require("../TestImages/ring.jpeg")}
          />
        </View>
        <View style={{justifyContent:'flex-start'}}>
          <Text>Ring</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1.5,
  },
  itemImage: {
    height: 320,
    width: 320,
    borderWidth: 0.5,
    borderColor: "black",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom:10
  },
  scrollViewContent: {
    width:'97%',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:5,
    paddingBottom:10
  },
});
