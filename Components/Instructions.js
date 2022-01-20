import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Caption } from "react-native-paper";

const Instructions = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.bullet}>{"\u2022"}</Text>
        <Caption>Please Report a Bug if you find one</Caption>
      </View>

      <View style={styles.container}>
        <Text style={styles.bullet}>{"\u2022"}</Text>
        <Caption>Your report will be transfered to Developing Team</Caption>
      </View>

      <View style={styles.container}>
        <Text style={styles.bullet}>{"\u2022"}</Text>
        <Caption>Your personal data will not be revealed</Caption>
      </View>

      <View style={styles.container}>
        <Text style={styles.bullet}>{"\u2022"}</Text>
        <Caption>Work On!</Caption>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  container: {
    flexDirection: "row",
  },
  bullet: {
    fontSize: 20,
    marginRight: 15,
    color: "#757575",
  },
});

export default Instructions;
