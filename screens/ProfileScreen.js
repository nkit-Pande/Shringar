import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import * as Icon from "react-native-feather";
import { Colors } from "../color";
import ProfileForm from "../components/ProfileForm";
import { useUser } from "../context/userContext";

export default function ProfileScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logout, userData } = useUser();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(userData);
  console.log(userData);
  const logOut = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={Colors.primary}
        hidden={false}
      />
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: Colors.primary,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: -6,
        }}
      >
        <Icon.Hash
          width={25}
          height={25}
          stroke={Colors.dark}
          style={{ marginBottom: 10, marginLeft: 20, marginRight: 7 }}
        />
        <Text style={styles.topHeader}>Profile</Text>
      </View>
      <View style={styles.header}>
        <Image
          source={require("../TestImages/undraw_Profile_pic_re_iwgo.png")}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData?.username}</Text>
        <Text style={styles.profileLocation}>
          {userData?.city},{userData?.state}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Name */}
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>Name</Text>
          <Text style={styles.infoText}>{userData?.fullname}</Text>
        </View>
        <View style={styles.divider} />
        {/* Email */}
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>Email</Text>
          <Text style={styles.infoText}>{userData?.email}</Text>
        </View>
        <View style={styles.divider} />
        {/* Password */}
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>Password</Text>
          <Text style={styles.infoText}>***********</Text>
        </View>
        <View style={styles.divider} />
        {/* User ID */}
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>City</Text>
          <Text style={styles.infoText}>{userData?.city}</Text>
        </View>
        <View style={styles.divider} />
        {/* Zip Code */}
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>State</Text>
          <Text style={styles.infoText}>{userData?.state}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoHeader}>Country</Text>
          <Text style={styles.infoText}>{userData?.country}</Text>
        </View>
        <View style={{ height: 15 }} />
      </View>

      <View style={styles.lowerContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <View
            style={[styles.actionButton, { backgroundColor: Colors.success }]}
          >
            <Icon.Edit
              height={25}
              width={25}
              stroke={"white"}
              style={styles.actionButtonIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logOut()}>
          <View
            style={[styles.actionButton, { backgroundColor: Colors.danger }]}
          >
            <Icon.LogOut
              height={25}
              width={25}
              stroke={"white"}
              style={styles.actionButtonIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ProfileForm toggleModal={toggleModal} userData={userData} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark,
  },
  profileLocation: {
    fontSize: 14,
    color: Colors.dark,
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  infoBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoHeader: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  lowerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginTop: -20,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 30,
    marginTop: 5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonIcon: {
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  topHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});
