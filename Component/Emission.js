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
  _lettreToBinaire(lettre){
    switch(lettre){
      case ' ':return [0,0,0,0,0,0]
      case '.':return [0,0,0,0,0,1]
      case '0':return [0,0,0,0,1,0]
      case '1':return [0,0,0,0,1,1]
      case '2':return [0,0,0,1,0,0]
      case '3':return [0,0,0,1,0,1]
      case '4':return [0,0,0,1,1,0]
      case '5':return [0,0,0,1,1,1]
      case '6':return [0,0,1,0,0,0]
      case '7':return [0,0,1,0,0,1]
      case '8':return [0,0,1,0,1,0]
      case '9':return [0,0,1,0,1,1]
      case 'a':return [0,0,1,1,0,0]
      case 'b':return [0,0,1,1,0,1]
      case 'c':return [0,0,1,1,1,0]
      case 'd':return [0,0,1,1,1,1]
      case 'e':return [0,1,0,0,0,0]
      case 'f':return [0,1,0,0,0,1]
      case 'g':return [0,1,0,0,1,0]
      case 'h':return [0,1,0,0,1,1]
      case 'i':return [0,1,0,1,0,0]
      case 'j':return [0,1,0,1,0,1]
      case 'k':return [0,1,0,1,1,0]
      case 'l':return [0,1,0,1,1,1]
      case 'm':return [0,1,1,0,0,0]
      case 'n':return [0,1,1,0,0,1]
      case 'o':return [0,1,1,0,1,0]
      case 'p':return [0,1,1,0,1,1]
      case 'q':return [0,1,1,1,0,0]
      case 'r':return [0,1,1,1,0,1]
      case 's':return [0,1,1,1,1,0]
      case 't':return [0,1,1,1,1,1]
      case 'u':return [1,0,0,0,0,0]
      case 'v':return [1,0,0,0,0,1]
      case 'w':return [1,0,0,0,1,0]
      case 'x':return [1,0,0,0,1,1]
      case 'y':return [1,0,0,1,0,0]
      case 'z':return [1,0,0,1,0,1]
      case 'A':return [1,0,0,1,1,0]
      case 'B':return [1,0,0,1,1,1]
      case 'C':return [1,0,1,0,0,0]
      case 'D':return [1,0,1,0,0,1]
      case 'E':return [1,0,1,0,1,0]
      case 'F':return [1,0,1,0,1,1]
      case 'G':return [1,0,1,1,0,0]
      case 'H':return [1,0,1,1,0,1]
      case 'I':return [1,0,1,1,1,0]
      case 'J':return [1,0,1,1,1,1]
      case 'K':return [1,1,0,0,0,0]
      case 'L':return [1,1,0,0,0,1]
      case 'M':return [1,1,0,0,1,0]
      case 'N':return [1,1,0,0,1,1]
      case 'O':return [1,1,0,1,0,0]
      case 'P':return [1,1,0,1,0,1]
      case 'Q':return [1,1,0,1,1,0]
      case 'R':return [1,1,0,1,1,1]
      case 'S':return [1,1,1,0,0,0]
      case 'T':return [1,1,1,0,0,1]
      case 'U':return [1,1,1,0,1,0]
      case 'V':return [1,1,1,0,1,1]
      case 'W':return [1,1,1,1,0,0]
      case 'X':return [1,1,1,1,0,1]
      case 'Y':return [1,1,1,1,1,0]
      case 'Z':return [1,1,1,1,1,1]
      default: return [0,0,0,0,0,1]
    }}

  _textToBinaire(){
    this.morse=[1]
    for(let lettre of this.message){
      this.morse.push(...this._lettreToBinaire(lettre))
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
    this.interval = setInterval(() => this.tick(), 1800);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _debutEmission(){
    if (!this.emettre){
      this.emettre=true;
      this.indice=0;
      this._textToBinaire()
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
