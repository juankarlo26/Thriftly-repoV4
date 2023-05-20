import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors, network } from "../../constants";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CartProductList = ({
  image,
  title,
  price,
  quantity = 1,
  handleDelete,
  onPressDecrement,
  onPressIncrement,
}) => {
  const rightSwipe = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons
            name="delete"
            size={25}
            color={colors.danger}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.containerOuter}>
        <Swipeable renderRightActions={rightSwipe}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.productImage} />
            </View>
            <View style={styles.productInfoContainer}>
              <View style={styles.productListBottomContainer}>
                <Text style={styles.productTitle}>{title}</Text>
              </View>
              <View style={styles.thriftedContainer}>
                <Text style={styles.productQuantitySm}>Qty: {quantity}</Text>
                <Text style={styles.thriftedQuantitySm}>Thriftable</Text>
              </View>
              <View style={styles.productListBottomContainer}>
                <Text style={styles.productPrice}>₱{price * quantity}</Text>

                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.decButtonContainer}
                    onPress={onPressDecrement}
                  >
                    <Text style={styles.decButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterCountText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.incButtonContainer}
                    onPress={onPressIncrement}
                  >
                    <Text style={styles.incButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    </GestureHandlerRootView>
  );
};

export default CartProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 120,
    borderRadius: 15,
    width: "100%",
    padding: 10,
    marginBottom: 10,
 
  },
  containerOuter: {
    backgroundColor: colors.red,
    height: 120,
    borderRadius: 17,
    width: "100%",
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  productInfoContainer: {
    padding: 10,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.dark,
  },
  productQuantitySm: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: colors.muted,
  },
  thriftedQuantitySm: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    color: colors.black,
    marginTop: 2,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    width: 70,
  },
  productListBottomContainer: {
    width: "auto",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colors.primary,
  },
    productListBottomContainer: {
    width: "auto",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colors.primary,
  },
  thriftedContainer: {
    width: "100%",
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // backgroundColor: colors.primary,
  },
  counter: {
    width: 100,
    marginLeft: 60,
    padding: 5,
    borderRadius: 5,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
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
  counterCountText: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});
