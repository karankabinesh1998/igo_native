import React, { Component , useState , useEffect  } from 'react'
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
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import  Config from '../configuration/config';
import { TripsJsons , RefreshJsons, BackGroundRefreshApp } from '../configuration/functional';
import BackgroundTimer from 'react-native-background-timer';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import Header_New from '../components/Header_New';
import Slider_Carousal from '../components/Slider_Carousal';
// import RNEventSource from 'react-native-event-source';
import EventSource from "react-native-sse";

const Tab = createBottomTabNavigator();


 function MyTabs({userDetail,navigation,TripsJson,announcement=[]}) {

  // console.log(announcement,"27");

  const [ listening, setListening ] = useState(false);
  const [ facts, setFacts ] = useState([]);

  
 

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        children={()=><HomePage userDetail={userDetail} announcement={announcement} navigation={navigation} TripsJson={TripsJson} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color , size }) => (
            <MaterialCommunityIcons name="home" color={'#ce3232'} size={size} />
          ),
         }}
      />
      
      <Tab.Screen
        name="Account"
        children={()=><AccountandWallet  userDetail={userDetail} navigation={navigation}/>}
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
        children={()=><ProfileSCreen userDetail={userDetail} navigation={navigation}/>}
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
        ID:null,
        PageName:"Dashboard",
        announcement:[]
      }
    }

    BackgroundTimer.setInterval(async() => {
      // this will be executed every 200 ms
      // even when app is the background
      // let result = await RefreshJsons()
     await this.handleConnectivityChange();
     
      if(this.state.ID){
      await this.Runbackground()
      console.log('tic 1');
      }
      
    }, 10000);
  }


  
Runbackground = async()=>{
   console.log(this.state.ID,"this.state.userdetails");
  let LoginToken = await AsyncStorage.getItem(Stored.login_token);
      console.log(LoginToken);
    if(this.state.userDetail.length && this.state.ID != null && LoginToken != null ){

    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
    // console.log(data[0],"annnn");
    if(data.length){

    let result = await BackGroundRefreshApp(data[0].id,LoginToken); 

    if(result.length){
       
     this.setState({
        userDetail : result,
        announcement: result[0].announcement
      })
    }

    let Trip = await TripsJsons(data[0].id);
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
    
    // console.log(LoginToken,"LoginToken");
    
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
    // console.log(data[0].id,"Dashboard page 80");

    // let Stored_Data2 = await AsyncStorage.getItem(Stored.announcement);
    // let data_Announcement = Stored_Data2 !== null ? JSON.parse(Stored_Data) : [];

    // console.log(data[0].announcement,"data_Announcement");

    
   
    if(data.length > 0){
      this.setState({
        userDetail : data,
        ID:data[0].id,
        announcement: data[0].announcement
      })
    }

    if(data.length > 0 && LoginToken != null ){

      let Trip = await TripsJsons(data[0].id)
        // console.log(Trip)

    await AsyncStorage.getItem(Stored.TripsJsob);
    let Stored_Data1 = await AsyncStorage.getItem(Stored.TripsJsob);
    let data2 = Stored_Data1 !== null ? JSON.parse(Stored_Data1) : [];

     if(data.length){
      this.setState({
        userDetail : data,
        TripsJson : data2,
        announcement:data[0].announcement
      })
    }
  // console.log(this.state.userDetail[0],"92")
    let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy + `/${data[0].id}`;
      // console.log(URL);
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

                if(data.length){
                 this.setState({
                   userDetail : responseJson
                 })
               }
              }

            }
            )

          }

  }

  handleConnectivityChange = () => {
    NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);

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
       
      <Header_New subtitle={"Dashboard"} showback={false} />


      {/* <Header
      placement="left"
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={{ text: 'Igotaxy', style: { color: '#ce3232',fontSize:25,fontWeight:"bold" } }}
      centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
      // rightComponent={ <WhatsappandCall  navigation ={this.props.navigation}   /> }
      containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
          width:'100%',
          height:'12%'
        }}
      />*/}



       <NavigationContainer independent={true}>
         <MyTabs userDetail={this.state.userDetail} announcement={this.state.announcement} navigation ={this.props.navigation} TripsJson={this.state.TripsJson}/>
      </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}


