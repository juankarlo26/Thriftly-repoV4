import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const sendInstructionsHandle = () => {
  //TODO: handle user verfication and mail password reset link
};

const ForgetPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.TopBarContainer}>
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
      </View>
      <View style={styles.division}></View>
      <View style={styles.screenNameContainer}>
        
        <View>
          <Text style={styles.primaryText}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.primaryText2}>
            Enter the account's email. Instruction of the password update will be send for the following moments.
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomInput 
        placeholder={"Enter your Email Address"} 
        radius={15}/>
      </View>
      <CustomButton
        text={"Send email"}
        onPress={sendInstructionsHandle}
        radius={5}
      />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
  },
  primaryText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  primaryText2: {
    fontSize: 15,
    fontWeight: "normal",
    color: colors.muted, 
  },
  division: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "1%",
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginVertical: 20,
    // padding:15
  },
});
