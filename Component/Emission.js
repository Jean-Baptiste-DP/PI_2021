import React from 'react'
import {ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity} from 'react-native'
import Torch from "react-native-torch";
import {connect} from "react-redux";

class Emission extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      message:"",
      indice:0
    }
    this.morse=[]
    this.etat=false;
    //this.emettre=false;
    this.tempo= 800;
    this.message_transmis="";
  }
  _textInputChanged(text){
    this.setState({message:text})
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
    for(let lettre of this.state.message){
      this.morse.push(...this._lettreToBinaire(lettre))
    }
  }

  tick() {
    if (this.props.emettre){
      if (this.state.indice===this.morse.length){
        //this.emettre=false
        const action = {type:'APPUI_EMETTRE'}
        this.props.dispatch(action)
        this.etat=false
        this.setState({indice:0})
      }
      else {
        if (this.morse[this.state.indice]===1){
          this.etat=true
        }
        else{
          this.etat=false
        }
        this.setState({indice:this.state.indice+1})
      }
      Torch.switchState(this.etat)


    }}

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.tempo);
    this._unsubscribe = this.props.navigation.addListener('tabPress', e => {
      if (this.props.receptionner){e.preventDefault();}
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this._unsubscribe();
  }

  _debutEmission(){
    if (!this.props.emettre){
      this.message_transmis=this.state.message
      console.log(this._tempsEmission())
      this.setState({indice:0});
      //this.emettre=true;
      const action = {type:'APPUI_EMETTRE'}
      this.props.dispatch(action)
      this._textToBinaire()
    }
  }

  _tempsEmission(){
    const n = this.state.message.length;
    const temps_mil= n*this.tempo*6;
    const secondes_mil= temps_mil % 60000;
    const minutes= (temps_mil-secondes_mil) / 60000
    const sec=secondes_mil / 1000;
    if (minutes==0){
      const message= sec.toString() + " secondes"
      return message
    }
    else{
    const message= minutes.toString() + " minutes et "+ sec.toString() + " secondes"
      return message
    }

  }

  _iemeLettre(){
    const nb_bit_emit = this.state.indice % 6
    const lettre = (this.state.indice - nb_bit_emit) /6
    return lettre
  }

  _texteAffiche(){
    const n= this.message_transmis.length
    const lettre = this._iemeLettre()
    const avant=this.message_transmis.slice(0,lettre)
    const milieu=this.message_transmis[lettre]
    const apres=this.message_transmis.slice(lettre+1)
    return <View style={{flexDirection:'row'}}>
      <Text>{avant}</Text>
      <Text style={{color:'red'}}>{milieu}</Text>
      <Text>{apres}</Text>
    </View>

  }

  _switchText(){
    if (this.props.emettre){
      return this._texteAffiche()
    }
    else{
      return <Text> Temps d'??mission : {this._tempsEmission()}</Text>
    }
  }

  render(){
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.boutton1}
          onPress={() => this._debutEmission()}
        >
          <Text style={{color:'#065FA4'}}>TRANSMETTRE LE MESSAGE</Text>
        </TouchableOpacity>
        <View style={styles.zoneText1}>
          <TextInput
            placeholder="Message ?? transmettre"
            onChangeText={(text)=> this._textInputChanged(text)}
          />
        </View>
        <View style={styles.info}>
          {this._switchText()}
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
    marginRight : 15,
    marginLeft : 15,
    marginTop : 15,
    height: 40,
    backgroundColor: '#FFAD3F',
    alignItems:'center',
    justifyContent:"center"
  },
  boutton2:{
    backgroundColor: '#FFAD3F',
    height:40,
    alignItems:'center',
    justifyContent:"center"
  },
  zoneText1:{
    flex:1,
    margin : 15,
    backgroundColor: "#96BFDE"
  },
  info:{
    height:80,
    marginBottom : 15,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: "#96BFDE"
  }
})

const mapStateToProps = (state) => {
  return {
    emettre : state.emettre,
    receptionner : state.receptionner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Emission)
