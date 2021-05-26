import React from 'react'
import {ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList, Image} from 'react-native'


class Photo extends React.Component {
  render (){
    return (
      <View style={{flex:1}}>
        <Image
          source={{uri:"file:///data/user/0/com.projet2/cache/Camera/42ff6966-c18a-426b-a9bd-9dd21465a082.jpg"}}
          style={{height:216, width:288 }}/>
      </View>
    )
  }
}

export default Photo
