import React, {useState, useEffect, useCallback} from 'react';
import {parse} from 'date-fns';
import * as Icon from 'react-feather';
import PatientsView from './patientsview';
import { View, StyleSheet ,Text ,Modal,ScrollView}  from "react-native";

function Patients(props) {
  const [patients, setPatients] = useState(props.patients);
  const [patient, setPatient] = useState(props.patients.slice(-1));
  const [logs, setLogs] = useState({});
  const [modal, setModal] = useState(false);


  useEffect(() => {
    setPatients(props.patients);
  }, [props.patients]);

  const parseByDate = useCallback((patients) => {
    const log = {};
    for (let i = 0; i < patients.length; i++) {
      const day = new Date(
        parse(patients[i].dateannounced, 'dd/MM/yyyy', new Date())
      );
      if (!(day in log)) {
        const list = [];
        list.push(patients[i]);
        log[day] = list;
      } else {
        const list = log[day];
        list.push(patients[i]);
        log[day] = list;
      }
    }
    setLogs(log);
  }, []);

  useEffect(() => {
    if (patients.length) {
      parseByDate(patients);
    }
  }, [parseByDate, patients]);

  const switchPatient = (patientIndexArg) => {
    if (patientIndexArg === '') return;
    try {
      const patientIndex = patientIndexArg.slice(1);
      // eslint-disable-next-line
      patients.map((patient, index) => {
        if (patient.patientnumber === patientIndex) setPatient(patient);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getClassNameFn = (colorMode) => {
    switch (colorMode) {
      case 'genders':
        return (patient) => {
          return patient.gender === 'F'
              ? 'female'
              : patient.gender === 'M'
              ? 'male'
              : ''
          ;
        };
      case 'transmission':
        return (patient) => {
          return patient.typeoftransmission === 'Local'
              ? 'female'
              : patient.typeoftransmission === 'Imported'
              ? 'male'
              : ''
        
        };
      case 'nationality':
        return (patient) => {
          return patient.nationality === 'India'
              ? 'is-in'
              : patient.nationality === 'Myanmar'
              ? 'is-mm'
              : patient.nationality === 'Indonesia'
              ? 'is-id'
              : patient.nationality === 'United Kingdom'
              ? 'is-uk'
              : patient.nationality === 'United States of America'
              ? 'is-us'
              : patient.nationality === 'Thailand'
              ? 'is-th'
              : patient.nationality === 'Phillipines'
              ? 'is-ph'
              : patient.nationality === 'Italy'
              ? 'is-it'
              : patient.nationality === 'Canada'
              ? 'is-ca'
              : ''
        };
      case 'age':
        return (patient) => {
          return '';
        };
      default:
        return (patient) => {
          return '';
        };
    }
  };

  return (
    <View>
      <PatientsView
        logs={logs}
        setModal={setModal}
        setPatient={setPatient}
        expand={props.expand}
        applyClass={getClassNameFn(props.colorMode)}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
      }}>
        <ScrollView>
          <View
            className={`modal-content ${modal ? 'fadeInUp' : 'fadeOutDown'}`}
          >
            <View className="modal-top">
              <Text style={styles.heading}>#{patient.patientnumber}</Text>
            </View>

            <View style={styles.mainItems}>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Date Announced</Text>
                <Text style={styles.ItemValue}>{patient.dateannounced ? patient.dateannounced : '?'}</Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Contracted from</Text>
                <Text
                  style={styles.ItemValue}
                  className="contracted-from"
                  onClick={() => {
                    switchPatient(patient.contractedfromwhichpatientsuspected);
                  }}
                >
                  {patient.contractedfromwhichpatientsuspected
                    ? patient.contractedfromwhichpatientsuspected
                    : '?'}
                </Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Detected City</Text>
                <Text style={styles.ItemValue}>{patient.detectedcity ? patient.detectedcity : '?'}</Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Detected District</Text>
                <Text style={styles.ItemValue}>
                  {patient.detecteddistrict ? patient.detecteddistrict : '?'}
                </Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Detected State</Text>
                <Text style={styles.ItemValue}>{patient.detectedstate ? patient.detectedstate : '?'}</Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Nationality</Text>
                <Text style={styles.ItemValue}>{patient.nationality ? patient.nationality : '?'}</Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Age</Text>
                <Text style={styles.ItemValue}>{patient.agebracket ? patient.agebracket : '?'}</Text>
              </View>
              <View style={styles.Item}>
                <Text style={styles.ItemTitle}>Gender</Text>
                <Text style={styles.ItemValue}>{patient.gender ? patient.gender : '?'}</Text>
              </View>
              <View style={styles.Item}>
              <Text style={styles.ItemTitle} style={styles.ItemTitle}>State Patient Number</Text>
              <Text style={styles.ItemValue}>
                {patient.statepatientnumber ? patient.statepatientnumber : '?'}
              </Text>
              </View>
              <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Type of transmission</Text>
              <Text style={styles.ItemValue}>
                {patient.typeoftransmission ? patient.typeoftransmission : '?'}
              </Text>
              </View>
            </View>
            <View style={styles.notes}>
              <Text style={styles.ItemTitle}>Notes</Text>
              <Text style={styles.ItemValue}>{patient.notes}</Text>
            </View>
            <Text style={styles.ItemTitle}>Source 1</Text>
            <View style={styles.links}>
              <Text style={styles.ItemValue}>
                {patient.source1}
              </Text>
            </View>
            <Text style={styles.ItemTitle}>Source 2</Text>
            <View style={styles.links}>
              <Text style={styles.ItemValue}>
                {patient.source2}
              </Text>
            </View>

            <Text style={styles.ItemTitle}>Source 3</Text>
            <View style={styles.links}>
              <Text style={styles.ItemValue}>
                {patient.source3}
              </Text>
            </View>
        </View>
      </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor:'#FFFAFA',
  },
  heading:{
    fontSize:20,
    padding:10,
  },
  mainItems:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  Item:{
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width:'50%',
  },
  ItemTitle:{
    fontSize:15,
    opacity:0.6,
    padding:10,
  },
  ItemValue:{
    fontSize:18,
    paddingTop:10,
    color:'#4c75f2',
    fontFamily: 'open-sans',
    fontWeight:'900',
    padding:10,
  },
});

export default Patients;
