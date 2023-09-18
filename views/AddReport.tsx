import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../services/supabase";

export const AddReport = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const styles = StyleSheet.create({
    mt: {
      marginTop: 5,
    },
    text: {
      fontSize: 16,
      paddingTop: 12,
      marginLeft: 15,
      color: "#3d3e40",
    },
  });

  const handleAddReport = () => {
    supabase
      .from("issue_report")
      .insert({
        name: name,
        description: description,
      })
      .then((response) => {
        console.log("response", response);
        setName("");
        setDescription("");
      });
  };

  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineLarge"
      >
        Issue Report
      </Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.mt}
      />

      <TextInput
        label="Description"
        value={description}
        multiline
        numberOfLines={5}
        onChangeText={(text) => setDescription(text)}
        style={styles.mt}
      />

      <Button
        mode="contained"
        style={{ width: 160, marginTop: 15, marginLeft: 130 }}
        onPress={() => handleAddReport()}
      >
        Submit Report
      </Button>
    </PaperProvider>
  );
};
