import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/CustomInput";
import ProgressDialog from "react-native-progress-dialog";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CheckoutScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { emptyCart } = bindActionCreators(actionCreaters, dispatch);
  const [thrift, setthrift] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  //method to remove the authUser from aysnc storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
  };

  //method to handle checkout
  const handleCheckout = async () => {
    setIsloading(true);
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("authUser");
    let user = JSON.parse(value);
    console.log("Checkout:", user.token);

    myHeaders.append("x-auth-token", user.token);
    myHeaders.append("Content-Type", "application/json");

    var payload = [];
    var totalamount = 0;

    // fetch the cart items from redux and set the total cost
    cartproduct.forEach((product) => {
      let obj = {
        productId: product._id,
        price: product.price,
        quantity: product.quantity,
      };
      totalamount += parseInt(product.price) * parseInt(product.quantity);
      payload.push(obj);
    });

    var raw = JSON.stringify({
      items: payload,
      amount: totalamount,
      discount: 0,
      payment_type: "cod",
      thrift: thrift,
      country: country,
      status: "pending",
      city: city,
      zipcode: zipcode,
      shippingAddress: streetAddress,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(network.serverip + "/checkout", requestOptions) //API call
      .then((response) => response.json())
      .then((result) => {
        console.log("Checkout=>", result);
        if (result.err === "jwt expired") {
          setIsloading(false);
          logout();
        }
        if (result.success == true) {
          setIsloading(false);
          emptyCart("empty");
          navigation.replace("orderconfirm");
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log("error", error);
      });
  };

  // set the address and total cost on initital render
  useEffect(() => {
    if (streetAddress && city && country != "") {
      setAddress(`${streetAddress}, ${city},${country}`);
    } else {
      setAddress("");
    }
    if (thrift != "") {
      setthrift(`${thrift}`);
    } else {
      setthrift("");
    }
    setTotalCost(
      cartproduct.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;//for deletion
      }, 0)
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={"Placing Order..."} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <Text style={styles.primaryText}>Checkout</Text>
        <Text style={styles.primaryText}></Text>
      </View>
      
      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
      <Text style={styles.primaryText2}>Delivery Address</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.secondaryTextSm}>Address</Text>
            <View>
              {country || city || streetAddress != "" ? (
                <Text
                  style={styles.secondaryTextSm}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {address.length < 25
                    ? `${address}`
                    : `${address.substring(0, 25)}...`}
                </Text>
              ) : (
                <Ionicons name="add-circle-outline" size={30} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.primaryText2}>Thrift</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => setModalVisible2(true)}
          >
            <Text style={styles.secondaryTextSm}>Amount</Text>
            <View>
              { thrift != "" ? (
                <Text
                  style={styles.secondaryTextSm}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {thrift.length < 25
                    ? `${thrift}`
                    : `${thrift.substring(0, 25)}...`}
                </Text>
              ) : (
                <Ionicons name="add-circle-outline" size={30} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.primaryText2}>Order Summary</Text>
        <ScrollView
          style={styles.orderSummaryContainer}
          nestedScrollEnabled={true}
        >
          {cartproduct.map((product, index) => (
            <BasicProductList
              key={index}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </ScrollView>
        
        



        <Text style={styles.primaryText2}>Total</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Order</Text>
            <Text style={styles.secondaryTextSm}>{totalCost}₱</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Delivery</Text>
            <Text style={styles.secondaryTextSm}>{deliveryCost}₱</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Total</Text>
            <Text style={styles.primaryTextSm}>
              {totalCost + deliveryCost}₱
            </Text>
          </View>
        </View>
        {/* <Text style={styles.primaryText2}>Contact</Text>
        
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>
              juankarlo@gmail.com
            </Text>
          </View>

          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>+62 9950 048 5454</Text>
          </View>
        </View> */}

      <Text style={styles.primaryText2}>Payment</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
          </View>
        </View>
   


        <View style={styles.emptyView}></View>
      </ScrollView>
      <View style={styles.cartBottomContainer}>
      <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <MaterialIcons
              name="payments"
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Subtotal:</Text>
            <Text>₱ {totalCost}</Text>
          </View>
        </View>

        <View style={styles.cartBottomRightContainer}>
        {country && city && streetAddress != "" ? (
          
          <CustomButton
            text={"Submit Order"}
            // onPress={() => navigation.replace("orderconfirm")}
            onPress={() => {
              handleCheckout();
            }}
          />
        ) : (
          <CustomButton text={"Confirm"} disabled />
        )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modelBody}>
        
          <View style={styles.modelAddressContainer}>
          <Text style={styles.primaryText}>Address</Text>
            <CustomInput
              value={country}
              setValue={setCountry}
              placeholder={"Enter Country"}
              radius={15}
            />
            <CustomInput
              value={city}
              setValue={setCity}
              placeholder={"Enter City"}
              radius={15}
            />
            <CustomInput
              value={streetAddress}
              setValue={setStreetAddress}
              placeholder={"Enter Street Address"}
              radius={15}
            />
            <CustomInput
              value={zipcode}
              setValue={setZipcode}
              placeholder={"Enter ZipCode"}
              keyboardType={"number-pad"}
              radius={15}
            />
            {streetAddress || city || country != "" ? (
              <CustomButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAddress(`${streetAddress}, ${city},${country}`);
                }}
                text={"save"}
              />
            ) : (
              <CustomButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                text={"close"}
              />
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.modelBody}>
        
          <View style={styles.modelAddressContainer2}>
          <Text style={styles.primaryText3}>Amount</Text>
            <CustomInput
              value={thrift}
              setValue={setthrift}
              placeholder={"Enter amount"}
              keyboardType={"number-pad"}
              radius={15}
            />
            {thrift != "" ? (
              <CustomButton
              onPress={() => {
                setModalVisible2(!modalVisible2);
                setAddress(`${streetAddress}, ${city},${country}`);
              }}
              text={"save"}
            />
            ) : (
              <CustomButton
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
                text={"close"}
              />
            )}
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor: colors.semi,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.semi,
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold'
  },
  primaryText2: {
    marginVertical: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  primaryText3: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    color: colors.black,
    fontFamily: 'Montserrat-SemiBold'
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // backgroundColor: colors.white,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.gray,
  },
  listContainer: {
    backgroundColor: colors.semi,
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelAddressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
  },
  modelAddressContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
  },
  thriftedQuantitySm2: {
    fontSize: 13,
    
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    marginTop: 2,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  cartBottomContainer: {
    width: "100%",
    height: 130,
    display: "flex",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBottomLeftContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "40%",
    height: "100%",
  },
  cartBottomRightContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    height: "100%",
    
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
});
