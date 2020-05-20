import React from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import {ZONE_DETAILS} from '../constants';
import { Ionicons } from '@expo/vector-icons';

const ZoneDetailsScreen = (props) => {
   const zone =props.navigation.getParam('zone');
   
    return (
        <ScrollView>
        <View style={[styles.container,styles[zone]]}>
            <Text style={styles.heading}>{zone} zone</Text>
            <Text style={styles.heading1}>Restricted and Permitted</Text>
            {ZONE_DETAILS[zone].map((item,index)=> {
                return(
                    <View style={styles.itemContainer} key={index}>
                        <Ionicons name="md-information-circle" size={25} color={'#737373'} />
                        <Text style={styles.item}>{item}</Text>
                    </View>
                )
            })}
        </View>
        </ScrollView>
    )
}

ZoneDetailsScreen.navigationOptions = () => {
    return {
        headerTitle: 'ZoneDetails',
    };
  };

const styles = StyleSheet.create({
    container: {
        display:"flex",
        width:'100%',
        backgroundColor:'#FFFAFA',
        padding:30,
        //height:150,
        margin:10,
        justifyContent:'center',
        flexDirection:'column',
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
      heading:{
          fontSize:20,
          fontFamily: 'open-sans-bold',
          padding:10,
      },
      heading1:{
          fontSize:16,
          fontFamily: 'open-sans-semibold',
      },
      itemContainer:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        paddingRight:18
      },
      item:{
        padding:5,
        fontSize:16,
      }
})


export default ZoneDetailsScreen;