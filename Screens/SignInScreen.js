import React,{useState, useEffect,useRef} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";

import LoadingButton from "../Components/LoadingButton";
// REDUX CONNECTIVITY
import {connect} from 'react-redux'
import {signIn, tryLocalSignin} from '../redux/actions'
const SignInScreen = ({ navigation, forSigninIn, forLocalSignIn }) => {
  
  const idRef = useRef();
  
  useEffect(() => {
    forLocalSignIn()
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(idRef.current);
    };
  }, [])

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSignIn = () =>{
    const formValues = {username,password}
    forSigninIn(formValues)
    setUsername(null)
    setPassword(null)
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 3000);
    idRef.current = timer1;
  }
  return (
  <SafeAreaView style={styles.safe}>
    <ScrollView  contentContainerStyle={styles.container} fadingEdgeLength={250} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.header}>Sign In</Text>
        <KeyboardAvoidingView style={styles.fields}>
          <Text style={styles.fieldLabel}>Username</Text>
          <TextInput style={styles.fieldInput} placeholder="Username" value={username} onChangeText={(text)=>setUsername(text)}/>
          <Text style={styles.fieldLabel2}>Password</Text>
          <TextInput style={styles.fieldInput} placeholder="Password" value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
          <LoadingButton onSignIn={onSignIn} type="Sign In" loading={loading} setLoading={setLoading}/>
          <TouchableOpacity style={styles.toSignUp}
            onPress={()=>navigation.push('SignUp')}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                letterSpacing: 0.56,
                color: "#7E7E7E",
                
              }}
            >
              Create a new account
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F8F8",
    
  },
  safe:{
    flex:1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  form: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 66,
    textAlign: "center",
    fontWeight: "100",
    color:'#2E2E2E',
    fontFamily:'segoeUIBold'
  },
  fields: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  fieldLabel: {
    fontSize: 26,
    marginBottom: 20,
    fontFamily:'segoeUI'  
  },
  fieldLabel2: {
    fontSize: 26,
    marginVertical: 20,
    fontFamily:'segoeUI'
  },
  fieldInput: {
    width: 350,
    height: 65,
    fontSize:18,
    letterSpacing:0.56,
    borderWidth: 1,
    borderColor: "#FFF",
    backgroundColor: "#E7EEFB",
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    fontFamily:'segoeUI'
  },
  toSignUp: {
    marginTop: 20,
    
  },
});


function mapDispatchToProps(dispatch) {
  return {
    forSigninIn: (formValues) => dispatch(signIn(formValues)),
    forLocalSignIn: () => dispatch(tryLocalSignin())
  }
 }

export default connect(null, mapDispatchToProps)(SignInScreen);
