import React, { useState, useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  CheckBox,
  Alert,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds();
    setDate(year + "/" + month + "/" + date);
  }, []);
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            title: doc.data().title,
            date: doc.data().date,
          }))
        );
      });
  }, [input]);

  //   db.collection("todos").onSnapshot((snapshot) =>
  //     snapshot.docs.map((doc) => console.log(doc.data().message))
  //   );
  const handlePress = (e) => {
    e.preventDefault();
    if (input.length === 0 || input.charAt(0) === 0) {
      alert("Please add some task! ");
    } else if (input.trim() === "" || input.charAt(0) === 0) {
      alert("No places for unusual spaces! ");
    } else {
      db.collection("todos").add({
        title: "To-Do",
        date: date,
        message: input.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "skyblue",
          width: Dimensions.get("screen").width,
        }}
      >
        <TextInput
          placeholder="Enter a task........."
          style={{
            borderWidth: 1,
            padding: 10,
            flex: 1,
            margin: 10,
            backgroundColor: "rgba(255,255,255,1)",
            textAlign: "left",
            alignSelf: "flex-start",
          }}
          multiline={true}
          scrollEnabled={true}
          value={input}
          onChangeText={(text) => setInput(text)}
          minLength={3}
        />
        <Text
          style={{
            fontSize: 22,
            borderWidth: StyleSheet.hairlineWidth,
            flex: 0.3,
            textAlign: "center",
            margin: 5,
            padding: 10,
            backgroundColor: "yellow",
            borderRadius: 10,
            flexWrap: "wrap",
          }}
          onPress={handlePress}
        >
          Add
        </Text>
      </View>
      <ScrollView>
        {todos.map((todo, i) => (
          <TouchableOpacity
            key={i}
            onLongPress={() =>
              Alert.alert("Alert", "Do you want to delete this task ?", [
                {
                  text: "Yes",
                  onPress: () => db.collection("todos").doc(todo.id).delete(),
                },
                { text: "No" },
              ])
            }
            activeOpacity={1}
          >
            <View
              style={{
                borderWidth: 1,
                height: "auto",
                padding: 10,
                backgroundColor: "lightgrey",
                margin: 5,
                borderRadius: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    margin: 3,
                    right: 50,
                  }}
                >
                  {todo.title}
                </Text>
                <Text style={{ left: 20, color: "grey" }}>{todo.date}</Text>
              </View>

              <Text style={{ margin: 5, left: 10 }}>{todo.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default HomeScreen;
