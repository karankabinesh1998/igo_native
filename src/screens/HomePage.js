import { View, Text, StyleSheet, ScrollView, BackHandler, TouchableOpacity, Alert, Linking, RefreshControl, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import CardView from 'react-native-cardview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Zocial from 'react-native-vector-icons/Zocial'
// import AsyncStorage from "@react-native-community/async-storage";
// import  NewTrips from '../screens/NewTrips';
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { RefreshJsons, TripsJsons } from '../configuration/functional';
import Slider_Carousal from '../components/Slider_Carousal';





export default function HomePage({ userDetail = [], announcement = [], navigation, TripsJson = [], Run_onRefreh }) {
 // let Hompage1 = true;
 // console.log(navigation,"14th homepage");
 // await AsyncStorage.getItem(Stored.userDetail);
 const [viewCarousl, SetCarsoual] = useState(false)
 const [cardView1, SetcardView1View] = useState(announcement)
 const [username, SetUsername] = useState(userDetail.length > 0 ? userDetail[0].username : "vendor");
 const [Wallet, SetWallet] = useState(userDetail.length > 0 ? userDetail[0].wallet : 0);
 const [refreshing, setRefreshing] = React.useState(false);


 useEffect(() => {
  onRefresh()
 }, [])

 useEffect(() => {
  SetUsername(userDetail.length > 0 ? userDetail[0].username : "vendor");
  SetWallet(userDetail.length > 0 ? userDetail[0].wallet : 0)
 }, [userDetail])


  useEffect(() => {
    SetcardView1View(announcement.length == 0 ? [] : JSON.parse(announcement));
    if (announcement.length != 0) {
      SetCarsoual(true)
    }
  }, [announcement]);

 const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
 }

 const onRefresh = React.useCallback(async () => {

  setRefreshing(true);
  Run_onRefreh();
  wait(2000).then(() => setRefreshing(false));
 }, []);

 // Must be outside of any component LifeCycle (such as `componentDidMount`).
 PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
   console.log("USERTOKEN:", token);
  },
  // (required) Called when a remote is received or opened, or local notification is opened

  onNotification: async function (notification) {

   let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
   let data = Stored_Data !== null ? JSON.parse(Stored_Data) : [];

   if (data.length != 0) {

    let UserJson = await RefreshJsons(data[0].id);

    let Tjson = await TripsJsons(data[0].id);
    if (UserJson.length) {

     GotoNewTrips(notification, Tjson, UserJson)
    }
   } else {
    navigation.navigate('LoginScreen')
   }



  },
  //(optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
   console.log("ACTION:", notification.action);
   console.log("onActionNotify:", notification);
   // process the action
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
   console.error(err.message, err);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
 });




 const GotoNewTrips = async (notification, Tjson, UserJson) => {


  navigation.navigate(`${notification.data.routes}`, { TripsJson: Tjson, userDetail: UserJson })

 }

 useEffect(() => {
  const backAction = () => {
   Alert.alert("Hold on!", "Are you sure you want to close the app?", [
    {
     text: "Cancel",
     onPress: () => null,
     style: "cancel"
    },
    { text: "YES", onPress: () => BackHandler.exitApp() }
   ]);
   return true;
  };

  const backHandler = BackHandler.addEventListener(
   "hardwareBackPress",
   backAction
  );

  return () => backHandler.remove();
 }, []);


 const callNumber = (phone = '8111028884') => {
  let mobileNumber = '8111028884'
  if (mobileNumber.length != 10) {
   alert('Please insert correct WhatsApp number');
   return;
  }
  // Using 91 for India
  // You can change 91 with your country code
  let url =
   'whatsapp://send?text=' +
   `Hello igotaxy , This is ${username}` +
   '&phone=91' + mobileNumber;
  Linking.openURL(url)
   .then((data) => {
    console.log('WhatsApp Opened');
   })
   .catch(() => {
    alert('Make sure Whatsapp installed on your device');
   });
 };


 const OtherPageRefersh = async (e) => {
  // console.log("Hello Karan",e);
  Run_onRefreh()
 }


 return (
  <View style={styles.container}>

   <ScrollView
    // stickyHeaderIndices={[1]}
    showsVerticalScrollIndicator={true}
    refreshControl={
     <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
     />
    }
   >

    <Slider_Carousal Data={cardView1} viewCarousl={viewCarousl} />

    <View style={styles.MiniCardView}>



     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>

      {/* <Image source={require('../assets/newtrip.jpg')} style={{width:'100%',flex: 1,}} />  */}
      <TouchableOpacity onPress={() => navigation.navigate('NewTrips', { TripsJson: TripsJson, userDetail: userDetail, navigation: navigation, OtherPageRefersh: OtherPageRefersh })} style={styles.iconstyle}>
       <AntDesign name="dashboard" style={{ marginTop: 9 }} color={'#ce3232'} size={100} />

       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>New Trips</Text>
      </TouchableOpacity>
     </CardView>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>

      {/* <Image source={require('../assets/newtrip.jpg')} style={{width:'100%',flex: 1,}} />  */}
      <TouchableOpacity onPress={() => navigation.navigate('MyBiddings', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <MaterialCommunityIcons name="book-information-variant" style={{ marginTop: 9 }} color={'#ce3232'} size={100} />

       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>My Biddings</Text>
      </TouchableOpacity>
     </CardView>

    </View>

    <View style={styles.MiniCardView}>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>

      <TouchableOpacity onPress={() => navigation.navigate('ActiveTrips', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <FontAwesome5 name="book" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />

       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>Active Trips</Text>
      </TouchableOpacity>
     </CardView>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('TripHistory', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       {/* <Image source={require('../assets/approvetrips.jpg')} style={{width:'100%',flex: 1,}} />  */}
       <Fontisto name="history" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>Trip History</Text>
      </TouchableOpacity>
     </CardView>

 </View>

    <View style={styles.MiniCardView}>

      <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('AddDriver', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <FontAwesome name="drivers-license" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>My Drivers</Text>
      </TouchableOpacity>
     </CardView>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('AddCabs', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <FontAwesome name="cab" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>My Cabs</Text>
      </TouchableOpacity>
     </CardView>


    </View>

    <View style={styles.MiniCardView}>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('NewProfile', { TripsJson: TripsJson, navigation: navigation, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <Ionicons name="person" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>Profile</Text>
      </TouchableOpacity>
     </CardView>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('MyLocations', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <Entypo name="location" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>My Locations</Text>
      </TouchableOpacity>
     </CardView>

    </View>

    {/* </View>  */}

    <View style={styles.MiniCardView}>

     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={callNumber} style={styles.iconstyle}>
       <FontAwesome name="whatsapp" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>Contact</Text>
      </TouchableOpacity>
     </CardView>


     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.miniCard}>
      <TouchableOpacity onPress={() => navigation.navigate('AccountandWallet', { TripsJson: TripsJson, userDetail: userDetail, OtherPageRefersh: OtherPageRefersh, navigation: navigation })} style={styles.iconstyle}>
       <FontAwesome5 name="wallet" color={'#ce3232'} style={{ marginTop: 9 }} size={100} />
       <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>Account Wallet</Text>
      </TouchableOpacity>
     </CardView>



    </View>

   </ScrollView>
  </View>


 )
}

const styles = StyleSheet.create({

 MainContainer: {

  flex: 1,
  // marginTop:4,
  // marginLeft: 9,
  width: '100%',
  height: 50,

  //   alignItems: 'center',

 },
 BalText: {
  // alignContent:"center",
  // textAlign:"left",
  // marginRight:180,
  fontWeight: 'bold',
  fontSize: 16,

  // marginRight:12
 },
 BalanceText: {
  // flex:2,
  flexDirection: "column-reverse",
  // marginLeft:8,
  alignItems: "center",
  marginBottom: 30,
  marginTop: 10

 },
 container: {

  flex: 1,
  // marginTop:10,
  backgroundColor: 'lightgray',
  // justifyContent: 'center',
  //flexDirection: "column"    
 },
 IconTopView: {
  marginTop: 20,
  marginLeft: 17,
  alignItems: "center",
  marginRight: 18
 },
 topNav: {
  // marginBottom:80,
  fontSize: 10,

 },
 MaterialCommunityIcons: {
  // marginTop:30
 },
 cardViewStyle: {

  width: '96%',
  height: 150,
  flexDirection: "column"

 },

 miniCard: {
  width: '40%',
  height: 140,
  // marginTop:16,
  // marginLeft:2
  margin: 20
 },
 miniCard_Main: {
  width: '95%',
  height: 60,
  margin: 10,
  backgroundColor: "white",
  justifyContent: "center",
  backgroundColor: "#ce3232"
 },

 MiniCardView: {
  // flex:1,
  flexDirection: "row",
  paddingTop: 5
 },

 cardView_InsideText: {
  flex: 1,
  fontSize: 10,
  color: '#000',
  // textAlign: 'center',
  width: '100%',
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
  // marginRight :20    

 },
 iconstyle: {
  alignItems: "center",
  flexDirection: "column",
  // flex:1
 }

})


