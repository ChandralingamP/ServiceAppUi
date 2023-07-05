import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const AddressCard = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{address.customerAddressLine1}</Text>
      <Text style={styles.value}>{address.customerAddressLine2}</Text>
      <Text style={styles.value}>{address.customerLandMark}</Text>
      <Text style={styles.value}>{address.customerCity}</Text>
      <Text style={styles.value}>{address.customerPincode}</Text>
      <Text style={styles.value}>+91 {address.customerPhoneNumber}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    lineHeight:15,
    fontSize: 15,
    marginBottom: 5,
  },
});

export default AddressCard;
