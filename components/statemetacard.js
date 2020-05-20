import React from 'react';
import {  Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

function StateMetaCard({
  title,
  statistic,
  total,
  formula,
  date,
  description,
  style,
}) {
  return (
    <Animatable.View style={[styles.metaItem,styles[style]]} duration={700} animation="slideInLeft">
      <Text style={[styles.h3,styles[`${style}Mid`]]}>{title}</Text>
      <Text style={[styles.h1,styles[`${style}High`]]}>{statistic}</Text>
      <Text style={[styles.h5,styles[`${style}Mid`]]}>{date}</Text>
      {total && <Text style={[styles.h5,styles[`${style}Mid`]]}>{`India has ${total} CPM`}</Text>}
      <Text style={[styles.h3,styles[`${style}Mid`]]}>{description}</Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  metaItem:{
      justifyContent: 'flex-start',
      borderRadius: 10,
      width:'43%',
      height:300,
      alignSelf: 'center',
      margin:10,
      padding:15,
  },
  metaItemTop :{
    display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  mortality:{
    backgroundColor:'#6c757d10',
  },
  mortalityMid:{
    color:'#6c757d99',
  },
  mortalityHigh:{
    color:'#6c757d',
  },
  h3:{
    fontSize:15,
    fontFamily: 'open-sans-bold',
    alignSelf: 'flex-start',
  },
  h1:{
    fontSize:20,
    fontFamily: 'open-sans-bold',
    padding:5
  },
  h5:{
    fontSize:13,
  },
  recovery:{
    backgroundColor:'#28a74520',
  },
  recoveryMid:{
    color:'#28a74599',
  },
  recoveryHigh:{
    color:'#28a745',
  },
  active:{
    backgroundColor:'#007bff10',
  },
  activeMid:{
    color:'#007bff99',
  },
  activeHigh:{
    color:'#007bff',
  },
  confirmed:{
    backgroundColor:'#ff073a20',
  },
  confirmedMid:{
    color:'#ff073a99',
  },
  confirmedHigh:{
    color:'#ff073a',
  },
  cpm:{
    backgroundColor:'#ffc10720',
  },
  cpmMid:{
    color:'#fd7e1499',
  },
  cpmHigh:{
    color:'#fd7e14',
  },
  tpm:{
    backgroundColor:'#201aa220',
  },
  tpmMid:{
    color:'#201aa299',
  },
  tpmHigh:{
    color:'#201aa2dd',
  },
  ptr:{
    backgroundColor:'#ffa8cb30',
  },
  ptrMid:{
    color:'#fb558199',
  },
  ptrHigh:{
    color:'#fb5581',
  },
  gr:{
    backgroundColor:'#b6854d10',
  },
  grMid:{
    color:'#b6854d99',
  },
  grHigh:{
    color:'#b6854d',
  }
});
export default StateMetaCard;
