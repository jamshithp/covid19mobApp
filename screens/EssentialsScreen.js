import React, { useState,useEffect } from "react";
import { View, Picker, StyleSheet ,Text ,Button ,ScrollView , ImageBackground}  from "react-native";
import axios from 'axios';
import {Colors} from '../constants';
import AccordionView from '../components/Accordion';

export default function ServicesScreen() {
    const [data, setData] = useState([]);
  const [partData, setPartData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [city, setCity] = useState('all');
  const [category, setCategory] = useState('all');
  const [indianstate, setIndianState] = useState('all');
  const [resourcedict, setResourceDict] = useState({});
  const [showTable, setShowTable] = useState(false);


  useEffect(() => {
    if (fetched === false) {
      getResources();
    }
  }, [fetched]);

  const getResources = async () => {
    try {
      const [response] = await Promise.all([
        axios.get('https://api.covid19india.org/resources/resources.json'),
      ]);
      const hashmap = {};
      response.data.resources.forEach((x) => {
        // console.log(x)
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

      console.log("hashmap",hashmap)

      setResourceDict(hashmap);
      // setIndianState(Object.keys()[0]);

      setFetched(true);
      //console.log(resourcedict);
    } catch (err) {
      console.log(err);
    }
  };
  const getIndianStateOptions = function () {
      //console.log("value",resourcedict);
    // let defaultOption = ['Please select']
    return Object.keys(resourcedict)
      .sort()
      .map((x) => {
        return <Picker.Item
          key={x.id}
          value={x}
          label={x}
          style={styles.itemStyle}
        />
        });
  };

  const getCityOptions = function () {
    if (indianstate) {
      if (indianstate === 'all') return [];
      else {
        return Object.keys(resourcedict[indianstate])
          .sort()
          .map((x) => {
          return <Picker.Item 
              key={x.id}
              value={x}
              label={x}
              style={styles.itemStyle}
        />
        });
      }
    } else return [];
    // return getCityList().map((x) => <option value={x}>{x}</option>)
  };
  const getCategoryOptions = function () {
    if (indianstate && city) {
      if (indianstate === 'all') {
        const array = [];
        Object.values(resourcedict).forEach((state) => {
          Object.values(state).forEach((citydata) => {
            Object.keys(citydata).forEach((x) => {
              if (array.indexOf(x) === -1) array.push(x);
            });
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
      } else {
        if (city === 'all') {
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
        } else {
          return Object.keys(resourcedict[indianstate][city])
            .sort()
            .map((x) => (
              <Picker.Item
                key={x.id}
                value={x}
                label={x}
                style={styles.itemStyle}
              />
            ));
        }
      }
    } else return [];
  };

  const changeIndianState = function (itemValue) {
    setIndianState(itemValue);
    // setCity(
    //   Object.keys(resourcedict[changedstateevent.target.value]).sort()[0]
    // );
    if (itemValue === '') {
      setCity('');
      //document.getElementById('cityselect1').selectedIndex = 0;
      setCategory('');
      //document.getElementById('categoryselect').selectedIndex = 0;
    } else {
      setCity('all');
      //document.getElementById('cityselect1').selectedIndex = 1;
      setCategory('all');
      //document.getElementById('categoryselect').selectedIndex = 1;
    }
  };
  const changeCity = function (itemValue) {
    setCity(itemValue);
    setCategory('all');
    //document.getElementById('categoryselect').selectedIndex = 1;
  };
  const changeCategory = function (itemValue) {
    setCategory(itemValue);
    // console.log(changedcategoryevent.target.value);
  };
  const appendData = function () {
    const tempArr = partData.concat(
      data.slice(partData.length, partData.length + 30)
    );
    setPartData(tempArr);
  };

  const filterTable = function () {
    // console.log('Search Button Pressed');
    // console.log(`Filters are: ${indianstate} ---> ${city} ----> ${category}`);
    let a = [];
    if (category === 'all') {
      // console.log("All category selected");
      if (city === 'all') {
        if (indianstate === 'all') {
          Object.values(resourcedict).forEach((state) => {
            Object.values(state).forEach((citydata) => {
              Object.values(citydata).forEach((category) => {
                category.forEach((x) => a.push(x));
              });
            });
          });
        } else {
          Object.values(resourcedict[indianstate]).forEach((citydata) => {
            Object.values(citydata).forEach((category) => {
              category.forEach((x) => a.push(x));
            });
          });
        }
      } else {
        Object.values(resourcedict[indianstate][city]).forEach((x) => {
          x.forEach((y) => a.push(y));
        });
      }
    } else {
      // console.log(`Category chosen ${category}`);
      // a = resourcedict[indianstate][city][category];

      if (indianstate === 'all' && city === 'all') {
        Object.values(resourcedict).forEach((state) => {
          Object.values(state).forEach((citydata) => {
            Object.values(citydata).forEach((categorydata) => {
              categorydata.forEach((x) => {
                if (x.category === category) a.push(x);
              });
            });
          });
        });
      } else if (indianstate !== 'all' && city === 'all') {
        Object.values(resourcedict[indianstate]).forEach((citydata) => {
          if (category in citydata) {
            citydata[category].forEach((x) => {
              a.push(x);
            });
          }
        });
      } else {
        a = resourcedict[indianstate][city][category];
      }
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
    setPartData(a.slice(0, 30));
    // console.log(resourcedict[indianstate][city][category]);
    // console.log(data);
    setShowTable(true);
  };

  const openSharingLink = function (message) {
    const shareUri = `https://www.addtoany.com/share#url=${encodeURI(
      'https://www.covid19india.org/essentials'
    )}&title=${encodeURI(message)}`;

    const h = 500;
    const w = 500;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    return window.open(
      shareUri,

      document.title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    );
  };

  return (
    <ImageBackground source={require('../assets/services.png')} style={styles.backgroundImage}>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.label}>STATE</Text>
        <Picker
          selectedValue={indianstate}
          style={styles.PickerStyle}
          onValueChange={(itemValue, itemIndex) => changeIndianState(itemValue)}
        >
          <Picker.Item
          value="all"
          label="All state"
          style={styles.itemStyle}
          />
          {getIndianStateOptions()}
        </Picker>
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>CITY</Text>
        <Picker
          selectedValue={city}
          style={styles.PickerStyle}
          onValueChange={(itemValue, itemIndex) => changeCity(itemValue)}
        >
          <Picker.Item
          value="all"
          label="All Cities"
          style={styles.itemStyle}
          />
          {getCityOptions()}
        </Picker>
      </View>
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
      <Button
          title="Search"
          color={Colors.primary}
          onPress={filterTable}
        />
          {showTable && <AccordionView data={partData}/>}
    </View>
    </ScrollView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: 'center',
    width:'100%',
    backgroundColor:'#FFFAFA',
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
});

ServicesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Services',
  };
};