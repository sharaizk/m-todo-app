import React, {useEffect, useState } from "react";

import { View, StyleSheet, Platform, Image } from "react-native";
import { Avatar, IconButton, Colors } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";
const ImageUpload = ({setProfilePic, selectedImage, setSelectedImage}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      aspect:[4,3],
      base64: true
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri)
      await setProfilePic(result)
      
    };
  }

    return (
      <View style={styles.imgUpld}>
        <Avatar.Image
          source={{
            uri: selectedImage,
          }}
          size={100}
        />
        <IconButton
          icon="upload"
          color={Colors.grey500}
          style={styles.imgIcon}
          size={25}
          onPress={PickImage}
        />
      </View>
    );
  };



const styles = StyleSheet.create({
  imgUpld: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  imgIcon: {
    position: "absolute",
    bottom: -15,
    right: 120,
    backgroundColor: "#FFF",
  },
});

export default ImageUpload;
