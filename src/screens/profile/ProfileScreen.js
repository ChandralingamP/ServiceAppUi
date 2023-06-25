import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { profileMenu } from "../../utils/ProfileMenu";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useServiceContext } from "../../context/ServiceContext";
export default function ProfileScreen({ navigation }) {
  const { hi } = useServiceContext;
  const insets = useSafeAreaInsets();
  const navigateTo = (screen) => {
    if (screen == "delete") {
      console.log("delete me");
    } else if (screen == "logout") {
      console.log("logout dude");
    } else {
      navigation.navigate(screen);
    }
  };
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
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        Profile {hi} gyu
      </Text>
      <ProfileCard />
      <View
        style={{
          marginTop: 15,
          marginBottom: 3,
          marginLeft: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigateTo("EditProfileScreen")}>
          <FontAwesome name="edit" size={28} color="black" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}>
          Edit Your Profile
        </Text>
      </View>
      <ScrollView>
        {profileMenu.map((item, key) => {
          return (
            <MenuBar key={key} item={item} navigateTo={navigateTo}></MenuBar>
          );
        })}
      </ScrollView>
    </View>
  );
}

const ProfileCard = () => {
  return (
    <View style={styles.main}>
      <View style={styles.main1}>
        <Text style={{ fontSize: 25, fontWeight: 600, color: "white" }}>
          Chandralingam
        </Text>
        <Text style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
          9874563210
        </Text>
        <Text style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
          Emailid@gmail.com
        </Text>
      </View>
      <View style={styles.main2}>
        <Image
          source={require("../../assets/Avatar.png")}
          style={{ width: "100%", height: "100%" }}
        ></Image>
        {/* <Ionicons name="person-circle" size={size} color={color} /> */}
      </View>
    </View>
  );
};

const MenuBar = ({ item, navigateTo }) => {
  console.log(item);
  return (
    <View style={styles.bar}>
      <Pressable
        onPress={() => navigateTo(item.screen)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "400",
            paddingVertical: 17,
            fontSize: 20,
          }}
        >
          {item?.menu}
        </Text>
        <Icon name="chevron-right" size={20} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "gray",
    flexDirection: "row",
    marginTop: "2%",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: "15%",
  },
  main1: {
    width: "60%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  main2: {
    width: "40%",
    paddingLeft: "15%",
  },
  sub: {
    marginTop: -20,
  },
  scroll: {
    width: "98%",
    backgroundColor: "white",
    flexDirection: "column",
    marginHorizontal: "1%",
    marginTop: "2%",
    height: "500%",
  },
  bar: {
    width: "100%",
    marginTop: 8,

    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "gray",
    justifyContent: "center",
  },
});
