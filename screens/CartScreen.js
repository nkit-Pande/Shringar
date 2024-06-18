import React, { useState, useMemo } from "react";
import { RadioButton } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Colors } from "../color";
import * as Icon from "react-native-feather";
import StepIndicator from "react-native-step-indicator";
import { useNavigation } from "@react-navigation/native";
import ItemBox from "../components/ItemBox";
import { useCart } from "../context/cartContext";
import { useFonts } from 'expo-font';

const labels = ["Cart", "Delivery", "Payment"];
const count = [1, 2, 3, 4, 5, 6];
export default function CartScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState("first");
  const {cartData,cartTotal,cartSubTotal} = useCart();
  const [selectedId, setSelectedId] = useState();
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    
  });
  const items = cartData.items;
  // console.log("cart")
  console.log(items)

  const handleProceed = () => {
    setCurrentStep((prevStep) =>
      prevStep < labels.length - 1 ? prevStep + 1 : prevStep
    );
  };
  const renderStepIndicator = ({ position, stepStatus }) => {
    const isCurrentStep = stepStatus === "current";
    const isFinishedStep = stepStatus === "finished";
    const icons = [
      <Icon.ShoppingCart
        stroke={isCurrentStep || isFinishedStep ? "#ffffff" : Colors.dark}
        width={20}
        height={20}
        style={{ marginRight: 3 }}
      />,
      <Icon.Truck
        stroke={isCurrentStep || isFinishedStep ? "#ffffff" : Colors.dark}
        width={20}
        height={20}
      />,
      <Icon.CreditCard
        stroke={isCurrentStep || isFinishedStep ? "#ffffff" : Colors.dark}
        width={20}
        height={20}
      />,
    ];
    return icons[position];
  };


  const handleBack = () => {
    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={"dark-content"}
        backgroundColor={"white"}
        hidden={false}
      />
      <Header
        onBack={handleBack}
        customStyles={customStyles}
        currentPosition={currentStep}
        labels={labels}
        renderStepIndicator={renderStepIndicator}
      />
      {currentStep === 0 && <CarList items={items}/>}
      {currentStep === 1 && (
        <DeliveryMethod checked={checked} setChecked={setChecked} />
      )}
      {currentStep === 2 && <Payment />}

        {/* <Payment/> */}

      <InfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cartTotal={cartSubTotal}
      />
      <Footer proceed={handleProceed} setModalVisible={setModalVisible} cartTotal={cartSubTotal}/>
    </View>
  );
}

const Header = ({ onBack, customStyles, currentPosition, labels,renderStepIndicator }) => (
  <View style={styles.headerWrapper}>
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBack}>
        <Icon.ArrowLeft
          width={25}
          height={25}
          stroke={Colors.dark}
          style={[styles.headerIcon, { marginLeft: 20 }]}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon.ShoppingCart
          width={25}
          height={25}
          stroke={Colors.dark}
          style={[styles.headerIcon, { marginEnd: 10 }]}
        />
        <Text style={styles.header}>Cart</Text>
      </View>
    </View>
    <View style={styles.stepIndicatorContainer}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={labels.length}
        direction="horizontal"
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  </View>
);

const CarList = ({ items }) => {
  return (
    <>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <ItemBox item={item} showRemove={false}/>}
          contentContainerStyle={styles.itemList}
        />
      ) : (
        <View style={{flex:.7,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../TestImages/undraw_empty_cart_co35.png')} style={styles.emptyCartImage} resizeMode="cover"/>
          <Text style={styles.emptyCartText}>
            Cart is empty
          </Text>
        </View>
      )}
    </>
  );
};
const DeliveryMethod = ({ checked, setChecked }) => {
  return (
    <View style={styles.deliveryContainer}>

      {/* Method Choose */}
      <Text style={styles.deliveryHeaderText}>Choose the Delivery Method</Text>
      <View style={styles.innerRadioContainer}>
        <TouchableOpacity
          style={styles.singleBox}
          onPress={() => setChecked("second")}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.radioIcon}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                color={Colors.dark}
                uncheckedColor={Colors.dark}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.singleBoxHeaderText}> Come and Collect </Text>
              <Text style={styles.singleBoxBodyText} numberOfLines={1}>
                {" "}
                Collect your package from our store.{" "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleBox}
          onPress={() => setChecked("first")}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.radioIcon}>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                color={Colors.dark}
                uncheckedColor={Colors.dark}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.singleBoxHeaderText}>Home Delivery</Text>
              <Text
                style={[styles.singleBoxBodyText, { width: "90%" }]}
                numberOfLines={2}
              >
                Package would be delivered to your address.
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

          
      {/* Delivery Address     */}

      <Text style={[styles.deliveryHeaderText, { paddingTop: 10 }]}>
        Delivery Address
      </Text>
      <View
        style={[
          styles.singleBox,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View style={styles.radioIcon}>
          <Icon.Home stroke={Colors.dark} width={25} height={25} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text
            numberOfLines={3}
            style={[
              {
                width: "60%",
                paddingVertical: 10,
              },
              styles.singleBoxBodyText,
            ]}
          >
            456 Banyan Road, MG Road Area, Bangalore, Karnataka 560001 India
          </Text>
        </View>
      </View>

      

    </View>
  );
};

const Payment = () => {
  return (
    <View>
      <Text style={styles.paymentTitle}>Order Summary</Text>

    </View>
  );
};


const DetailCard = ({cartTotal}) => {
  return (
    <View style={styles.detailCard}>
      <View style={styles.detailRows}>
        <Text style={styles.leftText}>Items</Text>
        <Text style={styles.rightText}>5</Text>
      </View>
      <View style={styles.detailRows}>
        <Text style={styles.leftText}>Amount</Text>
        <Text style={styles.rightText}>100</Text>
      </View>
      <View style={styles.detailRows}>
        <Text style={styles.leftText}>Discount</Text>
        <Text style={[styles.rightText, { color: Colors.s }]}>3%</Text>
      </View>
      <View style={styles.detailRows}>
        <Text style={styles.leftText}>SubTotal</Text>
        <Text style={styles.rightText}>200</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.detailRows}>
        <Text style={styles.leftText}>Total</Text>
        <Text style={[styles.rightText, { color: Colors.e_orange }]}>{cartTotal}</Text>
      </View>
    </View>
  );
};


const InfoModal = ({ modalVisible, setModalVisible,cartTotal}) => (
  <Modal
    animationType="slide"
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
    transparent={true}
    presentationStyle="overFullScreen"
  >
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Icon.X stroke={Colors.dark} width={25} height={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            marginRight: 20,
            color: "white",
            alignSelf: "center",
          }}
        >
          Detail
        </Text>
      </View>
      <DetailCard cartTotal={cartTotal} />
    </View>
  </Modal>
);


const Footer = ({ proceed, setModalVisible,cartTotal }) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Total</Text>
    <View style={styles.footerContent}>
      <Text style={styles.paymentTotalText}>₹{cartTotal}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity style={{ padding: 5 }}>
          <Icon.Info
            stroke={Colors.dark}
            height={25}
            width={25}
            style={{ alignSelf: "flex" }}
            onPress={() => setModalVisible(true)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentProceedButton} onPress={proceed}>
          <Text style={styles.paymentProceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.dark,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.dark,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: Colors.dark,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: Colors.dark,
  stepIndicatorUnFinishedColor: 'white',
  stepIndicatorCurrentColor: Colors.dark,
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: Colors.dark,
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: Colors.dark,
  labelSize: 12,
  currentStepLabelColor: Colors.dark,
  separatorWidth: 40,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
  },
  headerContainer: {
    height: 50,
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcon: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
    marginRight: 20,
    fontFamily:'Poppins-SemiBold'
  },
  stepIndicatorContainer: {
    width: "100%",
    padding: 20,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: "grey",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  footerText: {
    fontSize: 13,
    fontFamily:'Poppins-SemiBold'
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentTotalText: {
    fontSize: 24,
    fontFamily:'Poppins-SemiBold'
  },
  paymentProceedButton: {
    backgroundColor: Colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 4,
    marginRight: 1,
  },
  paymentProceedButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:'Poppins-SemiBold'
  },
  itemList: {
    width:'100%',
    paddingBottom: 80,
  },
  detailCard: {
    width: "100%",
    borderRadius: 10,
    borderColor: Colors.dark,
    borderWidth: 3,
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.primary,
    marginBottom: 50,
  },
  detailText: {
    fontSize: 20,
  },
  detailRows: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 2,
  },
  leftText: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 10,
    marginVertical: 1,
    fontWeight: "300",
  },
  rightText: {
    flex: 1,
    textAlign: "right",
    paddingHorizontal: 10,
    marginVertical: 1,
    fontWeight: "bold",
    color: Colors.dark,
  },
  modalContent: {
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
    shadowRadius: 4,
    elevation: 6,
  },
  deliveryContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  deliveryHeaderText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
    fontFamily:'Poppins-SemiBold'
  },
  radioButtonContainer: {
    width: "100%",
    columnGap: 5,
    alignItems: "center",
  },
  radioBox: {
    width: "100%",
    backgroundColor: "red",
  },
  innerRadioContainer: {
    alignSelf: "stretch",
    marginTop: 20,
  },
  singleBox: {
    height: 100,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  singleBoxHeaderText: {
    fontSize: 17,
    paddingTop: 20,
    fontFamily:'Poppins-SemiBold'
  },
  singleBoxBodyText: {
    paddingBottom: 20,
    marginTop: 5,
    fontFamily:'Poppins-Medium',
    fontSize:12
  },
  radioIcon: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentTitle:{
    fontSize:15,
    fontWeight:'bold',
    alignSelf:'center'
  },
  emptyCartText:{
    fontSize:20,
    paddingBottom:10,
    fontWeight:'bold'
  },
  emptyCartImage:{
    height:200,
    width:200,
  }
});
