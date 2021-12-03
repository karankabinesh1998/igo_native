import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo({ STYLE = null }) {
  // console.log(STYLE);
  return <Image source={require('../../igotaxy.png')} style={STYLE ? STYLE : styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 110,
    marginBottom: 1,
  },
})
