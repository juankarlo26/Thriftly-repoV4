import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const UserProfileCard = ({ Icon, name, email }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.avatarContainer}>
        <Icon name="person" size={20} color={colors.black} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText2}>Welcome Back!</Text>
        <Text style={styles.primaryText}>{name}!</Text>
        <Text style={styles.secondaryText}>{email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    
  },
  avatarContainer: {
    display: "flex",
    width: "20%",
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
   
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    color: colors.white,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 15,
  },
  usernameText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: colors.white,
  },
  secondaryText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.white,
  },
  primaryText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    color: colors.white,
  },
  primaryText2: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: colors.muted, 
    marginBottom: 5,
  },
});
