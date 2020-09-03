// SignUp.js
import React from 'react'
import { Dimensions,StyleSheet, Text, Image, TextInput, View, TouchableOpacity,Button } from 'react-native'

import firebase from "firebase";
import "firebase/firestore"
import styles from '../styles.js';
import {config} from "../credentials.js"


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
  }

  handleSignUp = (email, password) => {
    var e =false;

    try {

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error =>{ e=true;this.setState({ errorMessage: error.message })});

      //copy into other pages
      if(!e){
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const db = firebase.firestore();

          console.log("user " + user.uid);
          console.log("made it this far");
          db.collection("users").doc(user.uid).set({ data: "[]", totalHours: "0" })
            .then(function () {
              console.log("Document successfully written!");
            });
        }
      });}

    } catch (error) {
      error => this.setState({ errorMessage: error.message })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: .53*width, height: 0.4*height }} source={require('../assets/vhsfancy.png')} />
        <Text style={[styles.uvBoldFont,styles.headerText]}>Sign Up</Text>
        
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}

        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}

        />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <View style={{ padding: .13*width }}>
          <TouchableOpacity onPress={() => this.handleSignUp(this.state.email, this.state.password)}>
            <View style={styles.frontButtonContainer}>
              <Text style={[styles.uvBoldFont, styles.frontButtonText]}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View style={{ margin: .05*width }} />
          <TouchableOpacity

            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={[styles.uvFont, styles.smallFrontButton,]}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
