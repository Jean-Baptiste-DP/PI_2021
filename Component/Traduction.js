import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import ImageAnalyser from "./ImportImageAnalyser";
import {connect} from "react-redux";

class Traduction extends React.Component{
  constructor(props){
    super(props)
  }
  _debutTrad(){
    //ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/4079d26c-ddbb-46ac-8323-e1c6301e7acb.jpg").then((value)=>{console.log(value)})
    /*console.log("reference")
    ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/86aadf2c-ede7-449c-857b-57c21802c2ab.jpg").then((value)=>{console.log(value)})
    console.log("photo éteinte")
    ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/86aadf2c-ede7-449c-857b-57c21802c2ab.jpg").then((value)=>{console.log(value)})
    console.log("photo allumée")
    ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/7068b9c8-ffea-4c8a-a1fa-fe74e79d0853.jpg").then((value)=>{console.log(value)})
    console.log("photo éteinte")
    ImageAnalyser.triple("file:///data/user/0/com.projet2/cache/Camera/f89e03f3-401d-4871-afc9-ec85121b9934.jpg").then((value)=>{console.log(value)})
*/
    console.log(this.props.photos)
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

const mapStateToProps = (state) => {
  return {
    photos : state.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Traduction)
