import React from "react";
import { View, Text } from "react-native";
import Head from "../Components/Header";
const Settings = ({ navigation }) => {
  return (
    <View>
      <View>
        <Head navigation={navigation} title="Settings"/>
      </View>
    </View>
  );
};

export default Settings;
