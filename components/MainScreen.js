import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
    >
      <Text
        style={{
          fontSize: 24,
          bottom: 40,
          borderWidth: StyleSheet.hairlineWidth,
          alignSelf: "stretch",
          padding: 15,
          backgroundColor: "yellow",
          margin: 10,
          textAlign: "center",
          borderRadius: 25,
        }}
        onPress={() => navigation.navigate("actual")}
      >
        Next
      </Text>
    </ImageBackground>
  );
};

export default MainScreen;
