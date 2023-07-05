
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { put } from "../../services/WebServices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [newEmail, setNewEmail] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState(0);
  const [newName, setNewName] = useState(null);
  const [id, setId] = useState(null);
  const initialize = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userData'));
    setNewEmail(data.customerEmail);
    setNewPhoneNumber(data.customerPhoneNumber);
    setNewName(data.customerName); 
    setId(data.customerId);
  }
  const updateStorage = async ()=>{
    const data = JSON.parse(await AsyncStorage.getItem('userData'));
    data.customerName = newName;
    data.customerPhoneNumber = newPhoneNumber;
    data.customerEmail = newEmail;
    AsyncStorage.setItem('userData',JSON.stringify(data));
    console.log(data);
  }
  const fetchId = async() =>{
    const data = JSON.parse(await AsyncStorage.getItem('userData'));
    setId(data.customerId);
    if(id){
      UpdateCustomerDetails();
    }
  }
  const UpdateCustomerDetails = async () => {
    if (id) {
      const d = await put('customer/edit-profile/', { id: id, email: newEmail, phone: newPhoneNumber, name: newName });
      console.log(d);
      if(d.affectedRows == 1){
        console.log("storage updation");
        updateStorage();
      }
    } else {
      fetchId();
    }
  }
  useEffect(() => {
    initialize();
  }, [])
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
        paddingHorizontal: "3%",
      }}
    >
      <View style={styles.profile}>
        <Text
          style={{ fontSize: 28, fontWeight: 'bold' }}>Edit Profile Data</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={newName}
          onChangeText={(newName) => setNewName(newName)}
        />
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={newPhoneNumber}
          placeholder=" Enter Phone Number"
          onChangeText={(newPhoneNumber) => setNewPhoneNumber(newPhoneNumber)}
        />
        <TextInput
          style={styles.input}
          keyboardType='text'
          value={newEmail}
          placeholder="enter mail id"
          onChangeText={(newEmail) => setNewEmail(newEmail)}
        />
        <View style={{ width: '40%', alignContent: 'center', marginHorizontal: '30%', marginTop: '2%' }}>
          <Button onPress={()=>UpdateCustomerDetails()} title="submit" style={styles.button} />
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 220,
    borderRadius: 7,
  },
  profile: {
    marginTop: 10,
  },
  content: {
    marginTop: "30%",
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProfileScreen;