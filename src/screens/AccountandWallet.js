import React , { useEffect , useState } from 'react';
import { View , Text , StyleSheet ,RefreshControl, ScrollView } from 'react-native'
import CardView from 'react-native-cardview';
// import AsyncStorage from "@react-native-community/async-storage";
// import Stored from '../configuration/storageDetails';
import { RefreshJsons } from '../configuration/functional';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function AccountandWallet({ navigation , userDetail  }){

    let userDetail_ = userDetail.userDetail[0];
console.log(userDetail_.wallethistory);

// let tableHead = ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'];
      let widthArr =  [40, 60, 80, 100, 120, 140, 160, 180, 200]

    const [wallet, setWallet] = useState(userDetail_.wallet);
    // const [userid,setUserDetail] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [tableHead,setTableHead]=useState(['Sl.no', 'amount', 'Type', 'Date'])
    const [tableData,settableData]=useState( JSON.parse(userDetail_.wallethistory))

  

    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }


      const onRefresh = React.useCallback(async() => {

        setRefreshing(true);
      
       let result = await RefreshJsons(userDetail_.id);
        // console.log(userDetail_,"userDetail_");
         setWallet(result[0].wallet)
        //  setuserDetail_(result[0].id)
        settableData(JSON.parse(result[0].wallethistory))
         
         console.log( JSON.parse(result[0].wallethistory),"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);

    return(
        <View style={styles.MainContainer} >

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<ScrollView
    // stickyHeaderIndices={[1]}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
    >

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle1}
>
<View style={styles.BalanceText}>
<Text style={styles.BalText}>Balance in the Wallet : Rs.{wallet}</Text>
</View>
</CardView>

<View style={styles.container1}>

{tableData.length ? <Table borderStyle={styles.borderStyle}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table> : null}

{/* <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView> */}

        </View>

</ScrollView>
    </CardView>

    


        </View>
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
        // marginLeft:20,
        // flexDirection:"row-reverse",
        marginTop:5,
        alignItems: "center",
      },
     BalanceText:{
        // flex:2,
        flexDirection:"column-reverse",
        // marginLeft:8,
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
          borderColor: '#c8e1ff'
        },

          head: { height: 40, backgroundColor: '#f1f8ff' },
          text: { margin: 6 }




})
