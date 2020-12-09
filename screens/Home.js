
import * as React from 'react';
import { Dimensions,ActivityIndicator, Image, View, Text, TouchableOpacity, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firebase from "firebase";
import "firebase/firestore"

import { loadAsync } from 'expo-font';


 

import  styles  from '../styles.js';

import {getTotal} from "../components/hourFunctions"

const height = Dimensions.get("screen").height;




//home page
function Home({navigation}) {
  
  //defines constants for hours
  const [courseHours,setCourseHours]=React.useState([])
  
  //function to load load fonts 
  const loadFonts  = async () =>{
    await loadAsync({
      'Noto-Black': require('../assets/fonts/NotoSansSC-Black.otf'),
      'Noto-Bold': require('../assets/fonts/NotoSansSC-Bold.otf'),
      'Noto-Light': require('../assets/fonts/NotoSansSC-Light.otf'),
      'Noto-Medium': require('../assets/fonts/NotoSansSC-Medium.otf'),
      'Noto-Regular': require('../assets/fonts/NotoSansSC-Regular.otf'),
      'Noto-Thin': require('../assets/fonts/NotoSansSC-Thin.otf')
    })
    setFontsLoaded(true);
  }

  const [fontsLoaded,setFontsLoaded]=React.useState(false)


  //asychronous function to be called on press of signout button
  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("login");
    } catch (e) {
      //console.log(e);
    }
    
  }

  //Function is called once when page is loaded to get the course hour array from a firebase database
  React.useEffect(() => {
    loadFonts()

    const unsubscribe = 
      firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            const db = firebase.firestore();
            var current = db.collection("users").doc(user.uid);
            current.get().then(function (doc) {
              
              setCourseHours(JSON.parse(doc.data().data));}
              
            )
  
          }
        }
      )
    
    
    return unsubscribe ;},[]
  );
  
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const unsubscribe = 
 
      firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            const db = firebase.firestore();
            var current = db.collection("users").doc(user.uid);
            current.get().then(function (doc) {
              
              setCourseHours(JSON.parse(doc.data().data));}
              
            )
  
          }
        }
      )
      
      return ()=>unsubscribe();
    }, [])
  );

  if(fontsLoaded){
  //the actual page
  return (
    <View >
     <Image source={require("../assets/lake.jpg")} resizeMode="cover" style={styles.video}/>
     
      <View style={{ paddingVertical: .062*height, alignItems: "center" }}>
        {/* VHHS logo */}
        <View style={styles.imageRow}>
          <View>
        <Image style={styles.imageInRow1} resizeMode="stretch" source={require('../assets/VHHS.png')} />
        </View>
        <View>
        <Image style={styles.imageInRow2} resizeMode="stretch" source={require('../assets/LHS2.png')} />
        </View>
        </View>
        <View style={{marginTop:.062*height}}>
          <View style={styles.hourTotalLines1}>
          <Text style={[styles.hourTotalText,styles.uvFont]}>{getTotal(courseHours,"All")>=50?50:getTotal(courseHours,"All").toFixed(2)}/50  Total Hours Complete</Text>
          </View>
          <View style={styles.hourTotalLines2}>
          <Text style={[styles.hourTotalText,styles.uvFont]}>{getTotal(courseHours,"Night")>=10?10:getTotal(courseHours,"Night").toFixed(2)}/10 Night Hours Complete</Text>
          </View>
        </View>
        <View style={styles.welcomeContainer}>
        <Text
          style={[{ fontSize: 25,textAlign:"center" }, styles.uvFont]}>
          Welcome to the D128 Drivers Ed App!</Text>
          </View>
        <TouchableOpacity onPress={() => signOutUser()}>
          <View style={[styles.buttonContainer,{backgroundColor:"rgba(255,255,255,1)"}]}>
          {/* Lougout button */}
          <Text style={[styles.uvBoldFont,{fontSize:30}]}>Logout</Text>
        </View>
        </TouchableOpacity> 
      </View>
      
    </View>
  );
} else {
  
  
  return(
    <View>
      <ActivityIndicator/>
    </View>
  )
}
}




export default Home