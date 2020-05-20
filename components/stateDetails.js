
import Level from './level';
import StateMeta from './statemeta';


import {MAP_META, STATE_CODES, STATE_POPULATIONS} from '../constants';
import {
  formatDateAbsolute,
  formatNumber,
  mergeTimeseries,
  parseStateTimeseries,
  parseStateTestTimeseries,
} from '../utils/common-functions';
import axios from 'axios';
import {format, parse} from 'date-fns';
import React, {useRef, useState,useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet ,ActivityIndicator} from 'react-native';

function State(props) {
  const [allStateData, setAllStateData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState({});
  const [stateData, setStateData] = useState(null);
  const [testData, setTestData] = useState({});
  const [sources, setSources] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [stateName] = useState(STATE_CODES[props.statecode]);
  const [mapOption, setMapOption] = useState('confirmed');
  const [showAllDistricts, setShowAllDistricts] = useState(false);
  const statecode = props.statecode;

  const loader = !fetched?'loader':'';



  useEffect(() => {
    getState(props.statecode);
  },[]);

  const getState = async (code) => {
    try {
      const [
        {data: dataResponse},
        {data: stateDistrictWiseResponse},
        {data: statesDailyResponse},
        {data: stateTestResponse},
        {data: sourcesResponse},
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
        axios.get('https://api.covid19india.org/sources_list.json'),
      ]);
      const name = STATE_CODES[code];


      const states = dataResponse.statewise;
      setAllStateData(states.filter((state) => state.statecode !== code));
      setStateData([states.find((s) => s.statecode === code)]);
      // Timeseries
      const ts = parseStateTimeseries(statesDailyResponse)[code];
      const testTs = parseStateTestTimeseries(
        stateTestResponse.states_tested_data
      )[code];
      // Merge
      const tsMerged = mergeTimeseries({[code]: ts}, {[code]: testTs});
      setTimeseries(tsMerged[code]);
      // District data
      setDistrictData({
        [name]: stateDistrictWiseResponse[name],
      });
      const sourceList = sourcesResponse.sources_list;
      setSources(sourceList.filter((state) => state.statecode === code));

      const statesTests = stateTestResponse.states_tested_data;
      setTestData(
        statesTests.filter(
          (obj) => obj.state === name && obj.totaltested !== ''
        )
      );
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const testObjLast = testData[testData.length - 1];
  const population = STATE_POPULATIONS[stateName];


    return (
      <View style={[styles.container,styles[loader]]}>
        {!fetched ?<ActivityIndicator size="large" color="#0000ff" />:
        <ScrollView>
        <View style={styles.State}>
          <View style={styles.header}>
              <View
                style={styles.headerleft}
                style={{animationDelay: '0.3s'}}
              >
                <Text style={styles.h1}>{stateName}</Text>
                <Text style={styles.h5}>
                  Last Updated on{' '}
                  {stateData && Object.keys(stateData[0]).length
                    ? formatDateAbsolute(stateData[0].lastupdatedtime)
                    : ''}
                </Text>
              </View>

              <View
                style={styles.headerRight}
                style={{animationDelay: '0.5s'}}
              >
                <Text>Tested</Text>
                <Text style={styles.h2}>{formatNumber(testObjLast?.totaltested)}</Text>
                <Text style="timestamp">
                  {!isNaN(
                    parse(testObjLast?.updatedon, 'dd/MM/yyyy', new Date())
                  )
                    ? `As of ${format(
                        parse(testObjLast?.updatedon, 'dd/MM/yyyy', new Date()),
                        'dd MMM'
                      )}`
                    : ''}
                </Text>
              </View>
            </View>

            {fetched && <Level data={stateData[0]} />}

            {fetched && (
              <StateMeta
                stateData={stateData[0]}
                lastTestObject={testObjLast}
                population={population}
                lastSevenDaysData={timeseries.slice(-7)}
                totalData={allStateData.filter(
                  (state) => state.statecode === 'TT'
                )}
              />
            )}
          </View>
        </ScrollView>}
      </View>
    );
  }

const styles = StyleSheet.create({
    loader:{
      flex: 1,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
    },
    State:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding:5,
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 1,
        width:'100%',
        padding:10,
    },
    headerRight:{
        color: '#201aa299',
        display: 'flex',
        flexDirection: 'column',
        marginTop:1,
        textAlign: 'right',
    },
    h1:{
        fontSize:22,
        color:'#e23028',
        fontFamily: 'open-sans-bold',
    },
    h2:{
        fontSize:18,
        fontFamily: 'open-sans-bold',
    },
    h5: {
        color:'#6c757d',
        fontWeight: '600',
        fontSize:15,
        fontFamily: 'open-sans-bold',
    },
});


export default React.memo(State);
