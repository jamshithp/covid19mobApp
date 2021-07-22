import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';

export default function DistrictSlots(props) {
  const [Currentstate, setCurrentstate] = useState(null);
  const [district, setDistrict] = useState('waiting');
  const [fetch, setfetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if(!fetch) {
      (async () => {
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        const currentlocation = await Location.getCurrentPositionAsync({});
      const locationObj ={
          latitude:currentlocation.coords.latitude,
          longitude:currentlocation.coords.longitude,
      }
      //console.log("locationObj",locationObj,)
       const details = await Location.reverseGeocodeAsync(locationObj);
       if(details) {
          const response = await axios.get(
              `https://api.postalpincode.in/pincode/${details[0].postalCode}`
          );
          const CurrentState = response.data[0].PostOffice[0].State;
          const CurrentDistrict = response.data[0].PostOffice[0].District;
          setDistrict(CurrentDistrict);
          setCurrentstate(CurrentState);
          setfetch(true);
       }
      })();
    }
  });

  return (
      fetch && 
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>You are in {district}</Text>
        </View>
        <View style={styles.button}>
        <Button
        title="See Slot Availability"
        onPress={() => props.onPress(Currentstate,district)
        }/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
      width:'100%',
      backgroundColor:'#FFFAFA',
      padding:30,
      height:100,
      margin:8,
      justifyContent:'center',
      flexDirection:'row',
     alignItems:'center'
    },
    paragraph:{
      fontSize:16,
      fontFamily: 'open-sans-bold',
    },
    button:{
      color:'blue',
      maxWidth:180,
      margin:5,
      borderRadius:50,
    },
    textContainer:{
      // display:'flex',
      // flexDirection:'column',
      // margin:0,
    }
  });