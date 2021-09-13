import { View , Text, ScrollView , TouchableOpacity , RefreshControl,BackHandler, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
// import { Header } from 'react-native-elements';
// import Logo from '../components/Logo';
// import WhatsappandCall from '../components/WhatsappandCall';
import { RefreshJsons , StartandEndTrip } from '../configuration/functional';
// import Button from '../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import Header_New from '../components/Header_New';

export default  function TripHistory({navigation,route}){

    const [activeTrips,SetActiveTrips]=useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].TripHistory) : null )

    const [id,setId]=useState(route.params.userDetail[0].id ? route.params.userDetail[0].id :null)
    
    console.log(activeTrips,"activeTrips")

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
      
      const onRefresh = React.useCallback(async() => {
      
        setRefreshing(true);
      
       let result = await RefreshJsons(id);
            // console.log(,"kk")

            


       if(result){
           console.log(result[0],"Refresh JSON");

           SetActiveTrips(JSON.parse(result[0].TripHistory))
       }
       route.params.OtherPageRefersh();
        wait(5000).then(() => setRefreshing(false));
      }, []);

      
      
   

    return(

        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 

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

<Header_New subtitle="Trips History" navigation={navigation} />

<View style={styles.MainContainer} >

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

{activeTrips.length ? activeTrips.map((ival,i)=>{
    console.log(ival,"IVAL")
    return(
        <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>

        {/* <View style={styles.HeadHaed}>
            <Text style={styles.TextText}>
                Customer Details
            </Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Name : {ival.customername}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Mobile : {ival.customerMobile}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Address : {ival.address}</Text>
        </View> */}

        <View style={styles.HeadHaed}>
            <Text style={styles.TextText}>
                Trip History {i+1}
            </Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Id : {ival.Id_trip}</Text>
            
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Type : {ival.trip_type}</Text>
        </View>


        

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Cab Type : {ival.cab_type}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Pick-up Location : {ival.pickup_location}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Drop Location : {ival.droplocation}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Pick-up Date : {ival.pickup_date}</Text>
        </View>

        { ival.trip_type == "One Way" ? null : 
         <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Drop Date : {ival.drop_date}</Text>
        </View> }

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Kms : {ival.trip_kms}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Charges : Rs.{ival.trip_charges}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Extra Charges/Kms : Rs.{ival.extra_charge}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Total Fair : {ival.trip_amount}</Text>
        </View>

       

        </CardView>
    )
}) : 
    null   }

    {activeTrips.length == 0 ? 
    
    <CardView
    cardElevation={5}
    cardMaxElevation={5}
    cornerRadius={5}
    style={styles.cardViewStyle}>

    <View style={styles.HeadHaed}>
        <Text style={styles.TextText}>
            No  Trips History
        </Text>
    </View> 
    
    </CardView>

: null}


</ScrollView>

</View>

<View style={styles.headerFooterStyle}>
<TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate('Dashboard')}>
<Entypo name="home" color={'#ce3232'}  size={22}  />
<Text style={{textAlign:"center",fontSize:10,marginTop:5,fontWeight:"bold",color:"#ce3232"}}>Home</Text>
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
      // width:'100%'
    },
    MainContainer: {
   
        flex: 1,
        marginTop:4,
        marginLeft: 9,
        width: '100%', 
        height: 80 ,
       },
       cardViewStyle:{
 
        width: '96%', 
        height: 300,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      button:{
        backgroundColor:"green",
        width:"45%",
        marginLeft:15,
        height:60
  
      },
      buttonstarted:{
        backgroundColor:"red",
            width:"95%",
        marginLeft:10,
        height:60,
        // fontSize:15
      },
      ButtView:{
          flex:1,
          flexDirection:"row"
      },
        FileUploadView:{
        flexDirection:"row",
        margin:5,
        
    },

      Headings:{
          backgroundColor:"#008000",
          alignItems:"center"
      },
      Status:{
          fontSize:25
      },
      HeadData:{
        margin:6,
        marginLeft:15,
      },
      HeadHaed:{
          alignItems:"center",
          backgroundColor:'yellow'
      },
      TextText:{
          fontSize:15

      },
      TextTrip:{
          fontSize:10,
          fontWeight:"bold"
      },
      headerFooterStyle: {
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
      iconstyle:{
        alignItems:"center",
        flexDirection:"column",
        // flex:1
      }

})