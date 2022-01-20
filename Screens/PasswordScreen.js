import React, { useState, useEffect, useRef } from "react";
import Head from "../Components/Header";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import Field from "../Components/Fields";
import LoadingButton from "../Components/LoadingButton";
import { connect } from "react-redux";
import { changePass } from "../redux/actions";

const PasswordScreen = ({ navigation, forChangePass }) => {

  const idRef = useRef();

  const [oldpassword, setOldPassword] = useState('')
  const [newpassword,setNewPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onPassChange= async()=>{
      if(newpassword === cpassword){
          await forChangePass(oldpassword,newpassword,cpassword)
          setOldPassword('')
          setNewPassword('')
          setCPassword('')
          const timer1 = setTimeout(() => {
            setLoading(false);
          }, 3000);
          idRef.current = timer1;
      }
      else{
        alert("Passwords Do not match")
      }
  }

  useEffect(() => {
    const timeoutId = idRef.current;
    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Head title="Password" navBtn={true} navigation={navigation} />
      </View>
      <View style={styles.styleBody}>
        <Text style={styles.header}>Change Password</Text>
        <KeyboardAvoidingView style={styles.fields}>
          <Field
            type="Old Password"
            namee="oldpassword"
            secureTextEntry={true}
            value={oldpassword}
            textChange={setOldPassword}
          />
          <Field
            type="New Password"
            namee="newpassword"
            secureTextEntry={true}
            value={newpassword}
            textChange={setNewPassword}
          />
          <Field
            type="Confirm Password"
            namee="cpassword"
            secureTextEntry={true}
            value={cpassword}
            textChange={setCPassword}
          />
          <LoadingButton type="Change Password" onSignIn={onPassChange} loading={loading} setLoading={setLoading}/>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  styleBody: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  header: {
    fontSize: 40,
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
    forChangePass: (oldpassword,newpassword,cpassword) => dispatch(changePass(oldpassword,newpassword,cpassword)),
  };
}

export default connect(null, mapDispatchToProps)(PasswordScreen);
