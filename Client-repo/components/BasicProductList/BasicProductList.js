import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const BasicProductList = ({ title, price, quantity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          <Ionicons name="square" size={30} color={colors.semiGray} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText}>{title}</Text>
          <Text style={styles.secondaryText}>Qty: {quantity}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.primaryText}>{quantity * price}₱</Text>
      </View>
    </View>
  );
};

export default BasicProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.dark,
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: colors.semi,
    padding: 15,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  productInfoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.semi,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  primaryText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.gray,
  },
  secondaryText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: colors.semiGray,
  },
});
