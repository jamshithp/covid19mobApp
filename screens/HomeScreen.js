import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Platform, FlatList ,Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import axios from 'axios';
import HeaderButton from '../components/HeaderButton';
import {
  formatDate,
  preprocessTimeseries,
  parseStateTimeseries,
  parseDistrictZones,
} from '../utils/common-functions';

import PlaceItem from '../components/PlaceItem';
import Level from '../components/level';
import DistrictSlots from '../components/DistrictSlots';

import Expo from 'expo';

function HomeScreen(props) {
    const [states, setStates] = useState([]);
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
    const [mainData,setMainData] = useState([]);
    const [districtZones, setDistrictZones] = useState(null);
    const [fetched, setFetched] = useState(false);
  
    useEffect(() => {
      if (fetched === false) {
        getStates();
      }
    }, [fetched]);
  
    const getStates = async () => {
      try {

        const [
          {data: statesDailyResponse},
          {data: zonesResponse},
          {data: mainStatesData},
        ] = await Promise.all([
          axios.get('https://api.covid19india.org/states_daily.json'),
          axios.get('https://api.covid19india.org/zones.json'),
          axios.get('https://data.covid19india.org/v4/min/data.min.json'),
        ]);

        const [
          {data},
          stateDistrictWiseResponse,
          {data: stateTestData},
        ] = await Promise.all([
          axios.get('https://api.covid19india.org/data.json'),
          axios.get('https://api.covid19india.org/state_district_wise.json'),
          axios.get('https://api.covid19india.org/state_test_data.json'),
        ]);
        setStates(data.statewise);
        setMainData(mainStatesData);
        setDistrictZones(parseDistrictZones(zonesResponse.zones));

        const ts = parseStateTimeseries(statesDailyResponse);
        ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
        const testData = stateTestData.states_tested_data.reverse();
        const totalTest = data.tested[data.tested.length - 1];
        testData.push({
          updatedon: totalTest.updatetimestamp.split(' ')[0],
          totaltested: totalTest.totalindividualstested,
          source: totalTest.source,
          state: 'Total', // India
        });
        setStateDistrictWiseData(stateDistrictWiseResponse.data);
        setFetched(true);
      } catch (err) {
        console.log(err);
      }
    };

    const getLevel= (states) => {
      if(states && states.length){
        return <Level data={states[0]} />;
      }
    }

    const sortedStates = Object.keys(states)
    .sort(
      (a, b) =>
      states[b].confirmed - states[a].confirmed
    ).map(key=> {
      const state = states[key];
      return state;
    });
  
    return (
      <View>
        <DistrictSlots
        data={mainData.TT}
        onPress={(state,district) => {
          props.navigation.navigate('Vaccination', {
            state:state,
            district:district,
          });
        }}
        />
        {getLevel(states)}
        <FlatList
          data={sortedStates.slice(1)}
          keyExtractor={item => item.statecode}
          renderItem={itemData => (
            <PlaceItem
              title={itemData.item.state}
              item={itemData.item}
              screen='state'
              key={itemData => itemData.item.statecode}
              onSelect={() => {
                const districtData = stateDistrictWiseData[itemData.item.state].districtData;
                props.navigation.navigate('state', {
                  placeTitle: itemData.item.state,
                  districtData:districtData,
                  zones:districtZones[itemData.item.state],
                  states:itemData.item,
                  lastUpdated:itemData.item.lastupdatedtime,
                  vaccinationData:mainData[itemData.item.statecode],
                });
              }}
            />
          )}
        />
      </View>
    );
  }

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COVID19 INDIA',
    headerRight:()=>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Updates"
          iconName={Platform.OS === 'android' ? 'md-notifications' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Updates');
          }}
        />
      </HeaderButtons>
    ,
    headerLeft: ()=>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({

  });

export default HomeScreen;
