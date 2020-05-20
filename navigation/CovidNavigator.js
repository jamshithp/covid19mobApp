import { Platform, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import StateScreen from '../screens/StateScreen';
import UpdateScreen from '../screens/UpdateScreen';
import ServicesScreen from '../screens/EssentialsScreen';
import patientDbScreen from '../screens/patientDbScreen';
import ZoneDetailsScreen from '../screens/ZoneDetailsScreen';
import {Colors} from '../constants';


const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    state: StateScreen,
    Updates:UpdateScreen,
    ZoneDetails:ZoneDetailsScreen,
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
const NewsNavigator = createStackNavigator(
  {
    News:UpdateScreen,
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

const DemographicsNavigator = createStackNavigator(
  {
    patientsDB:patientDbScreen,
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
  Services: {
    screen: ServicesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="md-contacts" size={25} color={tabInfo.tintColor} />;
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
  Demographics: {
    screen: DemographicsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="md-cube" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text >Demographics</Text>
        ) : (
          'Demographics'
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
    Essentials: {
      screen: ServicesNavigator,
      navigationOptions: {
        drawerLabel: 'Services'
      }
    },
    Demographics: {
      screen: DemographicsNavigator,
      navigationOptions: {
        drawerLabel: 'Demographics'
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



