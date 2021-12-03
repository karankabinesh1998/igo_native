import React, { Component, useCallback } from "react";

import Carousel from 'react-native-snap-carousel';

import { View, Text, StyleSheet, Linking, Alert, ActivityIndicator, TouchableOpacity } from "react-native";

import { Image } from 'react-native-elements';

import Config from '../configuration/config';

class Slider_Carousal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            Review: false
        }
    }


    handlePress = async (url) => {
        console.log(url);
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        // console.log(prevProps.Data,this.state.Review,"props");

        if (prevProps.Data && prevProps.viewCarousl == true
            && this.state.Review == false) {



            this.setState({
                Data: prevProps.Data,
                Review: true
            })
        }

    }


    _renderItem = ({ item, index }) => {
        //    console.log(item,"item");
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.handlePress(item.url)}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: `${Config.ACCESS_POINT}/admin/vendarfile/${item.images}/${item.admin_id}`,
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
                        <Text style={{ fontSize: 8, alignItems: "center" }}>{item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }



    render() {
        // console.log(this.state.Data,"sdjask");
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 7, justifyContent: 'center', }}>

                {this.state.Data.length > 0 ?

                    <Carousel
                        //ref={(c) => { this._carousel = c; }}
                        data={this.state.Data}
                        layout={"default"}
                        renderItem={this._renderItem}
                        sliderWidth={10}
                        itemWidth={300}
                    />
                    : null}
            </View>
        )
    }

}

export default Slider_Carousal

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 200,
        padding: 2,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
    },
    tinyLogo: {
        width: 250,
        height: 100,
        margin: 7
    }

})