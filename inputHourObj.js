import * as React from 'react';
import { Picker,  Dimensions,View, Text, TextInput,TouchableOpacity,DatePickerIOS } from 'react-native';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

import  styles  from './styles.js';

const ObjInput =props => {    
    const[enteredHour,setEnteredHour]=React.useState('');
    
    const hourInputHandler=(enteredText)=>{
    setEnteredHour(enteredText!="."?enteredText:"0");
  }

  const[enteredMinutes,setEnteredMinutes]=React.useState('');
    
  const minuteInputHandler=(enteredText)=>{
      
  setEnteredMinutes((parseInt(enteredText)<60||enteredText=="")&&enteredText!="."?enteredText:"0");
}

const[enteredDay,setEnteredDay]=React.useState('Day');
    
const dayInputHandler=(enteredText)=>{
setEnteredDay(enteredText);
}
const[enteredDate,setEnteredDate]=React.useState(new Date());
    
const dateInputHandler=(enteredText)=>{
setEnteredDate(enteredText);
}
const[enteredWeather,setEnteredWeather]=React.useState("");
    
const weatherInputHandler=(enteredText)=>{
setEnteredWeather(enteredText);
}
const[enteredRoad,setEnteredRoad]=React.useState("Local");
    
const roadInputHandler=(enteredText)=>{
setEnteredRoad(enteredText);
}
  return(
    <View style={styles.inputBox}>
        <TextInput placeholder="Enter Hours: " 
        keyboardType='numeric'
        returnKeyType='done'
        style={styles.textBox}
        onChangeText={(text)=>{hourInputHandler(text)}}
        value={enteredHour}
        />
        <TextInput placeholder="Enter Minutes: " 
        keyboardType='numeric'
        returnKeyType='done'
        style={styles.textBox}
        onChangeText={(text)=>{minuteInputHandler(text)}}
        value={enteredMinutes}
        />
        <TextInput placeholder="Weather Condition: (ex: rain, fog, snow, clear)" 
        
        style={styles.textBox}
        onChangeText={(text)=>{weatherInputHandler(text)}}
        value={enteredWeather}
        />
        <View style={{flexDirection:'row',justifyContent:"space-around",marginBottom:height*0.08}}>
          <Picker
           style={{ height: height*0.15, width:width*0.3 }}
          selectedValue={enteredDay}
          onValueChange={(c)=>dayInputHandler(c)}>
          <Picker.Item label="Day" value="Day" />
          <Picker.Item label="Night" value="Night" />
          
        </Picker>
        <Picker
           style={{height: height*0.15, width:width*0.3 }}
          selectedValue={enteredRoad}
          onValueChange={(c)=>roadInputHandler(c)}>
          <Picker.Item label="Local" value="Local" />
          <Picker.Item label="Highway" value="Highway" />
          <Picker.Item label="Tollway" value="Tollway" />
          <Picker.Item label="Rural" value="Rural" />
          <Picker.Item label="Urban" value="Urban" />
          <Picker.Item label="Parking Lot" value="Parking Lot" />
          
        </Picker>
        </View>
        <DatePickerIOS
          mode='date'
          date={enteredDate}
          onDateChange={(date)=>dateInputHandler(date)}
          style={{height:height*0.26}}
        />
        <TouchableOpacity onPress={props.onAddObj.bind(this,enteredHour,enteredMinutes,enteredDay,enteredDate,enteredWeather,enteredRoad)}>
        <View style={{marginTop:height*0.05,padding:6,width:width*0.6,borderWidth:2,borderRadius:7,alignSelf:"center",alignContent:"center",backgroundColor:"white"}}>
        <Text style={[styles.uvFont,{fontSize:20,alignSelf:"center"}]}>{(enteredHour==0||enteredHour==="")&&(enteredMinutes==0||enteredMinutes==="")?"EXIT":"ADD" }</Text>
        </View>
        </TouchableOpacity>
      </View>)
      }

export default ObjInput;