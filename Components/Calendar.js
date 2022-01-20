import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
const Calendar = ({ setDate }) => {
  const onDateChange = (date) => {
    // console.log(date)
    setDate(date.toISOString().split("T")[0]);
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        selectedDayColor="#7047EB"
        todayBackgroundColor="#d3d3d3"
        todayTextStyle={{color:'#7047EB', fontWeight:'bold', fontSize:16}}
        selectedDayTextColor="#FFFFFF"
        nextComponent={
          <Ionicons name="chevron-forward" size={24} color="black" />
        }
        previousComponent={
          <Ionicons name="chevron-back" size={24} color="black" />
        }
        dayShape="circle"
        width={350}
        height={700}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height:350,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 9,
    }
});
//

export default Calendar;
