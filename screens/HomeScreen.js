import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import * as Icon from "react-native-feather";
import { Colors } from "../color";
import ItemCard from "../components/ItemCard";
import { useProduct } from "../context/productContext";


export default function HomeScreen({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchTextInput = useRef(null);

  const {products,setPage} = useProduct();

  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = () => {
    searchTextInput.current.blur();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        barStyle={"dark-content"}
        backgroundColor={Colors.primary}
        hidden={false}
      />

      {/* SearchBar */}
      <View
        style={{ width: "100%", height: 80, backgroundColor: Colors.primary }}
      >
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              marginHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "black",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Icon.Search height={20} width={20} stroke={Colors.dark} />
            <TextInput
              ref={searchTextInput}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onSubmitEditing={handleSearchSubmit}
              placeholder="Search"
              placeholderTextColor={"grey"}
              marginHorizontal={10}
              style={{
                fontWeight: "400",
                color: "black",
                height: 30,
                width: 215,
              }}
            />
            <View style={styles.verticleLine} />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => alert("Option Clicked")}>
                <Icon.Filter height={20} width={20} stroke={Colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Screen Options */}
      <View style={{ width: "100%", backgroundColor: Colors.primary }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: "transparent" }}
        >
          {["All", "Gold", "Ring", "Bracelet", "Necklace", "Ear Rings"].map(
            (category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryContainer,
                  selectedCategory === category &&
                    styles.selectedCategoryContainer,
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text
                  style={[
                    styles.category,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 130,
        }}
      >
        <FlatList
          style={{ width: "100%" }}
          data={item}
          renderItem={({ item }) => (
            <ItemCard
              products = {products} 
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: Colors.dark,
    margin: 8,
  },
  category: {
    color: Colors.dark,
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.dark,
    color: "white",
  },
  selectedCategory: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
  },
});
