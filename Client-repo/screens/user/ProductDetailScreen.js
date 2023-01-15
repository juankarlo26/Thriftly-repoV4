import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg.png";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  //method to add item to cart(redux)
  const handleAddToCat = (item) => {
    addCartItem(item);
  };

  //remove the authUser from async storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
  };

  const [onWishlist, setOnWishlist] = useState(false);
  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productImage, SetProductImage] = useState(" ");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState("");
  const [isDisable, setIsDisbale] = useState(true);
  const [alertType, setAlertType] = useState("error");

  //method to fetch wishlist from server using API call
  const fetchWishlist = async () => {
    const value = await AsyncStorage.getItem("authUser"); // get authUser from async storage
    let user = JSON.parse(value);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", user.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${network.serverip}/wishlist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.err === "jwt expired") {
          logout();
        }
        if (result.success) {
          setWishlistItems(result.data[0].wishlist);
          setIsDisbale(false);

          //check if the current active product is already in wishlish or not
          result.data[0].wishlist.map((item) => {
            if (item?.productId?._id === product?._id) {
              setOnWishlist(true);
            }
          });

          setError("");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
      });
  };

  //method to increase the product quantity
  const handleIncreaseButton = (quantity) => {
    if (avaiableQuantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  //method to decrease the product quantity
  const handleDecreaseButton = (quantity) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  //method to add or remove item from wishlist
  const handleWishlistBtn = async () => {
    setIsDisbale(true);
    const value = await AsyncStorage.getItem("authUser");
    let user = JSON.parse(value);

    if (onWishlist) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", user.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      //API call to remove a item in wishlish
      fetch(
        `${network.serverip}/remove-from-wishlist?id=${product?._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setError(result.message);
            setAlertType("success");
            setOnWishlist(false);
          } else {
            setError(result.message);
            setAlertType("error");
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType("error");
          console.log("error", error);
        });
      setIsDisbale(false);
    } else {
      var myHeaders2 = new Headers();
      myHeaders2.append("x-auth-token", user.token);
      myHeaders2.append("Content-Type", "application/json");

      var raw2 = JSON.stringify({
        productId: product?._id,
        quantity: 1,
      });

      var addrequestOptions = {
        method: "POST",
        headers: myHeaders2,
        body: raw2,
        redirect: "follow",
      };

      console.log(addrequestOptions);

      //API call to add a item in wishlish
      fetch(`${network.serverip}/add-to-wishlist`, addrequestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            setError(result.message);
            setAlertType("success");
            setOnWishlist(true);
          } else {
            setError(result.message);
            setAlertType("error");
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType("error");
          console.log("error", error);
        });
      setIsDisbale(false);
    }
  };

  //set quantity, avaiableQuantity, product image and fetch wishlist on initial render
  useEffect(() => {
    setQuantity(0);
    setAvaiableQuantity(product.quantity);
    SetProductImage(`${network.serverip}/uploads/${product?.image}`);
    fetchWishlist();
  }, []);

  //render whenever the value of wishlistItems change
  useEffect(() => {}, [wishlistItems]);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.black}
          />
        </TouchableOpacity>

        <View>
          
        </View>
        {/* <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : (
            <></>
          )}
          <Image source={cartIcon} style={styles.cart}/>
        </TouchableOpacity> */}
        <View style={styles.wishlistButtonContainer}>
                <TouchableOpacity
                  disabled={isDisable}
                  style={styles.iconContainer}
                  onPress={() => handleWishlistBtn()}
                >
                  {onWishlist == false ? (
                    <Ionicons name="heart-outline" size={25} color={colors.black} />
                  ) : (
                    <Ionicons name="heart" size={25} color={colors.primary} />
                  )}
                </TouchableOpacity>
              </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: productImage }} style={styles.productImage} />
        </View>
        
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoTopContainer}>
            {/* <CustomAlert message={error} type={alertType} /> */}
            <View style={styles.productNameContaier}>
              <Text style={styles.productNameText}>{product?.title}</Text>
              <Text style={styles.priceText}>₱ {product?.price}</Text>
            </View>
            <View style={styles.infoButtonContainer}>
            </View>
            <View style={styles.productDescriptionContainer}>
              <Text style={styles.secondaryTextSm}>Description:</Text>
              <Text style={styles.primaryText2}>{product?.description}</Text>
            </View>
            {/* <View style={styles.colorSelectContainer}>
              <Text style={styles.secondaryTextSm}>Color:</Text>
              <Text style={styles.secondaryTextSm}>Description:</Text>
            </View> */}
            <View style={styles.qtySelectContainer}>
              <Text style={styles.secondaryTextSm}>Quantity:</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.decButtonContainer}
                  onPress={() => {
                    handleDecreaseButton(quantity);
                  }}
                >
                  <Text style={styles.decButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterCountText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.incButtonContainer}
                  onPress={() => {
                    handleIncreaseButton(quantity);
                  }}
                >
                  <Text style={styles.incButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productDetailContainer}>
              <View style={styles.productSizeOptionContainer}>
              {/* <Text style={styles.secondaryTextSm}>Price:</Text>
              <Text style={styles.primaryTextSm}>₱ {product?.price}</Text>
                <Text style={styles.secondaryTextSm}>Size:</Text> */}
              </View>
              <View style={styles.productPriceContainer}>

              </View>
            </View>

          </View>
          <View style={styles.productInfoBottomContainer}>
            {/* <View style={styles.counterContainer}>
            </View> */}
            <View style={styles.productButtonContainer}>
              {avaiableQuantity > 0 ? (
                <CustomButton
                  text={"Add to Cart"}
                  onPress={() => {
                    handleAddToCat(product);
                  }}
                />
              ) : (
                <CustomButton text={"Out of Stock"} disabled={true} />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    zIndex: 3,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  productImageContainer: {
    width: "100%",
    height:"50%",
    backgroundColor: colors.light,
    flexDirecion: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
  },
  productInfoContainer: {
    width: "100%",
    height:"50%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 25,
  },
  productImage: {
    height: 450,
    width: 400,
    // resizeMode: "contain",
  },
  productInfoTopContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  productInfoBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
     backgroundColor: colors.gray,
    width: "100%",
    height: 100,
  },
  productButtonContainer: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: colors.white,
    width: "100%",
    height: 100,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productNameContaier: {
    padding: 5,
    paddingHorizontal: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productNameText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    width: "50%",
  },
  priceText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',

  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 80,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetailContainer: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 25,
  },
  secondaryTextSm: { fontSize: 15, fontFamily: 'Montserrat-SemiBold', },
  primaryTextSm: { color: colors.black, fontSize: 15, fontFamily: 'Montserrat-SemiBold', },
  productDescriptionContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  colorSelectContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  qtySelectContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    // backgroundColor: colors.gray,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  counterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 50,
    // backgroundColor: colors.muted,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5,
    
  },
  counterButtonContainer: {
    display: "flex",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  counterCountText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.primary,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
  },
  cart: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  primaryText2: {
    fontSize: 13,
    // fontWeight: "normal",
    color: colors.muted, 
    fontFamily: 'Montserrat-Medium'
  },
  incButtonContainer: {
    display: "flex",
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 10,
    // elevation: 2,
  },
  decButtonContainer: {
    display: "flex",
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // backgroundColor: colors.primary,
    borderRadius: 10,
    // elevation: 2,
  },
  incButtonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  decButtonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
});
