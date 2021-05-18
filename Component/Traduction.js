import React from 'react'
import {ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'

class Reception extends React.Component{
  render(){
    return (
      <View style={styles.main_container}>
        <View style={styles.boutton1}>
          <View style={styles.boutton2}>
            <Text style={{color:'#065FA4'}}>RECEPTIONNER LE MESSAGE</Text>
          </View>
        </View>
        <View style={styles.zoneText1}>
          <View style={{flex:1, marginBottom:20, backgroundColor: "#96BFDE"}}>
            <Text style={{marginTop:10, color:'grey'}}> Votre message reçu</Text>
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
