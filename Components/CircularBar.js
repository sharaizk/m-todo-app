import React from "react";

import { View, StyleSheet, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";
const CircularBar = ({ complete, incomplete }) => {
  const total = complete + incomplete;
  const percentage = Math.ceil((complete / total) * 100);

  return (
    <View style={styles.container}>
      <ProgressCircle
        percent={percentage}
        radius={100}
        borderWidth={20}
        color="#209046"
        shadowColor="#bcd6c5"
        bgColor="#fff"
        outerCircleStyle={styles.outerCircle}
      >
        <Text style={{ fontSize: 18 }}>{`${percentage}% Completed`}</Text>
      </ProgressCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

  },
  outerCircle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 9,
  },
});

export default CircularBar;
