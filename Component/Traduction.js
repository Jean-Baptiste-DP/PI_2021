import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import ImageAnalyser from "./ImportImageAnalyser";
import {connect} from "react-redux";
import { store } from 'react-notifications-component';

var RNFS = require('react-native-fs');

class Traduction extends React.Component{
  constructor(props){
    super(props)
    /*this.imageEteinte="file:///data/user/0/com.projet2/cache/Camera/4e53cc67-abad-4747-befd-cf83d51e8c4c.jpg"
    this.imageAllumee="file:///data/user/0/com.projet2/cache/Camera/42ff6966-c18a-426b-a9bd-9dd21465a082.jpg"
    this.liste = [this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageAllumee,this.imageAllumee,this.imageEteinte,
      this.imageAllumee,this.imageAllumee,this.imageAllumee,this.imageAllumee,this.imageAllumee,this.imageEteinte,this.imageEteinte,
      this.imageAllumee,this.imageAllumee,this.imageAllumee,this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageEteinte,
      this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageAllumee,this.imageEteinte,this.imageAllumee,
      this.imageAllumee,this.imageAllumee,this.imageEteinte,this.imageAllumee,this.imageEteinte,this.imageEteinte,this.imageEteinte,
      this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageEteinte,this.imageEteinte,
      this.imageAllumee,this.imageEteinte,this.imageEteinte,this.imageAllumee,this.imageAllumee,this.imageAllumee,this.imageAllumee,
      this.imageEteinte,this.imageAllumee,this.imageAllumee,this.imageEteinte,this.imageEteinte]*/
    this.state = { messageRecu : ""}

  }
  _debutTrad(){

    //ImageAnalyser.analyseListe(this.props.photos).then((value) => {console.log(value)})
    //ImageAnalyser.test().then((value)=> {console.log(value)})
    ImageAnalyser.analyseListe(this.props.photos).then((value) => {
      this.setState({messageRecu : value});
      const action = {type:'RESET'}
      this.props.dispatch(action)
      RNFS.readDir("/data/user/0/com.projet2/cache/Camera")
      .then((result) => {
        result.forEach((item) => {
          return RNFS.unlink(item.path)
            .catch((err) => {
              console.log(err.message);
            });
        })
      })
    })
    console.log(this.state.messageRecu)

  }

  _afficherTexte(){
    if (this.state.messageRecu==""){
      return "Votre message reçu"
    }
    else {
      return this.state.messageRecu
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('tabPress', e => {
      if (this.props.emettre || this.props.receptionner){
        e.preventDefault();
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render(){
    return (
      /*<View style={styles.main_container}>
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
            <Text>{this._afficherTexte()}</Text>
          </View>
        </View>
      </View>*/
      <View style={styles.main_container}>
        <TouchableOpacity
          style={styles.boutton1}
          onPress={() => this._debutTrad()}
        >
          <Text style={{color:'#065FA4'}}>TRADUIRE LE MESSAGE</Text>
        </TouchableOpacity>
        <View style={styles.zoneText1}>
          <Text>{this._afficherTexte()}</Text>
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
  }
})

const mapStateToProps = (state) => {
  return {
    photos : state.photos,
    receptionner : state.receptionner,
    emettre : state.emettre
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Traduction)
