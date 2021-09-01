import React, { Component } from 'react'
import  AccountandWallet from '../screens/AccountandWallet';
import HomePage from '../screens/HomePage';
import ProfileSCreen from '../screens/ProfileScreen'; 
// import LoginScreen from '../screens/LoginScreen'
// import { Text, View  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import  Config from '../configuration/config';
import { TripsJsons , RefreshJsons } from '../configuration/functional';
import BackgroundTimer from 'react-native-background-timer';
import NetInfo from "@react-native-community/netinfo";
import { Platform , Alert } from "react-native";
import { Appbar } from 'react-native-paper';
// const intervalId = BackgroundTimer.setInterval(() => {
//   // this will be executed every 200 ms
//   // even when app is the background
//   console.log('tic 1');
// }, 200);

const Tab = createBottomTabNavigator();

 function MyTabs(userDetail,navigation) {
  // console.log(userDetail.TripsJson,23);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        children={()=><HomePage userDetail={userDetail} navigation={userDetail.navigation} TripsJson={userDetail.TripsJson}/>}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color , size }) => (
            <MaterialCommunityIcons name="home" color={'#ce3232'} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="NewTrips"
        children={()=><NewTrips userDetail={userDetail} navigation={userDetail.navigation} />}
        options={{
          tabBarLabel: 'NewTrips',
          tabBarIcon: ({ color , size }) => (
            <MaterialCommunityIcons name="home" color={'#ce3232'} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Account"
        children={()=><AccountandWallet  userDetail={userDetail} navigation={userDetail.navigation}/>}

        options={{
          tabBarLabel: 'Account',
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
        userDetail : [],
        NewTrips1:true,
        connection_Status:"",
        TripsJson:[],
        ID:null
      }
    }

    BackgroundTimer.setInterval(async() => {
      // this will be executed every 200 ms
      // even when app is the background
      // let result = await RefreshJsons()
      this.handleConnectivityChange()
      this.Runbackground()
      console.log('tic 1');
    }, 10000);
  }


  
Runbackground = async()=>{
  console.log(this.state.ID,"this.state.userdetails");
  let LoginToken = await AsyncStorage.getItem(Stored.login_token);
  console.log(LoginToken);
  if(this.state.userDetail.length && LoginToken != null ){
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];

    if(data.length){

    let result = await RefreshJsons(5); 

    if(result.length){
     this.setState({
        userDetail : result
      })
    }

    let Trip = await TripsJsons(5)
    console.log(Trip,"TRIp");
    if(Trip.length){
        this.setState({
          TripsJson:Trip
        })
    }
  }
  }
}
  

  async componentDidMount(){

    let LoginToken = await AsyncStorage.getItem(Stored.login_token);
    
    console.log(LoginToken,"LoginToken");
    
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
    // console.log(data[0].id,"Dashboard page 80");
   
    if(data.length > 0){
      this.setState({
        userDetail : data,
        ID:data[0].id
      })
    }

    if(data.length > 0 && LoginToken != null ){

      let Trip = await TripsJsons(data[0].id)
        console.log(Trip)
      this.setState({
        userDetail : data,
        //TripsJson : data2
      })
   
    

    await AsyncStorage.getItem(Stored.TripsJsob);
    let Stored_Data1 = await AsyncStorage.getItem(Stored.TripsJsob);
    let data2 = Stored_Data1 !== null ? JSON.parse(Stored_Data1) : [];

     if(data.length){
      this.setState({
        userDetail : data,
        TripsJson : data2
      })
    }
  

    
    // console.log(this.state.userDetail[0],"92")
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

          }else{
            // this.setState({
            //   userDetail:[],
            //   TripsJsons:[]
            // })
          }

  }

  renderComponent3=async()=>{
    // console.log("hello world");
  }



  handleConnectivityChange = () => {
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

       if (state.isConnected) {
       
      } else {
        Alert.alert(
          "Woops !",
          "Please Check your Internet Connection.",
          [
           
            { text: "Retry", onPress:()=>this.handleConnectivityChange()}
          ]
        )
      }
    })
  };

  render(){
    // console.log(this.props.navigation,132);
    return (
      <SafeAreaProvider >
       

      <Header
      placement="left"
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
      centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
      rightComponent={ <WhatsappandCall  navigation ={this.props.navigation}   /> }
      containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
          width:'100%',
          height:'16%'
        }}
      />
      
  {/* <Appbar.Header style={{backgroundColor:"red"}}>

    <Appbar.Content  title="Igotaxy" />

</Appbar.Header> */}

      <NavigationContainer independent={true}>
         <MyTabs userDetail={this.state.userDetail} navigation ={this.props.navigation} TripsJson={this.state.TripsJson} />
      </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}


