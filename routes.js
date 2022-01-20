import React,{useState, useEffect} from "react";
import { View, BackHandler, Alert} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import HomeScreen from "./Screens/HomeScreen";
import HistoryScreen from "./Screens/HistoryScreen";
import ProfileScreen from './Screens/ProfileScreen'
import ReportScreen from "./Screens/ReportScreen";
import ShowDatedTask from "./Components/ShowDatedTask";
import SignUpLoading from "./Screens/SignUpLoading";
import PasswordScreen from "./Screens/PasswordScreen";
import OnBoardScreen from "./Screens/OnBoardingScreen";
// Redux Library
import {connect} from 'react-redux'

import LottieView from 'lottie-react-native';
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Navigation
import { NavigationContainer, DefaultTheme} from "@react-navigation/native";
import { createStackNavigator,   CardStyleInterpolators } from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from './Screens/DrawerScreen'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

const Drawers = () =>{
  return(
  <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>} >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="History" component={HistoryScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Report" component={ReportScreen} />
  </Drawer.Navigator>
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F2F1F6',
  },
};

const Route=({isSignedIn})=> {
  // STACK TRANSITION

  const [isFirstLaunch, setLaunch] = useState(null)

  useEffect(() => {

    const firstLaunch = async() =>{
      try {
        const res = await AsyncStorage.getItem('haveLaunched')
        if(res == 'null' || res == null){
          await AsyncStorage.setItem('haveLaunched','true')
          setLaunch(true)
        }
        else{
          setLaunch(false)
        }
      } catch (error) {
        
      }
    }
    firstLaunch()
  }, [])

  useEffect(() => {
    const netInfo = async() =>{
      const res = await NetInfo.fetch()
      if(!res.isConnected){
        Alert.alert("INTERNET NOT CONNECTED",
        "Please connect to internet",
        [
        {text: 'Ok', style: 'cancel'}
        ],
        {cancelable: false}
        )
      }
      else{
        return null
      }
    }
    netInfo()
    
  },[])
  useEffect(() => {
    const loadFonts = async()=>{
      await Font.loadAsync({
        bebasRegular: require('./assets/fonts/BebasNeue-Regular.ttf'),
        segoeUIBold: require('./assets/fonts/Segoe-UI-Bold.ttf'),
        segoeUI: require('./assets/fonts/Segoe-UI.ttf'),
        yuGothic: require('./assets/fonts/yugothic.ttf'),
        yuGothicBold: require('./assets/fonts/yugothib.ttf')
      })
    }
    loadFonts()
  }, [])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let timer1 = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer1);
    };
  }, [])

  if(loading){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <LottieView source={require('./assets/26572-creativity-comes-from-within.json')} autoPlay loop />
      </View>
    )
  }

  else{
    if(isFirstLaunch===true){
      return (
        <NavigationContainer theme={MyTheme} >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            {isSignedIn ? (
              <>
              <Stack.Screen name="LoggedIn" component={Drawers} />
              <Stack.Screen name="DatedTasks" component={ShowDatedTask} />
              <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
              </>
            ) : (
              <>
              <Stack.Screen 
              name="OnBoarding" 
              component={OnBoardScreen} 
              />
              <Stack.Screen 
              name="SignIn" 
              component={SignInScreen} 
              />
              <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              />
              <Stack.Screen 
              name="SignUpLoading"
              component={SignUpLoading}
              />
              </>     
            )}
          </Stack.Navigator>
        </NavigationContainer>
    
      );
    }
    else{
      return (
        <NavigationContainer theme={MyTheme} >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
              cardStyle: { backgroundColor: '#fff' }
            }}
  
          >
            {isSignedIn ? (
              <>
              <Stack.Screen name="LoggedIn" component={Drawers} />
              <Stack.Screen name="DatedTasks" component={ShowDatedTask} />
              <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
              </>
            ) : (
              <>
              <Stack.Screen 
              name="SignIn" 
              component={SignInScreen} 
              />
              <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              />
              <Stack.Screen 
              name="SignUpLoading"
              component={SignUpLoading}
              />
              </>     
            )}
          </Stack.Navigator>
        </NavigationContainer>
    
      );
    }
  }

}
const mapStateToProps = (state) =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,null)(Route);
