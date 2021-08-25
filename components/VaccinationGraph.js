import React from 'react';
import {  View,Text, StyleSheet  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import { abbreviateNumber, numberWithCommas } from '../utils/common-functions';

function VaccinationGraph(props) {
    const fullyVaccinated = props.data?.total && parseFloat(props.data.total.vaccinated2/props.data.meta.population * 100).toFixed(1);
    const oneDose = props.data?.total && parseFloat(props.data.total.vaccinated1/props.data.meta.population * 100).toFixed(1);
  return (
    <Animatable.View
    duration={700}
    animation="slideInRight"
    >
    {props.data.total && 
      <View>
        <View style={styles.vaccineHeader}>
          <AntDesign name="Safety" size={25} color={'red'}  />
          <Text style={styles.vaccineText}>{numberWithCommas(props.data.total.vaccinated2 + props.data.total.vaccinated1)} vaccine doses administered</Text>
        </View>
        <View style={styles.vaccineBar}>
          <View style={[styles.vaccine2,{width:`${fullyVaccinated}%`}]}></View>
          <View style={[styles.vaccine1,{width:`${oneDose - fullyVaccinated}%`}]}></View>
        </View>
        <View style={[styles.vaccineDetails,{margin:10}]}>
           <View style={styles.vaccineDetails}>
                <View style={[styles.vaccinebox,{backgroundColor:'rgba(219,85,129,1)'}]}></View>
                <Text>Fully vaccinated : {fullyVaccinated}%</Text>
            </View>
            <View style={styles.vaccineDetails}>
                <View style={[styles.vaccinebox,{backgroundColor:'rgba(219,85,129,0.6)'}]}></View>
                <Text>At least one dose : {oneDose}%</Text>
            </View>
        </View>
      </View>
    }
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
    vaccineHeader:{
        backgroundColor: 'rgba(219,85,129,.12549019607843137)',
        width:'80%',
        margin:20,
        borderRadius: 5,
        flexDirection: 'row',
        height:40,
        padding:5, 
    },
    vaccineText:{
        color: '#db5581',
        margin:5,
    },
    vaccineBar:{
        backgroundColor: 'rgba(219,85,129,.12549019607843137)',
        width:'95%',
        height:40,
        borderRadius: 5,
        margin:10,
        display:'flex',
        flexDirection: 'row',
    },
    vaccine2:{
        backgroundColor:'rgba(219,85,129,1)',
        height:40,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    vaccine1:{
        backgroundColor: 'rgba(219,85,129,.6)',
        opacity: .6,
        height:40,
        width:30,
    },
    vaccineDetails:{
        display:'flex',
        flexDirection: 'row',
    },
    vaccinebox:{
        height:15,
        width:15,
        margin:5,
    }
});
export default VaccinationGraph;
