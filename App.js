


import { createAppContainer,createSwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './screens/Loading.js'

import Login from './screens/Login.js'

import * as React from 'react';

import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Download from "./screens/Download.js";
import About from "./screens/About.js"
import HourPage from "./screens/HourPage.js"
import Home from "./screens/Home.js"

//define navigation stack after auth

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabs=()=>{
  return (
  <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Hours" component={HourPage} />
      <Tab.Screen name="Share" component={Download} />
      <Tab.Screen name="Info" component={About} />
    </Tab.Navigator>
  )
}

function Main() {
  return (
    <NavigationContainer>
     <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={tabs}/>
        <Stack.Screen name="login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// create our app's navigation stack
const NavStack = createSwitchNavigator(
  {
    Loading,    
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
); 
export default createAppContainer(NavStack);

