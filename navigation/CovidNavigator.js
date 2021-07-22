import { Platform, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import StateScreen from '../screens/StateScreen';
import VaccinationScreen from '../screens/Vaccination';
import ServicesScreen from '../screens/EssentialsScreen';
import {Colors} from '../constants';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    state: StateScreen,
    Vaccination:VaccinationScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);
const ServicesNavigator = createStackNavigator(
  {
    Services:ServicesScreen,
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);
const VaccinationNavigator = createStackNavigator(
  {
    vaccination:VaccinationScreen,
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

const tabScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="md-home" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text >Home</Text>
        ) : (
          'Home'
        )
    }
  },
  vaccination: {
    screen: VaccinationNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <MaterialCommunityIcons name="hospital-marker" size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text >Vaccination</Text>
        ) : (
          'Vaccination'
        )
    }
  },
  Services: {
    screen: ServicesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return  <AntDesign name="customerservice" size={25} color={tabInfo.tintColor}  />
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text >Services</Text>
        ) : (
          'Services'
        )
    }
  },
};

const CovidTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          // labelStyle: {
          //   fontFamily: 'open-sans'
          // },
          activeTintColor: Colors.accentColor
        }
      });




const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: CovidTabNavigator,
      navigationOptions: {
        drawerLabel: 'Home'
      }
    },
    vaccination: {
      screen: VaccinationNavigator,
      navigationOptions: {
        drawerLabel: 'Vaccination'
      }
    },
    Essentials: {
      screen: ServicesNavigator,
      navigationOptions: {
        drawerLabel: 'Services'
      }
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    }
  }
);

export default createAppContainer(MainNavigator);



