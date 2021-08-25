import { red } from '@material-ui/core/colors';
import React from 'react';
import {  View,Text, StyleSheet ,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

function Slots({
    item
}) {
  return (
    <Animatable.View
    duration={700}
    animation="slideInRight"
    >
        <TouchableOpacity  style={[styles.slotItem,styles.shadow]}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.centerName}</Text>
          <View style={styles.ItemsContainer}>
            <View>
              <View style={styles.ItemContainer}>
              <Text style={styles.item}>Open slots: {item.openSlots}</Text>
              </View>
              <View style={styles.ItemContainer}>
              <Text style={styles.item}>Pin Code: {item.pincode}</Text>
              </View>
              <View style={styles.ItemContainer}>
              <Text style={styles.item}>Slot Dates: {item.slotDate}</Text>
              </View>
              <View style={styles.ItemContainer}>
              <Text style={styles.item}>Vaccine: {item.vaccine}</Text>
              </View>
            </View>
            <View style={styles.ItemWarningContainer}></View>
            <Text style={[styles.itemWarning,item.fee_type === 'Free'? styles.free: styles.paid] }>{item.fee_type}</Text>
            </View>
          </View>
        </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
    infoContainer: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      ItemContainer:{
        display:'flex',
      },
      slotItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal:5,
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
        fontFamily:'open-sans-bold',
      },
      shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
      },
      ItemsContainer:{
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
      },
      item: {
        color: '#666',
        fontSize: 14,
        fontFamily:'open-sans-bold',
        padding:5,
      },
      itemWarning:{
        color: 'red',
        fontSize: 15,
        fontFamily:'open-sans-bold',
        padding:10,
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:2,
        width:60,
        borderRadius:10,
        height:40,
        marginLeft:60,
      },
      free:{
        color: 'green',
      },
      paid:{
        color: 'red',
      },
});
export default Slots;
