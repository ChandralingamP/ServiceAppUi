import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    console.log("Data saved successfully.");
  } catch (error) {
    console.log("Error saving data:", error);
  }
};

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Retrieved value:", value);
      return value;
    }
  } catch (error) {
    console.log("Error retrieving data:", error);
    return 0;
  }
};
