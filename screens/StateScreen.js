import React from 'react';
import { StyleSheet ,Text} from 'react-native';
import { Tab, Tabs } from 'native-base';
import DistrictWiseData from '../components/districtWiseData';
import StateDetails from '../components/stateDetails';
import StateServices from '../components/StateServices';


const StateScreen = props => {
  const districtData = props.navigation.getParam('districtData'),
    states = props.navigation.getParam('states'),
    lastupdatedtime=props.navigation.getParam('lastUpdated'),
    vaccinationData= props.navigation.getParam('vaccinationData');
  const districts =  Object.keys(districtData).sort(
    (a, b) =>
      districtData[b].total?.confirmed -
      districtData[a].total?.confirmed
  ).map(key=> {
    const district = districtData[key];
      district.name = key;
      return district;
    }
    );


  return (
    <Tabs
      style={styles.tabs}
      tabBarUnderlineStyle={{
      backgroundColor: "orange",
    }}>
      <Tab
        style={styles.tabHeading}
        textStyle={styles.tabText}
        tabStyle={{ backgroundColor: "transparent" }}
        activeTabStyle={{ backgroundColor: "transparent" }}
        activeTextStyle={styles.activeTextStyle}
        heading="District Wise"
      >
        <DistrictWiseData
          districts={districts}
          states={states}
          lastupdatedtime={lastupdatedtime}
          vaccinationData={vaccinationData}
        />
        </Tab>
        <Tab
        style={styles.tabHeading}
        textStyle={styles.tabText}
        tabStyle={{ backgroundColor: "transparent" }}
        activeTabStyle={{ backgroundColor: "transparent" }}
        activeTextStyle={styles.activeTextStyle}
        heading="Services"
      >
       <StateServices state={states.state}/>
      </Tab>
      <Tab
        style={styles.tabHeading}
        textStyle={styles.tabText}
        tabStyle={{ backgroundColor: "transparent" }}
        activeTabStyle={{ backgroundColor: "transparent" }}
        activeTextStyle={styles.activeTextStyle}
        heading="Metadata"
      >
       <StateDetails statecode={states.statecode}/>
      </Tab>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs:{
    top: 1,
    height:5,
  },
  tabHeading:{
    fontFamily:'open-sans-bold',
  },
  tabText:{
    fontFamily:'open-sans-semibold',
  },
  activeTabStyle:{

  },
  activeTextStyle:{
    color: "#ffffff", 
    fontFamily:'open-sans-bold',
    fontSize: 17,
  },
 
});

StateScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  };
};



export default StateScreen;
