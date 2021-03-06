import { View, Text, ScrollView, Image, RefreshControl, BackHandler, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { RefreshJsons } from '../configuration/functional';
import Button from '../components/Button';
import DocumentImagePicker from '../components/DocumentImagePicker';
import Header_New from '../components/Header_New';

export default function DocumentUpload({ navigation, route, userDetail, OtherPageRefersh }) {

  // console.log(OtherPageRefersh,"20202020")

  const [userDetail1, setuserDetail] = useState(userDetail);
  const [DocumentationArray, setDocumentationArray] = useState(JSON.parse(userDetail1[0].Documentation));

  const [refreshing, setRefreshing] = React.useState(false);
  const [approval, setApproval] = useState(DocumentationArray.length ? DocumentationArray[0].approval : 0)
  const [showButton, setShowButton] = useState(DocumentationArray.length ? true : false);
  const [aadhar_front, setaadhar_front] = useState(DocumentationArray.length ? DocumentationArray[0].aadhar_front : null);
  const [aadhar_back, setaadhar_back] = useState(DocumentationArray.length ? DocumentationArray[0].aadhar_back : null);
  const [driving_licence_front, setdriving_licence_front] = useState(DocumentationArray.length ? DocumentationArray[0].driving_licence_front : null);
  const [driving_licence_back, setdriving_licence_back] = useState(DocumentationArray.length ? DocumentationArray[0].driving_licence_back : null);
  const [pancard_front, setpancard_front] = useState(DocumentationArray.length ? DocumentationArray[0].pancard_front : null);
  const [pancard_back, setpancard_back] = useState(DocumentationArray.length ? DocumentationArray[0].pancard_back : null);
  const [account_details, Setaccount_details] = useState(DocumentationArray.length ? DocumentationArray[0].account_details : null)


  // setuserDetail(userDetail1[0][0]);

  // console.log(DocumentationArray,"DocumentUpload");
  // setuserDetail()




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


  const handleUserDeatils = (a, b) => {

    if (a == 'aadhar_front') {
      setaadhar_front(b);
      Alert.alert(
        `Aadhar Card Front`,
        "Aadhar Card Front Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == 'aadhar_back') {
      setaadhar_back(b);
      Alert.alert(
        `Aadhar Card Back`,
        "Aadhar Card Back Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == 'driving_licence_back') {
      setdriving_licence_back(b);
      Alert.alert(
        `Driving License Back`,
        "Driving License Back Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == 'driving_licence_front') {
      setdriving_licence_front(b)
      Alert.alert(
        `Driving License Front`,
        "Driving License Front Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == 'pancard_front') {
      setpancard_front(b)
      Alert.alert(
        `Pan Card Front`,
        "Pan Card Front Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == 'pancard_back') {
      setpancard_back(b)
      Alert.alert(
        `Police Verify Certificate`,
        "Police Verify Certificate Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (a == "account_details") {

      Setaccount_details(b);

      Alert.alert(
        `Account PassBook`,
        "Account PassBook Uploaded Successfully!",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )

    }




  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(async () => {

    setRefreshing(true);

    let result = await RefreshJsons(userDetail1[0].id);
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];

    setDocumentationArray(JSON.parse(result[0].Documentation))
    setaadhar_front(DocumentationArray[0].aadhar_front)
    setaadhar_back(DocumentationArray[0].aadhar_back)
    setdriving_licence_front(DocumentationArray[0].driving_licence_front)
    setdriving_licence_back(DocumentationArray[0].driving_licence_back)
    setpancard_front(DocumentationArray[0].pancard_front)
    setpancard_back(DocumentationArray[0].pancard_back)
    setShowButton(DocumentationArray.length ? true : false)
    setApproval(DocumentationArray[0].approval);
    Setaccount_details(DocumentationArray[0].account_details)
    console.log(DocumentationArray, "Refrehjson");
    OtherPageRefersh("refresh");
    wait(2000).then(() => setRefreshing(false));
  }, []);


  return (
    <SafeAreaProvider style={{ backgroundColor: "lightgrey" }}>

      {/* <Header_New subtitle="Documents" navigation={navigation} /> */}

      {/* <Header
              placement="left"
              statusBarProps={{ barStyle: 'light-content' }}
              barStyle="light-content"
              leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
              centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
              rightComponent={ <WhatsappandCall  navigation ={navigation.navigation}   /> }
              containerStyle={{
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  width:'100%',
                  height:'16%'
                }}
              /> */}

      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle12}>

        <View style={styles.MainContainer} >




          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

            {showButton == true ?

              <>
                {approval == 0 ?
                  <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={styles.cardViewStyle1}>

                    <View style={styles.HeadingView23}>
                      <Text style={styles.TextView}>Waiting For Approval</Text>
                      {/* <DocumentImagePicker Profile={aadhar_front} docname={'aadhar_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils}/> */}
                    </View>

                  </CardView> :
                  <>
                    <CardView
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}
                      style={styles.cardViewStyle3}>

                      <View style={styles.HeadingView23}>
                        <Text style={styles.TextView2}>Approved</Text>
                      </View>

                    </CardView>
                  </>
                }

              </>

              : null}

            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>

              <View style={styles.HeadingView}>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Aadhar Front </Text>
                  <DocumentImagePicker Profile={aadhar_front} docname={'aadhar_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>

                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Aadhar Back </Text>
                  <DocumentImagePicker Profile={aadhar_back} docname={'aadhar_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
              </View>

            </CardView>

            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>

              <View style={styles.HeadingView}>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Driving License Front </Text>
                  <DocumentImagePicker Profile={driving_licence_front} docname={'driving_licence_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Driving License Back </Text>
                  <DocumentImagePicker Profile={driving_licence_back} docname={'driving_licence_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
              </View>

            </CardView>


            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>

              <View style={styles.HeadingView}>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Pan Card Front </Text>
                  <DocumentImagePicker Profile={pancard_front} docname={'pancard_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Police Verify Certificate </Text>
                  <DocumentImagePicker Profile={pancard_back} docname={'pancard_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
              </View>

            </CardView>


            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>

              <View style={styles.HeadingView}>
                <View style={styles.HeadingView1}>
                  <Text style={styles.TextView}>Account PassBook</Text>
                  <DocumentImagePicker Profile={account_details} docname={'account_details'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
                </View>
                {/* <View style={styles.HeadingView1}>
    <Text style={styles.TextView}>Police Verify Certificate </Text>
    <DocumentImagePicker Profile={pancard_back} docname={'pancard_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>     */}
              </View>

            </CardView>

            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>

              {/* <View style={styles.HeadingView}>
<View style={styles.HeadingView1}>
    <Text style={styles.TextView}>Pan Card Front </Text>
    <DocumentImagePicker Profile={pancard_front} docname={'pancard_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>
<View style={styles.HeadingView1}>
    <Text style={styles.TextView}>Police Verify Certificate </Text>
    <DocumentImagePicker Profile={pancard_back} docname={'pancard_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>    
</View> */}

            </CardView>


          </ScrollView>
        </View>
      </CardView>
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    marginTop: 4,
    marginLeft: 9,
    width: '100%',
    height: 800,
  },
  cardViewStyle: {

    width: '96%',
    height: 150,
    flexDirection: "column",
    marginTop: 9,

  },
  ViewcardBelow1: {
    marginTop: 5,
    marginBottom: 5,
    // height:150,
    position: 'relative',

  },
  cardViewStyle12: {
    width: '100%',
    height: '100%',
    flexDirection: "column",
    // alignContent:"center",
    // marginTop:9,
  },
  cardViewStyle1: {

    width: '96%',
    height: 50,
    flexDirection: "column",
    marginTop: 9,
    justifyContent: "center",
    backgroundColor: "yellow"

  },
  cardViewStyle3: {

    width: '96%',
    height: 50,
    flexDirection: "column",
    marginTop: 9,
    justifyContent: "center",
    backgroundColor: "green"

  },
  TextView2: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500"
    // backgroundColor:"green"
  },
  TextView: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold"
  },
  HeadingView: {
    flex: 1,
    flexDirection: "row",
    margin: 5
  },
  HeadingView1: {
    marginLeft: 1,
    borderWidth: 1,
    flex: 1,
    // borderColor:"red", 
    alignItems: "center"
  },
  HeadingView23: {

  }

})