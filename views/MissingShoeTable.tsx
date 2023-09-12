import React, { useEffect, useState } from "react";
import { PaperProvider, Button, Text } from "react-native-paper";
import { supabase } from "../services/supabase";
import { ScrollView, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export const MissingShoeTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [missingShoeData, setMisingShoeData] = React.useState([]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    supabase
      .from("missing_shoe")
      .select()
      .order("id", { ascending: false })
      .then((res: any) => {
        console.log("response", res);

        setMisingShoeData(res?.data);
      });
  }, []);
  const handleDelete = (x: any) => {
    supabase.storage.from("missing_shoe").remove(x.value);
    const newData = missingShoeData.filter((item: any) => x.id !== item.id);
    setMisingShoeData(newData);
  };
  return (
    <PaperProvider>
      <Text
        style={{ marginTop: 50, textAlign: "center" }}
        variant="headlineLarge"
      >
        Missing Shoe Table
      </Text>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ width: 150 }}>Name</DataTable.Title>
            <DataTable.Title style={{ width: 120 }}>CNIC</DataTable.Title>
            <DataTable.Title style={{ width: 220 }}>Address</DataTable.Title>
            <DataTable.Title style={{ width: 220 }}>
              Shoe Detail
            </DataTable.Title>
          </DataTable.Header>

          {missingShoeData.map((item: any) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={{ width: 150 }}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 120 }}>
                {item.cnic}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 220 }}>
                {item.address}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 220 }}>
                {item.shoeDetail}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </PaperProvider>
  );
};
