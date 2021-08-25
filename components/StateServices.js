import React, { useState,useEffect } from "react";
import { View, Picker, StyleSheet ,Text ,Button ,ScrollView , ActivityIndicator}  from "react-native";
import axios from 'axios';
import {Colors} from '../constants';
import AccordionView from '../components/Accordion';

const StateServices = (props) => {
    const [data, setData] = useState([]);
    const [partData, setPartData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const city = 'all';
    const [category, setCategory] = useState('all');
    const indianstate= props.state;
    const [resourcedict, setResourceDict] = useState({});
    const [showTable, setShowTable] = useState(false);

    const loader = !filtered?'loader':'';
  
  
    useEffect(() => {
      if (fetched === false) {
        getResources();
      }
    }, [fetched]);

    useEffect(() => {
        if (fetched === true) {
            filterTable();
        }
      }, [fetched]);

    const getResources = async () => {
        try {
          const [response] = await Promise.all([
            axios.get('https://api.covid19india.org/resources/resources.json'),
          ]);
          const hashmap = {};
          response.data.resources.forEach((x) => {
            if (typeof hashmap[x['state']] === 'undefined')
              hashmap[x['state']] = {};
            if (typeof hashmap[x['state']][x['city']] === 'undefined')
              hashmap[x['state']][x['city']] = {};
            if (
              typeof hashmap[x['state']][x['city']][x['category']] === 'undefined'
            )
              hashmap[x['state']][x['city']][x['category']] = [];
            if (Array.isArray(hashmap[x['state']][x['city']][x['category']]))
              hashmap[x['state']][x['city']][x['category']].push(x);
          });
    
    
          setResourceDict(hashmap);
          // setIndianState(Object.keys()[0]);
    
          setFetched(true);
          //console.log(resourcedict);
        } catch (err) {
          console.log(err);
        }
      }
      const getCategoryOptions = function () {
              const array = [];
              Object.values(resourcedict[indianstate]).forEach((citydata) => {
                Object.keys(citydata).forEach((x) => {
                  if (array.indexOf(x) === -1) array.push(x);
                });
              });
              return array.map((x) => (
                <Picker.Item
                  key={x.id}
                  value={x}
                  label={x}
                  style={styles.itemStyle}
                />
              ));
      };

      const changeCategory = function (itemValue) {
        setCategory(itemValue);
        filterTable(itemValue);
      };
      
      const filterTable = function (itemValue = 'all') {
        let a = [];
        if (itemValue=== 'all') {
              Object.values(resourcedict[indianstate]).forEach((citydata) => {
                Object.values(citydata).forEach((category) => {
                  category.forEach((x) => a.push(x));
                });
            });
        } else {
            Object.values(resourcedict[indianstate]).forEach((citydata) => {
                Object.values(citydata).forEach((category) => {
                  category.forEach((x) => {
                      if (x.category === itemValue) a.push(x);
                });
            });
        });
        }
        try {
          if ('PAN India' in resourcedict) {
            resourcedict['PAN India']['Multiple']['CoVID-19 Testing Lab'].forEach(
              (element) => {
                a.push(element);
              }
            );
          }
        } catch (err) {
          // console.log('No PAN India row found');
        }
        setData(a);
        setPartData(a.slice(0, 50));
        setShowTable(true);
        setFiltered(true);
      };


    return (
        <View style={[styles.container,styles[loader]]}>
        {!filtered ?<ActivityIndicator size="large" color="#0000ff" />:
            <ScrollView style={styles.Content}>
            <View style={styles.option}>
                <Text style={styles.label}>SERVICES</Text>
                <Picker
                selectedValue={category}
                style={styles.PickerStyle}
                onValueChange={(itemValue, itemIndex) => changeCategory(itemValue)}
                >
                <Picker.Item
                value="all"
                label="All Categories"
                style={styles.itemStyle}
                />
                {getCategoryOptions()}
                </Picker>
            </View>
                {showTable && <AccordionView data={partData}/>}
            </ScrollView>}
        </View>
    )
}

export default StateServices;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:'#FFFAFA',
      },
      loader:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      Content:{
          padding:25,
      },
      option:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'open-sans-bold',
      },
      label:{
        padding: 10,
        fontFamily: 'open-sans-bold',
        fontSize:16,
      },
      PickerStyle:{
        height: 50,
        width: 160,
        fontSize:20,
      },
      itemStyle:{
        fontFamily: 'open-sans-bold',
        fontSize:20,
      },
      backgroundImage:{
        opacity:0.9,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
})
