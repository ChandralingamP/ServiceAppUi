import React from "react";
import { Pressable,Image,Text } from "react-native";


export const ServiceCard = ({ service, NavTo }) => {
  return (
    <Pressable
      onPress={() => NavTo(service.type)}
      style={{
        width: "32.5%",
        backgroundColor: "gray",
        display: "flex",
        marginVertical: 5,
        height: 130,
        borderRadius: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={service.imgPath}
        style={{ width: "90%", height: 100, alignItems: "center" }}
      ></Image>
      <Text style={{ textAlign: "center", fontWeight: 600 }}>
        {service.type} Service
      </Text>
    </Pressable>
  );
};
