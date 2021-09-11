import { View , Text, ScrollView ,ActivityIndicator, Modal ,KeyboardAvoidingView, 
  RefreshControl,BackHandler,Alert,Keyboard,TouchableWithoutFeedback,Image ,StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header , Rating} from 'react-native-elements';
import Header1 from '../components/Header';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
// import AsyncStorage from "@react-native-community/async-storage";
// import Stored from '../configuration/storageDetails';
import { DeleteCab, EditCabdata, RefreshJsons } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Addcabs1 } from '../configuration/functional';
import  Config from '../configuration/config';
import DocumentDriverPicker from '../components/DocumentDriverPicker';
// import AccordionTab from '../components/AccordionTab';
import { FAB, Portal, Provider } from 'react-native-paper';
import SpinnerButton from 'react-native-spinner-button';
import Header_New from '../components/Header_New';


export default  function AddCabs({navigation,route}){

    const [id,setId]=useState(route.params.userDetail[0].id ? route.params.userDetail[0].id :null);
    // const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    const [state, setState] = React.useState({ open: false });

      const onStateChange = ({ open }) => setState({ open });

      const { open } = state;
    const [vendorCabs,setvendorCabs]=useState(JSON.parse(route.params.userDetail[0].vendorCabs))
    const [modalVisible, setModalVisible] = useState(false);
    const [cab_name, setcab_name] = useState({ value: '', error: '' })
    const [cab_type, setcab_type] = useState({ value: '', error: '' })
    const [onEditstate, setonEditstate] = useState(false);
    const [cab_image_front, setcab_image_front] = useState({ value:null, error: '' });
    const [cab_image_front1, setcab_image_front1] = useState('');
    const [driverid,setdriverid]=useState(null)
    const [cab_image_back, setcab_image_back] = useState({ value:null, error: '' });
    const [cab_image_back1, setcab_image_back1] = useState('');

    const [cab_image_side, setcab_image_side] = useState({ value:null, error: '' });
    const [cab_image_side1, setcab_image_side1] = useState('');

    const [ cab_number , setcab_number ] = useState({value:'',error:''});

    const [cab_rc_book_number,setcab_rc_book_number]=useState({value:'',error:''});

    const [cab_insurance,setcab_insurance]=useState({value:'',error:''});

    const [cab_insurance1,setcab_insurance1]=useState(null)

    const [activeIndicator,setActiveindicator] = useState(false)
    
    const [refreshing, setRefreshing] = React.useState(false);

    // console.log(vendorDrivers,"AddDreiver");

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



  const handleChange=(e)=>{
    
    setcab_image_front({value:e,error:''});
    setcab_image_front1(e.name);
  }


  const handleChange1=(e)=>{
    
    setcab_image_back({value:e,error:''});
    setcab_image_back1(e.name);
  }

  const handleChange2=(e)=>{
    
    setcab_image_side({value:e,error:''});
    setcab_image_side1(e.name);
  }

  const handleChange3 = (e)=>{
    
    setcab_insurance({value:e,error:''});
    setcab_insurance1(e.name);
  }



  const Submit=async()=>{

    // setActiveindicator(true)

    const formData=new FormData();
    formData.append("vendor",id);
    formData.append("cab_name",cab_name.value);
    formData.append("cab_type",cab_type.value);
    formData.append("cab_image_front",cab_image_front1);
    formData.append("cab_image_back",cab_image_back1);
    formData.append("cab_image_side",cab_image_side1);
    formData.append("cab_number",cab_number.value);
    formData.append("cab_rc_book_number",cab_rc_book_number.value);
    formData.append("cab_insurance",cab_insurance1);
    // formData.append("file",JSON.stringify(["file1","file2","file3","file4"]))
    formData.append("file1",cab_image_front.value);
    formData.append("file2",cab_image_back.value);
    formData.append("file3",cab_image_side.value);
    formData.append("file4",cab_insurance.value)


    console.log(formData);

    let result = await Addcabs1(formData);

    if(result != false){

        console.log(result);

        setvendorCabs(result)
        setActiveindicator(false)
        setcab_name({ value: '', error: '' })
        setcab_image_back({ value: '', error: '' })
        setcab_image_back1(null)
        setcab_image_front({ value: '', error: '' })
        setcab_image_front1(null)
        setcab_image_side({ value: '', error: '' })
        setcab_image_side1(null)
        setcab_insurance({ value: '', error: '' })
        setcab_insurance1(null)
        setcab_number({ value: '', error: '' })
        setcab_rc_book_number({ value: '', error: '' })
        setcab_type({ value: '', error: '' })
        setModalVisible(false)

        Alert.alert(
          "Successfully Added",
          "The Cab was Added successfully!",
          [
           
            { text: "OK", onPress: () =>  onRefresh() }
          ]
        )

    }else{
        Alert.alert(
          "Already Exists",
          "The Cab was already Exists!",
          [
          
            { text: "OK", onPress: () =>  setActiveindicator(false)}
          ]
        )
    }
   

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  
  const onRefresh = React.useCallback(async() => {
  
    setRefreshing(true);
  
   let result = await RefreshJsons(id);
    setvendorCabs(JSON.parse(result[0].vendorCabs))
     console.log(JSON.parse(result[0].vendorDrivers),"Refrehjson");
     route.params.OtherPageRefersh("refresh");
    wait(5000).then(() => setRefreshing(false));
  }, []);

  const ResetModal =async()=>{
    setModalVisible(false)
    setonEditstate(false)

    setcab_name({ value: '', error: '' })
    setcab_image_back({ value: '', error: '' })
    setcab_image_back1(null)
    setcab_image_front({ value: '', error: '' })
    setcab_image_front1(null)
    setcab_image_side({ value: '', error: '' })
    setcab_image_side1(null)
    setcab_insurance({ value: '', error: '' })
    setcab_insurance1(null)
    setcab_number({ value: '', error: '' })
    setcab_rc_book_number({ value: '', error: '' })
    setcab_type({ value: '', error: '' })
    setdriverid(null)
    setActiveindicator(false)
  }


  const EditCab =(ival)=>{
    Alert.alert(
      "Are You Sure!!",
      `Do you want to Edit ${ival.cab_name} ?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => EditCabFromVendor(ival) }
      ]
    );
  }

  const EditCabFromVendor = async(ival)=>{

    try {

      console.log(ival)
      
      setcab_name({ value:ival.cab_name, error: '' })
      setcab_type({ value:ival.cab_type, error: '' })
      setonEditstate(true);
      // const [cab_image_front, setcab_image_front] = useState({ value:null, error: '' });

      setcab_image_front1(ival.cab_image_front);

      setdriverid(ival.id)
      // const [cab_image_back, setcab_image_back] = useState({ value:null, error: '' });

      setcab_image_back1(ival.cab_image_front);
  
      // setcab_image_side({ value:null, error: '' });

      setcab_image_side1(ival.cab_image_side);
  
      setcab_number({value:ival.cab_number,error:''});
  
      setcab_rc_book_number({value:ival.cab_rc_book_number,error:''});
  
      // const [cab_insurance,setcab_insurance]=useState({value:'',error:''});
  
      setcab_insurance1(ival.cab_insurance)

      setModalVisible(true)
      
    } catch (error) {
      console.log(error)
    }
      
  }

  const Update = async()=>{
    const formData=new FormData();
    formData.append("vendor",id);
    formData.append("cab_name",cab_name.value);
    formData.append("cab_type",cab_type.value);
    formData.append("cab_image_front",cab_image_front1);
    formData.append("cab_image_back",cab_image_back1);
    formData.append("cab_image_side",cab_image_side1);
    formData.append("cab_number",cab_number.value);
    formData.append("cab_rc_book_number",cab_rc_book_number.value);
    formData.append("cab_insurance",cab_insurance1);
    // formData.append("file",JSON.stringify(["file1","file2","file3","file4"]))
    formData.append("file1",cab_image_front.value);
    formData.append("file2",cab_image_back.value);
    formData.append("file3",cab_image_side.value);
    formData.append("file4",cab_insurance.value)


    console.log(formData);

    try {

      let result = await EditCabdata(formData,driverid);

    if(result != false){

        console.log(result);

        setModalVisible(false)
        setonEditstate(false)
    
        setcab_name({ value: '', error: '' })
        setcab_image_back({ value: '', error: '' })
        setcab_image_back1(null)
        setcab_image_front({ value: '', error: '' })
        setcab_image_front1(null)
        setcab_image_side({ value: '', error: '' })
        setcab_image_side1(null)
        setcab_insurance({ value: '', error: '' })
        setcab_insurance1(null)
        setcab_number({ value: '', error: '' })
        setcab_rc_book_number({ value: '', error: '' })
        setcab_type({ value: '', error: '' })
        setdriverid(null)
        setActiveindicator(false)
       
        Alert.alert(
          "Successfully Updated",
          "The Cab was Updated successfully!",
          [
           
            { text: "OK", onPress: () =>  onRefresh() }
          ]
        )
    }else{
      Alert.alert(
        "Already Exists",
        "The cAB was already Exists!",
        [
         
          { text: "OK", onPress: () =>  setActiveindicator(false)}
        ]
      )
    }
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const OnDeleteCab = (ival)=>{

    Alert.alert(
      "Are You Sure!!",
      `Do you want to delete ${ival.cab_name} ?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => DeleteDriverFromCab(ival) }
      ]
    );
  }

  const DeleteDriverFromCab  = async(ival)=>{

    console.log(ival,"fghddfh")

  try {

    let result = await DeleteCab(ival.id)

    if(result != null){
        
        Alert.alert(
          "Driver Deleted",
          "Driver Deleted Successfully!",
          [
           
            { text: "OK", onPress: () => onRefresh()}
          ]
        )
    }
    
  } catch (error) {
    console.log(error);
  }
}


  const ratingCompleted =(rating)=>{

    console.log("Rating is: " + rating)
  }
   
return(
    <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 

    <Provider>
<Portal>
        <FAB.Group
          open={false}
          color="white"
          fabStyle={{backgroundColor:"#ce3232"}}
          icon={open ? 'plus' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </Portal>

      <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => ResetModal()}
  >

<View style={styles.centeredView1}>
  <View style={styles.modalView}>
  <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ScrollView showsVerticalScrollIndicator={false}>

  <Header1 style={styles.heading}>{onEditstate==true ? "Update Cab" : "Add Cab"}</Header1>

  <TextInput
        label="Cab Name"
        returnKeyType="next"
        container={styles.InputText}
        value={cab_name.value}
        onChangeText={(text) => setcab_name({ value: text, error: '' })}
        error={!!cab_name.error}
        errorText={cab_name.error}
        />


        <TextInput
        label="Cab Varient"
        returnKeyType="next"
        container={styles.InputText}
        value={cab_type.value}
        onChangeText={(text) => setcab_type({ value: text, error: '' })}
        error={!!cab_type.error}
        errorText={cab_type.error}
        />

    <TextInput
    label="Cab Number"
    returnKeyType="next"
    container={styles.InputText}
    value={cab_number.value}
    onChangeText={(text) => setcab_number({ value: text, error: '' })}
    error={!!cab_number.error}
    errorText={cab_number.error}
    />

<TextInput
    label="Cab RC Number"
    returnKeyType="next"
    container={styles.InputText}
    value={cab_rc_book_number.value}
    onChangeText={(text) => setcab_rc_book_number({ value: text, error: '' })}
    error={!!cab_rc_book_number.error}
    errorText={cab_rc_book_number.error}
    />



<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Cab Number Plate : </Text>    
</View>    

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_front} handleChange={handleChange}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_front1 ? cab_image_front1.substring(0,14) : null } </Text>
</View>



<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Cab Image : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_back} handleChange={handleChange1}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_back1 ? cab_image_back1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Pollution Verify Certificate : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_side} handleChange={handleChange2}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_side1 ? cab_image_side1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Cab Insurance : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_insurance} handleChange={handleChange3}/>
<Text style={{margin:6,fontSize:12}}>{cab_insurance1 ? cab_insurance1.substring(0,14) : null } </Text>
</View>


<SpinnerButton
    buttonStyle={styles.buttonStyle,
      { backgroundColor: '#ce3232',width:300 }}
    isLoading={activeIndicator}
    onPress={onEditstate==true ? Update : Submit}
    indicatorCount={10}
    spinnerType='BarIndicator'
    disabled={false}
    animateHeight={50}
    animateWidth={200}
    animateRadius={10}
  >
    <Text style={styles.buttonText}>{onEditstate==true ? "Update Cab" : "Add Cab" }</Text>
  </SpinnerButton>

    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
    </View>

  </Modal>

  <Header_New subtitle="Cabs" navigation={navigation} />

    {/* <Header
          placement="left"
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content"
          leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
          centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
          rightComponent={ <WhatsappandCall/> }
          containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              width:'100%',
              height:'15%'
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


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle12}>

<View style={{fontSize:10,marginLeft:20,alignItems:"center"}}>
  <Text style={{fontWeight:"bold",fontSize:20,color:"#ce3232"}}>
    Cab List 
  </Text>
</View> 


{ vendorCabs.length ? vendorCabs.map((ival,i)=>{
// console.log(ival,"246");

if(ival.hide_show == 1 ){ 
    return(
    
      <CardView 
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={5}
      style={styles.cardViewStyle}
      
      >

      <View>

{ival.status==0 ?  

<View style={{backgroundColor:'yellow',alignItems:"center"}}>
    <Text style={{alignItems:"center", fontSize:20}}>
        Waiting
    </Text>
</View>

:
 <View style={{backgroundColor:'green',alignItems:"center"}}>
<Text style={{alignItems:"center", fontSize:20}}>
    Approved
</Text>
</View> }

<Rating
      type='custom'
      ratingCount={5}
      imageSize={20}
      readonly={true}
      startingValue={ival.rating==null ? 0 : ival.rating } 
      onFinishRating={ratingCompleted}
      />

<View style={styles.DriverHead}>
    <Text style={styles.Driver_driver_name}>
     {ival.cab_name}
    </Text>
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Varient : 
    </Text>
    <Text style={styles.DriverText1}>
    {ival.cab_type} 
    </Text>
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Number : 
    </Text>

    <Text style={styles.DriverText1}>
    {ival.cab_number} 
    </Text>
   
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Rc Number: 
    </Text>

    <Text style={styles.DriverText1}>
    {ival.cab_rc_book_number} 
    </Text>
   
</View>
{/* 
<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Image Front :  
    </Text>

    <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.cab_image_front}/${id}`,
}}
/>
   
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Image Back : 
    </Text>

    <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.cab_image_back}/${id}`,
}}
/>
  
</View> */}
{/* <View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Image Side :
    </Text>

<Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.cab_image_side}/${id}`,
}}
/>
  
</View> */}
{/* 
<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Insurance :
    </Text>

<Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.cab_insurance}/${id}`,
}}
/> 
  
</View>*/}
<View style={{flexDirection:"row"}}>
        <Button mode="contained" style={styles.buttonstyle} onPress={()=>EditCab(ival)} >
        Edit
        </Button>
        <Button mode="contained" style={styles.buttonstyle} onPress={()=>OnDeleteCab(ival)} >
        Delete
        </Button>
      </View>
 </View>
 </CardView>
    )
}
}) :null}
    
</CardView>



</ScrollView>

</View>


 </Provider>
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
        FileUploadView:{
            flexDirection:"row",
            margin:5
        },
        FileUploadButton:{
            width:'50%',
            alignContent:"flex-end"
        },
        MainContainer: {
       
            flex: 1,
            marginTop:4,
            marginLeft: 9,
            width: '100%', 
            height: '100%' ,
           },
           cardViewStyle12:{
            width: '96%', 
            height: '100%',
            flexDirection: "column",
            // alignContent:"center",
            marginTop:9,
           },
           cardViewStyle:{
     
            width: '96%', 
            height: 240,
            flexDirection: "column",
            marginLeft:6,
            alignContent:"center",
            marginTop:9,
            // marginLeft: 9,
         
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
          DriverHead:{
              alignItems:"flex-start",
              margin:5,
              marginLeft:7,
              flexDirection:"row"
          },
          DriverText:{
              fontSize:15,
              fontWeight:"500"
          },
          DriverText1:{
            fontSize:15,
            marginLeft:2,
            color:"#ce3232"
            // fontWeight:"500"
          },
          buttonstyle:{
            backgroundColor:"#ce3232",
            width:150,
            marginLeft:12
          },
          InputText:{
            width: '95%',
             marginVertical: 5,
             marginLeft:5,
            alignContent:"center"
          },
          heading:{
            alignSelf:'center',
            fontSize:30,
            color:'#ce3232',
            fontWeight: 'bold',
            // position:'absolute'
      
          },
          button:{
            backgroundColor:"#ce3232",
            width:"95%",
            marginLeft:'2%'
      
          },
          tinyLogo:{
              width:100,
              height:40,
              marginLeft:3
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
            shadowColor: "#000000",
            shadowOffset: {
              width: 5,
              height: 2
            },
            width:330,
            height:650,
        
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 25
          },
          buttonText:{
            fontSize: 15,
            textAlign: 'center',
            color: 'white',
            },
            Driver_driver_name:{
              fontSize:20,
              fontWeight:"bold",
              marginLeft:2,
            },
    })