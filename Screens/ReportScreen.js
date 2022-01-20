import React,{useState} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { Title} from "react-native-paper";
import email from 'react-native-email'

import Head from "../Components/Header";
import Instructions from "../Components/Instructions";

const ReportScreen = ({ navigation }) => {

  const [report, setReport] = useState(null)

  const handleEmail = () => {
    if(report){
      const to = ['SharaizKhan78@gmail.com'] // string or array of email addresses
      email(to, {
          // Optional additional arguments
          // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
          // bcc: 'mee@mee.com', // string or array of email addresses
          subject: 'Bug Report',
          body: report
      }).catch(console.error)
      setReport(null)
    }
    else{
      alert('Please write down the error')
    }
}

  return (
    <ScrollView style={styles.container}>
      <View>
        <Head navigation={navigation} title="Report" />
      </View>
      <View style={styles.mainContainer}>
        <Title>Report a Bug</Title>
        <View>
        <Instructions />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTextWrapper}
          >
            <TextInput value={report} onChangeText={(text)=>setReport(text)} name="NewTask" style={styles.input} placeholder="Write down the error"/>
            <TouchableOpacity onPress={handleEmail} style={styles.submit}>
              <Text style={styles.submitText}>Submit Report</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flexDirection:'column',
    display:'flex',
    height:ScreenHeight - (ScreenHeight/2.5),
    justifyContent:'space-between',
    alignItems: "center"
  },
  writeTextWrapper:{
    marginTop:10
  },
  input: {
    padding: 15,
    height: 60,
    width: 300,
    borderWidth: 2.5,
    backgroundColor: "#E7EEFB",
    borderRadius: 10,
    borderColor: "#FFF",
    shadowColor: "#000",
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  submit:{
    alignSelf:'center',
    backgroundColor: "#FF3A31",
    width: 125,
    height:50,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#FFF',
    justifyContent:'center',
    alignSelf:'center',
    shadowColor: "#000",
    marginVertical:10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  submitText:{
    paddingLeft:15,
    color:'#FFF'
  }

});

export default ReportScreen;
