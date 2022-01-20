import React from 'react'

import {View, Text} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Route from './routes'
import {Provider} from 'react-redux'
import {store} from './redux/app-redux'



export default function App(){
  return(
    <Provider store={store}>
    <Route />
    <StatusBar style="dark" hidden={false}/>
    </Provider>
  )
}