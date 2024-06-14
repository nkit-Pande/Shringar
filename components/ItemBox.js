import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../color";
import * as Icon from 'react-native-feather';

export default function ItemBox() {
  
  const [counter, changeCounter] = useState(0);
  const hw = 25;

  const truncatedTitle = (title) => {
    title = title.length > 20 ? title.substring(0, 20) + '...' : title;
    return title;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          src="https://www.kalyanjewellers.net/images/Jewellery/Gold/images/kajjara-nimah-gold-jhumka.jpg"
        />
        <View style={styles.outerBox}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {truncatedTitle("Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeee")}
          </Text>
          
          <View style={styles.innerBox}>
            <Text style={{ color: Colors.e_orange }}>
              Price
            </Text>
            <View style={styles.counterBox}>
              <TouchableOpacity style={styles.iconBox1}>
                <Icon.Minus height={hw} width={hw} stroke={'white'} />
              </TouchableOpacity>
              <Text style={styles.counterText}>{counter}</Text>
              <TouchableOpacity style={styles.iconBox2}>
                <Icon.Plus height={hw} width={hw} stroke={Colors.dark} strokeWidth={1} />
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
      {/* <TouchableOpacity style={styles.remove}>
            <Icon.X width={15} height={15} stroke={'white'} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: Colors.dark,
    margin: 4
  },
  outerBox: {
    marginLeft: 5,
    width: '72%'
  },
  title: {
    fontSize: 14,
    color: Colors.dark,
    marginTop: 10,
    fontWeight: '500'
  },
  innerBox: {
    marginTop: 10,
    marginLeft: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  counterText: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  counterBox: {
    flexDirection: 'row',
    marginTop: 4,
    marginRight: 10
  },
  iconBox1: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.dark
  },
  iconBox2: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.dark
  },
  remove: {
    // alignItems: 'center',
    // alignSelf: 'flex-start',
    // backgroundColor:'grey',
    // padding:3,
    // backgroundColor:Colors.danger,
    // borderRadius:30,
    // position:'absolute',
    // left:297,
    // top:5
  }
});

