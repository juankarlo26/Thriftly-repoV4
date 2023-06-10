import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { Ionicons } from "@expo/vector-icons";
import OptionList from "../../components/OptionList/OptionList";
import { colors } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = route.params;

  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  // covert  the user to Json object on initial render
  useEffect(() => {
    convertToJSON(user);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.topBarContainer}>
        {/* <TouchableOpacity>
          <Ionicons name="menu-sharp" size={30} color={colors.primary} />
        </TouchableOpacity> */}
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
        <Text style={styles.primaryText}>Account</Text>
        <Text style={styles.primaryText}></Text>
      </View>
      {/* <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Profile</Text>
      </View> */}
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          Icon={Ionicons}
          name={userInfo?.name}
          email={userInfo?.email}
        />
      </View>
      <View style={styles.OptionsContainer}>
        <OptionList
          text={"My Account"}
          Icon={Ionicons}
          iconName={"settings-outline"}
          onPress={() => navigation.navigate("myaccount", { user: userInfo })}
        />
        <OptionList
          text={"Wishlist"}
          Icon={Ionicons}
          iconName={"md-heart-outline"}
          onPress={() => navigation.navigate("mywishlist", { user: userInfo })}
        />
          <OptionList
          text={"About Us"}
          Icon={Ionicons}
          iconName={"information-circle-outline"}
          onPress={() => navigation.navigate("aboutus", { user: userInfo })}
        />
        {/* !For future use --- */}
        {/* <OptionList
          text={"Settings"}
          Icon={Ionicons}
          iconName={"settings-sharp"}
          onPress={() => console.log("working....")}
        />
        <OptionList
          text={"Help Center"}
          Icon={Ionicons}
          iconName={"help-circle"}
          onPress={() => console.log("working....")}
        /> */}
        {/* !For future use ---- End */}
        <OptionList
          text={"Logout"}
          Icon={Ionicons}
          iconName={"log-out-outline"}
          onPress={async () => {
            await AsyncStorage.removeItem("authUser");
            navigation.replace("login");
          }}
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  primaryText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
    
  },
  UserProfileCardContianer: {
    width: "100%",
    height: "30%",
    
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  OptionsContainer: {
    width: "100%",
    
  },
});
