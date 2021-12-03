import React, { Component, useState, useEffect } from 'react'
import HomePage from '../screens/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import Config from '../configuration/config';
import { TripsJsons,BackGroundRefreshApp } from '../configuration/functional';
import BackgroundTimer from 'react-native-background-timer';
import NetInfo from "@react-native-community/netinfo";
import { Alert, AppState } from "react-native";
import Header_New from '../components/Header_New';

const Tab = createBottomTabNavigator();


function MyTabs({ userDetail, navigation, TripsJson, announcement = [], Runbackground }) {


  const Run_onRefreh = () => {
    Runbackground();
  }


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomePage userDetail={userDetail} announcement={announcement} Run_onRefreh={Run_onRefreh} navigation={navigation} TripsJson={TripsJson} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'#ce3232'} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        userDetail: [],
        NewTrips1: true,
        connection_Status: "",
        TripsJson: [],
        ID: null,
        PageName: "Dashboard",
        announcement: [],
        appState: AppState.currentState
      }
    }



    BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms;
      this.handleConnectivityChange();
      this.appStateSubscription = AppState.addEventListener(
        "change",
        async (nextAppState) => {
          if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            console.log("App has come to the foreground!");
            if (this.state.ID) {
              this.Runbackground();
              //  console.log('tic 1');
            }
          }
          this.setState({ appState: nextAppState });
        }
      );
    }, 20000);
  }



  Runbackground = async () => {
    //  console.log(this.state.ID,"this.state.userdetails");
    let LoginToken = await AsyncStorage.getItem(Stored.login_token);
    if (this.state.userDetail.length && this.state.ID != null && LoginToken != null) {

      let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
      let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
      if (data.length) {

        let result = await BackGroundRefreshApp(data[0].id, LoginToken);

        if (result.length) {

          this.setState({
            userDetail: result,
            announcement: result[0].announcement
          })
        }

        let Trip = await TripsJsons(data[0].id);
        console.log(Trip);
        if (Trip.length) {
          this.setState({
            TripsJson: Trip
          })
        }
      }
    }
  }


  async componentDidMount() {

    let LoginToken = await AsyncStorage.getItem(Stored.login_token);
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
    if (data.length > 0) {
      this.setState({
        userDetail: data,
        ID: data[0].id,
        announcement: data[0].announcement
      })
    }

    if (data.length > 0 && LoginToken != null) {

      let Trip = await TripsJsons(data[0].id)
      await AsyncStorage.getItem(Stored.TripsJsob);
      let Stored_Data1 = await AsyncStorage.getItem(Stored.TripsJsob);
      let data2 = Stored_Data1 !== null ? JSON.parse(Stored_Data1) : [];

      if (data.length) {
        this.setState({
          userDetail: data,
          TripsJson: data2,
          announcement: data[0].announcement
        })
      }
      let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy + `/${data[0].id}`;
      fetch(URL, {
        method: "GET",

      })
        .then(response => response.json())
        .then(async responseJson => {
          if (responseJson.length) {
            let data = JSON.stringify(responseJson);

            await AsyncStorage.setItem(Stored.userDetail, data);
            AsyncStorage.setItem("Userdetail", JSON.stringify(responseJson))

            if (data.length) {
              this.setState({
                userDetail: responseJson
              })
            }
          }

        }
        )

    }

  }

  handleConnectivityChange = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {

      } else {
        Alert.alert(
          "Woops !",
          "Please Check your Internet Connection.",
          [

            { text: "Retry", onPress: () => this.handleConnectivityChange() }
          ]
        )
      }
    })
  };


  render() {
    return (
      <SafeAreaProvider >
            <Header_New subtitle={"I Go Taxi"} showback={false} Wallet={this.state.userDetail.length > 0 ? this.state.userDetail[0].wallet : 0} />
            <NavigationContainer independent={true}>
              <MyTabs userDetail={this.state.userDetail} announcement={this.state.announcement} navigation={this.props.navigation} Runbackground={this.Runbackground} TripsJson={this.state.TripsJson} />
            </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}


