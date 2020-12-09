
import * as React from 'react';
import { Dimensions, Image, View, Text, ScrollView, FlatList, TouchableOpacity, Linking, } from 'react-native';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from "firebase";
import "firebase/firestore"
import * as MailComposer from 'expo-mail-composer';

import Download from "./Download.js";
import About from "./About.js"
import HourPage from "./HourPage.js"


import ObjInput from '../inputHourObj.js'
import  styles  from '../styles.js';


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function infoPage(){
    return(
      
      <View style={{height:height}}>
        
        <Image source={require("../assets/homeBackground.png")} resizeMode="cover" style={styles.video}/>
        <ScrollView>
          <View style={[styles.infoContainer,{marginTop:.1*height}]}>
          <Text style={[styles.sectionTitle,styles.uvBoldFont]}>About The App</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>     Within the Illinois drivers education program, students are required by law to record 50 total hours of driving (10 of which are at night) before going to get their lisence from the DMV. This app was designed by a highschool student to help others log their practice hours and then export them to print out.  </Text>
          </View>
          <View style={styles.infoContainer}>
          <Text style={[styles.infoBodyText,styles.uvFont]}>Hours can be added under the hours page by filling out the pop up form. Students can record the weather, driving location, date, and whether they were driving during the day or at night. After input they are sorted in chronological order. These hours can then be emailed to a printing capable device as a pdf.</Text>
          </View>
  
          <View style={[styles.infoContainer,{marginBottom:height*0.2}]}>
          <Text style={[styles.sectionTitle,styles.uvBoldFont]}>The Trip to the DMV</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>     When  you go to pick up your liscense make sure to have:</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>-Your permit</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>-A Birth-Certificate or Passport</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>-Proof of Residency</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>-Your Social Security Number</Text>
          <Text style={[styles.infoBodyText,styles.uvFont]}>-Driving Hours Log</Text>
          <Text style={[styles.infoBodyText,styles.uvFont,{marginTop:10}]}> Click 
          <Text style={[styles.infoBodyText,styles.uvBoldFont,{color:'rgb(0,89,162)'}]}onPress={()=>Linking.openURL("https://www.cyberdriveillinois.com/departments/drivers/driver_education/home.html")}> Here </Text>
            for more information.</Text>
          </View>
        </ScrollView>
      </View>
    )
  }

export default infoPage