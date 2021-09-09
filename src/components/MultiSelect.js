import React, { Component } from 'react';
import { StyleSheet, View , Text , ScrollView , Button } from 'react-native'
// import MultiSelect from 'react-native-multiple-select';
import { UpdateProfileSelect } from '../configuration/functional';
import SelectMultiple from 'react-native-select-multiple'




class MultiSelectExample extends Component {
        constructor(props){
            super(props);
            this.state = {
                selectedItems : [],
                items:[],
                id:null,
                arr:[],
                selectedItems1:[]
              };
        }
 
 

  async componentDidMount(){
     
    // console.log(this.props.state,"propsprops ");

    //  if(this.props)

     this.setState({
      items : this.props.state,
      id : this.props.id,
      selectedItems:this.props.selectedItems==null ? [] : this.props.selectedItems,
      selectedItems1:this.props.selectedItems==null ? [] : this.props.selectedItems,

    })
     
    await  this.ViewData(this.props.state,this.props.selectedItems)
 }


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

    // console.log(arr,"arrr");

    this.setState({
      selectedItems : arr
    })

    }
  
  onSelectedItemsChange = async selectedItems => {

    this.setState({ selectedItems })

    // console.log(selectedItems);

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
              this.props.HandleSelect(result)
          }
    }

    onSelectionsChange=async(e)=>{
      // console.log(selectedFruits);
      
      let d = []
      
     let wait =  e.map((ival,i)=>{

        d.push(ival.value)

      })

      await Promise.all(wait)

      // if(d.length){

      //   const formData=new FormData();

      //   formData.append("travel_location",JSON.stringify(d));
        

      //   let result = await UpdateProfileSelect(formData,this.state.id)

      //   if(result){
      //       this.props.HandleSelect(result)
      //   }
    // }
      
      this.setState({
        selectedItems : e,
        selectedItems1:d
      })
    }

    renderLabel = (label, style) => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} /> */}
          <View style={{marginLeft: 10}}>
            <Text style={style}>{label}</Text>
          </View>
        </View>
      )
    }
 
  render() {
    
 
    return (
        <View style={styles.container}>
          
        <View style={styles.multiSelectContainer}>
        <View style={styles.ViewStyle}>
        <Text style={styles.TextStyle}>Select Your Preferred Location</Text>
        </View>
        {/* <MultiSelect
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
        { this.multiSelect ? this.multiSelect.getSelectedItemsExt(selectedItems) : null} */}
  <ScrollView
// stickyHeaderIndices={[1]}
showsVerticalScrollIndicator={false}
>
    <SelectMultiple
        items={this.state.items}
        selectedItems={this.state.selectedItems}
        onSelectionsChange={this.onSelectionsChange} 
        renderLabel={this.renderLabel}
        />
<Button mode="contained" style={styles.button} onPress={this.submit} title={"Submit"} />
   

</ScrollView>
        {/* {this.state.arr.length?this.state.arr.map((ival,i)=>{
            console.log(ival);
            return(
                <View>
                    {ival} 
                    </View>
            )
        }):null} */}
        {/* </View> */}
        
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