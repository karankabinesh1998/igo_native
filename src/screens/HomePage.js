import { View , Text , StyleSheet , BackHandler , TouchableOpacity , Alert , Linking , Image, Platform } from 'react-native'
import React , { useEffect } from 'react';
import CardView from 'react-native-cardview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import AsyncStorage from "@react-native-community/async-storage";
import  NewTrips from '../screens/NewTrips';


export default  function HomePage({ userDetail,navigation ,TripsJson, HomePage1 = true}) {
    // let Hompage1 = true;
  // console.log(userDetail,"14th homepage");
  // await AsyncStorage.getItem(Stored.userDetail)
  let wallet = userDetail.userDetail.length ? userDetail.userDetail[0].wallet : null ;

  if(wallet == null){
    wallet = 0
  }

  const GotoNewTrips=async()=>{

   

  }

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

{/* <View style={styles.MainContainer} > */}

{/* <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.cardView_InsideText}>

  <View style={styles.IconTopView}> 
  <TouchableOpacity style={{alignItems:"center"}}  >
  <MaterialCommunityIcons name="bank-transfer" style={styles.MaterialCommunityIcons} color={'#ce3232'} size={39} />   
  <Text style={styles.topNav} >Transaction</Text>
  </TouchableOpacity>
  </View>   

  <View style={styles.IconTopView}> 
  <TouchableOpacity style={{alignItems:"center"}} >
  <MaterialIcons name="account-balance-wallet" style={styles.MaterialCommunityIcons} color={'#ce3232'} size={38} />   
  <Text style={styles.topNav} >Account</Text>
  </TouchableOpacity>
  </View>

<View style={styles.IconTopView}> 
<TouchableOpacity style={{alignItems:"center"}} onPress={initiateWhatsApp}>
<FontAwsome name="whatsapp" style={styles.MaterialCommunityIcons} color={'#ce3232'} size={38} />   
<Text style={styles.topNav} >Whatsapp</Text>
</TouchableOpacity>
</View>  


<View style={styles.IconTopView}> 
<TouchableOpacity style={{alignItems:"center"}} onPress={callNumber}  >
<Feather name="phone-call" style={styles.MaterialCommunityIcons} color={'#ce3232'} size={38} /> 
</TouchableOpacity>  
<Text style={styles.topNav} >Call</Text>
</View>

</View>

<View style={styles.BalanceText}>
<Text style={styles.BalText}>Balance in the Wallet :         Rs.{wallet}</Text>
</View>


</CardView> */}


<View style={styles.MiniCardView}>

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.miniCard}>

{/* <Image source={require('../assets/newtrip.jpg')} style={{width:'100%',flex: 1,}} />  */}
<TouchableOpacity onPress={() => navigation.navigate('NewTrips',{ TripsJson : TripsJson  })} style={styles.iconstyle}>
<MaterialCommunityIcons name="book-information-variant" style={{marginTop:9 }} color={'#ce3232'} size={100}  />

<Text style={{textAlign:"center",fontSize:16,marginBottom:8}}>Bookings For Bid</Text>
</TouchableOpacity>
</CardView>


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.miniCard}>

{/* <Image source={require('../assets/newtrip.jpg')} style={{width:'100%',flex: 1,}} />  */}
<TouchableOpacity onPress={() => navigation.navigate('NewTrips',{ TripsJson : TripsJson  })} style={styles.iconstyle}>
<FontAwesome5 name="book" color={'#ce3232'} style={{marginTop:9 }}  size={100}  />

<Text style={{textAlign:"center",fontSize:16,marginBottom:8}}>Active Trips</Text>
</TouchableOpacity>
</CardView>

{/* <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={18}
style={styles.miniCard}>

<Image source={require('../assets/activetrips.jpg')} style={{width:'100%',flex: 1,}} /> 
<Text style={{textAlign:"center" , fontSize:10,marginBottom:8}}>Active Trips</Text>

</CardView> */}

</View>

<View style={styles.MiniCardView}>


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.miniCard}>
  <TouchableOpacity onPress={() => navigation.navigate('NewTrips',{ TripsJson : TripsJson  })} style={styles.iconstyle}>
{/* <Image source={require('../assets/approvetrips.jpg')} style={{width:'100%',flex: 1,}} />  */}
<Fontisto name="history" color={'#ce3232'} style={{marginTop:9 }} size={100}  />
<Text style={{textAlign:"center",fontSize:16,marginBottom:8}}>Trip History</Text>
</TouchableOpacity>
</CardView>



<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.miniCard}>
  <TouchableOpacity onPress={() => navigation.navigate('DocumentUpload',{ userDetail : userDetail  })} style={styles.iconstyle}>
{/* <Image source={require('../assets/approvetrips.jpg')} style={{width:'100%',flex: 1,}} />  */}
<Entypo name="upload" color={'#ce3232'} style={{marginTop:9 }} size={100}  />
<Text style={{textAlign:"center",fontSize:16,marginBottom:8}}>Document Upload</Text>
</TouchableOpacity>
</CardView>


</View>

<View style={styles.MiniCardView}>

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.miniCard}>
  <TouchableOpacity onPress={() => navigation.navigate('NewTrips',{ TripsJson : TripsJson  })} style={styles.iconstyle}>
{/* <Image source={require('../assets/approvetrips.jpg')} style={{width:'100%',flex: 1,}} />  */}
<FontAwesome name="cab" color={'#ce3232'} style={{marginTop:9 }} size={100}  />
<Text style={{textAlign:"center",fontSize:16,marginBottom:8}}>My Cabs</Text>
</TouchableOpacity>
</CardView>


{/* <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={18}
style={styles.miniCard}>
<Image source={require('../assets/wallet.png')} style={{width:'70%',marginLeft:15,flex: 1}} /> 
<Text style={{textAlign:"center" , fontSize:10,marginBottom:8}}>Document Upload</Text>
</CardView> */}

</View>


{/* </View>  */}

        


        </View>
    )
}

const styles = StyleSheet.create({
 
    MainContainer: {
   
      flex: 1,
      // marginTop:4,
      // marginLeft: 9,
      width: '100%', 
      height: 50 ,
      
    //   alignItems: 'center',
   
    },
    BalText:{
      // alignContent:"center",
      // textAlign:"left",
      // marginRight:180,
      fontWeight:'bold',
      fontSize:16,
      
            // marginRight:12
    },
    BalanceText:{
      // flex:2,
      flexDirection:"column-reverse",
      // marginLeft:8,
      alignItems:"center",
      marginBottom:30,
      marginTop:10

    },
    container:{
       
        flex:1,
        // marginTop:10,
        backgroundColor: 'lightgray', 
        // justifyContent: 'center',
        //flexDirection: "column"    
    },
    IconTopView:{
       marginTop:20,
       marginLeft:17,
       alignItems:"center",
       marginRight:18
    },
    topNav:{
        // marginBottom:80,
        fontSize:10,
    
    },
    MaterialCommunityIcons:{
        // marginTop:30
    },
    cardViewStyle:{
 
        width: '96%', 
        height: 150,
        flexDirection: "column"
     
      },

      miniCard:{
        width: '45%',
        height:150,
        // marginTop:16,
        // marginLeft:2
        margin:10
      },

      MiniCardView:{
        // flex:1,
        flexDirection:"row",
        paddingTop:10
      },

      cardView_InsideText:{
        flex:1,
        fontSize: 10, 
        color: '#000', 
        // textAlign: 'center',
        width:'100%', 
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
        // marginRight :20    
     
      },
      iconstyle:{
        alignItems:"center",
        flexDirection:"column",
        // flex:1
      }

})


