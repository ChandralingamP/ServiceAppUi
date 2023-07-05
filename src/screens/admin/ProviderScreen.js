import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProviderStack from '../../navigation/admin/ProviderStack';
const ProviderScreen = () => {
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
      }}>Providers</Text>
      <ProviderStack />
    </View>
  );
}

export default ProviderScreen