import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Head from "../Components/Header";
import { Avatar, Surface, Title, Caption } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons'; 
import ImageModal from "../Components/ImageModal";
import ProfileScreenLinks from "../Components/ProfileScreenLinks";

import { connect } from "react-redux";
const ProfileScreen = ({ navigation, userData }) => {
  if (userData) {
    const [showModal, setShowModal] = useState(false);

    const { profileimg } = userData;
    return (
      <View style={styles.container}>
        <View>
          <Head navigation={navigation} title="Profile" />
        </View>
        <View style={styles.body}>
          <View style={styles.picBody}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Avatar.Image
                source={{
                  uri: `${profileimg}`,
                }}
                size={150}
                style={styles.profileImg}
              />
            </TouchableOpacity>
          </View>
           <ProfileScreenLinks userData={userData.username} iconName={'user'} textLabel={"Username:"} color="#EA4B3B"/>
           <ProfileScreenLinks iconName={'key'} textLabel={"Password"} color="#ff9d00"  navigateTo="PasswordScreen" navigation={navigation}/>
        </View>
        <ImageModal
          showModal={showModal}
          setShowModal={setShowModal}
          image={profileimg}
        />
      </View>
    );
  } else {
    return <Text>Profile</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  picBody: {
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    backgroundColor: "#FFF",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userInfo:{
    width:'100%'
  },
  surface: {
    padding: 8,
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-between',
    zIndex:-1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 10,
    backgroundColor:'#FFF'
  }
});

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
