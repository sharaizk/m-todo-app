import React, {useEffect, useState} from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { Title, Surface, Badge } from "react-native-paper";
import { connect } from "react-redux";

import Head from "../Components/Header";
import CircularBar from "../Components/CircularBar";
const ShowDatedTask = ({ navigation, route, datedTask }) => {
  const [complete, setComplete] = useState(0)
  const [incomplete, setincomplete] = useState(0)

  useEffect(() => {
    let completed = 0;
    let incompleted = 0;
    for(let i in datedTask){
      if(datedTask[i].status === "Incomplete"){
        incompleted++
      }
      else{
        completed++
      }
    }
    setComplete(completed)
    setincomplete(incompleted)
  }, [datedTask])

  
  const { date } = route.params;
  const noTaskFound = () => {
    return (
      <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>No Task Found</Text>
      </View>
    );
  };
  const renderBadge = (item) => {
    return (
      <View>
        {item.status === "Incomplete" ? (
          <Badge style={styles.incomplete}>Incomplete</Badge>
        ) : (
          <Badge style={styles.completed}>Completed</Badge>
        )}
      </View>
    );
  };

  const RenderItem = () => {
    return datedTask.map((todos) => {

      return (
        <ScrollView key={todos._id} style={styles.page}>
          <Surface style={styles.surface}>
            <Title style={styles.task}>{todos.task}</Title>
            {renderBadge(todos)}
          </Surface>
        </ScrollView>
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Head title="History" navBtn={true} navigation={navigation} />
      </View>
      <View style={styles.taskWrapper}>
        <Text style={styles.date}>{date}</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
          {datedTask ? <>
          <CircularBar complete={complete} incomplete={incomplete}/>
          <RenderItem />
          </> : 
          noTaskFound()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  taskWrapper: {
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    height: "70%",

  },
  surface: {
    padding: 8,
    minHeight: 70,
    height: "auto",
    width: 340,
    marginBottom: 2,
    borderRadius: 7.5,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: "row",
    borderColor: "#E7EEFB",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },
  completed: {
    backgroundColor: "#0DAC31",
    width: 100,
    height: 30,
    fontSize: 12,
    color: "#FFF",
    fontFamily: "yuGothic",
  },
  incomplete: {
    backgroundColor: "#FF3A31",
    width: 100,
    height: 30,
    fontSize: 12,
    color: "#FFF",
    fontFamily: "yuGothic",
  },
  task: {
    fontSize: 18,
    fontFamily: "yuGothicBold",
    maxWidth: 150,
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
  date: {
    fontSize: 64,
    textAlign: "center",
    color: "#7047EB",
    fontFamily: "bebasRegular",
    letterSpacing: 1.1,
  },
  page:{
    paddingBottom:10
  }
});

const mapStateToProps = (state) => {
  return {
    datedTask: state.tasks.dateList,
  };
};

export default connect(mapStateToProps, null)(ShowDatedTask);
