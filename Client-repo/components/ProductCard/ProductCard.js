import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({
  name,
  price,
  image,
  description,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: cardSize === "large" ? "100%" : 150 }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{`${name.substring(
            0,
            11
          )}..`}</Text>
          <Text style={styles.primaryTextSm}>₱ {price}</Text>
        </View>
        <View>
          {quantity > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 150,
    height: 220,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    // elevation: 5,
  },
  imageContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 160,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 160,
    width: 140,
    borderRadius: 10,
    resizeMode: "contain",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 12,
    // width: "70%",
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  primaryTextSm: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerDisable: {
    backgroundColor: colors.muted,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
});
