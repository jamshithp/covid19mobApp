import React ,{useState} from 'react';
import { Animated,View, Text, StyleSheet } from 'react-native';
import PlaceItem from '../components/PlaceItem';
import Level from '../components/level';
import {
    formatDateAbsolute,
  } from '../utils/common-functions';
import VaccinationGraph from './VaccinationGraph';


const DistrictWiseData = (props) => {
  const [scrollY,setScrollY] = useState(new Animated.Value(0));
  return (
    <View>
      <Text style={styles.lastupdatedtime}>
        Last Updated on{' '}
        {props.districts && Object.keys(props.districts[0]).length
        ? formatDateAbsolute(props.lastupdatedtime)
        : ''}
      </Text>
      {props.vaccinationData?.total && <VaccinationGraph data={props.vaccinationData}/>}
      <View>
        <Level data={props.states}/>
      </View>
      <Animated.ScrollView
        overScrollMode={'never'}
        style={styles.ScrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset:{y:scrollY}}
              }
            ]
        )}>
        {props.districts.map(district =>
          <PlaceItem
          title={district.name}
          item={district}
          key={district.id}
          zones={props.zones[district.name]}
          screen='district'
        />
        )}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    lastupdatedtime: {
        fontSize: 15,
        padding:10,
        fontFamily:'open-sans-bold',
    },
    ScrollView:{
        zIndex: 10,
        marginBottom:150,
    }
});

export default DistrictWiseData;
