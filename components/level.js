import React, {useState, useEffect} from 'react';
import {formatNumber} from '../utils/common-functions';
import { View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

function Level(props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData({
      active: +props.data.active,
      confirmed: +props.data.confirmed,
      recovered: +props.data.recovered,
      deaths: +props.data.deaths,
      deltaconfirmed: +props.data.deltaconfirmed,
      deltadeaths: +props.data.deltadeaths,
      deltarecovered: +props.data.deltarecovered,
    });
  }, [props.data]);

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
          {isNaN(data.deltaconfirmed)
            ? ''
            : data.deltaconfirmed > 0
            ? '+' + formatNumber(data.deltaconfirmed)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.cherry]}>{formatNumber(data.confirmed)} </Text>
      </Animatable.View>

      <Animatable.View
        style={styles.levelItem}
        duration={2000}
        animation="bounceInDown"
      >
        <Text style={styles.heading,styles.blue}>Active</Text>
        <Text>&nbsp;</Text>
        {/* <Text>[{props.deltas ? props.deltas.confirmeddelta-(props.deltas.recovereddelta+props.deltas.deceaseddelta) >=0 ? '+'+(props.deltas.confirmeddelta-(props.deltas.recovereddelta+props.deltas.deceaseddelta)).toString() : '+0' : ''}]</Text>*/}
        <Text style={[styles.heading1,styles.blue]}>{formatNumber(data.active)}</Text>
      </Animatable.View>

      <Animatable.View
        style={styles.levelItem}
        duration={2000}
        animation="bounceInDown"
      >
        <Text style={styles.heading,styles.green}>Recovered</Text>
        <Text style={styles.green}>
          [
          {isNaN(data.deltarecovered)
            ? ''
            : data.deltarecovered > 0
            ? '+' + formatNumber(data.deltarecovered)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.green]}>
          {formatNumber(data.recovered)}{' '}
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
          {isNaN(data.deltadeaths)
            ? ''
            : data.deltadeaths > 0
            ? '+' + formatNumber(data.deltadeaths)
            : '+0'}
          ]
        </Text>
        <Text style={[styles.heading1,styles.grey]}>{formatNumber(data.deaths)}</Text>
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
    fontSize: 20,
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
