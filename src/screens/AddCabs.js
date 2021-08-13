import { View , Text, ScrollView ,ActivityIndicator, Modal ,Pressable, RefreshControl,BackHandler,Alert,Image ,StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Header1 from '../components/Header';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
// import AsyncStorage from "@react-native-community/async-storage";
// import Stored from '../configuration/storageDetails';
import { RefreshJsons , AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Addcabs1 } from '../configuration/functional';
import  Config from '../configuration/config';
import DocumentDriverPicker from '../components/DocumentDriverPicker';




export default  function AddCabs(navigation){

    const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null);
    // const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    const [vendorCabs,setvendorCabs]=useState(JSON.parse(navigation.route.params.userDetail.userDetail[0].vendorCabs))

    const [cab_name, setcab_name] = useState({ value: '', error: '' })
    const [cab_type, setcab_type] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value:'', error: '' });
    const [cab_image_front, setcab_image_front] = useState({ value:null, error: '' });
    const [cab_image_front1, setcab_image_front1] = useState('');

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
        navigation.navigation.navigate('Dashboard')
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
    formData.append("file",JSON.stringify(["file1","file2","file3","file4"]))
    formData.append("file1",cab_image_front.value);
    formData.append("file2",cab_image_back.value);
    formData.append("file3",cab_image_side.value);
    formData.append("file4",cab_insurance.value)


    console.log(formData);

    let result = await Addcabs1(formData);

    if(result){

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
          rightComponent={ <WhatsappandCall/> }
          containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              width:'100%',
              height:'15%'
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


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle12}>


<Header1 style={styles.heading}>Add Your Cabs</Header1>

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

       

    {/* <Input
      label="Password"
      style={styles.InputText}
      underlineColor="transparent"
        mode="outlined"
      secureTextEntry
      right={<Input.Icon name="eye" />}
    /> */}
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
<Text style={{fontSize:16}}>Upload Cab Front View : </Text>    
</View>    

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_front} handleChange={handleChange}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_front1 ? cab_image_front1.substring(0,14) : null } </Text>
</View>



<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Cab Back View : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_back} handleChange={handleChange1}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_back1 ? cab_image_back1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Cab Side View : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_image_side} handleChange={handleChange2}/>
<Text style={{margin:6,fontSize:12}}>{cab_image_side1 ? cab_image_side1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Cab Insurance : </Text>    
</View>  

<View style={styles.FileUploadView}>
    <DocumentDriverPicker Profile={cab_insurance} handleChange={handleChange3}/>
<Text style={{margin:6,fontSize:12}}>{cab_insurance1 ? cab_insurance1.substring(0,14) : null } </Text>
</View>



{/* <View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Driving Licence Back : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={d_front} handleChange={handleChange1}/>
<Text style={{margin:6,fontSize:12}}>{d_back1 ? d_back1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Police Certificate : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={police_verify} handleChange={handleChange2}/>
<Text style={{margin:6,fontSize:12}}>{police_verify1 ? police_verify1.substring(0,14) : null } </Text>
</View> */}

{ activeIndicator ?

<View style={[styles.container, styles.horizontal]}>
<ActivityIndicator size="large" color="#ce3232" />
</View>

: <Button mode="contained" style={styles.button} onPress={Submit}>
        Add Cab
</Button> }

{ vendorCabs.length ? vendorCabs.map((ival,i)=>{
console.log(ival,"246");
    return(
        <CardView
    cardElevation={5}
    cardMaxElevation={5}
    cornerRadius={5}
    style={styles.cardViewStyle}>

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


<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Name : {ival.cab_name}
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
  
</View>


<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Cab Image Side :
    </Text>

<Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.cab_image_side}/${id}`,
}}
/>
  
</View>


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
  
</View>

 </CardView>
    )
}) :null  }
    
</CardView>



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
            height: 80 ,
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
            height: 450,
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
              fontSize:17,
              fontWeight:"500"
          },
          DriverText1:{
            fontSize:15,
            margin:3
            // fontWeight:"500"
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
              height:50,
              marginLeft:3
          }
    })