import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import ImageAnalyser from "./ImportImageAnalyser";

class Reception extends React.Component{
  _debutTrad(){
    console.log("bouton appuyé")
    console.log(ImageAnalyser)
    ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/65a6bc2a-bad5-4b8a-8df3-3f3f4f03f88a.jpg").then((value)=>{console.log(value)})
  }
  render(){
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.boutton1}
          onPress={() => this._debutTrad()}
        >
          <View style={styles.boutton2}>
            <Text style={{color:'#065FA4'}}>TRADUIRE LE MESSAGE</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.zoneText1}>
          <View
            style={{flex:1, marginBottom:20, backgroundColor: "#96BFDE"}}
          >
            <Text>Votre message reçu</Text>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor:"#64A0CF"
  },
  boutton1:{
    flex: 1,
    marginRight : 15,
    marginLeft : 15,
    justifyContent:"center"
  },
  boutton2:{
    backgroundColor: '#FFAD3F',
    height:40,
    alignItems:'center',
    justifyContent:"center"
  },
  zoneText1:{
    flex:10,
    marginRight : 15,
    marginLeft : 15
  }
})

export default Reception
