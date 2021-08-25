import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import axios from 'axios';
import HeaderButton from '../components/HeaderButton';
import DistrictSlots from '../components/DistrictSlots';

function HomeScreen(props) {

    const [mainData,setMainData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
      if (fetched === false) {
        getStates();
      }
    }, [fetched]);

    const getStates = async () => {
      try {
        const [{data: mainStatesData}] = await Promise.all([axios.get('https://data.covid19india.org/v4/min/data.min.json')]);
        setMainData(mainStatesData);
        setFetched(true);
      } catch (err) {
        console.log(err);
      }
    };
  
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
