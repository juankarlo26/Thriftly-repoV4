import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/Thriftly_logo.png";
import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import InternetConnectionAlert from "react-native-internet-connection-alert";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
    name: name,
    userType: "USER",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //method to post the user data to server for user signup using API call
  const signUpHandle = () => {
    if (email == "") {
      return setError("Please enter your email");
    }
    if (name == "") {
      return setError("Please enter your name");
    }
    if (password == "") {
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      return setError("Email is too short");
    }
    if (password.length < 5) {
      return setError("Password must be 6 characters long");
    }
    if (password != confirmPassword) {
      return setError("password does not match");
    }
    fetch(network.serverip + "/register", requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data["email"] == email) {
          navigation.navigate("login");
        }
      })
      .catch((error) => console.log("error", setError(error.message)));
  };
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar></StatusBar>
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
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View style={styles.welconeContainer}>
            <Image style={styles.logo} source={header_logo} />
          </View>
          <View style={styles.screenNameContainer}>
            <View>
              <Text style={styles.primaryText}>Sign up</Text>
            </View>
            <View>
              <Text style={styles.primaryText2}>
                Signup for an account for great shopping
              </Text>
            </View>
            
          </View>
          <View style={styles.formContainer}>
          <View style={styles.division}></View>
            <CustomAlert message={error} type={"error"} />
            <CustomInput
              value={name}
              setValue={setName}
              placeholder={"Name"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
            <CustomInput
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry={true}
              placeholder={"Confirm Password"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Sign up"} onPress={signUpHandle} />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.primaryText3}>Already have an account?</Text>
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.signupText}
          >
            Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
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
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 60,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 3,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.primary, 
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
  primaryText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  primaryText2: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.muted, 
  },
  primaryText3: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.black, 
  },
  division: {
    width: "20%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "1%",
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginVertical: 20,
    // padding:15
  },
});
