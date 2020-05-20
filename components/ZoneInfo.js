import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App(props) {
  const [location, setLocation] = useState(null);
  const [fetch, setfetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [zone, setZone] = useState(null);

  useEffect(() => {
    if(!fetch) {
      (async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        const location = await Location.getCurrentPositionAsync({});
      const locationObj ={
          latitude:location.coords.latitude,
          longitude:location.coords.longitude,
      }
     // console.log("locationObj",locationObj,location)
       const details = await Location.reverseGeocodeAsync(locationObj);
       console.log("details",details)
       if(details) {
          const response = await axios.get(
              `https://api.postalpincode.in/pincode/${details[0].postalCode}`
          );
          console.log("response",response.data[0].PostOffice[0].State,response.data[0].PostOffice[0].District)
          const filteredState = props.districtZones[response.data[0].PostOffice[0].State];
          const location = response.data[0].PostOffice[0].District;
          setLocation(response.data[0].PostOffice[0].District);
          setZone(filteredState[location].zone);
          setfetch(true);
       }
      })();
    }
    
  });

  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }


  return (
      props.districtZones && fetch && 
      <View style={[styles.container,styles[zone]]}>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>{text}</Text>
          <Text style={styles.paragraph}>You are in {zone} zone</Text>
        </View>
        <View style={styles.button}>
        <Button 
        title="See Details"
        onPress={() => props.onPress(zone)} />
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
      //height:150,
      margin:10,
      justifyContent:'center',
      flexDirection:'row',
     //alignItems:'center'
    },
    Orange: {
      backgroundColor:'#ffc10720',
    },
    Green: {
      backgroundColor:'#28a74520',
    },
    Red: {
      backgroundColor:'#ff073a20',
    },
    paragraph:{
      fontSize:16,
      fontFamily: 'open-sans-bold',
    },
    button:{
      color:'blue',
      width:100,
      margin:10,
      borderRadius:50,
    },
    textContainer:{
      // display:'flex',
      // flexDirection:'column',
      // margin:0,
    }
  });