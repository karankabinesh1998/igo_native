import { View , Text, ScrollView , Modal ,Pressable, RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { TripsJsons , AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { bidamountValidator } from '../helpers/bidamountValidator';
import { bidandWalletValidator } from '../helpers/bidandWalletValidator';
import { SegmentedControlIOSComponent } from 'react-native';




export default  function NewTrips(navigation){
   
  
  // let TripsJson =  navigation.route.params.TripsJson;

  // console.log(navigation.route.params.userDetail,"TripsJsonTripsJson");
  
  const [TripsData, setTripsData] = useState({ value: navigation.route.params.TripsJson, error: '' })
  const [modalVisible, setModalVisible] = useState(false);
  const [bidamount,setBidAmount]=useState({value:'',error:''});
  const [bidData,setbidDAta]=useState(null);
  const [wallet,setWallet]=useState(navigation.route.params.userDetail.userDetail[0].wallet ? navigation.route.params.userDetail.userDetail[0].wallet : 0 )
  const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
  
   
    // const dataa =async()=>{
    //     let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
    //     let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : []
    //     //   console.log(data1," hello");
    //       setTripsData({value:data1 , error:''})

    //     console.log(navigation.route.params.userDetail.userDetail,"userdeatilsuserdeatils");
        // console.log(navigation,"navigationnavigation");
    // }

    // dataa();

    const ApplyNewTrip = (value)=>{
        console.log(wallet);
        setModalVisible(!modalVisible);
        setbidDAta(value)
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
        console.log( "result","Refrehjson");
          let result = await TripsJsons(id);
        let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
        let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
         setTripsData({ value: result, error: ''})
        //  setmobile({ value: result[0].mobile, error: '' })
        //  setEmail({ value:  result[0].email_id, error: '' })
        //  setAddress({ value:  result[0].address, error: '' })
         console.log( result ,"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);


const SubmitBidamount=async()=>{

  const BidAmount = bidamountValidator(bidamount.value);

  const Validator = bidandWalletValidator(wallet,bidamount.value)

  if (BidAmount) {
    setBidAmount({ ...bidamount, error: BidAmount })
    return
  }

  // console.log(wallet , bidamount.value );

  if(Validator){
    setBidAmount({ ...bidamount, error: Validator })
    return
  }

  // console.log(bidData);

  const formDate = new FormData();
  formDate.append("trip_id",bidData.id);
  formDate.append("trip_id_1",bidData.trip_id)
  formDate.append("req_amount",bidamount.value);
  formDate.append("vendor_id",id)
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
       
        { text: "OK", onPress: () => console.log("OK Pressed") }
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






      {TripsData.value.length > 0 ? TripsData.value.map((ival,i)=>{
          console.log(ival.bidding_amount,"ival"); 
          if(ival.trip_assigned_to==null){

            return( 
              <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cardViewStyle}>
  
                
      
                  <View style={styles.Heading}>
                  <Text style={styles.paraHeading}>TRIP ID:</Text>
                  <Text style={styles.paraData}>{ival.trip_id}</Text>
  
                  {/* <Text style={styles.paraHeading}>PICKUP FROM:</Text>
                  <Text style={styles.paraData}>{ival.pickuplocation_name}</Text>
  
                  <Text style={styles.paraHeading}>DROP TO:</Text>
                  <Text style={styles.paraData}>{ival.drop_location_name}</Text> */}
  
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
  
                  <View style={styles.ViewParallel}>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>PICKUP FROM:</Text>
                  <Text style={styles.paraData}>{ival.pickuplocation_name}</Text>
                  </View>
  
                  <View style={styles.ParallelView}>
                  <Text style={styles.paraHeading}>DROP TO:</Text>
                  <Text style={styles.paraData}>{ival.drop_location_name}</Text>
                  </View>
                  </View>
  
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
  
                  <Text style={styles.paraHeading}>PICK UP DATE:</Text>
                  <Text style={styles.paraData}>{ival.pickup_date}</Text>
  
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
  
                  <View style={styles.ParallelView1}>
  
                  <Text style={styles.paraHeading1}>TRIP KMS:</Text>
                  <Text style={styles.paraData}>{ival.trip_kms}</Text>
                  </View>
  
                  <View style={styles.ParallelView1}>
                  <Text style={styles.paraHeading1}>TRIP CHARGE:</Text>
                  <Text style={styles.paraData}>{ival.trip_charges}</Text>
                  </View>
  
                  <View style={styles.ParallelView1}>
                  <Text style={styles.paraHeading1}>EXTRACHARGE/KM:</Text>
                  <Text style={styles.paraData}>{ival.extra_charge}</Text>
                  </View>
  
                  
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
        height: 450,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      Heading:{
          alignItems:"flex-start"
      },
      paraHeading:{
          fontSize:15,
          fontWeight:'bold',
          padding:5

      },
      paraHeading1:{
        fontSize:12,
        fontWeight:'bold',
        padding:5
      },
      paraData:{
        padding:5,
        fontSize:12,
        marginLeft:5
      },
      ParallelView:{
        flexDirection:"column",
        flex:1,
        marginLeft:20,
        // justifyContent:"center"
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
      fontSize:25

  },

})