import { View , Text, ScrollView , Modal ,Image, RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
// import { Header } from 'react-native-elements';
// import Logo from '../components/Logo';
// import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { TripsJsons , AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { bidamountValidator } from '../helpers/bidamountValidator';
import { bidandWalletValidator } from '../helpers/bidandWalletValidator';
// import { Appbar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header_New from '../components/Header_New';
import { ApprovalValidator } from '../helpers/ApprovalValidator';
import { CheckDriverValidator } from '../helpers/CheckDriverValidator';
import { CheckCabValidator } from '../helpers/CheckCabValidator';

 

import HomePage from './HomePage';



export default  function NewTrips({navigation,route}){
  
  // console.log(route.params.OtherPageRefersh(),"TripsJsonTripsJson");
  
  const [TripsData, setTripsData] = useState({ value: route.params.TripsJson, error: '' })
  const [modalVisible, setModalVisible] = useState(false);
  const [bidamount,setBidAmount]=useState({value:'',error:''});
  const [bidData,setbidDAta]=useState(null);
  
  const [wallet,setWallet]=useState(route.params.userDetail[0].wallet ? route.params.userDetail[0].wallet : 0 );
  const [id,setId]=useState(route.params.userDetail.length>0 ? route.params.userDetail[0].id :null);
  
  const [UserDeatils,SetUserDeatils]=useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].Documentation) : []);

  const [vendorDrivers,SetvendorDrivers]=useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].vendorDrivers) : []);

  const [vendorCabs,SetvendorCabs]=useState(route.params.userDetail.length > 0 ? JSON.parse(route.params.userDetail[0].vendorCabs) : []);

  // console.log(vendorCabs,"doc");







    const ApplyNewTrip = (value)=>{
        // console.log(wallet);
        setModalVisible(!modalVisible);
        setbidDAta(value)
    }

    

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
        // console.log( "result","Refrehjson");
          let result = await TripsJsons(id);
        let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
        let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
         setTripsData({ value: result, error: ''})
        //  setmobile({ value: result[0].mobile, error: '' })
        //  setEmail({ value:  result[0].email_id, error: '' })
        //  setAddress({ value:  result[0].address, error: '' })
        route.params.OtherPageRefersh("refresh");
         console.log( result ,"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);


const SubmitBidamount=async()=>{

  const BidAmount = bidamountValidator(bidamount.value);

  const Validator = bidandWalletValidator(wallet,bidamount.value);

  const Approval = ApprovalValidator(UserDeatils[0].approval);
  
  const CheckDriver = CheckDriverValidator(vendorDrivers.length);

  const CheckCab =  CheckCabValidator(vendorCabs.length)

  if(Approval){
    setBidAmount({ ...bidamount, error: Approval })
    return
  }

  if(CheckDriver){
    setBidAmount({ ...bidamount, error: CheckDriver })
    return
  }

  if(CheckCab){
    setBidAmount({ ...bidamount, error: CheckCab })
    return
  }

  if (BidAmount) {
    setBidAmount({ ...bidamount, error: BidAmount })
    return
  }



  if(Validator){
    setBidAmount({ ...bidamount, error: Validator })
    return
  }

 

  const formDate = new FormData();
  formDate.append("trip_id",bidData.id);
  formDate.append("trip_id_1",bidData.trip_id);
  formDate.append("req_amount",bidamount.value);
  formDate.append("vendor_id",id);
  formDate.append("pickUp_date",bidData.pickup_date)
  formDate.append("total_amount",parseInt(bidData.trip_kms)*parseInt(bidData.trip_charges))

  // const formData=new FormData();

  //   formData.append("username",name.value)
  //   // formData.append("name",name.value)
  //   formData.append("mobile",mobile.value)
  //   formData.append("email_id",email.value)
  //   formData.append("password",password.value)
  //   formData.append("userType",3)
  //   formData.append("login_status",1)
  //   formData.append("status",1)

  console.log(id,bidData);
  let result = await AddBidTrips(formDate,bidData.tbl_bidding_id,id);

  if(result){
    console.log(result,"Success");

    setTripsData({ value: result , error: '' })

    setModalVisible(false);
    setBidAmount(0)
    Alert.alert(
      "Bidding has been Updated",
      "Successfully Bidded !",
      [
       
        { text: "OK", onPress: () => onRefresh() }
      ]
    )

  }

}


const ResetModal = () =>{
   
    setBidAmount({value:0,error:''})
    setbidDAta(null)
    setModalVisible(false)
}

    return(
        
        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}>


  <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => ResetModal()}
  >

<View style={styles.centeredView1}>
          <View style={styles.modalView}>
           
            <View style={styles.modelHead}>
            <Text style={styles.modalText}>Place Your Bid!</Text>
            {/* <Button
             mode="contained"
              style={[styles.button1, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
            <Text style={styles.modalText1}>X</Text>
            </Button> */}
            </View>

            <TextInput
          label="Bid Amount"
          keyboardType="numeric"
          // style={[styles.textInput, { width: '100%' }]}
          container={styles.InputText}
          value={bidamount.value}
          placeholder='Enter your bit amount'
          onChangeText={(value) => setBidAmount({ value: value, error: '' })} 
          error={!!bidamount.error}
          errorText={bidamount.error}
          />

            <View style={styles.Alignbutton}>

            

            <Button
             mode="contained"
              style={styles.button1}
              onPress={() => SubmitBidamount()}
            > Submit</Button>

            <Button
                mode="contained"
                style={styles.button1}
                onPress={() => ResetModal()}
              > Close</Button>


            </View>

            
             
            
          </View>
          
        </View>


  </Modal>

<Header_New subtitle="New Trips" navigation={navigation} />

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






      {TripsData.value.length > 0 ? TripsData.value.map((ival,i)=>{
          // console.log(ival,"ival"); 
          if(ival.trip_assigned_to==null){

            return( 
              <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>
  
                
      
                  <View style={styles.Heading}>

                   <View style={{flexDirection:"row"}}> 
                  <Text style={styles.paraHeadingtrip_id}>TRIP ID:</Text>
                  <Text style={styles.paraDatatrip_id}>{ival.trip_id}</Text>
                  </View>
  
                  {/* <Text style={styles.paraHeading}>PICKUP FROM:</Text>
                  <Text style={styles.paraData}>{ival.pickuplocation_name}</Text>
  
                  <Text style={styles.paraHeading}>DROP TO:</Text>
                  <Text style={styles.paraData}>{ival.drop_location_name}</Text> */}
  
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    </View>
  
                  <View style={styles.ViewParallel}>
  
                  <View style={styles.ParallelView}>
                  {/* <Text style={styles.paraHeading}>PICK UP FROM:</Text> */}
                  <Text style={styles.paraDatalocation}>{ival.pickuplocation_name} - {ival.drop_location_name} </Text>
                  </View>
  
                  {/* <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>DROP TO:</Text>
                  <Text style={styles.paraDatalocation}>{ival.drop_location_name}</Text>
                  </View> */}

                  </View>
  
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>

                    <View style={styles.ViewParallel}>
  
                    <View style={styles.ParallelView}> 
                  <Text style={styles.paraHeading}>PICK UP DATE:</Text>
                  <Text style={styles.paraData}>{ival.new_pickup_date}</Text>
                  </View>

                 {ival.trip_type !="One Way" ? <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>DROP DATE:</Text>
                  <Text style={styles.paraData}>{ival.new_drop_date}</Text>
                  </View>  : null } 
                  
  
                  </View>


                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>


  
                  <View style={styles.ViewParallel}>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>CAB TYPE:</Text>
                  <Text style={styles.paraData}>{ival.cab_type}</Text>
                  </View>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>DUTY TYPE:</Text>
                  <Text style={styles.paraData}>{ival.trip_type}</Text>
                  </View>
                  </View>
  
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>
  
                  <View style={styles.ViewParallel}>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>TRIP KMS:</Text>
                  <Text style={styles.paraData}>{ival.trip_kms}</Text>
                  </View>
  
                  {/*<View style={styles.ParallelView1}>
                  <Text style={styles.paraHeading1}>TRIP CHARGE:</Text>
                  <Text style={styles.paraData}>{ival.trip_charges}</Text>
                  </View>*/}
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>EXTRA CHARGE/KM:</Text>
                  <Text style={styles.paraData}>{ival.extra_charge}</Text>
                  </View>
  
                  
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>
                  

                  <View style={styles.ViewParallel}>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>TOTAL FAIR:</Text>
                  <Text style={styles.paraData}>Rs.{parseInt(ival.trip_kms)*parseInt(ival.trip_charges)}/-</Text>
                  </View>
  
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>BIDDING FAIR:</Text>
                  <Text style={styles.paraData}>{ival.bidding_amount =='No bidding' ?  ival.bidding_amount : `Rs.${ival.bidding_amount}`}/-</Text>
                  </View>
  

                  {/* <Ionicons name="person" color={'#ce3232'} style={{marginTop:9 }} size={100}  /> */}
                  
  
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>

                  <View style={styles.ViewParallelExe}> 

                  <View style={{marginLeft:20 ,flexDirection:"column",alignItems:"center",marginTop:12}} >
                  {ival.parking==0 ? <Image source={require('../assets/nopark.jpg')} style={{width:40,height:37}} />: <FontAwesome5 name="parking" color={'#ce3232'} style={{marginTop:9 }} size={30}  />}
                  <Text style={{ fontSize:10 }}>{ival.parking==0 ? "Parking" : "Parking" }</Text>
                  <Text style={{ fontSize:10 }}>{ival.parking==0 ? "Excluded" : "Included" }</Text>
                  </View>

                  
                  <View style={{marginLeft:20,alignItems:"center",flexDirection:"column",marginTop:12}} >
                  <Image source={require('../assets/moon_up.png')} style={{width:40,height:37}} />
                  <Text style={{ fontSize:10 }}>{ival.night_pick_up==0 ? "night pickup" : "night pickup" }</Text>
                  <Text style={{ fontSize:10 }}>{ival.night_pick_up==0 ? "Excluded" : "Included" }</Text>
                  </View>

                  <View style={{marginLeft:20,alignItems:"center",flexDirection:"column",marginTop:12}} >
                  <Image source={require('../assets/moon_down.png')} style={{width:40,height:37}} />
                  <Text style={{ fontSize:10 }}>{ival.night_drop_up==0 ? "Night Drop" : "Night Drop" }</Text>
                  <Text style={{ fontSize:10 }}>{ival.night_drop_up==0 ? "Excluded" : "Included" }</Text>
                  </View>

                  <View style={{marginLeft:20,alignItems:"center",flexDirection:"column",marginTop:12}} >
                  <Image source={require('../assets/toll_plaza.jpg')} style={{width:40,height:37}} />
                  <Text style={{ fontSize:10 }}>{ival.toll_plaza==0 ? "Toll Charges" : "Toll Charges" }</Text>
                  <Text style={{ fontSize:10 }}>{ival.toll_plaza==0 ? "Excluded" : "Included" }</Text>
                  </View>

                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>

  
              <Button mode="contained" style={styles.button} onPress={() => ApplyNewTrip(ival)}>
              Request New Trip
              </Button>
              

                  </View>
      
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
              No New Trips
          </Text>
      </View> 
      
      </CardView>
    }



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
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "#e6e6e6",
    borderRadius: 20,
    padding: 15,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2
    },
    width:340,
    height:250,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15
  },
  Alignbutton:{
    flexDirection:"row",
    // width:500
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    fontWeight:"700",
    fontSize:25,
    color:"#ce3232"
  },
  modalText1: {
    // marginBottom: 5,
    textAlign: "center",
    // marginLeft:15,
    // fontSize:25
  },
  modelHead:{
    // textAlign:"center",
    alignItems:"center",
    //  flexDirection:"row",
    //  flex:1
  },
  button1: {
    borderRadius: 15,
    width:150,
    margin:4,
    backgroundColor:"#ce3232",
    // padding: 4,
    // elevation: 2,
    // marginLeft:65
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
        height: 430,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      Heading:{
          alignItems:"flex-start"
      },
      paraHeading:{
          fontSize:12,
          fontWeight:'bold',
          padding:5

      },
      paraHeadingtrip_id:{
        fontSize:13,
        fontWeight:'bold',
        padding:5,
        marginLeft:19
      },
      paraHeading1:{
        fontSize:12,
        fontWeight:'bold',
        padding:5
      },
      paraData:{
        padding:5,
        fontSize:12,
        // marginLeft:8,
        color:"#ce3232",
        fontWeight:'bold',
       
      },
      paraDatalocation:{
        padding:5,
        fontSize:15,
        fontWeight:"bold",
        marginLeft:2,
        color:"#ce3232"
      },
      paraDatatrip_id:{
        padding:5,
        fontSize:13,
        color:"#ce3232",
        fontWeight:"bold",
      },
      ParallelView:{
        flexDirection:"column",
        flex:1,
        marginLeft:20,
        //justifyContent:"center"
      },

      ParallelView1:{
        flexDirection:"column",
        // flex:1,
        marginLeft:5
        // marginLeft:20,
        // justifyContent:"center"
      },
      ViewParallel:{
      flexDirection:"row",
      justifyContent:"space-between"
    },
    ViewParallelExe:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:8,
      
    },
    button:{
      backgroundColor:"#ce3232",
      width:"95%",
      marginLeft:'2%'

    },
    HeadHaed:{
      alignItems:"center",
      backgroundColor:'yellow'
  },
  TextText:{
      fontSize:15

  },
  containerStyles:{
    width:340
  }

})