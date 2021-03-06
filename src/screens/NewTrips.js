import { View, Text, ScrollView, Modal, Image, TouchableOpacity, RefreshControl, BackHandler, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import CardView from 'react-native-cardview';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { TripsJsons, AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { bidamountValidator } from '../helpers/bidamountValidator';
import { bidandWalletValidator } from '../helpers/bidandWalletValidator';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header_New from '../components/Header_New';
import { ApprovalValidator } from '../helpers/ApprovalValidator';
import { CheckDriverValidator } from '../helpers/CheckDriverValidator';
import { CheckCabValidator } from '../helpers/CheckCabValidator';
import { Provider } from 'react-native-paper';
import { parse } from '@babel/core';


export default function NewTrips({ navigation, route }) {

 const [TripsData, setTripsData] = useState({ value: route.params.TripsJson, error: '' })
 const [modalVisible, setModalVisible] = useState(false);
 const [bidamount, setBidAmount] = useState({ value: '', error: '' });
 const [bidData, setbidDAta] = useState(null);

 const [wallet, setWallet] = useState(route.params.userDetail[0].wallet ? route.params.userDetail[0].wallet : 0);
 const [id, setId] = useState(route.params.userDetail.length > 0 ? route.params.userDetail[0].id : null);

 const [UserDeatils, SetUserDeatils] = useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].Documentation) : []);

 const [vendorDrivers, SetvendorDrivers] = useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].vendorDrivers) : []);

 const [vendorCabs, SetvendorCabs] = useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].vendorCabs) : []);

 console.log(TripsData, "doc");

 const ApplyNewTrip = (value) => {
  setModalVisible(!modalVisible);
  setbidDAta(value)
 }

 const [refreshing, setRefreshing] = React.useState(false);

 useEffect(() => {
  const backAction = () => {
   navigation.navigate('Dashboard')
   return true;
  };

  const backHandler = BackHandler.addEventListener(
   "hardwareBackPress",
   backAction
  );

  return () => backHandler.remove();
 }, []);

 const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
 }

 const onRefresh = React.useCallback(async () => {
  setRefreshing(true);
  let result = await TripsJsons(id);
  let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
  let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
  setTripsData({ value: result, error: '' })
  route.params.OtherPageRefersh("refresh");
  wait(2000).then(() => setRefreshing(false));
 }, []);


 const SubmitBidamount = async () => {

  const BidAmount = bidamountValidator(bidamount.value);
  const Validator = bidandWalletValidator(wallet, bidamount.value);
  const Approval = ApprovalValidator(UserDeatils[0].approval);
  const CheckDriver = CheckDriverValidator(vendorDrivers.length);
  const CheckCab = CheckCabValidator(vendorCabs.length)

  if (Approval) {
   setBidAmount({ ...bidamount, error: Approval })
   return
  }

  if (CheckDriver) {
   setBidAmount({ ...bidamount, error: CheckDriver })
   return
  }

  if (CheckCab) {
   setBidAmount({ ...bidamount, error: CheckCab })
   return
  }

  if (BidAmount) {
   setBidAmount({ ...bidamount, error: BidAmount })
   return
  }

  if (Validator) {
   setBidAmount({ ...bidamount, error: Validator })
   return
  }

  const formDate = new FormData();
  formDate.append("trip_id", bidData.id);
  formDate.append("trip_id_1", bidData.trip_id);
  formDate.append("req_amount", bidamount.value);
  formDate.append("vendor_id", id);
  formDate.append("pickUp_date", bidData.pickup_date)
  formDate.append("total_amount", parseInt(bidData.trip_kms) * parseInt(bidData.trip_charges))

  let result = await AddBidTrips(formDate, bidData.tbl_bidding_id, id);

  if (result) {
   console.log(result, "Success");

   setTripsData({ value: result, error: '' })

   setModalVisible(false);
   setBidAmount(0)
   Alert.alert(
    "Bidding has been Updated",
    "Successfully Bidded !",
    [

     { text: "OK", onPress: () => onRefresh() }
    ]
   )

  }

 }

 const ResetModal = () => {

  setBidAmount({ value: 0, error: '' })
  setbidDAta(null)
  setModalVisible(false)
 }

 const formatAMPM = async (date) => {

  var hours = date.getHours();
  // console.log(hours,"hours")
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

 return (

  <SafeAreaProvider style={{ backgroundColor: "lightgrey" }}>
   <Provider>

    <Modal
     animationType="fade"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => ResetModal()}
    >
     <View style={styles.centeredView1}>
      <View style={styles.modalView}>

       <View style={styles.modelHead}>
        <Text style={styles.modalText}>Place Your Bid!</Text>

       </View>

       <TextInput
        label="Bid Amount"
        keyboardType="numeric"
        // style={[styles.textInput, { width: '100%' }]}
        container={styles.InputText}
        value={bidamount.value}
        placeholder='Enter your bit amount'
        onChangeText={(value) => setBidAmount({ value: value, error: '' })}
        error={!!bidamount.error}
        errorText={bidamount.error}
       />

       <View style={styles.Alignbutton}>

        <Button
         mode="contained"
         style={styles.button1}
         onPress={() => SubmitBidamount()}
        > Submit</Button>

        <Button
         mode="contained"
         style={styles.button1}
         onPress={() => ResetModal()}
        > Close</Button>

       </View>

      </View>

     </View>

    </Modal>

    <Header_New subtitle="New Trips" navigation={navigation} />

    <View style={styles.MainContainer} >
     <CardView
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.cardViewStyle12}>

      <ScrollView
       // stickyHeaderIndices={[1]}
       showsVerticalScrollIndicator={false}
       refreshControl={
        <RefreshControl
         refreshing={refreshing}
         onRefresh={onRefresh}
        />
       }
      >
       {TripsData.value.length > 0 ? TripsData.value.map((ival, i) => {
        console.log(i,'===');
        if (ival.trip_assigned_to == null) {

         return (
          <CardView
           cardElevation={5}
           cardMaxElevation={5}
           cornerRadius={5}
           style={styles.cardViewStyle}
           key={ival.id.toString()}
          >

           <View style={styles.Heading}>

            <View style={{ flexDirection: "row" }}>
             <Text style={styles.paraHeadingtrip_id}>TRIP ID:</Text>
             <Text style={styles.paraDatatrip_id}>{ival.trip_id}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallel}>

             <View style={styles.ParallelView}>
              <Text style={styles.paraDatalocation}>{ival.pickuplocation_name} - {ival.drop_location_name} </Text>
             </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallel}>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>PICK UP DATE:</Text>
              <Text style={styles.paraData}>{ival.new_pickup_date}</Text>
             </View>

             {ival.trip_type != "One Way" ? <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>DROP DATE:</Text>
              <Text style={styles.paraData}>{ival.new_drop_date}</Text>
             </View> : null}

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallel}>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>CAB TYPE:</Text>
              <Text style={styles.paraData}>{ival.cab_type}</Text>
             </View>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>DUTY TYPE:</Text>
              <Text style={styles.paraData}>{ival.trip_type}</Text>
             </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallel}>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>TRIP KMS:</Text>
              <Text style={styles.paraData}>{ival.trip_kms}</Text>
             </View>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>EXTRA CHARGE/KM:</Text>
              <Text style={styles.paraData}>{ival.extra_charge}</Text>
             </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallel}>

             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>TOTAL FAIR:</Text>
              <Text style={styles.paraData}>Rs.{parseInt(ival.trip_kms) * parseInt(ival.trip_charges)}/-</Text>
             </View>


             <View style={styles.ParallelView}>
              <Text style={styles.paraHeading}>BIDDING FAIR:</Text>
              <Text style={styles.paraData}>{ival.bidding_amount == 'No bidding' ? ival.bidding_amount : `Rs.${ival.bidding_amount}`}/-</Text>
             </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.ViewParallelExe}>

             <View style={{ marginLeft: 13, flexDirection: "column", alignItems: "center", marginTop: 7 }} >
              {ival.parking == 0 ? <Image source={require('../assets/nopark.jpg')} style={{ width: 55, height: 37 }} /> : <FontAwesome5 name="parking" color={'#ce3232'} style={{ marginTop: 9 }} size={30} />}
              <Text style={{ fontSize: 10 }}>{ival.parking == 0 ? "Parking" : "Parking"}</Text>
              <Text style={{ fontSize: 10 }}>{ival.parking == 0 ? "Excluded" : "Included"}</Text>
             </View>

             <View style={{ marginLeft: 13, alignItems: "center", flexDirection: "column", marginTop: 12 }} >
              <Image source={require('../assets/moon_up.png')} style={{ width: 40, height: 37 }} />
              <Text style={{ fontSize: 10 }}>{ival.night_pick_up == 0 ? "night pickup" : "night pickup"}</Text>
              <Text style={{ fontSize: 10 }}>{ival.night_pick_up == 0 ? "Excluded" : "Included"}</Text>
             </View>

             <View style={{ marginLeft: 13, alignItems: "center", flexDirection: "column", marginTop: 12 }} >
              <Image source={require('../assets/moon_down.png')} style={{ width: 40, height: 37 }} />
              <Text style={{ fontSize: 10 }}>{ival.night_drop_up == 0 ? "Night Drop" : "Night Drop"}</Text>
              <Text style={{ fontSize: 10 }}>{ival.night_drop_up == 0 ? "Excluded" : "Included"}</Text>
             </View>

             <View style={{ marginLeft: 13, alignItems: "center", flexDirection: "column", marginTop: 12 }} >
              <Image source={require('../assets/toll_plaza.jpg')} style={{ width: 40, height: 37 }} />
              <Text style={{ fontSize: 10 }}>{ival.toll_plaza == 0 ? "Toll Charges" : "Toll Charges"}</Text>
              <Text style={{ fontSize: 10 }}>{ival.toll_plaza == 0 ? "Excluded" : "Included"}</Text>
             </View>

             <View style={{ marginLeft: 10, alignItems: "center", flexDirection: "column", marginTop: 12 }} >
              <Image source={require('../assets/toll_plaza.jpg')} style={{ width: 40, height: 37 }} />
              <Text style={{ fontSize: 10 }}>{ival.permit == 0 ? "Permit Charges" : "Permit Charges"}</Text>
              <Text style={{ fontSize: 10 }}>{ival.permit == 0 ? "Excluded" : "Included"}</Text>
             </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <Button mode="contained" style={styles.button} onPress={() => ApplyNewTrip(ival)}>
             Request New Trip
            </Button>

           </View>
          </CardView>
         )

        }

       }) : <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>

        <View style={styles.HeadHaed}>
         <Text style={styles.TextText}>
          No New Trips
         </Text>
        </View>

       </CardView>
       }
      </ScrollView>
     </CardView>
    </View>
   </Provider>
   <View style={styles.headerFooterStyle}>
    <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.navigate('Dashboard')}>
     <Entypo name="home" color={'#ce3232'} size={22} />
     <Text style={{ textAlign: "center", fontSize: 10, marginTop: 5, fontWeight: "bold", color: "#ce3232" }}>Home</Text>
    </TouchableOpacity>
   </View>

  </SafeAreaProvider>
 )
}

const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  // width:'100%'
 },
 centeredView1: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,

 },
 modalView: {
  margin: 20,
  backgroundColor: "#e6e6e6",
  borderRadius: 20,
  padding: 15,
  // alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
   width: 5,
   height: 2
  },
  width: 340,
  height: 250,

  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 15
 },
 cardViewStyle12: {
  width: '96%',
  height: '95%',
  flexDirection: "column",
  // alignContent:"center",
  // marginTop:9,
 },
 Alignbutton: {
  flexDirection: "row",
  // width:500
 },
 textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
 },
 modalText: {
  textAlign: "center",
  fontWeight: "700",
  fontSize: 25,
  color: "#ce3232"
 },
 modalText1: {
  // marginBottom: 5,
  textAlign: "center",
  // marginLeft:15,
  // fontSize:25
 },
 modelHead: {
  // textAlign:"center",
  alignItems: "center",
  //  flexDirection:"row",
  //  flex:1
 },
 button1: {
  borderRadius: 15,
  width: 150,
  margin: 4,
  backgroundColor: "#ce3232",
  // padding: 4,
  // elevation: 2,
  // marginLeft:65

 },
 buttonOpen: {
  backgroundColor: "#F194FF",
 },
 buttonClose: {
  backgroundColor: "#2196F3",
 },
 MainContainer: {

  flex: 1,
  marginTop: 4,
  marginLeft: 9,
  width: '100%',
  height: 80,
 },
 cardViewStyle: {

  width: '96%',
  height: 450,
  flexDirection: "column",
  marginTop: 9,
  marginLeft: 8,

 },
 Heading: {
  alignItems: "flex-start"
 },
 paraHeading: {
  fontSize: 12,
  fontWeight: 'bold',
  padding: 5

 },
 paraHeadingtrip_id: {
  fontSize: 13,
  fontWeight: 'bold',
  padding: 5,
  marginLeft: 19
 },
 paraHeading1: {
  fontSize: 12,
  fontWeight: 'bold',
  padding: 5
 },
 paraData: {
  padding: 5,
  fontSize: 12,
  // marginLeft:8,
  color: "#ce3232",
  fontWeight: 'bold',

 },
 paraDatalocation: {
  padding: 5,
  fontSize: 15,
  fontWeight: "bold",
  marginLeft: 2,
  color: "#ce3232"
 },
 paraDatatrip_id: {
  padding: 5,
  fontSize: 13,
  color: "#ce3232",
  fontWeight: "bold",
 },
 ParallelView: {
  flexDirection: "column",
  flex: 1,
  marginLeft: 20,
  //justifyContent:"center"
 },

 ParallelView1: {
  flexDirection: "column",
  // flex:1,
  marginLeft: 5
  // marginLeft:20,
  // justifyContent:"center"
 },
 ViewParallel: {
  flexDirection: "row",
  justifyContent: "space-between"
 },
 ViewParallelExe: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,

 },
 button: {
  backgroundColor: "#ce3232",
  width: "95%",
  marginLeft: '2%'

 },
 HeadHaed: {
  alignItems: "center",
  backgroundColor: 'yellow'
 },
 TextText: {
  fontSize: 15

 },
 containerStyles: {
  width: 340
 },
 headerFooterStyle: {
  width: '100%',
  height: 45,
  backgroundColor: '#ffff',
  position: 'absolute', left: 0, right: 0, bottom: 0
 },
 textStyle: {
  textAlign: 'center',
  color: '#fff',
  fontSize: 18,
  padding: 7,
 },
 iconstyle: {
  alignItems: "center",
  flexDirection: "column",
  // flex:1
 }

})