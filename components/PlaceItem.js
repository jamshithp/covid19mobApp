import React,{Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import {Colors} from '../constants';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';


class PlaceItem extends Component {

   onShare = async () => {
    try {
      const result = await Share.share({
        message:`
        ${this.props.title}.
        Confirmed: ${this.props.item.confirmed}. 
        Active: ${this.props.item.active}. ---  ${this.props.item.deltaconfirmed}
        Recovered: ${this.props.item.recovered}. --- ${this.props.item.deltarecovered}
        Deaths: ${this.props.item.deaths}. --- ${this.props.item.deltadeaths}
        `,
        title:"React Native Camera Expo Example",
        url:"https://reactnativemaster.com/react-native-camera-expo-example/"
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const item = this.props.item;
    const isState = this.props.screen === 'state' ? true:false,
    shadow= isState && 'shadow' ;
    const other = item.total.other ? item.total.other : 0;

    return (
      <Animatable.View
          duration={700}
          //transition="backgroundColor"
          animation="slideInRight"
        >
      <TouchableOpacity onPress={this.props.onSelect} style={[styles.placeItem,styles[shadow]]}>
        {isState && <View style={[styles.circle]} ><Text style={styles.stateCode}>{item.statecode}</Text></View>}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.ItemContainer}>
            <Text style={styles.item}>Confirmed: {item.total.confirmed}</Text>
            {item.delta?.confirmed &&
            <View style={styles.ItemContainer}>
              <Ionicons name="md-arrow-up" size={18} color={'red'} />
              <Text style={styles.subitemRed}>{item.delta?.confirmed}</Text>
            </View>}
          </View>
          <Text style={styles.item}>Active: {item.total?.confirmed - (item.total.recovered + item.total.deceased + other)}</Text>
          <View style={styles.ItemContainer}>
            <Text style={styles.item}>Recovered: {item.total.recovered}</Text>
            {item.delta?.recovered &&
            <View style={styles.ItemContainer}>
              <Ionicons name="md-arrow-up" size={18} color={'green'} />
              <Text style={styles.subitemGreen}>{item.delta?.recovered}</Text>
            </View>}
          </View>
          <View style={styles.ItemContainer}>
            <Text style={styles.item}>Deaths: {item.total.deceased}</Text>
            {item.delta?.deceased &&
            <View style={styles.ItemContainer}>
              <Ionicons name="md-arrow-up" size={18} color={'grey'} />
              <Text style={styles.subitemGrey}>{item.delta?.deceased}</Text>
            </View>}
          </View>
        </View>
        {isState && 
        <View style={styles.shareBtn}>
        <TouchableOpacity  onPress={()=>this.onShare()}>
          <FontAwesome name="share-square-o" size={30} color={'red'}/>
        </TouchableOpacity>
        </View>}
      </TouchableOpacity>
      </Animatable.View>
    );
  }

  
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  shareBtn:{
    //marginLeft:10,
  },
  Orange: {
    backgroundColor:'#ffc10720',
    //borderLeft: 5px solid $orange-mid;
    borderLeftWidth: 15,
    borderLeftColor: '#fd7e1499',
    color: '#fd7e14',
  },
  OrangeCircle:{
    backgroundColor:'#fd7e1499',
    width: 82,
    height: 82,
    borderRadius: 50,
    fontSize:10,
  },
  Green: {
    backgroundColor:'#28a74520',
    //borderLeft: 5px solid $orange-mid;
    borderLeftWidth: 15,
    borderLeftColor: '#28a74599',
    color: '#28a745',
  },
  GreenCircle:{
    backgroundColor:'#28a74599',
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  Red: {
    backgroundColor:'#ff073a20',
    //borderLeft: 5px solid $orange-mid;
    borderLeftWidth: 15,
    borderLeftColor: '#ff073a99',
    color: '#ff073a',
  },
  RedCircle:{
    backgroundColor:'#ff073a99',
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  ItemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  stateCode:{
    fontFamily:'open-sans-bold',
    fontSize:20,
  },
  infoContainer: {
    marginLeft: 25,
    width: 200,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    fontFamily:'open-sans-bold',
  },
  item: {
    color: '#666',
    fontSize: 14,
    fontFamily:'open-sans-bold',
    padding:5,
  },
  subitemRed:{
    color: 'red',
    fontSize: 14,
    fontFamily:'open-sans',
    padding:5,
  },
  subitemGreen:{
    color: 'green',
    fontSize: 14,
    fontFamily:'open-sans',
    padding:5,
  },
  subitemGrey:{
    color: 'grey',
    fontSize: 14,
    fontFamily:'open-sans',
    padding:5,
  }
});

export default PlaceItem;
