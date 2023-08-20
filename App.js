import react, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import Task from "./components/Tasks";

export default function App() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);

  const AddTodo = () => {
    Keyboard.dismiss();
    if (todo !== "") {
      setTodos([...todos, todo]);
      setTodo(null);
    }
  };
  const completeTask = (index) => {
    const remainingTodos = todos.filter((_, item) => item !== index);
    setTodos(remainingTodos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Todo App</Text>
        {todos.length > 0 ? (
          <View style={styles.items}>
            {todos.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Text style={styles.notText}>Please Add Today's Tasks</Text>
        )}
      </View>

      {/* Writing a task  */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a Task"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        ></TextInput>
        <TouchableOpacity onPress={() => AddTodo()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  wrapper: {
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTask: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFF",
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 2,
  },
  addWrapper: {
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 2,
  },
  addText: {},
  notText: {
    fontSize: 20,
    marginTop: 100,
    textAlign: "center",
  },
});
