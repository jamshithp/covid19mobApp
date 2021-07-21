import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {getStates,getDistricts, getSlots} from "../utils/fetchAPI";
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Slots from '../components/Slots';

function Vaccination(props) {
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [stateCode, setStateCode] = useState(0);
  const [districtCode, setDistrictCode] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [slotsList, setSlotsList] = useState([]);
  const [doseChoice, setDoseChoice] = useState("");
  const [freeSlots, setfreeslots] = useState({});
  


  useEffect(()=>{
    async function fetchData(){
      const listOfStates = await getStates();
      setStateList(listOfStates);
    }
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchDistricts=async(ID)=>{
      const listOfDistricts = await getDistricts(ID);
      setDistrictList(listOfDistricts);
    }
    fetchDistricts(stateCode);
  }, [stateCode]);

  useEffect(()=>{
    const fetchSlots = async(ID,date) => {
      const listOfSlots = await getSlots(ID,date);
      console.log('listOfSlots',listOfSlots,districtCode)
      setSlotsList(listOfSlots);
    }
    let date = moment().format('DD-MM-YYYY');
    fetchSlots(districtCode,date);
    const interval = setInterval(() => fetchSlots(districtCode,date), 15000)
        return () => {
          clearInterval(interval);
        }
  }, [districtCode]);

  const handleStateSelect = function(itemValue) {
     setStateName(itemValue);
     const stateID = stateList.find(item=>item.state_name===itemValue).state_id;
     setStateCode(stateID);
  }

  const handleDistrictSelect = (itemValue) => {
    setDistrictName(itemValue);
    const districtID = districtList.find(item=> item.district_name===itemValue).district_id;
    console.log('dis',districtID)
    setDistrictCode(districtID);
    displaySlots();
  }

  const handleDoseSelect = (itemValue) => {
    setDoseChoice(itemValue);
    displaySlots();
  }

  const getIndianStateOptions = function () {

  return stateList
    .map((item,index) => {
      return <Picker.Item
        key={index.toString()}
        value={item.state_name}
        label={item.state_name}
        style={styles.itemStyle}
      />
      });
};

const getDistrictsOptions = function () {

  return districtList
    .map((item,index) => {
      return <Picker.Item
        value={item.district_name} 
        key={index.toString()}
        label={item.district_name}
        style={styles.itemStyle}
      />
      });
};

const displaySlots = () =>{
  let centername; let sessions=[]; let freeSlots=[] ;
  let whatsappMessage = "";
  console.log('slotsList',slotsList)
  slotsList.forEach(item=>{
    sessions = item.sessions;
    sessions.forEach(val=>{
      let dose = doseChoice =="dose1" ? val.available_capacity_dose1 : val.available_capacity_dose2;
      if(dose > 0)
        {
          centername = item.name;
          let obj={openSlots:0,centerName:"",slotDate:"",vaccine:"",pincode:""};
          obj.openSlots = dose;
          obj.centerName = centername;
          obj.slotDate = val.date;
          obj.vaccine = val.vaccine;
          obj.pincode = item.pincode;
          whatsappMessage += `\nCenter Name:`+centername
          +`  Slots: `+ dose+ 
          `  Date: `+val.date+ 
          `  Vaccine Name: `+val.vaccine+
          `  Pincode: `+item.pincode+`%0a%0a`;
          freeSlots.push(obj);
        }
    })
  })
  console.log('freeSlots',freeSlots)
  setfreeslots(freeSlots);
  }
  // else
  // return (
  //   <div style={{display:"flex",marginTop: "100px"}}>
  //     <ErrorIcon fontSize="medium" style={{width:"4.5rem" ,height:"2.5rem", color:"crimson"}}/>
  //     <Typography variant="h4">No Slots Found</Typography>
  // </div>
  // )



  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.label}>STATE</Text>
        {stateList && (<Picker
          selectedValue={stateName}
          style={styles.PickerStyle}
          onValueChange={(itemValue, itemIndex) => handleStateSelect(itemValue)}
        >
          <Picker.Item
          value=" "
          label="Select state"
          style={styles.itemStyle}
          />
          {getIndianStateOptions()}
        </Picker>)}
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Districts</Text>
        <Picker
          selectedValue={districtName}
          style={styles.PickerStyle}
          onValueChange={(itemValue, itemIndex) => handleDistrictSelect(itemValue)}
        >
          <Picker.Item
          value=" "
          label="Select districts"
          style={styles.itemStyle}
          />
          {districtList && getDistrictsOptions()}
        </Picker>
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Dose</Text>
        <Picker
          selectedValue={doseChoice}
          style={styles.PickerStyle}
          onValueChange={(itemValue, itemIndex) => handleDoseSelect(itemValue)}
        >
          <Picker.Item value={' '} label='select dose'/>
          <Picker.Item value={'dose1'} label='DOSE 1'/>
          <Picker.Item value={'dose2'}label = 'DOSE 2'/>
        </Picker>
      </View>
          { freeSlots.length > 1 && freeSlots.map((item,index)=> 
         <Slots item={item} key={index}/>
          )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    width: 180,
    fontSize:20,
  },
  itemStyle:{
    fontFamily: 'open-sans-bold',
    fontSize:15,
  },
});

Vaccination.navigationOptions = navData => {
  return {
    headerTitle: 'Vaccination'
  };
};

export default Vaccination;
