import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo';
import { StyleSheet , Alert } from 'react-native';
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
// import { emailValidator } from '../helpers/emailValidator'
import { mobileValidator } from '../helpers/mobileValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { otpValidator } from '../helpers/otpValidator';
import { sendOtp , CheckOtpandPassword } from '../configuration/functional'
import { View } from 'native-base'

export default function ResetPasswordScreen({ navigation }) {
  const [mobile, setmobile] = useState({ value: '', error: '' });
  const [otprecived,setotprecived]=useState(false);

  const [otp,setOtp]=useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = async() => {
    const emailError = mobileValidator(mobile.value)
    if (emailError) {
      setEmail({ ...mobile, error: emailError })
      return
    }

    const formData=new FormData();

    formData.append("mobile",mobile.value)

    let result = await sendOtp(formData)

    if(result){
    console.log(result,"otp37");

    setotprecived(true)

    }
    // navigation.navigate('LoginScreen')
    }


  const submit =async()=>{

    const emailError = passwordValidator(password.value);
    const otpError = otpValidator(otp.value)

    if (otpError) {
      setPassword({ ...otp, error: otpError })
      return
    }


    if (emailError) {
      setPassword({ ...password, error: emailError })
      return
    }

    const formData=new FormData();

    formData.append("otp",otp.value)

    formData.append("password",password.value)

    let result = await CheckOtpandPassword(formData)

    if(result[0].status == true){

      console.log(result);

      console.log(result[0]);

      setotprecived(false)

      Alert.alert(
        "Password has been Updated",
        "Updated Successfully !",
        [
         
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]
      )

      // navigation.navigate('LoginScreen')

    }else{

      Alert.alert(
        "Worng OTP Number",
        "Please Verify your otp number !",
        [
         
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]
      )

    }

    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
     {otprecived == false ? <View style={styles.container}> 
     
      <TextInput
      label="Mobile"
       keyboardType="numeric"
       value={mobile.value}
      placeholder='mobile number'
      onChangeText={(value) => setmobile({ value: value, error: '' })} 
      error={!!mobile.error}
      errorText={mobile.error}
        />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        // style={{ marginTop: 16 }}
        style={{ marginTop: 16 ,backgroundColor:"#ce3232"}}
      >
        Reset Password
      </Button>

      </View> : <View style={styles.container}> 
      
      <TextInput
      label="Otp"
       keyboardType="numeric"
       value={otp.value}
      placeholder='Otp number'
      onChangeText={(value) => setOtp({ value: value, error: '' })} 
      error={!!otp.error}
      errorText={otp.error}
      maxLength = {6}
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
    onPress={submit}
    // style={{ marginTop: 16 }}
    style={{ marginTop: 16 ,backgroundColor:"#ce3232"}}
    >
    Set Password
    </Button>

       </View> }
    </Background>
  )
}

const styles = StyleSheet.create({
  container:{
      // flex:1,
      // backgroundColor: 'lightgray',
      alignItems:"center",
      width:'90%',

  },

})
