import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';

class Label extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{height: 25}}>
          {this.props.text}
        </Text>
      </View>
    )
  }
}

class ErrorLabel extends React.Component {
  render() {
    let errorMessage = this.props.errorMessage
    if (errorMessage === '') {
      return <Text></Text>
    } else {
      return <Text style={{color: 'red'}}>{this.props.errorMessage}</Text>
    }
  }
}

export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      username: 'lukasz@gruuf.com',
      password: '12345678',
      errorMessage: '',
      userToken: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Label text="User name"/>
          <View style={{marginBottom: 15, borderBottomColor: 'gray', borderBottomWidth: 1}}>
            <TextInput
              style={{height: 25}}
              placeholder="e.g. luk"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
          </View>
          <Label text="Password"/>
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}>
            <TextInput
              secureTextEntry={true}
              style={{height: 25}}
              placeholder="e.g. your secret"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <View>
            <Button
              title="Login"
              onPress={() => {
                this.setState({errorMessage: ''});

                fetch('http://localhost:8080/api/login', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson);
                  if (responseJson.status === 'ok') {
                    this.setState({userToken: user.token});
                    this.props.navigator.push('home');                    
                  } else {
                    this.setState({
                      errorMessage: 'Cannot login',
                    })
                  }
                  return done();
                })
                .catch((error) => {
                  console.log(error)
                  this.setState({errorMessage: 'Server is down!'});
                });
              }}              
            />
          </View>
          <ErrorLabel errorMessage={this.state.errorMessage}/>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
