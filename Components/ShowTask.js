import React, { useState } from "react";
import LottieView from "lottie-react-native";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Title, Surface, Badge } from "react-native-paper";
import { connect } from "react-redux";
import { completeTask, deleteTask } from "../redux/actions";
import { Ionicons } from "@expo/vector-icons";

const ShowTask = ({forCompleteTask, taskList, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const renderPendingButton = (id) => {
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            style={{ height: 50, marginRight: 20 }}
            source={require("../assets/1166-tick.json")}
            autoPlay
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => renderLoading(id)}>
          <Badge style={styles.incomplete}>Pending</Badge>
        </TouchableOpacity>
      );
    }
  };

  const renderLoading = async (id) => {
    await forCompleteTask(id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 2000);
  };


  const renderCompletedButton = () => {
    return <Badge style={styles.completed}>Completed</Badge>;
  };

  const renderBadge = (item) => {
    return (
      <View>
        {item.status === "Incomplete"
          ? renderPendingButton(item._id)
          : renderCompletedButton()}
      </View>
    );
  };

  const renderItem = () => {
    return taskList.map((todos) => {
      return (
          <Surface key={todos._id} style={styles.surface}>
            <Title style={styles.task}>{todos.task}</Title>
            <View style={{flexDirection:'row'}}>
              {renderBadge(todos)}
            </View>
          </Surface>
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {taskList.length > 0 ? renderItem() : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: "auto",
    marginBottom: 40,
    borderRadius: 10,
  },
  surface: {
    padding: 8,
    minHeight: 70,
    height: "auto",
    width: 340,
    marginBottom: 5,
    borderRadius: 7.5,
    borderWidth: 2,
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
    textAlign: "center",
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
});

const mapStateToProps = (state) => {
  return {
    taskList: state.tasks.tasklist,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    forCompleteTask: (id) => dispatch(completeTask(id)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTask);
