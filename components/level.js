import React, {useState, useEffect} from 'react';
import {formatNumber} from '../utils/common-functions';
import { View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

function Level(props) {
  const [data, setData] = useState(props.data);

  const other = data.total.other ? data.total.other : 0;

  console.log('other',other)

  return (
    <View style={styles.Level}>
      <Animatable.View
        style={styles.levelItem}
        duration={2000}
       animation="bounceInDown"
      >
        <Text style={styles.heading,styles.cherry}>Confirmed</Text>
        <Text style={styles.cherry}>
          [
          {isNaN(data.delta?.confirmed)
            ? ''
            : data.delta?.confirmed > 0
            ? '+' + formatNumber(data.delta?.confirmed)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.cherry]}>{formatNumber(data.total?.confirmed)} </Text>
      </Animatable.View>

      <Animatable.View
        style={styles.levelItem}
        duration={2000}
        animation="bounceInDown"
      >
        <Text style={styles.heading,styles.blue}>Active</Text>
        <Text>&nbsp;</Text>
        <Text style={[styles.heading1,styles.blue]}>{formatNumber(data.total?.confirmed - (data.total?.recovered + data.total?.deceased + other))}</Text>
      </Animatable.View>

      <Animatable.View
        style={styles.levelItem}
        duration={2000}
        animation="bounceInDown"
      >
        <Text style={styles.heading,styles.green}>Recovered</Text>
        <Text style={styles.green}>
          [
          {isNaN(data.delta?.recovered)
            ? ''
            : data.delta?.recovered > 0
            ? '+' + formatNumber(data.delta?.recovered)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.green]}>
          {formatNumber(data.total?.recovered)}{' '}
        </Text>
      </Animatable.View>

      <Animatable.View
        style={styles.levelItem}
        duration={2000}
        animation="bounceInDown"
      > 
        <Text style={styles.heading,styles.grey}>Deceased</Text>
        <Text style={styles.grey}>
          [
          {isNaN(data.delta?.deceased)
            ? ''
            : data.delta?.deceased > 0
            ? '+' + formatNumber(data.delta?.deceased)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.grey]}>{formatNumber(data.total?.deceased)}</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  Level: {
    display: 'flex',
    flexDirection:'row',
    width: '30%',
    paddingHorizontal: 10,
  },
  levelItem: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 14,
    fontFamily:'open-sans-bold',
  },
  heading1:{
    fontSize: 14,
    fontFamily:'open-sans-bold',
  },
  cherry:{
    color:'#ff073a',
    fontFamily:'open-sans-bold',
  },
  blue:{
    color:'#007bff',
    fontFamily:'open-sans-bold',
  },
  green:{
    color:'#28a745',
    fontFamily:'open-sans-bold',
  },
  grey:{
    color:'#6c757d',
    fontFamily:'open-sans-bold',
  },
});

export default Level;
