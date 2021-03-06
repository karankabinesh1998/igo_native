import { View, Text, ScrollView, Picker, TouchableOpacity, Alert, RefreshControl, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import CardView from 'react-native-cardview';
import { RefreshJsons, AddBidTrips, ConfirmActiveTrip } from '../configuration/functional';
import { CancelTrip } from '../configuration/functional';
import SpinnerButton from 'react-native-spinner-button';
import Header_New from '../components/Header_New';
import { Provider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';



export default function MyBiddings({ navigation, route }) {

  let [BidData, setBidData] = useState(route.params.userDetail[0].BiddingTrip ? JSON.parse(route.params.userDetail[0].BiddingTrip) : null);
  const [id, setId] = useState(route.params.userDetail[0].id ? route.params.userDetail[0].id : null)
  const [vendorDrivers, setvendorDrivers] = useState(JSON.parse(route.params.userDetail[0].vendorDrivers))
  const [vendorCabs, setvendorCabs] = useState(JSON.parse(route.params.userDetail[0].vendorCabs))
  const [selectedDriver, setselectedDriver] = useState(null);
  const [selectedCab, setselectedCab] = useState(null)




  const Submit = async (e, i) => {
    if (selectedDriver == null) {
      Alert.alert(
        "No Driver selected",
        "Please Select your driver",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )

      return false
    }
    if (selectedCab == null) {
      Alert.alert(
        "No Cab selected",
        "Please Select your Cab",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )

      return false
    }
    const NewData = BidData;

    NewData[i].activeindicator = true;

    setBidData(NewData)

    const formData = new FormData();
    formData.append("vendor_id", id);
    formData.append("driver_id", selectedDriver)
    formData.append("cab_id", selectedCab)
    formData.append("trip_id", e.trip_id)
    formData.append("pick_up_date", e.pickUp_date)
    formData.append("trip_amount", e.total_amount)
    formData.append("vendor_req_amount", e.req_amount)
    formData.append("status", "pending")
    console.log(formData, "IVALs");
    try {
      let result = await ConfirmActiveTrip(formData);

      if (result) {
        setBidData(result)
        onRefresh()
        Alert.alert(
          "Trip has been Activated",
          "Activated Successfully !",
          [

            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      }

    } catch (error) {
      console.log(error);
    }

  }


  const ConfirmCancelTrip = (e, i) => {
    Alert.alert("Are You Sure!", "Do you want to Cancel the Trip?", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => CancelTrip1(e, i) }
    ]);
  }


  const CancelTrip1 = async (e, i) => {

    if (BidData.length > 0) {

      const NewData = BidData;

      NewData[i].activeindicator1 = true;
      setBidData(NewData);
    }

    const formData = new FormData();
    formData.append("bid_id", e.id);
    formData.append("trip_amount", e.total_amount)
    formData.append("vendor_req_amount", e.req_amount)
    formData.append("trip_id", e.trip_id)

    try {


      let result = await CancelTrip(formData, id)

      if (result) {
        setBidData(result)
        onRefresh()
        Alert.alert(
          "Trip has been Cancelled",
          "Trip Cancelled Successfully !",
          [

            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      }


    } catch (error) {
      console.log(error)
    }

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

    let result = await RefreshJsons(id);
    setBidData(JSON.parse(result[0].BiddingTrip))
    setselectedDriver(JSON.parse(result[0].vendorDrivers))
    setselectedCab(JSON.parse(result[0].vendorCabs));
    route.params.OtherPageRefersh("refresh");
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: "lightgrey" }}>
      <Provider>
        <Header_New subtitle="My Biddings" navigation={navigation} />
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
              {BidData.length > 0 ? BidData.map((ival, i) => {
                if (ival.status == 'approved') {
                  return (
                    <CardView
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}
                      style={styles.cardViewStyle}>

                      <View style={styles.Headings}>

                        <Text style={styles.Status}>{ival.status.toUpperCase()}</Text>

                      </View>

                      <View style={styles.HeadData}>
                        <Text style={styles.TextTrip}>Trip Id : {ival.trip_id_1}</Text>
                      </View>

                      <View style={styles.HeadData}>
                        <Text style={styles.TextTrip}>Trip Date : {ival.new_pickup_date}</Text>
                      </View>
                      <View style={styles.HeadData}>
                        <Text style={styles.TextTrip}>Trip Total Amount : Rs.{ival.total_amount ? ival.total_amount : 0} /-</Text>
                      </View>

                      <View style={styles.HeadData}>
                        <Text style={styles.TextTrip}>Your Request Amount : Rs.{ival.req_amount}/-</Text>
                      </View>

                      <View style={styles.FileUploadView}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Driver: </Text>
                      </View>
                      <Picker
                        selectedValue={selectedDriver}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) => setselectedDriver(itemValue)}
                      >
                        <Picker.Item label={"Select Driver"} value={null} />
                        {vendorDrivers.length ? vendorDrivers.map((kval, k) => {
                          if (kval.status == 1) {
                            return (
                              <Picker.Item label={kval.driver_name} value={kval.id} />
                            )
                          }
                        }) : null}
                      </Picker>


                      <View style={styles.FileUploadView}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Cab: </Text>
                      </View>

                      <Picker
                        selectedValue={selectedCab}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) => setselectedCab(itemValue)}
                      >
                        <Picker.Item label={"Select Cab"} value={null} />
                        {vendorCabs.length ? vendorCabs.map((jval, j) => {
                          if (jval.status == 1) {
                            return (
                              <Picker.Item label={jval.cab_name} value={jval.id} />
                            )
                          }
                        }) : null}
                      </Picker>

                      <SpinnerButton
                        buttonStyle={styles.buttonStyle,
                          { backgroundColor: '#ce3232', width: 300 }}
                        isLoading={ival.activeindicator}
                        onPress={() => Submit(ival, i)}
                        indicatorCount={10}
                        spinnerType='BarIndicator'
                        disabled={false}
                        animateHeight={50}
                        animateWidth={200}
                        animateRadius={10}
                      >
                        <Text style={styles.buttonText}>Active Trip</Text>
                      </SpinnerButton>

                      <SpinnerButton
                        buttonStyle={styles.buttonStyle,
                          { backgroundColor: '#ce3232', width: 300 }}
                        isLoading={ival.activeindicator1}
                        onPress={() => ConfirmCancelTrip(ival, i)}
                        indicatorCount={10}
                        spinnerType='BarIndicator'
                        disabled={false}
                        animateHeight={50}
                        animateWidth={200}
                        animateRadius={10}
                      >
                        <Text style={styles.buttonText}>Cancel Trip</Text>
                      </SpinnerButton>
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
                    No Bidding Trips
                  </Text>
                </View>

              </CardView>}


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
    height: 490,
    flexDirection: "column",
    marginTop: 9,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#ce3232",
    width: "95%",
    marginLeft: '2%'
  },
  FileUploadView: {
    flexDirection: "row",
    margin: 5,

  },
  cardViewStyle12: {
    width: '96%',
    height: '95%',
    flexDirection: "column",
  },
  Headings: {
    backgroundColor: "#008000",
    alignItems: "center"
  },
  Status: {
    fontSize: 25
  },
  HeadData: {
    margin: 5
  },
  TextTrip: {
    fontSize: 15
  },
  HeadHaed: {
    alignItems: "center",
    backgroundColor: 'yellow'
  },
  TextText: {
    fontSize: 15

  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#25CAC6',
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  }
  , headerFooterStyle: {
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
  }

})