import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

const Field = ({ type, secureTextEntry, value, textChange, namee }) => {
  // value={username} onChangeText={(text)=>setUsername(text)}
  const changeText = (e)=>{
  const value = e.nativeEvent.text
  textChange(value)
  }
  return (

    <>
      <Text style={styles.fieldLabel}>{type}</Text>
      {secureTextEntry ? (
        <TextInput
          name={namee}
          value={value}
          style={styles.fieldInput}
          placeholder={type}
          secureTextEntry={true}
          onChange={(e)=>changeText(e)}
        />
      ) : (
        <TextInput name={namee} style={styles.fieldInput} value={value} placeholder={type} onChange={(e)=>changeText(e)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fieldInput: {
    width: 350,
    height: 65,
    fontSize: 18,
    letterSpacing: 0.56,
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
  fieldLabel: {
    fontSize: 22,
    marginBottom: 20,
    marginTop: 10,
    fontFamily:'segoeUI'
  },
});

export default Field;
