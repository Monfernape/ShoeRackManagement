import React, { useEffect, useState } from "react";
import { PaperProvider, DataTable, Button, Text } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { supabase } from "../services/supabase";

export const UserTable = ({ navigation }: any) => {
  const [userData, setUserData] = useState([]);

  const styles = StyleSheet.create({
    wdt: {
      width: 130,
    },
  });
  useEffect(() => {
    supabase
      .from("users")
      .select()
      .order("id", { ascending: false })
      .then((res: any) => {
        console.log("res", res);

        setUserData(res?.data);
      });
  }, []);

  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineLarge"
      >
        User Table
      </Text>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.wdt}>Name</DataTable.Title>
            <DataTable.Title style={styles.wdt}>Phone</DataTable.Title>
            <DataTable.Title style={styles.wdt}>CNIC</DataTable.Title>
            <DataTable.Title style={styles.wdt}>
              Ehad Duration (Years)
            </DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Role</DataTable.Title>
            <DataTable.Title style={{ width: 80 }}>Start Time</DataTable.Title>
            <DataTable.Title style={{ width: 80 }}>End Time</DataTable.Title>
            <DataTable.Title style={{ width: 220 }}>Action</DataTable.Title>
          </DataTable.Header>

          {userData?.map((item: any) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={styles.wdt}>{item.name}</DataTable.Cell>
              <DataTable.Cell style={styles.wdt}>{item.phone}</DataTable.Cell>
              <DataTable.Cell style={styles.wdt}>{item.cnic}</DataTable.Cell>

              <DataTable.Cell style={styles.wdt}>
                {item.ehadDuration}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 100 }}>
                {item.role}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 80 }}>
                {item.startTime}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 80 }}>
                {item.endTime}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 150 }}>
                {
                  <Button
                    mode="contained"
                    style={{ width: 100, height: 37 }}
                    onPress={() =>
                      navigation.navigate("AddUser", { id: item.id })
                    }
                  >
                    Edit
                  </Button>
                }
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </PaperProvider>
  );
};
