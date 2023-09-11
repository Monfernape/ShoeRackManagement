import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";

import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../services/supabase";

export const ReportMissingShoe = () => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [shoeDetail, setShoeDetail] = useState("");

  const styles = StyleSheet.create({
    mt: {
      marginTop: 5,
    },
  });

  const handleReportShoe = () => {
    let url = `whatsapp://send?text=' + 
      ${name} +${cnic} +${address} +${shoeDetail} +
      '&phone=92' + ${3228870123}`;

    Linking.openURL(url).then((res) => {
      console.log("WhatsApp Opened", res);
    });

    supabase
      .from("missing_shoe")
      .insert({
        name: name,
        cnic: cnic,
        address: address,
        shoeDetail: shoeDetail,
      })
      .then((response) => {
        console.log("response", response);
      });
  };

  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineMedium"
      >
        Report Missing Shoe
      </Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.mt}
      />
      <TextInput
        label="CNIC"
        value={cnic}
        onChangeText={(text) => setCnic(text)}
        style={styles.mt}
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.mt}
      />
      <TextInput
        multiline
        label="Shoe Detail"
        numberOfLines={4}
        value={shoeDetail}
        style={{ backgroundColor: "#E8E1ED", marginTop: 5 }}
        onChangeText={(text) => {
          setShoeDetail(text);
        }}
      />
      <Button
        mode="contained"
        style={{ width: 160, marginTop: 15, marginLeft: 130 }}
        onPress={() => handleReportShoe()}
      >
        Submit Report
      </Button>
    </PaperProvider>
  );
};
