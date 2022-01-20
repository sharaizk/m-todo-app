import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import HeaderMenu from "./DrawerMenu";
import { ScreenHeight } from "react-native-elements/dist/helpers";
const Head = ({ navigation, title, navBtn }) => {
  const Teext = () => {
    return <Text style={styles.headerText}>{title}</Text>;
  };

  const BackBtn = () => {
    return (
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back" style={styles.bckBtn}/>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      <Header
        backgroundColor={"#432344"}
        leftComponent={
          !navBtn ? <HeaderMenu navigation={navigation} /> : <BackBtn />
        }
        centerComponent={<Teext />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 44,
    color: "#FFFFFF",
    fontFamily:'segoeUI'
  },
  bckBtn:{
      paddingTop:ScreenHeight/90,
      fontSize: 38,
      color:'#FFFF'
  }
});

export default Head;
