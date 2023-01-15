import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import garmentsIcon from "../../assets/icons/garments.png";

const CustomIconButton = ({ text, image, onPress, active }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.black : colors.light,
          borderColor: colors.black, },
      ]}
      onPress={onPress}
    >
      {/* <Image source={image} style={styles.buttonIcon} /> */}
      <Text
        style={[
          styles.buttonText,
          { color: active ? colors.white : colors.black },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 40,
    width: 110,
    borderWidth: 1,
    borderColor: colors.muted,
    // elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'Montserrat-Medium',
  },
  buttonIcon: {
    height: 20,
    width: 35,
    resizeMode: "contain",
  },
});
