import React, { useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../services/supabase";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDown from "react-native-paper-dropdown";
import { timeList } from "../constant/constant";
export const AddUser = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [ehadDuration, setEhadDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownB, setShowDropDownB] = useState(false);

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

  const handleAddUser = () => {
    console.log("caled");

    supabase
      .from("users")
      .insert({
        name: name,
        phone: phone,
        cnic: cnic,
        ehadDuration: ehadDuration,
        startTime: startTime,
        endTime: endTime,
      })
      .then((response) => {
        console.log("response", response);
      });
  };

  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineLarge"
      >
        Add User
      </Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.mt}
      />

      <TextInput
        label="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.mt}
        keyboardType={"numeric"}
      />
      <TextInput
        label="CNIC"
        value={cnic}
        onChangeText={(text) => setCnic(text)}
        style={styles.mt}
        keyboardType={"numeric"}
      />
      <TextInput
        label="Ehad Duration (Years)"
        value={ehadDuration}
        onChangeText={(text) => setEhadDuration(text)}
        style={styles.mt}
        keyboardType={"numeric"}
      />

      <SafeAreaView style={styles.mt}>
        <DropDown
          label={"Start Time"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={startTime}
          setValue={setStartTime}
          list={timeList}
          dropDownStyle={{ marginTop: 5 }}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.mt}>
        <DropDown
          label={"End Time"}
          visible={showDropDownB}
          showDropDown={() => setShowDropDownB(true)}
          onDismiss={() => setShowDropDownB(false)}
          value={endTime}
          setValue={setEndTime}
          list={timeList}
          dropDownStyle={{ marginTop: 5 }}
        />
      </SafeAreaView>

      <Button
        mode="contained"
        style={{ width: 120, marginTop: 15, marginLeft: 130 }}
        onPress={() => handleAddUser()}
      >
        Add User
      </Button>
    </PaperProvider>
  );
};
