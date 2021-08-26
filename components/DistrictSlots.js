import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Button,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import VaccinationGraph from './VaccinationGraph';

export default function DistrictSlots(props) {
  const [Currentstate, setCurrentstate] = useState(null);
  const [district, setDistrict] = useState('waiting');
  const [fetch, setfetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if(!fetch) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log('')
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
    <View>
      {!props.data && !fetch && <ActivityIndicator size="large" />}
      {props.data?.total && <VaccinationGraph data={props.data}/>}
      {fetch && 
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>Current Location : {district} </Text>
          <Text style={styles.paragraph}>See vaccine slot availability</Text>
        </View>
        <View style={styles.button}>
          <Button
          title="Search"
          onPress={() => props.onPress(Currentstate,district)
          }/>
        </View>
      </View>}
     {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
      width:'100%',
      backgroundColor:'#FFFAFA',
      padding:25,
      height:100,
      margin:15,
      justifyContent:'space-around',
      flexDirection:'row',
     alignItems:'center'
    },
    paragraph:{
      fontSize:14,
      fontFamily: 'open-sans-bold',
      margin:5
    },
    button:{
      color:'blue',
      maxWidth:100,
      margin:3,
      borderRadius:50,
    },
    textContainer:{
      display:'flex',
      flexDirection:'column',
      margin:0,
    },
  });