import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native";
import Head from "../Components/Header";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { createTask, getTask } from "../redux/actions";

import ShowTask from '../Components/ShowTask'

const HomeScreen = ({ navigation, forCreateTask, forGetTask, taskList }) => {

  const currentdate = new Date();
  const date = `${currentdate.getFullYear()}-${
    (currentdate.getMonth() + 1).toString().padStart(2,"0")
  }-${currentdate.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    forGetTask(date);
  }, []);

  const fetchDataAgain = async()=>{
    await forGetTask(date);
  }
  const consoleList = () => {
    if (taskList.length === 0) {
      return (
        <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>No Task Found</Text>
        </View>
      );
    }
    else{
      return(
        <View style={styles.list}>
        <ShowTask fetchData={fetchDataAgain} list={taskList} />
        </View>
      )
    }
  };

  const [task, setTask] = useState("");

  const create =  async() => {
    if(task === ""){
      Alert.alert("Look out!",
        "You forgot to write the task",
        [
        {text: 'Cancel', style: 'cancel'}
        ],
        {cancelable: false}
    )
    }
    else{
      Keyboard.dismiss();
      await forCreateTask(task)
      setTask(null);
      forGetTask(date);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Head navigation={navigation} title="CUE" />
      </View>
      <View>
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {consoleList()}
          <View style={styles.items}></View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTextWrapper}
        >
          <TextInput
            name="NewTask"
            value={task}
            style={styles.input}
            onChangeText={(text) => setTask(text)}
            placeholder="Create a Task"
          />
          <TouchableOpacity style={styles.addBtn} onPress={create}>
            <Text>
              <Ionicons name="add-sharp" style={styles.addIcn} />
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    height: "78%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  writeTextWrapper: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginHorizontal: 25,
  },
  input: {
    padding: 15,
    height: 60,
    width: 260,
    borderWidth: 2.5,
    backgroundColor: "#E7EEFB",
    borderRadius: 10,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  addBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFC03D",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFF",
    marginRight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingLeft: 2.5,
    paddingTop: 2.5,
  },
  addIcn: {
    color: "#000",
    fontSize: 36,
  },
  emptyWrapper: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "85%",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "800",
  },
  addText: {},
  bar: {
    backgroundColor: "#cc0000",
    maxWidth: "70%",
    alignSelf: "center",
    marginBottom: 45,
  },
  list:{
    height:'auto',
    zIndex:0
  }
});

const mapStateToProps = (state) => {
  return {
    taskList: state.tasks.tasklist,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    forCreateTask: (formValues) => dispatch(createTask(formValues)),
    forGetTask: (date) => dispatch(getTask(date)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
