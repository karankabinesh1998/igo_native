import { View } from 'native-base';
import { StyleSheet, ActivityIndicator, ScrollView, Image, RefreshControl, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import CardView from 'react-native-cardview';
import SimpleImagePicker from '../components/ImagePicker';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Rating } from 'react-native-elements';
import Config from '../configuration/config';
import { emailValidator } from '../helpers/emailValidator'
import { addressValidator } from '../helpers/addressValidator'
import { nameValidator } from '../helpers/nameValidator'
import { mobileValidator } from '../helpers/mobileValidator'
// import { RefreshJson } from './RefreshJson';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RefreshJsons, VendorUserLogout } from '../configuration/functional'



export default function ProfileSCreen({ navigation, userDetail, OtherPageRefersh }) {

  let userDetail_ = userDetail[0];
  const [name, setName] = useState({ value: userDetail_.username, error: '' })
  const [mobile, setmobile] = useState({ value: userDetail_.mobile, error: '' })
  const [alternate_mobile, setalternate_mobile] = useState({ value: userDetail_.alternate_mobile, error: '' })
  const [email, setEmail] = useState({ value: userDetail_.email_id, error: '' })
  const [address, setAddress] = useState({ value: userDetail_.address, error: '' })
  const [profile_dp, setProfile] = useState(userDetail_.profile_dp);
  const [activeIndicator, setActiveindicator] = useState(false);
  const [rating, setRating] = useState(userDetail_.rating);
  const [gpay_number, setgpay_number] = useState({ value: userDetail_.gpay_number, error: '' })

  const [refreshing, setRefreshing] = React.useState(false);


  // console.log(userDetail_ ,"Pressed");
  // console.log(`${Config.ACCESS_POINT}/admin/profile/${Profile}`);

  const onUpdatePressed = async () => {

    const nameError = nameValidator(name.value)
    const mobileError = mobileValidator(mobile.value)
    const emailError = emailValidator(email.value)
    const addressError = addressValidator(address.value)
    if (emailError || addressError || nameError || mobileError) {
      setName({ ...name, error: nameError })
      setmobile({ ...mobile, error: mobileError })
      setEmail({ ...email, error: emailError })
      setAddress({ ...address, error: addressError })
      return
    }

    setActiveindicator(true)


    const formData = new FormData();

    formData.append("username", name.value)
    // formData.append("name",name.value)
    formData.append("mobile", mobile.value)
    formData.append("alternate_mobile", alternate_mobile.value)
    formData.append("email_id", email.value)
    formData.append("address", address.value)
    formData.append("gpay_number", gpay_number.value)

    let arr = {}
    arr.username = name.value;
    arr.mobile = name.mobile;
    arr.email_id = email.value;
    arr.address = address.value


    let URL =
      Config.ACCESS_POINT +
      Config.UpdateMaster + `tbl_user_web/${userDetail_.id}`;


    fetch(URL, {
      method: "put",
      body: formData
    })
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.length > 0) {
          setActiveindicator(false)
          let data = JSON.stringify(responseJson)
          await AsyncStorage.setItem(Stored.userDetail, data);
          AsyncStorage.setItem("Userdetail", JSON.stringify(responseJson))
          // this.setState({ button : "Verify OTP" , otpView : true})
          setName({ value: data[0].username, error: '' })
          setmobile({ value: data[0].mobile, error: '' })
          setalternate_mobile({ value: data[0].alternate_mobile, error: '' })
          setEmail({ value: data[0].email_id, error: '' })
          setAddress({ value: data[0].address, error: '' })
          setProfile(data[0].profile_dp);
          setgpay_number({ value: data[0].gpay_number, error: '' })
          Alert.alert(
            "Profile has been Updated",
            "Updated Successfully !",
            [

              { text: "OK", onPress: () => onRefresh() }
            ]
          )


        } else {

          Alert.alert(
            "Profile Update Failed",
            "Try other some time!",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )

        }
      }).catch(function (error) {
        console.log("There is an error in networks", error);
        throw error;
      })

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const handleUserDeatils = async (e) => {
    // console.log(e,"handleUserDeatils");
    setProfile(e[0].profile_dp);
    Alert.alert(
      "Profile Image Updated",
      "Profile Image Updated Successfully!",
      [

        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }

  const onRefresh = React.useCallback(async () => {

    setRefreshing(true);

    let result = await RefreshJsons(userDetail_.id);
    setName({ value: result[0].username, error: '' })
    setmobile({ value: result[0].mobile, error: '' })
    setEmail({ value: result[0].email_id, error: '' })
    setAddress({ value: result[0].address, error: '' })
    setProfile(result[0].profile_dp)
    setRating(result[0].rating)
    setActiveindicator(false)
    OtherPageRefersh("refresh");
    //  console.log( result,"Refrehjson");
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const LogoutUser = async () => {
    // VendorUserLogout
    try {

      const formData = new FormData();

      formData.append("login_token", null)

      let result = await VendorUserLogout(formData, userDetail_.id)
      if (result == true) {
        await AsyncStorage.removeItem(Stored.userDetail);
        await AsyncStorage.removeItem(Stored.TripsJsob);
        await AsyncStorage.removeItem(Stored.login_token);
        await AsyncStorage.removeItem(Stored.announcement);
        navigation.navigate('LoginScreen');
        // let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
        return true;

      } else {
        Alert.alert(
          "Failed to logout!!",
          "There is an error in networks",
          [

            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      }

    }
    catch (exception) {
      return false;
    }
  }

  const AlertLogout = () =>
    Alert.alert(
      "Logout",
      "Are you sure !",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => LogoutUser() }
      ]
    );

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
  return (


    <View style={styles.container}>

      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>



        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
        >

          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={styles.cardViewStyle12}>

            <Header style={styles.heading}>Your Profile</Header>

            <View style={styles.ViewcardBelow1}>

              <SimpleImagePicker Profile={profile_dp} id={userDetail_.id} handleUserDeatils={handleUserDeatils} />
            </View>

            <Rating
              type='custom'
              ratingCount={5}
              imageSize={20}
              readonly={true}
              startingValue={rating}
            />

            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              container={styles.InputText}
              onChangeText={(text) => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
            />

            <TextInput
              label="Mobile"
              keyboardType="numeric"
              // style={[styles.textInput, { width: '100%' }]}
              container={styles.InputText}
              value={mobile.value}
              placeholder='mobile number'
              onChangeText={(value) => setmobile({ value: value, error: '' })}
              error={!!mobile.error}
              errorText={mobile.error}
            />



            <TextInput
              label="Alternative Mobile"
              keyboardType="numeric"
              // style={[styles.textInput, { width: '100%' }]}
              container={styles.InputText}
              value={alternate_mobile.value}
              placeholder='mobile number'
              onChangeText={(value) => setalternate_mobile({ value: value, error: '' })}
              error={!!alternate_mobile.error}
              errorText={alternate_mobile.error}
            />

            <TextInput
              label="Gpay Number"
              keyboardType="numeric"
              // style={[styles.textInput, { width: '100%' }]}
              maxLength={10}
              container={styles.InputText}
              value={gpay_number.value}
              placeholder='Gpay number'
              onChangeText={(value) => setgpay_number({ value: value, error: '' })}
              error={!!gpay_number.error}
              errorText={gpay_number.error}
            />

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              container={styles.InputText}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TextInput
              label="Address"
              multiline={true}
              returnKeyType="next"
              numberOfLines={4}
              value={address.value}
              container={styles.InputText}
              onChangeText={(text) => setAddress({ value: text, error: '' })}
              error={!!address.error}
              errorText={address.error}
            />


            {activeIndicator ?

              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#ce3232" />
              </View>

              : <Button mode="contained" style={styles.button} onPress={onUpdatePressed}>
                Update Profile
              </Button>}

            <Button mode="contained" style={styles.button1} onPress={AlertLogout}>
              Logout
            </Button>

          </CardView>

        </ScrollView>
        {/* </View> */}



      </CardView>

      {/* <SimpleImagePicker/> */}

    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: "center"
  },
  button: {
    backgroundColor: "#ce3232",
    width: "95%",
    marginLeft: '2%',
    marginBottom: 1

  },
  button1: {
    backgroundColor: "#ce3232",
    width: "95%",
    marginLeft: '2%',
    marginBottom: 20
  },
  cardViewStyle: {
    width: '100%',
    // marginTop:10,
    height: '100%',
  },
  cardViewStyle12: {
    width: '100%',
    height: 900
  },
  InputText: {
    width: '95%',
    marginVertical: 5,
    marginLeft: 5,
    alignContent: "center",
    // height:55
  },
  ViewcardBelow: {
    // alignItems:'center'
  },
  ViewcardBelow1: {
    marginTop: 5,
    marginBottom: 5,
    // height:150,
    position: 'relative',

  },
  heading: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#ce3232',
    fontWeight: 'bold',
    // position:'absolute'

  },
  tinyLogo: {
    width: 100,
    // marginTop:5,
    height: 100,
    alignSelf: 'center',
    // position:'absolute'


  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,

  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
})
