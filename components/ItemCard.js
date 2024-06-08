import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../color";

export default function ItemCard(products) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=> navigation.navigate("ItemDescription")}>
      <Image style={styles.image} source={products.image_url} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "400", marginRight: 90 }}>
          {products.name}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "400" }}>{products.price}</Text>
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
    height: 170,
    backgroundColor: Colors.primary,
    margin: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 20,
    elevation: 9,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: "white",
    marginBottom: 15,
  },
});
