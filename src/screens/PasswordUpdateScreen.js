import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PasswordUpdateScreen = () => {
    const insets = useSafeAreaInsets();
    const { verifyPassword, updateCustomerPassword, updateAdminPassword } = useGlobalContext();
    const [password, setPassword] = useState("");
    const [dupPassword, setDupPassword] = useState("");
    const updatePassword = async () => {
        if (!verifyPassword(customerPhoneNumber)) {
            return;
        }
        if (dupPassword != password) {
            Alert.alert("Enter your Password is Not Matching");
            return;
        }
        const isAdmin = await AsyncStorage.getItem('admin');
        if (isAdmin !== null) {
            updateAdminPassword(password);
        } else {
            updateCustomerPassword(password);
        }
    }
    return <View style={{
        flex: 1,
        justifyContent: "center",
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
        paddingHorizontal: "3%",
    }}>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
        />
        <TextInput
            style={styles.input}
            placeholder="Re-Enter Password"
            onChangeText={(dupPassword) => setDupPassword(dupPassword)}
        />
        <Pressable
            onPress={() => updatePassword()}
            style={{ paddingTop: 15, paddingBottom: 8 }}
        ></Pressable>
    </View>
}
export default PasswordUpdateScreen