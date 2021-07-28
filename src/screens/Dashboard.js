import React, { Component } from 'react'
import  RegisterScreen from '../screens/RegisterScreen';
import HomePage from '../screens/HomePage';
import ProfileSCreen from '../screens/ProfileScreen';
import { Text, View  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import LogoutScreen from '../components/Logout';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import  Config from '../configuration/config';




const Tab = createBottomTabNavigator();

function MyTabs(userDetail) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        children={()=><HomePage userDetail={userDetail} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color , size }) => (
            <MaterialCommunityIcons name="home" color={'#ce3232'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={RegisterScreen}

        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={'#ce3232'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        // component={ProfileSCreen}
        children={()=><ProfileSCreen userDetail={userDetail}/>}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={'#ce3232'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    {
      this.state={
        userDetail : []
      }
    }
  }

  

  async componentDidMount(){
    await AsyncStorage.getItem(Stored.userDetail)
    // console.log(this.props.navigation);
    // await AsyncStorage.removeItem(Stored.userDetail);
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : []

    
   
    if(data.length){
      this.setState({
        userDetail : data
      })
    }
    console.log(this.state.userDetail[0],"92")
    let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy + `/${this.state.userDetail[0].id}`;
  console.log(URL);
          fetch(URL, {
            method: "GET",
          
          })
            .then(response => response.json())
            .then(async responseJson => {
              if(responseJson.length){
                let data = JSON.stringify(responseJson)
                // this.setState({
                //   userDetail : [{"userdetail":data}]
                // })
                await AsyncStorage.setItem(Stored.userDetail,data);  
               AsyncStorage.setItem("Userdetail",JSON.stringify(responseJson))

               let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
               let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : []
           
               
              
               if(data.length){
                 this.setState({
                   userDetail : data1
                 })
               }
              }

            }
            )

  }

  renderComponent3=async()=>{
    console.log("hello world");
  }

  render(){
    // console.log(this.props.navigation);
    return (
      <SafeAreaProvider >
       

      <Header
      placement="left"
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
      centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
      rightComponent={ <LogoutScreen  navigation ={this.props.navigation}   /> }
      containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
          width:'100%',
          height:'16%'
        }}
      />
      

      <NavigationContainer independent={true}>
         <MyTabs userDetail={this.state.userDetail} />
      </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}

// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialCommunityIcons } from '@expo/vector-icons';





// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
