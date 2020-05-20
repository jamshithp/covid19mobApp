import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {format, subDays} from 'date-fns';
import * as Icon from 'react-feather';
import { View, Picker, StyleSheet ,Text ,Button ,ActivityIndicator , Switch}  from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import Patients from '../components/patients';
// import DownloadBlock from './downloadblock';

function filterByObject(obj, filters) {
  const keys = Object.keys(filters);
  return obj.filter((p) => {
    return keys.every((key) => {
      if (!filters[key].length) return true;
      return p[key] === filters[key];
    });
  });
}

function PatientDB(props) {
  const [fetched, setFetched] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [error, setError] = useState('');
  const [colorMode, setColorMode] = useState('genders');
  const [scaleMode, setScaleMode] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(false);
  const [filters, setFilters] = useState({
    detectedstate: 'Select State',
    detecteddistrict: 'Select District',
    detectedcity: 'Select City',
    dateannounced: format(subDays(new Date(), 1), 'dd/MM/yyyy'),
  });
  const [showLoader, setshowLoader] = useState(false);

  const loader = !fetched?'loader':'';


  useEffect(() => {
    async function fetchRawData() {
      const response = await axios.get(
        'https://api.covid19india.org/raw_data.json'
      );
      if (response.data) {
        setPatients(response.data.raw_data.reverse());
        setFetched(true);
        setshowLoader(false);
      } else {
        setError("Couldn't fetch patient data. Try again after sometime.");
      }
    }

    if (!fetched) {
      fetchRawData();
      setshowLoader(true);
    }
  }, [fetched]);

  const handleFilters = (label, value) => {
    setshowLoader(true);
    setFilters((f) => {
      // Create new object (deep copy)
      const newFilters = {...f};
      newFilters[label] = value;
      if (label === 'detectedstate') {
        newFilters['detecteddistrict'] = 'Select District';
        newFilters['detectedcity'] = 'Select City';
      } else if (label === 'detecteddistrict') {
        newFilters['detectedcity'] = 'Select City';
      }
      if(label === 'dateannounced'){
        setShow(false);
      }
      setshowLoader(false);
      return newFilters;
    });
  };

  useEffect(() => {
    setFilteredPatients(filterByObject(patients, filters));
  }, [patients, filters]);

  function getSortedValues(obj, key) {
    const setValues = new Set(obj.map((p) => p[key]));
    if (setValues.size > 1) setValues.add('');
    if (key === 'dateannounced') return Array.from(setValues);
    return Array.from(setValues).sort();
  }

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={[styles.container,styles[loader]]}>
      {showLoader ?<ActivityIndicator size="large" color="#0000ff" />:
      <View>
      <Text className="alert alert-danger">{error ? error : ''}</Text>

      <View className="filters fadeInUp" style={{animationDelay: '0.5s'}}>
        <View className="filters-left">
          <View style={styles.option}>
            <Picker
             selectedValue = {filters['detectedstate']}
             style={styles.PickerStyle}
             onValueChange={(itemValue) => handleFilters('detectedstate', itemValue)}
            >
              <Picker.Item value="Select State" label="Select State"/>
              {getSortedValues(patients, 'detectedstate').map(
                (state, index) => {
                  return (
                    <Picker.Item key={index} value={state} label={state === '' ? 'All' : state}/>
                  );
                }
              )}
            </Picker>
          </View>

          {filters['detectedstate'] !== 'Select State' && <View style={styles.option}>
            <Picker
              style={styles.PickerStyle}
              selectedValue = {filters['detecteddistrict']}
              onValueChange={(itemValue) => {
                handleFilters('detecteddistrict', itemValue);
              }}
            >
              <Picker.Item value="Select District" label="Select District" />
              {getSortedValues(
                filterByObject(patients, {
                  detectedstate: filters.detectedstate,
                }),
                'detecteddistrict'
              ).map((district, index) => {
                return (
                  <Picker.Item key={index} value={district} label={district === '' ? 'All' : district}/>
                );
              })}
            </Picker>
          </View>}

          {filters['detecteddistrict'] !== 'Select District' && <View style={styles.option}>
            <Picker
              style={styles.PickerStyle}
              selectedValue = {filters['detectedcity']}
              onValueChange={(itemValue) => {
                handleFilters('detectedcity', itemValue);
              }}
            >
              <Picker.Item value="Select City" selected label=" Select City"/>
              {getSortedValues(
                filterByObject(patients, {
                  detectedstate: filters.detectedstate,
                  detecteddistrict: filters.detecteddistrict,
                }),
                'detectedcity'
              ).map((city, index) => {
                return (
                  <Picker.Item key={index} value={city} label={city === '' ? 'All' : city}/>
                );
              })}
            </Picker>
          </View>}
          {filters['detectedcity'] !== 'Select City' && <View style={styles.dateContainer}>
            <Button title="Select Date" style={styles.button} onPress={showDatepicker}/>
            <Text style={styles.dateText}>{format(filterDate, 'dd/MM/yyyy')}</Text>
            {show && <DateTimePicker
              testID="dateTimePicker"
              value={filterDate}
              minDate={new Date('30-Jan-2020')}
              maxDate={subDays(new Date(), 1)}
              mode={'date'}
              display="calendar"
              onChange={(date) => {
                const date1 = date ? date.nativeEvent.timestamp : filterDate;
                const fomattedDate = !!date1 ? format(date1, 'dd/MM/yyyy') : '';
                handleFilters('dateannounced', fomattedDate);
                setFilterDate(date1);
              }}
            />}
          </View>}
        </View>

        <View style={styles.legend}>
          {colorMode === 'genders' && (
            <View style={styles.legend} className="legend-left">
              <View style={[styles.circle,styles.female]} className="circle is-female"></View>
              <Text style={styles.femaleText}>Female</Text>
              <View style={[styles.circle,styles.male]}></View>
              <Text style={styles.maleText}>Male</Text>
              <View style={[styles.circle]}></View>
              <Text style={styles.Text}>Unknown</Text>
            </View>
          )}

          {colorMode === 'transmission' && (
            <View style={styles.legend} className="legend-left">
              <View style={[styles.circle,styles.female]} className="circle is-local"></View>
              <Text style={styles.femaleText}>Local</Text>
              <View style={[styles.circle,styles.male]}></View>
              <Text style={styles.maleText}>Imported</Text>
              <View style={[styles.circle]}></View>
              <Text style={styles.Text}>Unknown</Text>
            </View>
          )}

          {colorMode === 'nationality' && (
            <View className="legend-left nationality">
              <View className="circle is-in"></View>
              <Text className="is-in">In</Text>
              <View className="circle is-uk"></View>
              <Text className="is-uk">Uk</Text>
              <View className="circle is-us"></View>
              <Text className="is-us">Us</Text>
              <View className="circle is-th"></View>
              <Text className="is-thailand">Th</Text>
              <View className="circle is-ph"></View>
              <Text className="is-ph">Ph</Text>
              <View className="circle is-it"></View>
              <Text className="is-it">It</Text>
              <View className="circle is-ca"></View>
              <Text className="is-ca">Ca</Text>
              <View className="circle is-id"></View>
              <Text className="is-id">Id</Text>
              <View className="circle is-mm"></View>
              <Text className="is-mm">Mm</Text>
            </View>
          )} 

          <View style={styles.categorie}>
            <Picker
              selectedValue={colorMode}
              style={styles.PickerStyle}
              onValueChange={(itemValue) => {
                setColorMode(itemValue);
              }}
            >
              {/* <Picker.Item value=""  label="Color modes"/> */}
              <Picker.Item value="genders" label="Genders"/>
              <Picker.Item value="transmission" label="Transmission"/>
            </Picker>
          </View>
        </View>
      </View>

      <View  style={{animationDelay: '0.3s'}}>
        <View style={styles.toogleSection}>
          <Text style={styles.sectionHead}>Patients List</Text>
          <View className="deep-Viewe">
            <Switch value={scaleMode} onValueChange={()=>setScaleMode(!scaleMode)}/>
          </View>
        </View>
        {/* <Text className="disclaimer">
          Some of the data provided might be missing/unknown as the details have
          not been shared by the state/central governments.
        </Text> */}
      </View>
      <View className="patientdb-wrapper">
        {scaleMode && <Patients
          patients={filteredPatients}
          colorMode={colorMode}
          expand={scaleMode}
        />}
      </View>
    </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor:'#FFFAFA',
    padding:10,
  },
  loader:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  spincontainer:{
    flex: 1,
    justifyContent: 'center',
  },
  option:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
  },
  label:{
    padding:10,
    fontFamily: 'open-sans-bold',
    fontSize:16,
  },
  dateContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
  },
  dateText:{
    fontSize:18,
    padding:10,
  },
  button:{
    height:10,
    width: 10,
    marginRight:10,
  },
  toogleSection:{
    display:'flex',
    flexDirection:'row',
    padding:5
  },
  sectionHead:{
    fontSize:20,
  },
  PickerStyle:{
    height:50,
    width: 160,
    fontSize:20,
  },
  itemStyle:{
    fontFamily:'open-sans-bold',
    fontSize:20,
  },
  legend:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingTop:5,
    alignItems: 'center',
  },
  categorie:{
    display:'flex',
    flexDirection:'row',
  },
  circle:{
    width:15,
    height:15,
    borderRadius:50,
    margin:5,
    backgroundColor:'#6c757d99',
  },
  female:{
    backgroundColor:'#e83e8c',
  },
  femaleText:{
    color:'#e83e8c',
    fontFamily:'open-sans-bold',
  },
  male:{
    backgroundColor:'#4c75f2',
  },
  maleText:{
    color:'#4c75f2',
    fontFamily:'open-sans-bold',
  },
  Text:{
    color:'#6c757d99',
    fontFamily:'open-sans-bold',
  }
});

PatientDB.navigationOptions = navData => {
  return {
    headerTitle: 'Demographics',
  };
};


export default PatientDB;
