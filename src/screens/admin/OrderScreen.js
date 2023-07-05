import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderStack from '../../navigation/admin/OrderStack';
const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
      }}
    >
      <Text style={{
        fontSize: 30, marginTop: 7, fontWeight: 700,
        paddingHorizontal: "3%",
      }}>Orders</Text>
      <OrderStack />
    </View>
  );
}

export default OrderScreen