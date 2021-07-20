import React from 'react';
import { TouchableOpacity , Alert  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';

export default function LogoutScreen({ navigation }) {

  const LogoutUser=async()=>{
        // console.log("STYLE")
        await AsyncStorage.removeItem(Stored.userDetail); 
        navigation.navigate('LoginScreen')
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

    return (
        <TouchableOpacity onPress={AlertLogout} >
            <MaterialCommunityIcons name="logout" style={ { marginTop  : 26 } }  color={'#ce3232'} size={45} />
        </TouchableOpacity>
    )
}
