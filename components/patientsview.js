import React from 'react';
import {format} from 'date-fns';
import { View, StyleSheet ,Text , TouchableOpacity, ScrollView}  from "react-native";

function PatientsView(props) {
  const logs = props.logs;

  return (
   <ScrollView>
    <View style={styles.Patients}>
      {Object.keys(logs)
        .slice(props.summary ? -1 : 0)
        .map((day, index) => {
          if (day !== 'Invalid Date') {
            return (
              <View key={index}>
                <Text style={styles.daylabel}>
                  {format(new Date(day), 'dd MMM, yyyy')}{' '}
                  {'(' + logs[day].length + ')'}
                </Text>
                <View
                  key={index}
                  style={styles.patientContainer}
                >
                  {logs[day]
                    .slice(props.summary ? -40 : 0)
                    .map((patient, indexTwo) => {
                      return (
                        <TouchableOpacity key={indexTwo} onPress={()=> {
                          props.setModal(true);
                          props.setPatient(patient);
                        }}>
                        <View
                          style={[styles.patientCard,styles[props.applyClass(patient)]]}
                          className={props.applyClass(patient)}
                        >
                          <Text style={styles.patientNumber}>
                            {props.expand ? `P${patient.patientnumber}` : ''}
                          </Text>
                        </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            );
          } else {
            return null;
          }
        })}
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  Patients:{
    width: '100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:10,
  },
  daylabel:{
    fontSize:16,
    paddingBottom:10,
    color:'#4c75f2',
    fontFamily: 'open-sans-bold',
  },
  patientContainer: {
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  patientCard:{
    display: 'flex',
    //flexDirection:'row',
    padding:5,
    width:70,
    height:30,
    margin:5,
    borderRadius:5,
    justifyContent:'space-around',
    backgroundColor:'#6c757d10'
  },
  patientNumber:{
    padding:5,
  },
  female:{
    backgroundColor:'#e83e8c',
  },
  male:{
    backgroundColor:'#4c75f2',
  },
});

export default PatientsView;
