import { View , Text, ScrollView , Picker,ActivityIndicator,Alert, RefreshControl,BackHandler, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import { RefreshJsons , AddBidTrips , ConfirmActiveTrip } from '../configuration/functional';
import Button from '../components/Button';






export default  function MyBiddings(navigation){

    let [BidData,setBidData]=useState(navigation.route.params.userDetail.userDetail[0].BiddingTrip ? JSON.parse( navigation.route.params.userDetail.userDetail[0].BiddingTrip ) : null);
    const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    
    
    const [vendorDrivers,setvendorDrivers]=useState(JSON.parse(navigation.route.params.userDetail.userDetail[0].vendorDrivers))
    const [activeIndicator,setActiveindicator] = useState(false)
    const [vendorCabs,setvendorCabs]=useState(JSON.parse(navigation.route.params.userDetail.userDetail[0].vendorCabs))

    const [selectedDriver, setselectedDriver] = useState(vendorDrivers[0].id);
    const [selectedCab,setselectedCab]=useState(vendorCabs[0].id)


const Submit =async(e)=>{

  console.log("selectedDriver,selectedDriver");
  
  console.log(selectedDriver,selectedCab,"selectedDriver,selectedDriver");

  setActiveindicator(true)

  const formData=new FormData();
  formData.append("vendor_id",id);
  formData.append("driver_id",selectedDriver)
  formData.append("cab_id",selectedCab)
  formData.append("trip_id",e.trip_id)
  formData.append("pick_up_date",e.pickUp_date)
  formData.append("trip_amount",e.total_amount)
  formData.append("vendor_req_amount",e.req_amount)
  formData.append("status","pending")
  console.log(formData,"IVALs");
  try {



    let result = await ConfirmActiveTrip(formData);

    if(result){
      console.log(result,"result")
      setActiveindicator(false)
      setBidData(result)
      Alert.alert(
        "Trip has been Activated",
        "Activated Successfully !",
        [
         
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]
      )
    }
    
  } catch (error) {
    console.log(error);
  }

}



const CancelTrip=async()=>{

  setActiveindicator(false);
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
        setselectedDriver(JSON.parse(result[0].vendorDrivers))
        setselectedCab(JSON.parse(result[0].vendorCabs))
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

console.log(ival,"117");
if(ival.status=='approved'){
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
            <Text style={styles.TextTrip}>Trip Date : {ival.pickUp_date}</Text>
        </View>

        

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Total Amount : Rs.{ival.total_amount ? ival.total_amount : 0} /-</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Your Request Amount : Rs.{ival.req_amount}/-</Text>
        </View>

      <View style={styles.FileUploadView}>
      <Text style={{fontSize:16,fontWeight:"bold"}}>Select Driver: </Text>    
      </View>  
        
        <Picker
        selectedValue={selectedDriver}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setselectedDriver(itemValue)}
      >

        {vendorDrivers.length ? vendorDrivers.map((ival,i)=>{
           if(ival.status==1){
           return(
              <Picker.Item label={ival.driver_name} value={ival.id} />
            )
           }
        }):null}
       
        {/* <Picker.Item label="JavaScript" value="js" /> */}

      </Picker>


      <View style={styles.FileUploadView}>
      <Text style={{fontSize:16,fontWeight:"bold"}}>Select Cab: </Text>    
      </View>  
        
        <Picker
        selectedValue={selectedCab}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setselectedCab(itemValue)}
      >

        {vendorCabs.length ? vendorCabs.map((ival,i)=>{
           if(ival.status==1){
            return(
              <Picker.Item label={ival.cab_name} value={ival.id} />
            )
           }
        }):null}
       
        {/* <Picker.Item label="JavaScript" value="js" /> */}

      </Picker>

      { activeIndicator ?

<View style={[styles.container, styles.horizontal]}>
<ActivityIndicator size="large" color="#ce3232" />
</View>

: <Button mode="contained" style={styles.button} onPress={()=>Submit(ival)}>
        Active Trip
</Button> }

<Button mode="contained" style={styles.button} onPress={CancelTrip}>
        Cancel Trip
</Button>

    </CardView>
)

}

}) : <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadHaed}>
    <Text style={styles.TextText}>
        No Bidding Trips
    </Text>
</View> 

</CardView> }


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
        height: 490,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      button:{
        backgroundColor:"#ce3232",
        width:"95%",
        marginLeft:'2%'
  
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
        margin:5
      },
      TextTrip:{
          fontSize:15
      },
      HeadHaed:{
        alignItems:"center",
        backgroundColor:'yellow'
    },
    TextText:{
        fontSize:25

    },

})