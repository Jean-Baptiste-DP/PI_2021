import React from 'react'
import {ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity} from 'react-native'
import Torch from "react-native-torch";

class Emission extends React.Component{
  constructor(props) {
    super(props);
    this.message=""
    this.morse=[]
    this.etat=false;
    this.emettre=false;
    this.indice=0;
  }
  _textInputChanged(text){
    this.message=text
  }
  _lettreToMorse(lettre){
    switch(lettre.toLowerCase()){
      case 'a':return [1,0,1,1,1]
      case 'b':return [1,1,1,0,1,0,1,0,1]
      case 'c':return [1,1,1,0,1,0,1,1,1,0,1]
      case 'd':return [1,1,1,0,1,0,1]
      case 'e':return [1]
      case 'f':return [1,0,1,0,1,1,1,0,1]
      case 'g':return [1,1,1,0,1,1,1,0,1]
      case 'h':return [1,0,1,0,1,0,1]
      case 'i':return [1,0,1]
      case 'j':return [1,0,1,1,1,0,1,1,1,0,1,1,1]
      case 'k':return [1,1,1,0,1,0,1,1,1]
      case 'l':return [1,0,1,1,1,0,1,0,1]
      case 'm':return [1,1,1,0,1,1,1]
      case 'n':return [1,1,1,0,1]
      case 'o':return [1,1,1,0,1,1,1,0,1,1,1]
      case 'p':return [1,0,1,1,1,0,1,1,1,0,1]
      case 'q':return [1,1,1,0,1,1,1,0,1,0,1,1,1]
      case 'r':return [1,0,1,1,1,0,1]
      case 's':return [1,0,1,0,1]
      case 't':return [1,1,1]
      case 'u':return [1,0,1,0,1,1,1]
      case 'v':return [1,0,1,0,1,0,1,1,1]
      case 'w':return [1,0,1,1,1,0,1,1,1]
      case 'x':return [1,1,1,0,1,0,1,0,1,1,1]
      case 'y':return [1,1,1,0,1,0,1,1,1,0,1,1,1]
      case 'z':return [1,1,1,0,1,1,1,0,1,0,1]
      default: return []
    }}

  _textToMorse(){
    this.morse=[]
    for(let lettre of this.message){
      this.morse.push(...this._lettreToMorse(lettre), 0, 0, 0)
    }
  }

  tick() {
    if (this.emettre){
      if (this.indice===this.morse.length){
        this.emettre=false
        this.etat=false
      }
      else {
        if (this.morse[this.indice]===1){
          this.etat=true
        }
        else{
          this.etat=false
        }
        this.indice=this.indice+1
      }
      Torch.switchState(this.etat)


    }}

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _debutEmission(){
    if (!this.emettre){
      this.emettre=true;
      this.indice=0;
      this._textToMorse()
    }
  }

  render(){
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.boutton1}
          onPress={() => this._debutEmission()}
        >
          <View style={styles.boutton2}>
            <Text style={{color:'#065FA4'}}>TRANSMETTRE LE MESSAGE</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.zoneText1}>
          <View
            style={{flex:1, marginBottom:20, backgroundColor: "#96BFDE"}}
          >
            <TextInput
              placeholder="Message à transmettre"
              onChangeText={(text)=> this._textInputChanged(text)}
            />
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

export default Emission
