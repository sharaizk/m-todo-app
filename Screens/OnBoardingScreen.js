import React from "react";
import {View, Image, StyleSheet,TouchableOpacity, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnBoardScreen = ({navigation}) => {

  const Dots = ({selected}) =>{
    let backgroundColor
    let width
    backgroundColor=selected ?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.3)'
    width=selected ? 15 : 7.5
    return(
      <View
      style={{
        width:width,
        height:7.5,
        marginHorizontal:3,
        borderRadius:50,
        backgroundColor: backgroundColor
      }}
      >
      </View>
    )
  }

  const Skip = ({...props})=>{
    return(
      <TouchableOpacity style={styles.skipBtn} {...props}>
        <Text style={styles.btnFont}>Skip</Text>
      </TouchableOpacity>
    )
  }
  const Next =({...props})=>{
    return(
      <TouchableOpacity style={styles.skipBtn} {...props}>
      <Text style={styles.btnFont}>Next</Text>
    </TouchableOpacity>
    )
  }
  const Done =({...props})=>{
    return(
      <TouchableOpacity style={styles.skipBtn} {...props}>
      <Text style={styles.btnFont}>Finish</Text>
    </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={()=>navigation.replace('SignIn')}
        onDone={()=>navigation.replace('SignIn')}
        pages={[
          {
            backgroundColor: "#FFC03D",
            image: (
              <Image
                style={styles.img}
                source={require("../assets/onBoard.png")}
              />
            ),
            title: "Welcome",
            subtitle: "Create tasks and stay on schedule",
          },
          {
            backgroundColor: "#432344",
            image: (
              <Image
                style={styles.img2}
                source={require("../assets/onBoard1.png")}
              />
            ),
            title: "O T G",
            subtitle: "Perform and update tasks on the go",
          },
          {
            backgroundColor: "#FFC03D",
            image: (
              <Image
                style={styles.img3}
                source={require("../assets/onBoard2.png")}
              />
            ),
            title: "History",
            subtitle: "Keep an eye on the performed tasks",
          },
          {
            backgroundColor: "#7047EB",
            image: (
              <Image
                style={styles.img3}
                source={require("../assets/onBoard3.png")}
              />
            ),
            title: "Personalization",
            subtitle: "Personalize your settings as you want",
          }
        ]}
      />
      </View>

  );
};

const styles = StyleSheet.create({
  container:{
    height:'100%'
  },
  img: {
    height: 220,
    width: 300,
  },
  img2: {
    height: 200,
    width: 200,
  },
  img3: {
    height: 200,
    width: 250,
  },
  skipBtn:{
    padding:10,
  },
  btnFont:{
    fontFamily: "segoeUIBold",
    color:'#FFF'
  }
});

export default OnBoardScreen;
