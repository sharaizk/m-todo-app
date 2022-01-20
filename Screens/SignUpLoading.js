import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
const SignUpLoading = () => {
  return (
    <View style={{height: '100%'}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal:10 }}>
        <LottieView
          source={require("../assets/Signup-animation.json")}
          autoPlay
          loop={false}
        />
      </View>
    </View>
  );
};

export default SignUpLoading;
