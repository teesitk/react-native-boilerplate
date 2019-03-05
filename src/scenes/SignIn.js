import React, { Component } from 'react';
import { PropTypes, View, Text, Image, IntentAndroid, TextInput, AsyncStorage } from 'react-native';
import { Card, Button, COLOR, TYPO } from 'react-native-material-design';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-root-modal';

import AppStore from '../stores/AppStore';
import * as Actions from '../actions';

function mapStateToProps(state){ return state.Login; }
function mapDispatchToProps(dispatch){ return bindActionCreators(Actions, dispatch); }

class SignIn extends Component {
   
    static contextTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    changeScene = (path, name) => {
        const { navigator } = this.context;

        this.setState({
            route: path
        });
        navigator.to(path, name);
        return;
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            pendingLoginRequest: false
        };
        this.removeASValue('[STORAGE_KEY]');
    }

    componentWillMount(){
        if(this.props.isAuthenticated){
            this.changeScene('welcome');
        }
    }

    componentDidUpdate(){
        if(this.props.isAuthenticated){
            this.changeScene('welcome');
        }
        return true;
    }

    onLoginButtonPress = () => {
        this.props.login(this.props.username,this.props.password);
    };

    async getASValue(key){
        try{
            var value = await AsyncStorage.getItem(key);
            //alert(value);
            return value;
        }catch(error){
            console.log('caught error' + error);
        }
    };

    async removeASValue(key){
        try{
            await AsyncStorage.removeItem(key);
        }catch(error){
            console.log('caught error' + error);
        }
    };

    async getQuote(token){
       fetch('http://10.1.27.129/jwt/xx', {
          headers: {
            'Authorization': token,
          },
        })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({json, response}) => {
          if (response.ok === false) {
            return Promise.reject(json)
          }
          return json
        }).catch((error) => console.warn('Authorization Error'))
        .then(
          data => {
            if(data){
              alert(JSON.stringify(data));
            }else{
              alert('Fail');
            }
          },
          (data) => {alert('Fail');}
        )
    };

    render() {
        const { navigator } = this.context;
        const theme = AppStore.getState().theme;
        const token = this.getASValue('[STORAGE_KEY]');

        return (
            <View style={styles.mainBox}>
                <Card style={styles.mainBox}>
                    <Card.Body>
                        <Text style={styles.TextLogo}>TEESITK</Text>
                        <TextInput placeholder="Username" onChangeText={(text) => this.props.usernameChanged(text)} />
                        <TextInput placeholder="Password" onChangeText={(text) => this.props.passwordChanged(text)} secureTextEntry={true} />
                        <Button text="Login" primary={theme} theme="dark" onPress={this.onLoginButtonPress} raised />
                        <Text>{ this.props.error ? this.props.error.text:'' }</Text>
                        <Button text="Get Token From Storage" primary={theme} theme="dark" onPress={ () => {alert(this.props.hash);} } raised />
                        <Button text="Get Kuroro Quote" primary={theme} theme="dark" onPress={ () => {this.getQuote(this.props.hash)} } raised />
                    </Card.Body>
                </Card>
                <Modal
                    style={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        //transform: [{scale: 1}]
                    }}

                    visible={this.props.isLoggingIn}
                    animationType={'none'}
                > 
                    <View style={styles.mainBox}>       
                      <Progress.Circle
                          style={styles.progress,styles.mainBox,{alignItems: 'center' }}
                          //progress={this.props.progress}
                          indeterminate={this.props.isLoggingIn}
                      />
                    </View>
                </Modal>
            </View>
        );
    }

}
const styles = {
    mainBox:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    TextLogo:{
        fontSize: 40,
        textAlign: 'center',
        color: '#CCC',
    },
    progress: {
        margin: 10,
    },
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);