import { StatusBar } from "expo-status-bar";
import React ,{useState} from "react";
import { StyleSheet, View } from "react-native";

import { PaperProvider, Button,Text ,TextInput} from "react-native-paper";
import { supabase } from "../services/supabase";
import DateTimePicker from '@react-native-community/datetimepicker';
export const  AddUser =() =>{
  
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cnic, setCnic] = useState("");
    const [ehadDuration, setEhadDuration] = useState("");
    const [date ,setDate] =useState(new Date(1598051730000))
    const [time ,setTime] =useState('+05:30')

    const [show, setShow] = useState(false);

    const styles = StyleSheet.create({
      mt: {
        marginTop: 5,
      },

      red: {
        color: 'red',
      },
    });

    const handleAddUser =()=>{
      console.log("caled")

      supabase
      .from("users")
      .insert({
        name : name,
        phone:phone,
        cnic : cnic,
        ehadDuration:ehadDuration,
        date : date,
        // time:time,
      })
      .then((response) => {
        console.log("response", response);
      });
   
  }


  const onChange = (e:any,selectedDate:any ) => {
    const currentDate = selectedDate;
    // const  currenttime =selectedTime
    // const Data:any = {currentDate:currentDate ,currenttime:currenttime}
    setShow(false);

    setDate(currentDate);
  };



  const showTimepicker = () => {
    setShow(true);

  };

  return (
    <PaperProvider  >

        <Text style={{marginTop:50 ,textAlign:'center'}} variant="headlineLarge">Add User</Text>
       
    <TextInput
      label="Name"
      value={name}
      onChangeText={text => setName(text)}
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
      onChangeText={text => setPhone(text)}
      style={styles.mt}
    />
            <TextInput
      label="CNIC"
      value={cnic}
      onChangeText={text => setCnic(text)}
      style={styles.mt}
    />
            <TextInput
      label="Ehad Duration (Years)"

      value={ehadDuration}
      onChangeText={text => setEhadDuration(text)}
      style={styles.mt}
    />
     <Button onPress={showTimepicker}>Show time picker </Button>
 

      <Text>selected: {date.toLocaleString()}</Text>
      {show == true && 
        
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          onChange={onChange}
        />
      }


      



                     

                
        <Button mode="contained" 
         style={{width:120 , marginTop:15 , marginLeft:130}}
         onPress={()=>handleAddUser()}
         >Add User</Button>
        {/* <StatusBar style="auto" /> */}
 
    </PaperProvider>
  );





  
}



