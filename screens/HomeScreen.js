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
import {STATE_CODES} from '../constants';
import Level from '../components/level';
//import PushNotification from '../components/PushNotification';
//import ZoneInfo from '../components/ZoneInfo';

import Expo from 'expo';

function HomeScreen(props) {
    const [states, setStates] = useState([]);
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
    const [districtZones, setDistrictZones] = useState(null);
    const [stateTestData, setStateTestData] = useState({});
    const [fetched, setFetched] = useState(false);
    const [graphOption, setGraphOption] = useState(1);
    const [lastUpdated, setLastUpdated] = useState('');
    const [timeseries, setTimeseries] = useState([]);
    const [activityLog, setActivityLog] = useState([]);
    const [timeseriesMode, setTimeseriesMode] = useState(true);
    const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
    const [regionHighlighted, setRegionHighlighted] = useState(undefined);
  
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
        ] = await Promise.all([
          axios.get('https://api.covid19india.org/states_daily.json'),
          axios.get('https://api.covid19india.org/zones.json'),
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
        setDistrictZones(parseDistrictZones(zonesResponse.zones));

        const ts = parseStateTimeseries(statesDailyResponse);
        ts['TT'] = preprocessTimeseries(data.cases_time_series); // TT -> India
        setTimeseries(ts);
        setLastUpdated(data.statewise[0].lastupdatedtime);
        const testData = stateTestData.states_tested_data.reverse();
        const totalTest = data.tested[data.tested.length - 1];
        testData.push({
          updatedon: totalTest.updatetimestamp.split(' ')[0],
          totaltested: totalTest.totalindividualstested,
          source: totalTest.source,
          state: 'Total', // India
        });
        setStateTestData(testData);
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
        {/* <ZoneInfo 
        districtZones={districtZones}
        onPress={(zone) => {
          props.navigation.navigate('ZoneDetails', {
            zone: zone,
          });
        }}
        /> */}
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
                  lastUpdated:itemData.item.lastupdatedtime
                });
              }}
            />
          )}
        />
        {/* <PushNotification/> */}
      </View>
    );
  }

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COVID19 STATE WISE',
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
