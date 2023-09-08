import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../services/supabase";
import DateTimePicker from "@react-native-community/datetimepicker";
export const AddUser = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [ehadDuration, setEhadDuration] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });

  const [show, setShow] = useState(false);
  const [showE, setShowE] = useState(false);

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
    touchable: { backgroundColor: "#E8E1ED", marginTop: 5, height: 50 },
    red: {
      color: "red",
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
        // date : date,
        time: time,
      })
      .then((response) => {
        console.log("response", response);
      });
  };

  const onChangeStart = (e: any, selectedTime: any) => {
    const currentDate = selectedTime;
    console.log("currentDate", currentDate);

    setShow(false);

    setTime({ ...time, startTime: currentDate });
  };
  const onChangeEnd = (e: any, selectedTime: any) => {
    const currentTime = selectedTime;
    console.log("currentTime", currentTime);

    setShowE(false);
    setTime({ ...time, endTime: currentTime });
  };

  const showStartTimepicker = () => {
    setShow(true);
  };
  const showEndTimepicker = () => {
    setShowE(true);
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
      {/* <TextInput
      label="asd"
      value={asd}
      onChangeText={text => setAsd(text)}
    /> */}
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.mt}
      />
      <TextInput
        label="CNIC"
        value={cnic}
        onChangeText={(text) => setCnic(text)}
        style={styles.mt}
      />
      <TextInput
        label="Ehad Duration (Years)"
        value={ehadDuration}
        onChangeText={(text) => setEhadDuration(text)}
        style={styles.mt}
      />

      <TouchableOpacity onPress={showStartTimepicker} style={styles.touchable}>
        <Text style={styles.text}>
          Start Time:{""}
          {time.startTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showEndTimepicker} style={styles.touchable}>
        <Text style={styles.text}>
          End Time:{""}
          {time.endTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
      </TouchableOpacity>

      {show == true && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time.startTime}
          mode={"time"}
          onChange={onChangeStart}
        />
      )}
      {showE == true && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time.endTime}
          mode={"time"}
          onChange={onChangeEnd}
        />
      )}

      <Button
        mode="contained"
        style={{ width: 120, marginTop: 15, marginLeft: 130 }}
        onPress={() => handleAddUser()}
      >
        Add User
      </Button>
      {/* <StatusBar style="auto" /> */}
    </PaperProvider>
  );
};
