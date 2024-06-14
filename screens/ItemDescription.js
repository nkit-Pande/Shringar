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
import { ArrowLeft, ShoppingCart } from "react-native-feather";
import { Heart as HeartSolid } from "react-native-feather";
export default function ItemDescription({ route, navigation }) {
  const { product } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={"dark-content"}
        backgroundColor={Colors.primary}
        hidden={false}
      />
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}
        >
          <ArrowLeft height={30} width={30} stroke={"black"} />
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => {}}
        >
          <ShoppingCart height={25} width={25} stroke={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => {}}
        >
          <HeartSolid height={25} width={25} stroke={"red"}  />
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            source={{ uri: product.image_url }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productMRP}>M.R.P.:</Text>
            <Text style={styles.productPrice}>₹{product.price}</Text>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.addToCart}>
          <ShoppingCart
            height={25}
            width={25}
            stroke={"white"}
            style={{
              marginRight: 10,
            }}
          />
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.primary,
    marginBottom:10,
    borderWidth:0.2,
    borderBlockStartColor:Colors.primary,
  },
  backButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    margin:10
  }, otherButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical:10,
    margin:2
  },
  itemImage: {
    height: 320,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "black",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollViewContent: {
    width: "97%",
    alignItems: "center",
    marginHorizontal: 5,
    paddingBottom: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 5,
  },
  newSeasonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  newSeasonText: {
    color: "white",
    fontWeight: "bold",
  },
  productDetails: {
    width: "100%",
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginRight: 10,
  },
  productMRP: {
    fontSize: 14,
    // textDecorationLine: 'line-through',
    marginRight: 10,
  },
  productDiscount: {
    fontSize: 14,
    color: "red",
  },
  productDescription: {
    marginVertical: 10,
    fontSize: 14,
    color: "gray",
  },
  addToCart: {
    backgroundColor: Colors.dark,
    height: 50,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
