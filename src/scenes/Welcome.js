import React, { Component } from 'react';
import { View, Image, IntentAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Title, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';

//import AppStore from '../stores/AppStore';

export default class Welcome extends Component {

    static contextTypes = {
        //navigator: PropTypes.object.isRequired
    };

    render() {
        //const { navigator } = this.context;
        //const theme = AppStore.getState().theme;
        const theme = true;

        return (
            <Container>
                <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{uri: './../img/welcome.jpg'}} overlay />
                        <Body>
                          <Text>NativeBase</Text>
                          <Text note>GeekyAnts</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{uri: './../img/welcome.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent>
                          <Icon active name="thumbs-up" />
                          <Text>12 Likes</Text>
                        </Button>
                      </Left>
                      <Body>
                        <Button transparent>
                          <Icon active name="chatbubbles" />
                          <Text>4 Comments</Text>
                        </Button>
                      </Body>
                      <Right>
                        <Text>11h ago</Text>
                      </Right>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Text>If you find any issues or potential improvements please submit an issue on the GitHub repository page.</Text>
                    </CardItem>
                </Card>
                <Button text="Go to child component" onPress={() => {  }} />
            </Container>
        );
    }

}