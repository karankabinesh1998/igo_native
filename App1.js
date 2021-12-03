// import React, { Component } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Video from 'react-native-video';
// import gif from './src/gif/gif.mp4';

// class App1 extends Component {
//     state = {
//         stage: true,
//         restart: true
//     }
//     onVideoEnd = e => {
//         this.setState({ stage: false });
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 {
//                     this.state.stage && this.state.restart ? <View style={{ width: '100%', height: '100%' }}>
//                         <Video source={require('./src/gif/gif.mp4')}
//                             ref={(ref) => {
//                                 this.player = ref
//                             }}
//                             repeat={false}
//                             onEnd={this.onVideoEnd}
//                             style={styles.video} />
//                     </View>
//                         : <View>
//                             <Image
//                                 style={styles.image}
//                                 source={{ uri: 'https://www.w3schools.com/cssref/img_tree.gif' }}
//                             />
//                         </View>
//                 }
//             </React.Fragment>
//         );
//     }
// }
// var styles = StyleSheet.create({
//     video: {
//         height: 200,
//         width: '100%',
//     },
//     image: {
//         height: 200,
//         width: 200,
//         resizeMode: 'contain'
//     },
// });


// export default App1;