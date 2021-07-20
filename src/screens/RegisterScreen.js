import React, { useState } from 'react'
import { View, StyleSheet,Alert , TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import  Config from '../configuration/config';
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { mobileValidator } from '../helpers/mobileValidator'
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [mobile, setmobile] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const mobileError = mobileValidator(mobile.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError || mobileError ) {
      setName({ ...name, error: nameError })
      setmobile({...mobile,error:mobileError})
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    
    const formData=new FormData();

    formData.append("username",name.value)
    formData.append("name",name.value)
    formData.append("mobile",mobile.value)
    formData.append("email_id",email.value)
    formData.append("password",password.value)
    formData.append("userType",3)
    formData.append("login_status",1)
    formData.append("status","active")

    // console.log([...formData]);
    let URL =
      Config.ACCESS_POINT +
      Config.APPregister;

      console.log(URL);

      fetch(URL, {
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })
      .then(response => response.json())
      .then(async responseJson => {
        if(responseJson){
            // console.log(responseJson,"hello")
            let data = JSON.stringify(responseJson)
             await AsyncStorage.setItem(Stored.userDetail,data);  
            // AsyncStorage.setItem("Userdetail",JSON.stringify(responseJson))  
              // this.setState({ button : "Verify OTP" , otpView : true})

              Alert.alert(
                "Welcome to Igotaxy",
                "Registered Successfully !",
                [
                  // {
                  //   text: "Cancel",
                  //   onPress: () => console.log("Cancel Pressed"),
                  //   style: "cancel"
                  // },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )

                  navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                  })
            }
            }).catch(function(error) {
              console.log("There is an error in networks",error);
              throw error;
            })


    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
        <TextInput
       keyboardType="numeric"
      // style={[styles.textInput, { width: '100%' }]}
       
      value={mobile.value}
      placeholder='mobile number'
      onChangeText={(value) => setmobile({ value: value, error: '' })} 
      error={!!mobile.error}
      errorText={mobile.error}
        />

      <TextInput
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 ,backgroundColor:"#ce3232"}}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.igotaxy,
  },
})
