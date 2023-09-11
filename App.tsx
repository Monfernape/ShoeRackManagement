import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Button, Text } from "react-native-paper";
import { AddUser } from "./views/AddUser";
import { ReportMissingShoe } from "./views/ReportMissingShoe";
export default function App() {
  return (
    <PaperProvider>
      {/* <View style={styles.container}>
      <Text variant="headlineLarge">Shoe Rack</Text>
         <Text>Open up App.tsx to start working on your app!</Text>
      <Button>Press Me</Button>
         <StatusBar style="auto" />
       </View> */}
      <AddUser />
      {/* <ReportMissingShoe /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
