import React, { Component } from 'react';
import { StyleSheet, View , Text } from 'react-native'
import MultiSelect from 'react-native-multiple-select';
import { UpdateProfileSelect } from '../configuration/functional';
 
// const items = [{
//     id: '92iijs7yta',
//     name: 'Ondo'
//   }, {
//     id: 'a0s0a8ssbsd',
//     name: 'Ogun'
//   }, {
//     id: '16hbajsabsd',
//     name: 'Calabar'
//   }, {
//     id: 'nahs75a5sg',
//     name: 'Lagos'
//   }, {
//     id: '667atsas',
//     name: 'Maiduguri'
//   }, {
//     id: 'hsyasajs',
//     name: 'Anambra'
//   }, {
//     id: 'djsjudksjd',
//     name: 'Benue'
//   }, {
//     id: 'sdhyaysdj',
//     name: 'Kaduna'
//   }, {
//     id: 'suudydjsjd',
//     name: 'Abuja'
//     }
// ];

// const multiSelect = useRef(null)


class MultiSelectExample extends Component {
        constructor(props){
            super(props);
            this.state = {
                selectedItems : [],
                items:[],
                id:null,
                arr:[]
              };
        }
 
 

  async componentDidMount(){
     
    console.log(this.props,"propsprops ");

    //  if(this.props)

     this.setState({
      items : this.props.state,
      id : this.props.id,
      selectedItems:this.props.selectedItems==null ? [] : this.props.selectedItems
    })
     
   await  this.ViewData(this.props.selectedItems)
 }


  ViewData = async(data)=>{
    
    console.log(data,"6060"); 
    let arr = []

    let wait = await data.map((ival,i)=>{
       
      arr.push(this.multiSelect ? this.multiSelect.getSelectedItemsExt([ival]) : null)
    })

    console.log(arr,"array");
    this.setState({
        arr
    })
    }
  
  onSelectedItemsChange = async selectedItems => {

    this.setState({ selectedItems })

    console.log(selectedItems);

    if(selectedItems.length){

        const formData=new FormData();

        formData.append("travel_location",JSON.stringify(selectedItems));
        

        let result = await UpdateProfileSelect(formData,this.state.id)

        if(result){
            this.props.HandleSelect(result)
        }
    }

    };
 
  render() {
    const { selectedItems } = this.state;
 
    return (
        <View style={styles.container}>
          
        <View style={styles.multiSelectContainer}>
        <View style={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Select Your Preferred Location</Text>
        </View>
        <MultiSelect
          hideTags
          items={this.state.items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Pick up Your Location"
          searchInputPlaceholderText="Search Locations..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#ce3232"
          submitButtonText="Select"
        />
        
        <View>
        { this.multiSelect ? this.multiSelect.getSelectedItemsExt(selectedItems) : null}

        {/* {this.state.arr.length?this.state.arr.map((ival,i)=>{
            console.log(ival);
            return(
                <View>
                    {ival} 
                    </View>
            )
        }):null} */}
        </View>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      marginTop:10
    },
    multiSelectContainer: {
      height: 600,
      width: '90%'
    },
    ViewStyle:{
        // flex:1,

        },
    TextStyle:{
        textAlign:"center",
        fontSize:15,
        fontWeight:"bold",
        marginBottom:5
    }
  })

export default MultiSelectExample;