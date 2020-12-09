
import * as React from 'react';
import { Dimensions, Image, View, Text, FlatList, TouchableOpacity, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firebase from "firebase";
import "firebase/firestore"



import ObjInput from '../inputHourObj.js'
import  styles  from '../styles.js';

import {getTotal} from "../components/hourFunctions"

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



//Page to display and edit entered hours
function HoursPage({}) {
  //defines variables that update the page
  const [hourType, setHourType] = React.useState("All")
  const [show, setShow] = React.useState(false)
  const [courseHours, setCourseHours] = React.useState([]);
  const [totalHours, setTotalHours] = React.useState(getTotal(courseHours, hourType));


  //called once to get courseHour array and total hour variable based on firebase file
  React.useEffect(() => {
    
      // The screen is focused
      // Call any action
      //gets user object needed to find file
      const unsubscribe = 
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          const db = firebase.firestore();
          var current = db.collection("users").doc(user.uid);
          current.get().then(function (doc) {
            setCourseHours(JSON.parse(doc.data().data));
            setTotalHours(JSON.parse(doc.data().totalHours));
          })

        }
      }
    )
    return unsubscribe
  }, [])
  
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
              setCourseHours(JSON.parse(doc.data().data));
              setTotalHours(JSON.parse(doc.data().totalHours));
            })
  
          }
        }
      )
      
      return ()=>unsubscribe()
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      
    }, [])
  );

  //function to add an hour object to the array
  //updates firebase data and the total hour variable with new hour
  const addHourHandler = (numHours, numMinutes, dayN, tDate, tWeather, tRoad) => {
    //checks for empty string and formats data correctly
    if (numHours != 0 || numMinutes != 0) {
      numHours = numHours == "" ? "0" : numHours;
      numMinutes = numMinutes == "" ? "0" : numMinutes;
      tWeather = tWeather == "" ? "clear" : tWeather;
      var newHours = courseHours;

      //finds the correct index for the item based chronologically
      var ind = courseHours.length;
      for (var i = courseHours.length - 1; i >= 0; i--) {
        var currTot = tDate.getFullYear() * 1000000 + (tDate.getMonth() + 1) * 10000 + tDate.getDate();
        var itot = courseHours[i].year * 1000000 + parseInt(courseHours[i].date.split("/")[0]) * 10000 + parseInt(courseHours[i].date.split("/")[1]);
        if (currTot > itot) { ind = i }
      }

      //add object to the array
      newHours.splice(ind, 0, {
        key: Math.random().toString(),
        road: tRoad, weather: tWeather, value: numHours, date: tDate.getMonth() + 1 + "/" + tDate.getDate(), year: tDate.getFullYear(), isDay: dayN, minutes: numMinutes
      })

      setCourseHours(newHours);
      setTotalHours(getTotal(newHours, hourType));

      //updates firebase data
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const db = firebase.firestore();
          db.collection("users").doc(user.uid).set({ totalHours: JSON.stringify(getTotal(newHours, "All")), data: JSON.stringify(newHours) },{ merge: true })
        }
      });
    } setShow(false);
  }

  //function for removal  of course hours
  const removeHourHandler = (index, courseHours) => {
    var temp = [];
    temp = courseHours;
    temp.splice(index, 1);
    setCourseHours(temp);
    setTotalHours(getTotal(temp, "All"));
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();
        db.collection("users").doc(user.uid).set({ totalHours: JSON.stringify(getTotal(temp, "All")), data: JSON.stringify(temp) },{ merge: true })

      }
    });

  }

  //voila, the actual page
  //first view and linear gradient form the background container
  return (
    
    <View >
      <Image source={require("../assets/homeBackground.png")} resizeMode="cover" style={styles.video}/>


        <View style={{ alignItems: 'center', justifyContent: "center", marginBottom: 0.0246*height, paddingVertical: 0.0123*height }}>
          {/* Total Hour Display */}
          {!show&&<Text style={[styles.homeHourTotalText, styles.uvBoldFont]}>Total Hours: {getTotal(courseHours, hourType).toFixed(2)}</Text>
}
          {/* Add hour button */}
          {!show && <TouchableOpacity onPress={() => setShow(true)}>
              <View style={styles.addButton}>
                <Text style={[{ fontSize: 24 }, styles.uvFont]}>Add Drivers Hours</Text>
              </View>
          </TouchableOpacity>}

          {/* Selector for Day Night of All, changes hours displayed and allows users to see their totals for all 3 categories 
            Shown only when the add horus page is not open*/}
          {!show && <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            {/* Selector Button */}
            <TouchableOpacity onPress={() => setHourType("Night")}>
              <View style={[hourType == "Night" ? styles.selector1 : styles.selector2]}>
                <Text style={[styles.nightDayButton, styles.uvFont]}>Night</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHourType("Day")}>
              <View style={[hourType == "Day" ? styles.selector1 : styles.selector2]}>
                <Text style={[styles.nightDayButton, styles.uvFont]}>Day</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHourType("All")}>
              <View style={[hourType == "All" ? styles.selector1 : styles.selector2]}>
                <Text style={[styles.nightDayButton, styles.uvFont]}>All</Text>
              </View></TouchableOpacity>

          </View>}
          {/*Simple indroduction instructions only shown when user has not added any hours */}
          {(!show && totalHours == 0) && 
          <Text style={[{ marginHorizontal: .11*width, fontSize: 20, marginVertical: .05*height },styles.welcomeContainer,styles.uvFont]}>Welcome to your hours page! to get started click the Add Driver Hours Button!</Text>}
        
        </View >
        {show && <ObjInput onAddObj={addHourHandler} />}


        {/* Displays hours using the flatlist which renders all items in the coursehours array*/}
        <FlatList style={{  marginBottom:height*0.3 }} data={courseHours} renderItem={itemData => {
          //only displays the object if it matches the current hourType
          if (itemData.item.isDay == hourType || hourType == "All") {
            return (
              //this is the code for the actual hour blocks which display concise data about each time the user drove
              <View style={{ padding: 0.025*height, width: .9*width, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.9)", flexDirection: 'column', alignSelf: "center", alignItems: 'center', marginBottom: 0.03*height }}>
                <Text style={[{ alignContent: 'center', color: "black", fontSize: 15 }, styles.uvBoldFont]}>{`${itemData.item.value} hours ${itemData.item.minutes} minutes`}</Text>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text style={[{ alignContent: 'center', color: "black", fontSize: 20 }, styles.uvBoldFont]}>
                    {`        ${itemData.item.date} during the ${itemData.item.isDay}       `}
                  </Text>
                  {/* The remove button which deletes the hour object from the list*/}
                  <TouchableOpacity onPress={() => removeHourHandler(courseHours.indexOf(itemData.item), courseHours)}>
                    <View style={{ padding: 4, borderRadius: 4, backgroundColor: "black" }}>
                      <Text style={{ color: "white" }}>x</Text>
                    </View>
                  </TouchableOpacity>

                </View>
                <Text style={[{ alignContent: 'center', color: "black", fontSize: 15 }, styles.uvFont]}>
                  {`weather: ${itemData.item.weather}  -  road type: ${itemData.item.road} `}
                </Text>
              </View>
            )
          }
        }}>
        </FlatList>
        {/* Closing tags for render containers */}
      
    </View>
  )
}




export default HoursPage

