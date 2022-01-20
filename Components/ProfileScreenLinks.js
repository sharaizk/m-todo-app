import React from "react";

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreenLinks = ({ userData, iconName, textLabel, color, navigateTo, navigation }) => {

    const renderWithNav = ()=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate(navigateTo)}>
            <Surface style={styles.surface}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name={iconName} 
                style={
                    {
                        backgroundColor: `${color}`,
                        fontSize: 24,
                        height: 30,
                        width: 30,
                        color: "#FFF",
                        textAlign: "center",
                        textAlignVertical: "center",
                        marginRight: 10,
                        borderRadius: 10,
                    }
                    } />
                <Text style={styles.textLabel}>{textLabel}</Text>
                {userData ? <Text style={styles.textType}>{userData}</Text> : null}
              </View>
              <AntDesign name="right" style={styles.icon} />
            </Surface>
          </TouchableOpacity>
        )
    }
    const renderWithoutNav = () =>{
        return(
            <Surface style={styles.surface}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name={iconName} 
              style={
                  {
                      backgroundColor: `${color}`,
                      fontSize: 24,
                      height: 30,
                      width: 30,
                      color: "#FFF",
                      textAlign: "center",
                      textAlignVertical: "center",
                      marginRight: 10,
                      borderRadius: 10,
                  }
                  } />
              <Text style={styles.textLabel}>{textLabel}</Text>
              {userData ? <Text style={styles.textType}>{userData}</Text> : null}
            </View>

          </Surface>
        )
    }

  return (
    <View style={styles.userInfo}>
    {navigateTo ? renderWithNav() : renderWithoutNav()}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    width: "100%",
  },
  surface: {
    borderRadius: 4,
    padding: 8,
    height: 80,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
  },
  textLabel: {
    fontSize: 16,
    fontFamily:'segoeUIBold'
  },
  textType: {
    fontSize: 18,
    color: "#7a7a7a",
    fontFamily:'segoeUI'
  },
  userIcon: {
    fontSize: 24,
    height: 30,
    width: 30,
    color: "#FFF",
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  icon: {
    color: "#7047EB",
    fontSize: 24,

  },
});

export default ProfileScreenLinks;
