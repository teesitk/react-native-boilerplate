import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';

export default class Boy extends Component {

    static contextTypes = {
        //navigator: PropTypes.object.isRequired
    };

    render() {

        return (
          <Container>
            <Text>xxx</Text>
            <Button text="wow" onPress={()=>this.props.navigation.navigate('welcome')} />
          </Container>
        );
    }

}