import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native'
// import MultiSelect from 'react-native-multiple-select';
import { RefreshJsons, UpdateProfileSelect } from '../configuration/functional';
import SelectMultiple from 'react-native-select-multiple'
import Button from '../components/Button';
import { Provider } from 'react-native-paper';
// import { stat } from 'react-native-fs';
// import { RefreshJsons }


class MultiSelectExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      items: [],
      id: null,
      arr: [],
      selectedItems1: [],
      refreshing: false,
      SelectAll: false
    };
  }



  async componentDidMount() {

    let result = await RefreshJsons(this.props.id);

    if (result.length > 0) {

      let state_Data = JSON.parse(result[0].state)
      let Travel_location = JSON.parse(result[0].travel_location)

      this.setState({
        items: [{ value: 0, label: "Select All" }, ...state_Data],
        id: result[0].id,
        selectedItems: Travel_location,
        selectedItems1: Travel_location,
      })

      if (state_Data.length > 0 && Travel_location.length > 0) {
        await this.ViewData(state_Data, Travel_location)
      }
    }



  }


  static getDerivedStateFromProps(props, state) {
    if (state.items.length == 0) {
      return {
        items: [{ value: 0, label: "Select All" }, ...props.state],
        id: props.id,
        selectedItems: props.selectedItems.length == 0 ? [] : props.selectedItems,
        selectedItems1: props.selectedItems.length == 0 ? [] : props.selectedItems,
        refreshing: props.refreshing

      }
    }
    return null;
  }


  ViewData = async (data, selectedItems) => {

    let arr = [];
    console.log(data, selectedItems, "DATAAAA")
    let wait = await data.map((ival, i) => {
      selectedItems.map((jval, j) => {

        if (ival.value == jval) {
          arr.push(ival)
        }

      })


    })

    await Promise.all(wait)

    this.setState({
      selectedItems: arr
    })

  }



  submit = async () => {

    const { selectedItems1 } = this.state;

    let arr = [];

    let wait = await this.state.selectedItems1.map((ival, i) => {
      if (ival != 0) {
        arr.push(ival)
      }
    })

    await Promise.all(wait)

    if (this.state.selectedItems1[0] == null) {
      return false
    }

    console.log(arr, "arrr");

    const formData = new FormData();

    formData.append("travel_location", JSON.stringify(arr));


    let result = await UpdateProfileSelect(formData, this.state.id)

    if (result) {
      this.props.HandleSelect(result)
    }
  }


  onSelectionsChange = async (e) => {

    const { SelectAll } = this.state;

    console.log(e, "Onselect");

    let d = [];

    let check_obj = [];

    check_obj.push(await e.find(o => o.value === 0))

    if (check_obj[0] !== undefined && this.state.SelectAll == false) {

      // console.log(this.state.SelectAll,"this.state.SelectAll");
      e = this.state.items
      this.setState({
        SelectAll: !this.state.SelectAll
      })

    } else if (check_obj[0] == undefined && this.state.SelectAll == true) {

      e = []

      this.setState({
        SelectAll: !this.state.SelectAll
      })
    }
    else {

      e = e

    }



    // console.log(e,"eeeee");

    let wait = await e.map((ival, i) => {

      d.push(ival.value);

    })

    await Promise.all(wait);

    this.setState({
      selectedItems: e,
      selectedItems1: d
    })

  }

  Select_All = () => {
    this.setState({
      selectedItems: this.state.items
    })
  }

  renderLabel = (label, style) => {
    console.log(label, "label")
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginLeft: 10 }}>
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

              {this.state.items.length ? <SelectMultiple
                style={{ height: 480 }}
                items={this.state.items}
                selectedItems={this.state.selectedItems}
                onSelectionsChange={this.onSelectionsChange}
                // renderLabel={this.renderLabel}
                selectedRowStyle={{ backgroundColor: "lightgreen", color: "red" }}
              />
                :
                null}
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
    marginTop: 10
  },
  multiSelectContainer: {
    height: 900,
    width: '90%'
  },
  ViewStyle: {
    // flex:1,

  },
  TextStyle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5
  },
  button: {

    backgroundColor: "#ce3232",
    width: "95%",
    marginLeft: '2%'

  },
})

export default MultiSelectExample;