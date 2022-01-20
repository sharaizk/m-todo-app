import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Modal, Portal, Provider } from "react-native-paper";

const ImageModal = ({ showModal, setShowModal, image }) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={styles.containerStyle}
        >
          <Image
            style={styles.profileImg}
            source={{
              uri: `${image}`,
            }}
          />
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor:'rgba(252, 252, 252,0.15)',
    height: "60%",
    margin: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex:1
  },
  profileImg: {
    height: '95%',
    width: '90%',
  },
});

export default ImageModal;
