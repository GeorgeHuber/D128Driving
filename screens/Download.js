
import * as React from 'react';
import { Dimensions, Image, View, Text, TouchableOpacity, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import firebase from "firebase";
import "firebase/firestore"
import * as MailComposer from 'expo-mail-composer';




import  styles  from '../styles.js';

import {getTotal} from "../components/hourFunctions"

import {topHTML,bottomHTML} from "../components/exportHtml"

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;


//the share page

function Download({}) {
  /* defines empty coursehours array to be populated by firebase  */
  const [courseHours, setCourseHours] = React.useState([]);
  
  //defines a function to format the course hour objects into an array with keys suitable to export into html table
  const formatData = (courseHours) => {
    let temp = [];
    let hoursSoFar = [];
    for (var i = courseHours.length - 1; i >= 0; i--) {
      hoursSoFar.push(courseHours[i]);
      temp.push({
        Date: courseHours[i].date + "/" + courseHours[i].year,
        "Location of Practice": courseHours[i].road,
        Weather: courseHours[i].weather,
        Daytime: courseHours[i].isDay === "Day" ? (parseFloat(courseHours[i].value) + parseFloat(courseHours[i].minutes / 60)).toFixed(2) : "0",
        "Daytime \nTotal": getTotal(hoursSoFar, "Day").toFixed(2),
        Nighttime: courseHours[i].isDay === "Night" ? (parseFloat(courseHours[i].value) + parseFloat(courseHours[i].minutes / 60.0)).toFixed(2) : 0,
        "Nighttime\nTotal": getTotal(hoursSoFar, "Night").toFixed(2),
        "Grand\nTotal": getTotal(hoursSoFar, "All").toFixed(2),
        Initials: "  "
      })
    }
    return temp;
  }

  //Function that returns a boolean whether the user can go get their drivers liscense
  const readyToGetLicense=()=>{
    
    return (getTotal(courseHours,"All")>=50 && getTotal(courseHours,"Night")>=10);
  }


  //Function is called once when page is loaded to get the course hour array from a firebase database
  React.useEffect(()=>{
    
    const unsubscribe = 
      // The screen is focused
      // Call any action
       firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            const db = firebase.firestore();
            var current = db.collection("users").doc(user.uid);
            current.get().then(function (doc) {
              setCourseHours(JSON.parse(doc.data().data));

            });

          }
        }
      );
      
    
    return  unsubscribe;
    
  
  },[])

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const unsubscribe = 
      // The screen is focused
      // Call any action
       firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            const db = firebase.firestore();
            var current = db.collection("users").doc(user.uid);
            current.get().then(function (doc) {
              setCourseHours(JSON.parse(doc.data().data));

            });

          }
        }
      );
      
      return ()=>unsubscribe()
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      
    }, [])
  );


  
  //function to be called on press of email button
  //opens a ios native tab to send hours as pdf attachment in user customizable email
  const emailFile = () => {
    async function sendPDF() {
      let data = JSON.stringify(formatData(courseHours));
      let options = {
        html: topHTML + data + bottomHTML,
      };
      let fileName = (await Print.printToFileAsync(options)).uri;
      let options2 = { subject: "Drivers Ed Hours", attachments: [fileName] };
      MailComposer.composeAsync(options2)
    }
    sendPDF();
  }

  //function to print a file to an airprinter
  const printFile = () => {
    async function createPDF() {
      let data = JSON.stringify(formatData(courseHours));
      let options = {
        html: topHTML + data + bottomHTML,
      };
      Print.printAsync(options)
    }
    createPDF();
  }
  
  

  return (
    <View>
    <Image source={require("../assets/homeBackground.png")} resizeMode="cover" style={styles.video}/>
    <View style={{ marginTop:.07*height, marginBottom: .246*height, alignItems: 'center' }} >
      <Text style={[{ alignSelf: 'center', fontSize: 30,marginBottom:.02*height },styles.uvBoldFont,styles.homeHourTotalText]}>Export Your Hours</Text>
      <TouchableOpacity onPress={()=>printFile()}>
        <View style={[styles.buttonContainer,{width:.8*width,marginVertical:.04*height,backgroundColor:"rgba(255,255,255,1)"}]}>
          <Text style={[styles.uvFont,{fontSize:25,color:"rgb(0,89,162)"}]}>Print</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>emailFile()}>
        <View style={[styles.buttonContainer,{width:.8*width,backgroundColor:"rgba(255,255,255,1)"}]}>
          <Text style={[styles.uvFont,{fontSize:25,color:"rgb(0,89,162)"}]}>Email</Text>
        </View>
      </TouchableOpacity>

      {readyToGetLicense()&&<View style={styles.congrats}>
        <Text style={[styles.uvFont,{fontSize:20,color:"rgb(0,89,162)"}]}>
          Congratulations on completing the required number of hours to graduate to your license! Remember that you still need to have held your permit for 9 months to go to the DMV. Print out this form to take with you and refer to the info page for more. Stay Safe!</Text>

        </View>}

        {!readyToGetLicense()&&<View style={[styles.congrats,{backgroundColor:"rgba(0,0,0,0.8)"}]}>
        <Text style={[styles.uvFont,{fontSize:20,color:"rgb(255,255,255)"}]}>
          Just a reminder, you do not have the required hours needed to get your license. The state of Illinois requires 10 hours of nighttime driving and 50 hours driving before you can take your drivers test. </Text>
          
        </View>}
    </View>
   </View>
  )
}


export default Download;




