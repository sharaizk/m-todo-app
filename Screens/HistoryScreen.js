import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Head from "../Components/Header";
import Calendar from "../Components/Calendar";

import { connect } from "react-redux";
import { getDateTask } from "../redux/actions";
const HistoryScreen = ({ navigation,forGetDateTask, datedTask }) => {
  const [date, setDate] = useState(null);

  const historySearch = async()=>{
    if(date !== null){
      await forGetDateTask(date)
      navigation.push('DatedTasks',{
        date: date
      })
    }
    else{
      alert('Please select date first')
    }
  }
  // console.log(datedTask)

  return (
    <SafeAreaView>
      <View>
        <View>
          <Head navigation={navigation} title="History" />
        </View>
        <View style={styles.container}>
          <Calendar setDate={setDate} />
          <TouchableOpacity style={styles.searchBtn} onPress={historySearch}>
            <Text style={styles.search}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtn: {
    marginTop: 20,
    width: 220,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#FFC03D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 6,
  },
  search: {
    color: "#FFF",
  },
});
const mapStateToProps = (state) => {
  return {
    datedTask: state.tasks.dateList,
  };
};


function mapDispatchToProps(dispatch) {
  return {
    forGetDateTask: (date)=>dispatch(getDateTask(date))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);