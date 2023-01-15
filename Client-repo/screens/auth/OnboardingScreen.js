import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { colors, network } from "../../constants";
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  
  const Next = ({...props}) =>(
    <TouchableOpacity 
      style={styles.nextButton}
      {...props}
       >
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );
  const Skip = ({...props}) =>(
  <TouchableOpacity 
    style={styles.skipButton}
    {...props}
     >
    <Text style={styles.skipButtonText}>Skip</Text>
  </TouchableOpacity>
   );

  return (
    <Onboarding
    NextButtonComponent={Next}
    SkipButtonComponent = {Skip}
    // DotComponent = {Dot}
    
    // navigation
    onSkip={() => navigation.replace("login")}
    onDone={() => navigation.navigate("login")}
    
    //component styles
    titleStyles=  {{
      fontSize: 30,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 10,
      padding: 10,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      
    }}
    subTitleStyles=  {{
      fontSize: 15,
      fontFamily: 'Montserrat-Medium',
      marginBottom: 10,
      padding: 10,
    }}
    pages={[
      {
        backgroundColor: colors.primary,
        image: <Image source={require('../../assets/onboarding/onboard_1.png')} style={styles.onboardImage} />,
        title: 'Welcome',
        subtitle: 'Welcome !Thriftly the worlds best E -commerce  ',
      },
      {
        backgroundColor: colors.white,
        image: <Image source={require('../../assets/onboarding/onboard_3.png')} style={styles.onboardImage}/>,
        title: 'The Hive',
        subtitle: 'Created and developed by The Hive, software Dev Team based in the Philippines',
      },
      {
        backgroundColor: colors.black,
        image: <Image source={require('../../assets/onboarding/onboard_2.png')} style={styles.onboardImage}/>,
        title: 'Discover',
        subtitle: 'Discover and make the best out of your budget enjoy Thriftly!',
      },

      
    ]}
/>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
 
  onboardImage: {
    resizeMode: "contain",
    width: 250,
    height: 300,
    // backgroundColor: colors.black,
  },
  DotButton: {
    // resizeMode: "contain",
    width: 6,
    height: 6,
    marginHorizontal: 3,
    // backgroundColor: colors.black,
  },
  nextButton: {
    marginHorizontal: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 12,
    backgroundColor: colors.black,
    width: "50%",
  },
  skipButton: {
    marginHorizontal: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    padding: 12,
    // backgroundColor: colors.black,
    width: "50%",
  },
  nextButtonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  skipButtonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  
  
});
