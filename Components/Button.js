import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({type, action}) => {
  return (
    <TouchableOpacity style={styles.fieldBtn} onPress={()=>action()}>
      <Text>{type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    fieldBtn: {
        marginTop: 10,
        width: 125,
        height: 55,
        backgroundColor: "#FFC03D",
        alignSelf: "center",
        display: "flex",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }
})

export default Button;
