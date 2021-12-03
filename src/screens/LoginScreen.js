import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput1 from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import Config from '../configuration/config';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
// import PushNotification ,{ Importance } from 'react-native-push-notification';
import { TextInput } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'
// import AnimatedLoader from "react-native-animated-loader";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [Fire_Token, setToken] = useState(null)
  const [showpass, Setshowpass] = useState(true)

  useEffect(() => {
    messaging().getToken(firebase.app().options.messagingSenderId).then((token) => {
      // console.log(`firebase in Login SCreen TOKEN`,token)
      setToken(token)
    })
    const unsubscribe = messaging().onMessage(async remoteMsg => {
      const channelId = Math.random().toString(36).substring(7)
      //   createChannel(channelId);
      //   showNotification(channelId,
      //     {
      //     bigImage: remoteMsg.notification.android.imageUrl , 
      //     title : remoteMsg.notification.android.title ,
      //      body:remoteMsg.notification.android.body,
      //      color:remoteMsg.notification.android.color,
      //      subText: remoteMsg.data.subTitle });
      //   console.log(channelId,"channelId");
      //   console.log(remoteMsg,'remoteMsg');

    })
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      // console.log(`remoteMsg Background`, remoteMsg)
    })
    return unsubscribe
  }, [])

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


  // console.log(AsyncStorage.getItem(Stored.userDetail),"data displayed");

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    // console.log(email.value , password.value );

    // try {

    let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy;
    console.log(URL);
    fetch(URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_id: `${email.value}`,
        password: `${password.value}`
      })
    })
      .then(response => response.json())
      .then(async responseJson => {
        // console.log(responseJson,"responseKaran")
        if (responseJson.length) {
          // console.log(responseJson[0],"hello")
          // console.log(responseJson[0].BiddingTrip);

          const formData = new FormData();

          formData.append("token", Fire_Token)

          let URL =
            Config.ACCESS_POINT +
            Config.UpdateMaster + `tbl_user_web/${responseJson[0].id}`;

          console.log(URL);

          fetch(URL, {
            method: "put",
            body: formData
          })
            .then(response1 => response1.json())
            .then(async responseJson1 => {

              console.log(responseJson[0].ActiveTrips, "responseJson1");

              let data = JSON.stringify(responseJson)
              await AsyncStorage.setItem(Stored.userDetail, data);
              AsyncStorage.setItem("Userdetail", JSON.stringify(responseJson))

              await AsyncStorage.setItem(Stored.login_token, responseJson[0].login_token)
              AsyncStorage.setItem("login_token", responseJson[0].login_token)

              await AsyncStorage.setItem(Stored.announcement, responseJson[0].announcement);
              AsyncStorage.setItem("announcement", responseJson[0].announcement)

              Alert.alert(
                "Login Success ",
                "You have successfully Logged In!",
                [

                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
              // this.setState({ button : "Verify OTP" , otpView : true})
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })


            }).catch(function (error) {
              console.log("There is an error in networks", error);
              throw error;
            })

          // await AsyncStorage.setItem(Stored.BiddingData,responseJson[0].BiddingTrip)
          // AsyncStorage.setItem("BiddingData",responseJson[0].BiddingTrip)  

          // let data = JSON.stringify(responseJson)
          //  await AsyncStorage.setItem(Stored.userDetail,data);  
          // AsyncStorage.setItem("Userdetail",JSON.stringify(responseJson))  


        } else {
          Alert.alert(
            "Login Failed ",
            "There is no username / password !",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        }
      }).catch(function (error) {
        console.log("There is an error in networks", error);
        throw error;
      })

    // } catch (error) {
    //   console.log(error);
    // }

  }

  const ShowPassword = () => {
    Setshowpass(!showpass)
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput1
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput1
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={showpass}
        right={<TextInput.Icon onPress={ShowPassword} name={showpass == true ? "eye-off" : "eye"} />}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" style={{ backgroundColor: "#ce3232" }} onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: '#ce3232',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.igotaxy,
  },
})
