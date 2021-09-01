import React from 'react';
import { TouchableOpacity , Alert , View , StyleSheet , Linking , Image, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import Feather from 'react-native-vector-icons/Feather';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
// import { View } from 'native-base';

export default function WhatsappandCall({ navigation }) {

//   const LogoutUser=async()=>{
//         // console.log("STYLE")
//         await AsyncStorage.removeItem(Stored.userDetail); 
//         await AsyncStorage.removeItem(Stored.TripsJsob); 
//         navigation.navigate('LoginScreen')
// }

// const AlertLogout = () =>
//     Alert.alert(
//       "Logout",
//       "Are you sure !",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: "OK", onPress: () => LogoutUser() }
//       ]
//     );

    const initiateWhatsApp = () => {
      // console.log(123);
      // Check for perfect 10 digit length
      let mobileNumber = '9080050803'
      if (mobileNumber.length != 10) {
        alert('Please insert correct WhatsApp number');
        return;
      }
      // Using 91 for India
      // You can change 91 with your country code
      let url =
        'whatsapp://send?text=' + 
         "Send us your Enquiry" +
        '&phone=91' + mobileNumber;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    };


    const callNumber = (phone = '9080050803' ) => {
      console.log('callNumber ----> ', phone);
      let phoneNumber = phone;
      if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
      }
      else  {
        phoneNumber = `tel:${phone}`;
      }
      Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
    };

    return (
       <View style={styles.container}>

          {/* <TouchableOpacity onPress={initiateWhatsApp} >
          <FontAwsome name="whatsapp" style={styles.MaterialCommunityIcons} color={'green'} size={40} />
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={callNumber} >
        <Feather name="phone-call" style={styles.MaterialCommunityIcons} color={'#ce3232'} size={38} /> 
       </TouchableOpacity> */}

       </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",

  },
  MaterialCommunityIcons:{
    marginTop  : 28,
    marginLeft:5
  }
})
