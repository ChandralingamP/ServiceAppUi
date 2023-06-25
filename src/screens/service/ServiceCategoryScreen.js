import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "../../services/WebServices";
import { ServiceCard } from "../../components/SingleServiceCard";
import { useGlobalContext } from "../../context/GlobalContext";
const ServiceCategoryScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { tester } = useGlobalContext();
  const [category, setCategory] = useState("AC");
  const [flag, setFlag] = useState(false);
  const [serviceCategoryData, setServiceCategoryData] = useState("");
  const getServiceCategoryData = async (category) => {
    try {
      const data = await get("services/details/" + category);
      setServiceCategoryData(data);
      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };
  const NavTo = (params) => {
    navigation.navigate('SingleServiceScreen',{serviceId : params});
  };
  const cat = route?.params?.category;
  console.log(cat);
  useEffect(() => {
    setFlag(false);
    if (category) {
      if (cat) {
        if (category == cat) {
          getServiceCategoryData(category);
        } else {
          setCategory(route?.params?.category);
        }
      }
    } else {
      setCategory(route?.params?.category);
    }
  }, [category, cat]);
  if (flag) {
    return (
      <ScrollView
        style={{
          flex: 1,
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
        }}
      >
        <View
          style={{
            fontSize: 24,
            fontWeight: 600,
            paddingTop: 10,
            paddingBottom: 7,
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: 600, paddingHorizontal: "3%" }}
          >
            {category} Services
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingHorizontal: "3%",
          }}
        >
          {serviceCategoryData?.map((service) => {
            return (
              <ServiceCard
                key={service.serviceId}
                service={service}
                NavTo={NavTo}
              ></ServiceCard>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading {tester}</Text>
      </View>
    );
  }
};

export default ServiceCategoryScreen;
