import React , {Component , useEffect , useState } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
 
} from './src/screens';

import  firebase  from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'

import HomePage from './src/screens/HomePage';

import WhatsappandCall from './src/components/WhatsappandCall';

import ProfileScreen  from  './src/screens/ProfileScreen';

import Splashscreen from './src/screens/Splashscreen';

import NewTrips from './src/screens/NewTrips';

import DocumentUpload from './src/screens/DocumentUpload';

import MyBiddings from './src/screens/MyBiddings';

import AddDriver from './src/screens/AddDriver';

import AddCabs from './src/screens/AddCabs';

import ActiveTrips from './src/screens/ActiveTrips';

import TripHistory from './src/screens/TripHistory';

import PushNotification ,{ Importance } from 'react-native-push-notification';

import MyLocations from './src/screens/MyLocations';

import AsyncStorage from "@react-native-community/async-storage";
import Stored from './src/configuration/storageDetails';
import Config from './src/configuration/config';

import { Platform , Alert } from "react-native";

import NetInfo from "@react-native-community/netinfo";
// import { passwordValidator } from './src/helpers/passwordValidator';


const Stack = createStackNavigator( )



export default function App(){

  const [ isVisible , setVisible ] = useState(true);
  const [ Fire_Token , setToken ]=useState(null);

  const [netstate,SetNetState]=useState(false)

  

  let timer1 = setTimeout(() => setVisible(false), 2000)

  let FunctionSTored = async( )=>{ 

    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];

    if(data.length){
      let id = data[0].id ?  data[0].id : null;

      const formData=new FormData();

      formData.append("token",Fire_Token)

      let URL =
      Config.ACCESS_POINT +
      Config.UpdateMaster+`tbl_user_web/${id}`;

      console.log(URL);

      fetch(URL, {
        method: "put",
        body: formData
      })
      .then(response => response.json())
      .then(async responseJson => {
        let data = JSON.stringify(responseJson)
        await AsyncStorage.setItem(Stored.userDetail,data);  
        AsyncStorage.setItem("Userdetail",JSON.stringify(responseJson))

      }).catch(function(error) {
              console.log("There is an error in networks",error);
              throw error;
            })
    }

    console.log(Fire_Token,"APP.js");

   }

   useEffect(
     ()=>{
       return ()=>FunctionSTored()
     }
   )

   useEffect(
     ()=>{
      unsubscribe();
     }
   )

   

  //  NetInfo.isConnected.addEventListener("connectionChange",handleFirstConnectivityChange); 

  const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

       if (state.isConnected) {
        // Alert.alert("You are online!");
        // Alert.alert("You are offline!");
        
      } else {
        Alert.alert(
          "Woops !",
          "Please Check your Internet Connection.",
          [
           
            { text: "Retry", onPress:()=>unsubscribe()}
          ]
        )
      }
  });
  
  
   
 

  useEffect(
    () => {
      return () => {
        clearTimeout(timer1)
      }
    },
    [isVisible]
  )

  useEffect(() => {
    messaging().getToken(firebase.app().options.messagingSenderId).then((token)=>{
      console.log(`firebase TOKEN`,token)
      setToken(token)
    })
    const unsubscribe = messaging().onMessage(async remoteMsg=>{
      const channelId = Math.random().toString(36).substring(7)
      createChannel(channelId);
      showNotification(channelId,
        {
        bigImage: remoteMsg.notification.android.imageUrl , 
        title : remoteMsg.notification.android.title ,
        body:remoteMsg.notification.android.body,
        color:remoteMsg.notification.android.color,
        subText: remoteMsg.data.subTitle });
      console.log(channelId,"channelId");
      console.log(remoteMsg,'remoteMsg');
      
    })
    messaging().setBackgroundMessageHandler(async remoteMsg =>{
      console.log(`remoteMsg Background`, remoteMsg)
    } )
    return unsubscribe
},[])


const createChannel =(channelId)=>{
  PushNotification.createChannel(
    {
      channelId: channelId, // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "regular", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

}

const showNotification=(channelId,options)=>{
  console.log(channelId,"88888");
  
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: options.subText, // (optional) default: none
    bigPictureUrl: options.bigImage, // (optional) default: undefined
    bigLargeIcon: "ic_launcher", // (optional) default: undefined
    bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    color: options.color, // (optional) default: system default
    vibrate: true, // (optional) default: true
    soundName: "regular",
    playSound: true,
    vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    priority: "high", // (optional) set notification priority, default: high
    // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    /* iOS and Android properties */
    title: options.title, // (optional)
    message: options.body, // (required)
  });
}




// useEffect( () => {

//   if (!listening) {
//     console.log("listin");
//       let url = 'http://192.168.1.105:5001/events'
//     const es = new EventSource(url)

//     setListening(true);
//   }
// }, [listening, facts]);



      
  
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={isVisible === true ? Splashscreen : StartScreen} />
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
          <Stack.Screen name="MyBiddings" component={MyBiddings}/>
          <Stack.Screen name="DocumentUpload" component={DocumentUpload}/>
          <Stack.Screen name="AddDriver" component={AddDriver}/>
          <Stack.Screen name="AddCabs" component={AddCabs}/>
          <Stack.Screen name="ActiveTrips" component={ActiveTrips}/>
          <Stack.Screen name="MyLocations" component={MyLocations} />
          <Stack.Screen name="WhatsappandCall" component={WhatsappandCall} />
          <Stack.Screen name="TripHistory" component={TripHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
        // }
}
