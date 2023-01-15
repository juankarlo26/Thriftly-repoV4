import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/Thriftly_logo.png";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);

  //method to store the authUser to aync storage
  _storeData = async (user) => {
    try {
      AsyncStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const loginHandle = () => {
    setIsloading(true);
    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (password == "") {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    // length of password must be greater than 5 characters
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be 6 characters long");
    }
    //[check validation] -- End

    fetch(network.serverip + "/login", requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        if (
          result.status == 200 ||
          (result.status == 1 && result.success != false)
        ) {
          if (result?.data?.userType == "ADMIN") {
            //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
            _storeData(result.data);
            setIsloading(false);
            navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
          } else {
            _storeData(result.data);
            setIsloading(false);
            navigation.replace("tab", { user: result.data }); // naviagte to User Dashboard
          }
        } else {
          setIsloading(false);
          return setError(result.message);
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log("error", setError(error.message));
      });
  };

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <ProgressDialog visible={isloading} label={"Login ..."} />
          <StatusBar></StatusBar>
          
          <View style={styles.welconeContainer}>
            {/* <View>
              <Text style={styles.welcomeText}>Welcome to Thriftly</Text>
              <Text style={styles.welcomeParagraph}>
                make your ecommerce easy
              </Text>
            </View> */}
            <View>
              <Image style={styles.logo} source={header_logo} />
            </View>
          </View>
          
          {/* <View style={styles.screenNameContainer}>
            <Text style={styles.screenNameText}>Login</Text>
          </View> */}
          
          <View style={styles.formContainer}>
            
            <View style={styles.greetContainer}>
              <Text style={styles.primaryText}>Login</Text>
              <Text style={styles.primaryText2}> Login to continue shopping</Text>
              
            </View>
            <View style={styles.division}></View>

            <View style={styles.inputTextContainer}>
              <Text style={styles.primaryText3}>
                E-mail
              </Text>
            </View>
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"test@mail.com"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
            <View style={styles.inputTextContainer}>
              <Text style={styles.primaryText3}>
                Password
              </Text>
            </View>
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"*****"}
              placeholderTextColor={colors.muted}
              radius={15}
            />
            <View style={styles.inputTextContainer}>
              <Text
                onPress={() => navigation.navigate("forgetpassword")}
                style={styles.primaryText2}
              >
                Forget Password?
              </Text>
            </View>
            <CustomAlert message={error} type={"error"} />
          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Login"} onPress={loginHandle} />
          {/* <CustomButton text={"Signup"}  onPress={() => navigation.navigate("signup")} style={styles.backgroundColor} /> */}
          {/* <View style={styles.division}></View> */}
          <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate("signup")}>
          <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.bottomContainer}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("signup")}
            style={styles.signupText}
          >
            Signup
          </Text>
        </View> */}
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: colors.primary,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
    paddingHorizontal:25,
    // backgroundColor: colors.primary,
    // marginBottom: 10,
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    paddingHorizontal: 25,
    backgroundColor: colors.white,
    elevation: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 30,
  },
  greetContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    marginVertical: 30,
  },
  logo: {
    resizeMode: "contain",
    width: 60,
  },

  inputTextContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttomContainer: {
    display: "flex",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
  },
  bottomContainer: {
    marginTop: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
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
  buttonColor: {
    backgroundColor: colors.primary,
  },
  division: {
    width: "20%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "1%",
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginBottom: 10,
    // padding:15
  },
  detailButton: {
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    borderColor: colors.black,
    color: colors.muted,
    width: "100%",
    
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },

  
});
