import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {expo} from '../app.json'
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { signOut } from "../redux/actions";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Divider
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
const DrawerContent = (props) => {
  const { navigation, forSignOut, userData } = props;

  const RenderInfo = ()=>{
    const{profileimg} = userData
    return(
      <View style={styles.userInfoSection}>
      <View >
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{ flexDirection: "row", marginTop: 15 }}>
        <Avatar.Image
          source={{
            uri: `${profileimg}`,
          }}
          size={100}
        />
          <View style={{ marginLeft: 15, flexDirection: "column" }}>
            <Title style={styles.title}>{userData.name}</Title>
            <Caption style={styles.caption}>{userData.username}</Caption>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {userData ? <RenderInfo />: null}
          <Divider />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <AntDesign name="home" size={20} color="#e2e2e2" />}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={() => (
                <AntDesign name="clockcircleo" size={20} color="#e2e2e2" />
              )}
              label="History"
              onPress={() => {
                navigation.navigate("History");
              }}
            />
            <DrawerItem
              icon={() => <AntDesign name="user" size={20} color="#e2e2e2" />}
              label="Profile"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons name="alert-sharp" size={20} color="#e2e2e2" />
              )}
              label="Report"
              onPress={() => {
                navigation.navigate("Report");
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <TouchableRipple>
              <Text style={styles.appInfo}>CUE</Text>
            </TouchableRipple>
          </Drawer.Section>
          <View style={styles.version}>
            <Caption style={styles.versionInfo}>{`Version: ${expo.version}`}</Caption>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <AntDesign name="logout" size={20} color="#e2e2e2" />}
          label="Sign Out"
          onPress={forSignOut}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  appInfo: {
    textAlign: "center",
    fontSize: 48,
    marginBottom: 15,
    color: "#432344",
    letterSpacing: 15,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom:5
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  version: {
    height: 100,
    width: "auto",
    marginTop: 50,
  },
  versionInfo: {
    textAlign: "center",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    forSignOut: () => dispatch(signOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
