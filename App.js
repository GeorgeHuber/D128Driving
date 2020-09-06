import React from 'react'


import { createAppContainer,createSwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './screens/Loading.js'

import Login from './screens/Login.js'
import Main from './screens/Main.js'



// create our app's navigation stack
const Foo = createSwitchNavigator(
  {
     Loading,
    
    Login,
    Main
  },
  {
    //Change this
    initialRouteName: 'Loading'
  }
); 
export default createAppContainer(Foo);

