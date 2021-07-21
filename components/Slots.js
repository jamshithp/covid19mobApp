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
        fontSize: 18,
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
      item: {
        color: '#666',
        fontSize: 14,
        fontFamily:'open-sans-bold',
        padding:5,
      },
});
export default Slots;
