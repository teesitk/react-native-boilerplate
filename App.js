/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Drawer, Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, Image, View, Navigator, YellowBox } from 'react-native';
import PropTypes from 'prop-types';
import { SideBar } from './src/Components';
import { createStackNavigator } from 'react-navigation';
//import Navigate from './src/utils/Navigate';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
]);
const RootStack = createStackNavigator({
  welcome: {
    screen: require('./src/scenes/Welcome').default
  },
  boy: {
    screen: require('./src/scenes/Boy').default
  },
},
  {
    initialRouteName: 'boy',
  });
export default class App extends Component {
  static childContextTypes = {
    drawer: PropTypes.object,
    navigator: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      navigator: null
    };
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator
    }
  };

  setDrawer = (drawer) => {
    this.setState({
      drawer
    });
    return drawer;
  };

  setNavigator = (navigator) => {
    this.setState({
      navigator: navigator
    });
  };

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  componentDidMount() {
    this.setNavigator({
      welplayed: { screen: require('./src/scenes/Welcome').default },
    })
  }
  render() {
    const { drawer, navigator } = this.state;
    const navOptions = {
      welplayed: { screen: require('./src/scenes/Welcome').default },
    }

    return (
      <Drawer
        content={<SideBar navigator={navOptions}/>}
        ref={(drawer) => { this.drawer = !this.state.drawer ? drawer : null; }}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu' onPress={() => this.openDrawer()} />
              </Button>
            </Left>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>
          { navigator &&
            <RootStack/>
          }
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
