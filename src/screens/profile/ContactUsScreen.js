import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ContactUsScreen = () => {
  const insets = useSafeAreaInsets();
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
      <Text>ContactUsScreen</Text>
    </View>
  );
};

export default ContactUsScreen;
