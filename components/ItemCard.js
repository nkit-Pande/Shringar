import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../color";
import { Cpu } from "react-native-feather";

export default function ItemCard({ product, navigation }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("ItemDescription", { product })}
    >
      <Image style={styles.image} src={product.image_url}/>
      <View style={styles.textContainer}>
        <Text style={styles.productName}  numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
        <Text style={styles.productPrice}>
          <Text 
          style={{
            // color:Colors.success,
            fontSize:12
          }}>₹</Text> 
          {product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    width: 150,
    height: 190,
    backgroundColor: Colors.primary,
    margin: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 9,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius:10
  },
  textContainer: {
    flexDirection: "column",
    alignItems:'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  productName: {
    fontSize: 13,
    fontWeight: "400",
    color:Colors.dark,
    fontWeight:'500'
  },
  productPrice: {
    fontSize: 13,
    fontWeight: "400",
    color:Colors.e_orange,
    fontWeight:'bold',
    marginTop:3,
    marginLeft:10
  },
});