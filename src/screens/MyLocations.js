import { View, Text, ScrollView, FlatList, Alert, RefreshControl, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import CardView from 'react-native-cardview';
import Header1 from '../components/Header';
import { RefreshJsons, StartandEndTrip } from '../configuration/functional';
import MultiSelectExample from '../components/MultiSelect';
import Header_New from '../components/Header_New';

export default function MyLocations({ navigation, route }) {

  const [state, Setstate] = useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].state) : [])
  const [id, setId] = useState(route.params.userDetail[0].id ? route.params.userDetail[0].id : null)
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedItems, SetselectedItems] = useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].travel_location) : [])

  useEffect(() => {
    onRefresh()
  }, [])

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
    if (result) {
      Setstate(JSON.parse(result[0].state))
    }
    route.params.OtherPageRefersh("refresh");
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const HandleSelect = async (a) => {
    Setstate(JSON.parse(a[0].state))
    Alert.alert(
      "Location Updated!",
      "Location Updated Successfully",
      [

        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }


  return (
    <SafeAreaProvider style={{ backgroundColor: "lightgrey" }}>

      <Header_New subtitle="My Location" navigation={navigation} />

      <View style={styles.MainContainer} >

        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={5}
          style={styles.cardViewStyle}>
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            // contentContainerStyle={{backgroundColor:"red"}}
            >
              <Header1 style={styles.heading}>Preferred Location </Header1>
            </ScrollView>
          </View>
          {/* </ScrollView> */}
          <MultiSelectExample state={state} id={id} HandleSelect={HandleSelect} refreshing={refreshing} onRefresh={onRefresh} selectedItems={selectedItems} />
          {/* </ScrollView> */}
        </CardView>



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
  MainContainer: {

    flex: 1,
    marginTop: 4,
    marginLeft: 9,
    width: '100%',
    height: 80,
  },
  cardViewStyle: {

    width: '96%',
    height: 832,
    flexDirection: "column",
    marginTop: 9,
    // marginLeft: 9,

  },
  button: {
    backgroundColor: "green",
    width: "95%",
    marginLeft: 10,
    height: 60

  },
  buttonstarted: {
    backgroundColor: "red",
    width: "95%",
    marginLeft: 10,
    height: 60,
    // fontSize:15
  },
  ButtView: {
    flex: 1,
    flexDirection: "row"
  },
  FileUploadView: {
    flexDirection: "row",
    margin: 5,

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
  HeadHaed: {
    alignItems: "center",
    backgroundColor: 'yellow'
  },
  TextText: {
    fontSize: 25

  },
  TextTrip: {
    fontSize: 15
  },
  heading: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ce3232',
    fontWeight: 'bold',
    // position:'absolute'
  },

})