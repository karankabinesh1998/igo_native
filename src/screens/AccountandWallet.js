import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, RefreshControl,Modal, ScrollView,Linking, TouchableOpacity, BackHandler } from 'react-native'
import CardView from 'react-native-cardview';
import { RefreshJsons } from '../configuration/functional';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header_New from '../components/Header_New';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { walletValidator } from '../helpers/walletValidator';

export default function AccountandWallet({ navigation, route }) {

  let userDetail_ = route.params.userDetail[0];
  const [rechargeAmount,setrechargeAmount] = useState({ value: 0 , error: '' });
  let widthArr = [80, 80, 80, 100, 200];
  let THead = ['Head', 'Head2', 'Head3', 'Head4', 'Head5'];
  const [wallet, setWallet] = useState(userDetail_.wallet);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tableHead, setTableHead] = useState(['SL.NO', 'AMOUNT', 'TYPE', 'REASON', 'DATE'])
  const [tableData, settableData] = useState(JSON.parse(userDetail_.wallethistory))
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    onRefresh()
  }, [])

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




  const onRefresh = React.useCallback(async () => {

    setRefreshing(true);
    let result = await RefreshJsons(userDetail_.id);
    setWallet(result[0].wallet)
    settableData(JSON.parse(result[0].wallethistory))
    route.params.OtherPageRefersh()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const data = [];
  for (let i = 0; i < 30; i += 1) {
    const dataRow = [];
    for (let j = 0; j < 5; j += 1) {
      dataRow.push(`${i}${j}`);
    }
    data.push(dataRow);
  }

  const OpenRechargeModel = () => {
    setModalVisible(!modalVisible);
  }

  const ResetModal = () => {
    setModalVisible(false)
  }

  const GotoRechargepage=async()=>{
    const BidAmount = walletValidator(rechargeAmount.value);
    if (BidAmount) {
      setrechargeAmount({ ...rechargeAmount, error: BidAmount })
      return false
    }else{
      // let url = 'https://play.google.com/store/apps/details?id=com.instagram.android';
    let url = `https://cp.igotaxy.in/payment/${userDetail_.login_token}/${rechargeAmount.value}`;
    handleClick(url);
    }
  }

  const handleClick = (url) => {
    Linking.openURL(url);
  };
  

  return (
    <SafeAreaProvider style={{ backgroundColor: "lightgrey" }}>
      <Provider>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => ResetModal()}
        >

          <View style={styles.centeredView1}>
            <View style={styles.modalView}>
              <View style={styles.modelHead}>
                <Text style={styles.modalText}>Enter The Amount!</Text>
              </View>
              <TextInput
                label="Recharge Amount"
                keyboardType="numeric"
                // style={[styles.textInput, { width: '100%' }]}
                container={styles.InputText}
                value={rechargeAmount.value.toString()}
                placeholder='Enter your recharge amount'
                onChangeText={(value) => setrechargeAmount({ value: value.toString(), error: '' })}
                error={!!rechargeAmount.error}
                errorText={rechargeAmount.error}
              />
              <View style={styles.Alignbutton}>
                <Button
                  mode="contained"
                  style={styles.button1}
                  onPress={() => GotoRechargepage()}
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
                    <Text style={styles.BalText}>Deposit : Rs.{parseInt(wallet) >= 500 ? 500 : 0}</Text>
                  </View>


                  <View style={styles.BalanceText}>
                    <Text style={styles.BalText}>Wallet : Rs.{parseInt(wallet) - parseInt(500)}</Text>
                  </View>

                <Button mode="contained" style={styles.button} onPress={() => OpenRechargeModel()}>
                Recharge Wallet
                </Button>


                </CardView>

                <ScrollView
                  horizontal={true}

                >

                  <View>
                    <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                      <Row data={tableHead} widthArr={widthArr} style={styles.headD} textStyle={styles.textTT} />
                    </Table>
                    <ScrollView style={styles.dataWrapperR}>
                      <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                        {
                          tableData.map((dataRow, index) => (
                            <Row
                              key={index}
                              data={dataRow}
                              widthArr={widthArr}
                              style={[styles.rowW, index % 2 && { backgroundColor: '#ffffff' }]}
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
      </Provider>

      <View style={styles.headerFooterStyle}>
        <TouchableOpacity style={styles.iconstyle} onPress={() => navigation.navigate('Dashboard')}>
          <Entypo name="home" color={'#ce3232'} size={22} />
          <Text style={{ textAlign: "center", fontSize: 10, marginTop: 5, fontWeight: "bold", color: "#ce3232" }}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>


  )
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    marginTop: 4,
    width: '100%',
    height: 150,
    alignItems: "center",
  },

  cardViewStyle: {
    width: '95%',
    height: '100%',
    flexDirection: "column",
  },

  container1: {
    flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'
  },

  cardViewStyle1: {
    width: '100%',
    alignItems: "center",
    marginBottom: 10
  },

  BalanceText: {
    flexDirection: "column-reverse",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10

  },

  BalText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  borderStyle: {
    borderWidth: 2,
    borderColor: '#ce3232',
  },

  head: { height: 40, backgroundColor: '#f1f8ff' },

  text: { margin: 6, fontSize: 7 },

  text1: { margin: 5, fontSize: 13, textAlign: "center" },

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
  textTT: {
    textAlign: 'center',
    fontWeight: '200',
    color: "white"
  },
  dataWrapperR: {
    marginTop: -1
  },
  rowW: {
    height: 40,
    backgroundColor: '#F7F8FA'
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
  iconstyle: {
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#ce3232",
    width: "95%",
    marginLeft: '2%'

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
    width: 340,
    height: 250,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15
  },

  modalText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    color: "#ce3232"
  },
  modalText1: {
    // marginBottom: 5,
    textAlign: "center",
    // marginLeft:15,
    // fontSize:25
  },
  modelHead: {
    // textAlign:"center",
    alignItems: "center",
    //  flexDirection:"row",
    //  flex:1
  },
  Alignbutton: {
    flexDirection: "row",
    // width:500
  },
  button1: {
    borderRadius: 15,
    width: 150,
    margin: 4,
    backgroundColor: "#ce3232",
    // padding: 4,
    // elevation: 2,
    // marginLeft:65

  },
})
