import StateMetaCard from './statemetacard';

import {formatNumber} from '../utils/common-functions';

import {format, parse} from 'date-fns';
import React from 'react';
import { Animated,View, Text, StyleSheet } from 'react-native';

function StateMeta({
  stateData,
  lastTestObject,
  population,
  lastSevenDaysData,
  totalData,
}) {
  const confirmed = stateData.confirmed;
  const active = stateData.active;
  const deaths = stateData.deaths;
  const recovered = confirmed - active - deaths;
  const sevenDayBeforeData = lastSevenDaysData[0].totalconfirmed;
  const sevenDayBeforeDate = format(lastSevenDaysData[0].date, 'dd MMM');
  const previousDayData = lastSevenDaysData[6].totalconfirmed;
  const previousDayDate = format(lastSevenDaysData[6].date, 'dd MMM');
  const confirmedPerMillion = (confirmed / population) * 1000000;
  const recoveryPercent = (recovered / confirmed) * 100;
  const activePercent = (active / confirmed) * 100;
  const deathPercent = (deaths / confirmed) * 100;
  const testPerMillion = (lastTestObject?.totaltested / population) * 1000000;
  const growthRate =
    ((previousDayData - sevenDayBeforeData) / sevenDayBeforeData) * 100;
  const totalConfirmedPerMillion =
    (totalData[0].confirmed / 1332900000) * 1000000;
  // const doublingRate =
  // growthRate > 0 ? (70 / Math.round(growthRate)).toFixed(2) : 0;

  const updatedDate = !isNaN(
    parse(lastTestObject?.updatedon, 'dd/MM/yyyy', new Date())
  )
    ? `As of ${format(
        parse(lastTestObject?.updatedon, 'dd/MM/yyyy', new Date()),
        'dd MMM'
      )}`
    : '';

  return (
    <View>
      <View style={styles.StateMeta}>
        {/* <ReactTooltip
          place="top"
          type="dark"
          effect="solid"
          multiline={true}
          scrollHide={true}
          globalEventOff="click"
          id="stateMeta"
        />  */}
        <View style={styles.population}>
          <Text style={styles.populationText}>Population</Text>
          <Text style={styles.populationValue}>{formatNumber(population)}</Text>
        </View>
      </View>

      <View style={styles.StateMeta}>
        <StateMetaCard
          style="confirmed"
          title={'Confirmed Per Million'}
          statistic={confirmedPerMillion.toFixed(2)}
          total={totalConfirmedPerMillion.toFixed(2)}
          formula={'(confirmed / state population) * 1 Million'}
          description={`
            ${Math.round(
              confirmedPerMillion
            )} out of every 1 million people in ${
            stateData.state
          } have tested positive for the virus.
            `}
        />

        <StateMetaCard
          style="active"
          title={'Active'}
          statistic={`${activePercent.toFixed(2)}%`}
          formula={'(active / confirmed) * 100'}
          description={`For every 100 confirmed cases, ${activePercent.toFixed(
            0
          )} are currently infected.`}
        />

        <StateMetaCard
          style="recovery"
          title={'Recovery Rate'}
          statistic={`${recoveryPercent.toFixed(2)}%`}
          formula={'(recovered / confirmed) * 100'}
          description={`For every 100 confirmed cases, 
            ${Math.round(
              recoveryPercent.toFixed(0)
            )} have recovered from the virus.`}
        />

        <StateMetaCard
          style="mortality"
          title={'Mortality Rate'}
          statistic={`${deathPercent.toFixed(2)}%`}
          formula={'(deceased / confirmed) * 100'}
          description={`For every 100 confirmed cases, 
            ${Math.round(
              deathPercent.toFixed(0)
            )} have unfortunately passed away from the virus.`}
        />

        <StateMetaCard
          style="gr"
          title={'Avg. Growth Rate'}
          statistic={growthRate > 0 ? `${Math.round(growthRate / 7)}%` : '-'}
          formula={
            '(((previousDayData - sevenDayBeforeData) / sevenDayBeforeData) * 100)/7'
          }
          date={`${sevenDayBeforeDate} - ${previousDayDate}`}
          description={`In the last one week, the number of new infections has grown by an average of ${Math.round(
            growthRate / 7
          )}% every day.`}
        />

        <StateMetaCard
          style="tpm"
          title={'Tests Per Million'}
          statistic={`≈ ${Math.round(testPerMillion)}`}
          formula={
            '(total tests in state / total population of state) * 1 Million'
          }
          date={updatedDate}
          description={`For every 1 million people in ${stateData.state},
            ${Math.round(testPerMillion)} people were tested.`}
        />

        {/* <View style="meta-item ptr fadeInUp">
          <View style="meta-item-top">
            <Text>Positive Test Rate</Text>
            <span
              data-tip={
                'TPM = (total tests in state / total population of state) * 1 Million'
              }
              data-event="touchstart mouseover"
              data-event-off="mouseleave"
              data-for="stateMeta"
            >
              <Icon.Info />
            </span>
          </View>
          <Text>
            {lastTestObject?.testpositivityrate
              ? lastTestObject.testpositivityrate
              : 'N/A'}
          </Text>
          {updatedDate}
          <p>
            {lastTestObject?.testpositivityrate
              ? `Out the of total tests conducted till date month, ${lastTestObject.testpositivityrate}% were positive for the virus`
              : 'N/A'}
          </p>
        </View>*/}

        {/*
          <View style="meta-item dbr fadeInUp">
            <View style="meta-item-top">
              <Text>Doubling Rate</Text>
              <Icon.Info />
            </View>
            <Text>
              {doublingRate > 0 ? Math.round(doublingRate * 7) + ' Days' : '-'}
            </Text>
            <h6 style={{margin: '0'}}>
              {sevenDayBeforeDate} - {previousDayDate}
            </h6>
          </View>
        )*/}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  StateMeta:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      // marginLeft: 10,
      // marginRight: 5,
  },
  StateMetaCard:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  population:{
    padding:5,
    fontFamily: 'open-sans-bold',
  },
  populationText:{
    fontSize:15,
    fontFamily: 'open-sans-bold',
  },
  populationValue:{
    fontSize:20,
    fontFamily: 'open-sans-bold',
  }
});
export default StateMeta;
