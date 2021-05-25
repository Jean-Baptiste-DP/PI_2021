import React from 'react'
import {ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList, Image} from 'react-native'


class Photo extends React.Component {
  render (){
    return (
      <View style={{flex:1}}>
        <Image
          source={{uri:"file:///data/user/0/com.projet2/cache/Camera/753de8ba-e5ae-483e-b47b-82be59a7bd60.jpg"}}
          style={{height:216, width:288 }}/>
      </View>
    )
  }
}

export default Photo
