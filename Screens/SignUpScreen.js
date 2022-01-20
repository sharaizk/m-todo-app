import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from "react-native";

import validator from "validator";
import ImageUpload from "../Components/Imageupload";
import Field from "../Components/Fields";
import Button from "../Components/Button";
import TextButton from "../Components/TextButton";

import { connect } from "react-redux";
import { signUp } from "../redux/actions";

const SignUpScreen = ({ navigation, forSignUp }) => {
  const [selectedImage, setSelectedImage] = useState("https://image.flaticon.com/icons/png/512/145/145843.png") 

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [profileImg, setProfileImg] = useState({})

  const setProfilePic = (profileUri) =>{
    setSelectedImage(profileUri.uri)
    setProfileImg(profileUri)
  }

  const OnSignUp = () => {
    if (
      name !== null &&
      email !== null &&
      username !== null &&
      password !== null &&
      profileImg.uri
    ) {
      if (validator.isEmail(email)) {
        forSignUp(name, email, username, password, profileImg, navigation)
      } else {
        alert("Invalid Email");
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
        <ScrollView  contentContainerStyle={styles.container} fadingEdgeLength={250} showsVerticalScrollIndicator={false} >
      <View style={styles.form}>
        <Text style={styles.header}>Sign Up</Text>
        <KeyboardAvoidingView style={styles.fields}>
          <Field
            type="Name"
            namee="name"
            value={name}
            textChange={setName}
          />
          <Field
            type="Email"
            namee="email"
            value={email}
            textChange={setEmail}
          />
          <Field
            type="Username"
            namee="username"
            value={username}
            textChange={setUserName}
          />
          <Field
            type="Password"
            namee="password"
            secureTextEntry={true}
            value={password}
            textChange={setPassword}
          />
          <ImageUpload setProfilePic = {setProfilePic} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
          <Button type="Sign Up" action={OnSignUp} />
          <TextButton
            hint="Already one of Us?"
            navigate={() => navigation.push("SignIn")}
          />
        </KeyboardAvoidingView>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:{
    flex:1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F8F8", 
  },
  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 66,
    textAlign: "center",
    color: "#2E2E2E",
    fontFamily: "segoeUIBold",
  },
  fields: {
    marginHorizontal: 20,
    marginTop: 5,
  },

});

function mapDispatchToProps(dispatch) {
  return {
    forSignUp: (name, email, username, password, profileImg, navigation) =>
      dispatch(signUp(name, email, username, password, profileImg, navigation)),
  };
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
