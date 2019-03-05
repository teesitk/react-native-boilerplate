import React, {Component} from "react";
import {ScrollView,View,Image} from "react-native";
import PropTypes from 'prop-types';

import Header from './Header';
import Section from './Section';

import { Drawer, Container, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { createStackNavigator, NavigationActions } from 'react-navigation';

export default class SideBar extends Component {

    static propTypes = {
        theme: PropTypes.string,
        primary: PropTypes.string,
        overrides: PropTypes.string,
    };

    static defaultProps = {
        theme: 'light',
        primary: 'paperGrey'
    };

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        //navigator: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    changeScene = (path, name) => {
        const { drawer } = this.context;
        //const { navigate } = this.props.navigator;
        //const nav = createStackNavigator(navigator)

        this.setState({
            route: path
        });
        NavigationActions.navigate(path)
        //navigator.to(path, name);
        drawer.close();
    };


    static Header = Header;

    static Section = Section;

    render() {
        const { route } = this.state;
        //const { theme, overrides, children } = this.props;

        const backgroundColorMap = {
            light: '#ffffff',
            dark: '#333333'
        };

        const backgroundColor = '#333333';

        /*return (
            <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        theme
                    });
                })}
            </ScrollView>
        );*/
        return (
            <ScrollView style={[styles.container, { backgroundColor: backgroundColorMap.light }]}>
                <Header image={<Image source={require('./../../images/header.png')}/>}/>
                <Section
                    items={[{
                        icon: 'beer',
                        color: 'yellow',
                        value: 'Welcome',
                        active: !route || route === 'welcome',
                        onPress: () => this.changeScene('welcome'),
                        onLongPress: () => this.changeScene('welcome')
                    },
                    {
                        icon: 'beer',
                        color: 'yellow',
                        value: 'Boy',
                        active: !route || route === 'boy',
                        onPress: () => this.changeScene('boy'),
                        onLongPress: () => this.changeScene('boy')
                    }]}
                />
            </ScrollView>
        );
    }

}

const styles = {
    container: {
        flex: 1
    }
};