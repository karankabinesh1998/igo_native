import React , {Component } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
 
} from './src/screens';
import HomePage from './src/screens/HomePage';

import WhatsappandCall from './src/components/WhatsappandCall';

import ProfileScreen  from  './src/screens/ProfileScreen';

import Splashscreen from './src/screens/Splashscreen';

import NewTrips from './src/screens/NewTrips';

import DocumentUpload from './src/screens/DocumentUpload'

const Stack = createStackNavigator( )

export default class App extends Component
{
   constructor(props){
     super(props);
     this.state={
     isVisible : true,
    }
  }




   Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
  }

 async componentDidMount(){
    var that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 2000);
   }

    render()
    {

      
  
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={this.state.isVisible === true ? Splashscreen : StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
          <Stack.Screen name="NewTrips" component={NewTrips}/>
          <Stack.Screen name="DocumentUpload" component={DocumentUpload}/>
          <Stack.Screen name="WhatsappandCall" component={WhatsappandCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
        }
}
