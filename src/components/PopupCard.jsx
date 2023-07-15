import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";

import { put } from "../services/WebServices";
import { useGlobalContext } from "../context/GlobalContext";
const PopupCard = ({
  isPopupVisible,
  orderId,
  updateNewOrdersData,
  togglePopup,
}) => {
  const { updateAvailableProviderData } = useGlobalContext;
  const [providerId, setProviderId] = useState("");
  const post = async () => {
    console.log("kjn");
    const data = await put("orders/update/provider-id/", {
      orderId: orderId,
      providerId: providerId,
    });
    console.log(data);
    if (data) {
      updateAvailableProviderData(providerId);
      updateNewOrdersData(orderId);
      togglePopup();
    }
  };
  const submit = () => {
    post();
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={isPopupVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={togglePopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popupCard}>
            <TextInput
              style={{ borderColor: "black", borderBottomWidth: 2, height: 45 }}
              onChangeText={(id) => setProviderId(id)}
              placeholder="Service Provider Id"
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={togglePopup}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={submit}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  openButton: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupCard: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    width: 300,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: "red",
    textAlign: "right",
  },
  submitButton: {
    fontSize: 16,
    color: "green",
    textAlign: "right",
  },
});

export default PopupCard;
