import { View , Text, ScrollView , Modal ,Pressable, RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { RefreshJsons , AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default  function MyBiddings(navigation){

    let [BidData,setBidData]=useState(navigation.route.params.userDetail.userDetail[0].BiddingTrip ? JSON.parse( navigation.route.params.userDetail.userDetail[0].BiddingTrip ) : null);
    const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)

    if(BidData){

        // setBidData(JSON.parse(BidData));
        // console.log(BidData)
 }

 const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        const backAction = () => {
            navigation.navigation.navigate('Dashboard')
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
    //    console.log();
        setBidData(JSON.parse(result[0].BiddingTrip))
        // let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
        // let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
        //  setTripsData({ value: result, error: ''})
        //  setmobile({ value: result[0].mobile, error: '' })
        //  setEmail({ value:  result[0].email_id, error: '' })
        //  setAddress({ value:  result[0].address, error: '' })
        //  console.log( result,"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);

    return(
        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 

<Header
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
      />

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


{BidData.length ? BidData.map((ival,i)=>{

console.log(ival);

return(
    <CardView
    cardElevation={5}
    cardMaxElevation={5}
    cornerRadius={5}
    style={styles.cardViewStyle}>

        <View style={styles.Headings}>

            <Text style={styles.Status}>{ival.status.toUpperCase()}</Text>

        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Id : {ival.trip_id_1}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Total Amount : Rs.{ival.total_amount ? ival.total_amount : 0} /-</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Your Request Amount : Rs.{ival.req_amount}/-</Text>
        </View>

       


    </CardView>
)

}) : null }


    </ScrollView>

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
        height: 150,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      }, 

      Headings:{
          backgroundColor:"yellow",
          alignItems:"center"
      },
      Status:{
          fontSize:25
      },
      HeadData:{
        margin:5
      },
      TextTrip:{
          fontSize:15
      }

})