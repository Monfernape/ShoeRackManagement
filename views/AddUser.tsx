import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../services/supabase";
import DropDown from "react-native-paper-dropdown";
import { timeList, roleList } from "../constant/constant";

export const AddUser = ({ navigation, route }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [ehadDuration, setEhadDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [role, setRole] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownB, setShowDropDownB] = useState(false);
  const [showDropDownR, setShowDropDownR] = useState(false);

  const { id } = route.params;

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

  useEffect(() => {
    if (id) {
      supabase
        .from("users")
        .select()
        .eq("id", id)
        .single()
        .then((res: any) => {
          console.log("response", res.data);

          setName(res.data.name);
          setPhone(res.data.phone);
          setCnic(res.data.cnic);
          setEhadDuration(res.data.ehadDuration);
          setRole(res.data.role);
          setStartTime(res.data.startTime);
          setEndTime(res.data.endTime);
        });
    }
  }, [id]);

  const handleAddUser = () => {
    supabase
      .from("users")
      .insert({
        name: name,
        phone: phone,
        cnic: cnic,
        ehadDuration: ehadDuration,
        role: role,
        startTime: startTime,
        endTime: endTime,
      })
      .then((response) => {
        console.log("response", response);
        setName("");
        setPhone("");
        setCnic("");
        setEhadDuration("");
        setRole("");
        setStartTime("");
        setEndTime("");
      });
  };
  const handleUpdateUser = () => {
    supabase
      .from("users")
      .update({
        name: name,
        phone: phone,
        cnic: cnic,
        ehadDuration: ehadDuration,
        role: role,
        startTime: startTime,
        endTime: endTime,
      })
      .eq("id", id)
      .then((response) => {
        setName("");
        setPhone("");
        setCnic("");
        setEhadDuration("");
        setRole("");
        setStartTime("");
        setEndTime("");
        navigation.goBack();
      });
  };

  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineLarge"
      >
        {id ? " Edit User " : "Add User"}
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
          label={"Role"}
          visible={showDropDownR}
          showDropDown={() => setShowDropDownR(true)}
          onDismiss={() => setShowDropDownR(false)}
          value={role}
          setValue={setRole}
          list={roleList}
          dropDownStyle={{ marginTop: 5 }}
        />
      </SafeAreaView>
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

      {id ? (
        <Button
          mode="contained"
          style={{ width: 140, marginTop: 15, marginLeft: 130 }}
          onPress={() => handleUpdateUser()}
        >
          Update User
        </Button>
      ) : (
        <Button
          mode="contained"
          style={{ width: 120, marginTop: 15, marginLeft: 130 }}
          onPress={() => handleAddUser()}
        >
          Add User
        </Button>
      )}
    </PaperProvider>
  );
};
