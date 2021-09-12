import React , { useEffect , useState } from 'react';
import { View , Text , StyleSheet ,RefreshControl, ScrollView , BackHandler } from 'react-native'
import CardView from 'react-native-cardview';
// import AsyncStorage from "@react-native-community/async-storage";
// import Stored from '../configuration/storageDetails';
import { RefreshJsons } from '../configuration/functional';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header_New from '../components/Header_New';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AccountandWallet({ navigation,route }){

    let userDetail_ = route.params.userDetail[0];
    // GetTabPage('Account')
    console.log(navigation);
    let widthArr =  [80, 80, 80,100, 200]
    let THead = ['Head', 'Head2', 'Head3', 'Head4', 'Head5']
    const [wallet, setWallet] = useState(userDetail_.wallet);
    // const [userid,setUserDetail] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [tableHead,setTableHead]=useState(['SL.NO', 'AMOUNT', 'TYPE','REASON','DATE'])
    const [tableData,settableData]=useState( JSON.parse(userDetail_.wallethistory))

  
// console.log(tableData);
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

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




      const onRefresh = React.useCallback(async() => {

        setRefreshing(true);
      
       let result = await RefreshJsons(userDetail_.id);
        setWallet(result[0].wallet)
        settableData(JSON.parse(result[0].wallethistory))
         
         console.log( JSON.parse(result[0].wallethistory),"Refrehjson");
         route.params.OtherPageRefersh()
        wait(5000).then(() => setRefreshing(false));
      }, []);

      // const state = this.state;
      const data = [];
      for (let i = 0; i < 30; i += 1) {
        const dataRow = [];
        for (let j = 0; j < 5; j += 1) {
          dataRow.push(`${i}${j}`);
        }
        data.push(dataRow);
      }

return(
<SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 
<Header_New subtitle="My Account" navigation={navigation} />

<View style={styles.MainContainer} >

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<ScrollView
showsVerticalScrollIndicator={false}
refreshControl={
  <RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
  />}
>

<View style={styles.containerR}>

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle1}
>

<View style={styles.BalanceText}>
<Text style={styles.BalText}>Deposit : Rs.{parseInt(wallet)>500 ? 500 : 0 }</Text>
</View>


<View style={styles.BalanceText}>
<Text style={styles.BalText}>Wallet : Rs.{parseInt(wallet) - parseInt(500)}</Text>
</View>



</CardView>

<ScrollView 
 horizontal={true}
 
 >
   
  <View>
    <Table borderStyle={{borderColor: '#C1C0B9'}}>
      <Row data={tableHead} widthArr={widthArr} style={styles.headD} textStyle={styles.textTT}/>
    </Table>
    <ScrollView style={styles.dataWrapperR}>
      <Table borderStyle={{borderColor: '#C1C0B9'}}>
        {
          tableData.map((dataRow, index) => (
            <Row
              key={index}
              data={dataRow}
              widthArr={widthArr}
              style={[styles.rowW, index%2 && {backgroundColor: '#ffffff'}]}
              textStyle={styles.textT}
            />
          ))
        }
      </Table>
    </ScrollView>
  </View>
</ScrollView>
</View>
</ScrollView>
</CardView>

</View>

</SafeAreaProvider>


    )
}

  const styles = StyleSheet.create({

  MainContainer: {
  flex: 1,
  marginTop:4,
  width: '100%', 
  height: 150 ,
  alignItems:"center",
  },

  cardViewStyle:{
  width: '95%', 
  height: '100%',
  flexDirection: "column",
  },

  container1:{
  flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' 
  },

  cardViewStyle1:{
  width: '100%',
  // marginTop:5,
  alignItems: "center",
  marginBottom:10
  },

  BalanceText:{
  flexDirection:"column-reverse",
  alignItems:"center",
  marginBottom:30,
  marginTop:10

  },

  BalText:{
  fontWeight:'bold',
  fontSize:18,
  },

  borderStyle:{
  borderWidth: 2, 
  borderColor: '#ce3232',
   },

  head: { height: 40, backgroundColor: '#f1f8ff' },

  text: { margin: 6,fontSize:7 },

  text1:{ margin: 5,fontSize:13 ,textAlign:"center"  },

  containerR: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#ffffff' 
  },
  headD: { 
    height: 50, 
    backgroundColor: '#ce3232',
     
  },
  textT: { 
    textAlign: 'center', 
    fontWeight: '200',
  },
  textTT:{
    textAlign: 'center', 
    fontWeight: '200',
    color:"white" 
  },
  dataWrapperR: { 
    marginTop: -1 
  },
  rowW: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  }

  })
