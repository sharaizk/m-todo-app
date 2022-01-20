import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

const LoadingButton = ({type, onSignIn, loading, setLoading }) => {

  const onClick = async () => {
    setLoading(true);
    await onSignIn()
  };

  return (
    <TouchableOpacity style={styles.fieldBtn} onPress={onClick}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#FFF"} animating={loading} />
      ) : (
        <Text style={{ color: "#FFF" }}>{type}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fieldBtn: {
    marginTop: 65,
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
  },
});

export default LoadingButton;
