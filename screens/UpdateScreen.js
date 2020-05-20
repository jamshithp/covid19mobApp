import React, {useState, useEffect} from 'react';
import {formatDistance, format} from 'date-fns';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

function Updates(props) {
  const [updates, setUpdates] = useState([]);
  const [fetched, setFetched] = useState(false);
  let currentDate = new Date();

  useEffect(() => {
    if (fetched === false) {
      axios
        .get('https://api.covid19india.org/updatelog/log.json')
        .then((response) => {
          const updates = response.data.map(activity=> {
            activity.update = activity.update.split('\n');
            return activity;
          });
          setUpdates(updates);
          setFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [fetched]);

  return (
    <ScrollView>
      <View style={styles.updates}>
        <View style={styles.updatesHeader}>
          <Text style={[styles.header1,styles.blue]}>{format(currentDate, 'd MMM')}</Text>
        </View>
        {updates
          .slice(-6)
          .reverse()
          .map(function (activity, index) {
            //activity.update = activity.update.split('\n');
            const activityDate = new Date(activity.timestamp * 1000);
            const addHeader = () => {
              currentDate = activityDate;
              return (
                <View>
                  <Text>
                    {index === 0 ? 'No updates yet!' : ''}
                  </Text>
                  <View style={styles.updatesHeader}>
                    <Text style={styles.header2}>{format(activityDate, 'd MMM')}</Text>
                  </View>
                </View>
              );
            };
            return (
              <View>
                <Text style={styles.header2}>
                {activityDate.getDate() !== currentDate.getDate()
                  ? addHeader()
                  : ' '}
                </Text>
                <View key={index} style={styles.update}>
                  <Text style={styles.header2}>
                    {formatDistance(new Date(activity.timestamp * 1000),new Date()) + ' ago'}
                  </Text>
                  {activity.update.map(activity=><Text style={styles.item}>{activity}</Text>)}
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  updates: {
    display: 'flex',
    flexDirection:'column',
    width: '100%',
    paddingVertical: 20,
  },
  updatesHeader:{
    width:'40%',
    alignSelf: 'flex-start',
    color: '#343a40',
  },
  header1: {
    fontSize: 25,
    paddingLeft: 15,
  },
  header2:{
    fontSize: 18,
    color:'#6c757d',
    fontWeight:'900',
    paddingBottom:5,
  },
  update: {
    backgroundColor: '#6c757d10',
    marginBottom:2,
    padding: 20,
    borderRadius:10,
    marginHorizontal:10,
    //transition: all 0.2s ease-in-out,
  },
  heading1:{
    fontSize: 20,
  },
  item: {
    fontSize: 17,
    color:'#343a40',
  },
  cherry:{
    color:'#ff073a',
  },
  blue:{
    color:'#4c75f2',
  },
  green:{
    color:'#28a745',
  },
  grey:{
    color:'#6c757d',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

Updates.navigationOptions = navData => {
  return {
    headerTitle: 'News'
  };
};

export default Updates;
