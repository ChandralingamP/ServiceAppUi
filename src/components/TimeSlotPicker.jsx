import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
const TimeSlotPicker = ({selectedTimeSlot,setSelectedTimeSlot}) => {
  
  const generateTimeSlots = () => {
    const startTime = 8; // Starting hour
    const endTime = 18; // Ending hour
    const interval = 3; // Interval in hours
    const timeSlots = [];
    for (let i = startTime; i < endTime; i += interval) {
      const period1 = i < 12 ? "AM" : "PM";
      const time1 = i < 10 ? `0${i}:00 ${period1}` : `${i}:00 ${period1}`;
      const period2 = i + interval < 12 ? "AM" : "PM";
      let h2 = (i + interval) % 12;
      const time2 =
        i + interval < 10 ? `0${h2}:00 ${period2}` : `${h2}:00 ${period2}`;
      const time = time1 + " - " + time2;
      console.log(time.length);
      timeSlots.push(time);
    }
    return timeSlots;
  };
  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time Slot</Text>
      <Picker
        selectedValue={selectedTimeSlot}
        onValueChange={handleTimeSlotChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a time slot" value="" />
        {generateTimeSlots().map((timeSlot) => (
          <Picker.Item key={timeSlot} label={timeSlot} value={timeSlot} />
        ))}
      </Picker>
      {/* <Text style={styles.selectedTimeSlot}>
        Selected Time Slot: {selectedTimeSlot}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  selectedTimeSlot: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default TimeSlotPicker;
