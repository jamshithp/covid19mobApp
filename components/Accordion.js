import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from '@expo/vector-icons';

function Separator() {
  return <View style={styles.separator} />;
}

export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={styles.headerCell1}>
          <Ionicons name="md-contacts" size={25} color={'#737373'} />
          <Text style={styles.headerText}>{section.nameoftheorganisation}</Text>
        </View>
        <View style={styles.headerCell2}><Text style={styles.headerText}>{section.category}</Text></View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={300}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={styles.contentItem}>
            <Text style={styles.contentText}>Organisation Name</Text>
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentValue}>
            {section.nameoftheorganisation}
            </Animatable.Text>
        </View>
        <Separator />
        <View style={styles.contentItem}>
            <Text style={styles.contentText}>Location</Text>
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentValue}>
            {section.city}
            </Animatable.Text>
        </View>
        <Separator />
        <View style={styles.contentItem}>
            <Text style={styles.contentText}>Desciption </Text>
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentValue}>
            {section.descriptionandorserviceprovided}
            </Animatable.Text>
        </View>
        <Separator />
        <View style={styles.contentItem}>
            <Text style={styles.contentText}>Service </Text>
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentValue}>
            {section.category}
            </Animatable.Text>
        </View>
        <Separator />
        <View style={styles.contentItem}>
            <Text style={styles.contentText}>phone Number </Text>
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentValue}>
            {section.phonenumber}
            </Animatable.Text>
        </View>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            activeSections={activeSections}
            sections={this.props.data}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={100}
            onChange={this.setSections}
            style={styles.separator}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    marginTop:20,
    borderColor:'#000000'
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    fontFamily: 'open-sans-bold',
  },
  header: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#201aa220',
    padding: 10,
    alignItems:'flex-start',
    borderBottomWidth:1,
    marginBottom:10,
    borderBottomColor:'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
    minHeight:130,
  },
  headerCell1:{
    width:'50%',
    flex:1,
    padding: 5,
    flexDirection:'row',
    alignItems:'center',
  },
  headerCell2:{
    width:'50%',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    fontFamily: 'open-sans-bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contentItem:{
    flex: 1,
    flexDirection:'column',
    padding:10,
    borderBottomColor:'#F5FCFF',
  },
  contentText:{
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentValue:{
    padding:10,
  }
});