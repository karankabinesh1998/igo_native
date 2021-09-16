import React, { Component } from 'react';
import { StyleSheet, View , Text , ScrollView , RefreshControl} from 'react-native'
// import MultiSelect from 'react-native-multiple-select';
import { UpdateProfileSelect } from '../configuration/functional';
import SelectMultiple from 'react-native-select-multiple'
import Button from '../components/Button';
import {  Provider } from 'react-native-paper';
import { stat } from 'react-native-fs';


class MultiSelectExample extends Component {
        constructor(props){
            super(props);
            this.state = {
                selectedItems : [],
                items:[],
                id:null,
                arr:[],
                selectedItems1:[],
                refreshing:false
              };
        }
 
 

   componentDidMount(){
    
    console.log(this.props.state,"state");
    
     this.setState({
      items : [{value:0,label:"Select All"},...this.props.state],
      id : this.props.id,
      selectedItems:this.props.selectedItems== null ? [] : this.props.selectedItems,
      selectedItems1:this.props.selectedItems== null ? [] : this.props.selectedItems,
      refreshing:this.props.refreshing
    })
     
      this.ViewData(this.props.state,this.props.selectedItems)

    }


static getDerivedStateFromProps(props,state){
  // console.log(state,"Props STate");

  if(state.items.length == 0 ){
    // this.ViewData(props.state,props.selectedItems)
    return {
          items : [{value:0,label:"Select All"},...props.state],
          id : props.id,
          selectedItems:props.selectedItems== null ? [] : props.selectedItems,
          selectedItems1:props.selectedItems== null ? [] :props.selectedItems,
          refreshing:props.refreshing
         
        }

  }

  return null;

}

//  async componentWillReceiveProps(props){
    

//     this.setState({
//       items : [{value:0,label:"Select All"},...props.state],
//       id : props.id,
//       selectedItems:props.selectedItems== null ? [] : props.selectedItems,
//       selectedItems1:props.selectedItems== null ? [] :props.selectedItems,
//       refreshing:props.refreshing
//     })
     
//       this.ViewData(props.state,props.selectedItems)
//   }

  

  ViewData = async(data,selectedItems)=>{
    
    let arr = [];
    
     let wait = await data.map((ival,i)=>{
      selectedItems.map((jval,j)=>{

        if(ival.value==jval){
          arr.push(ival)
        }

      })
     
    
    })

    await Promise.all(wait)

     this.setState({
      selectedItems : arr
    })

    // console.log(selectedItems,"selectedItems");

    }
  
  onSelectedItemsChange = async selectedItems => {

    this.setState({ selectedItems })

     if(selectedItems.length){

        const formData=new FormData();

        formData.append("travel_location",JSON.stringify(selectedItems));
        

        let result = await UpdateProfileSelect(formData,this.state.id)

        if(result){
            this.props.HandleSelect(result)
        }
    }

    };


    submit=async()=>{
      const formData=new FormData();

          formData.append("travel_location",JSON.stringify(this.state.selectedItems1));
          
  
          let result = await UpdateProfileSelect(formData,this.state.id)
  
          if(result){
            // console.log(result);
              this.props.HandleSelect(result)
          }
    }

    onSelectionsChange=async(e)=>{
      // console.log(e);
        let d = [];

        let check_obj = [] ;

        // console.log(Object.keys(check_obj).length,"obj");
        
        check_obj.push(await e.find(o => o.value === 0 ))

        // console.log(check_obj,check_obj.length,"send adata");

        if(check_obj[0] !== undefined){

           e = this.state.items.filter((item) => item.value !== 0 );

        }

        let wait =  e.map((ival,i)=>{

            if(ival.value !=0 ){
              
              d.push(ival.value);
            }
          })

          await Promise.all(wait);

      

      // console.log(e,"filteredPeople");

      
      this.setState({
        selectedItems : e,
        selectedItems1: d
      })

    }

    Select_All=()=>{
        this.setState({
          selectedItems : this.state.items
        })
    }

    renderLabel = (label, style) => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 10}}>
            <Text style={style}>{label}</Text>
          </View>
        </View>
      )
    }
 
  render() {

    // console.log(this.state.items);
 
    return (
      <Provider>
       
        <View style={styles.container}>
         
        <View style={styles.multiSelectContainer}>
      
        <View style={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Select Your Preferred Location</Text>
        </View>
       
         
        <View>
        <SelectMultiple
          style={{height:480}}
          items={this.state.items}
          selectedItems={this.state.selectedItems}
          onSelectionsChange={this.onSelectionsChange} 
          renderLabel={this.renderLabel}
          refreshing={this.state.refreshing}
          selectedRowStyle={{ backgroundColor:"lightgreen" ,color:"red" }}
          />

        <Button mode="contained" style={styles.button} onPress={this.submit}>Submit</Button>

        </View>

     </View>
     
      </View>
     
      </Provider>
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
      height: 800,
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
    },
    button:{

      backgroundColor:"#ce3232",
      width:"95%",
      marginLeft:'2%'

    }, 
  })

export default MultiSelectExample;