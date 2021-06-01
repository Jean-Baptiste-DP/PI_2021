'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";


class Reception extends React.Component {
  constructor(props){
    super(props)
    //this.state= {prendrePhoto:false};
  }
  _addPhoto(uri){
    const action={type:'ADD_PHOTO', value:uri}
    this.props.dispatch(action)
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          autoFocus={RNCamera.Constants.AutoFocus.off}
          exposure={0}
          pictureSize={"320x240"}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this._boutonAppuie()} style={styles.capture}>
            <Icon name={this._bouton()} size={50} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _bouton(){
    if (this.props.receptionner){
      return "stop-circle-o"
    }
    else{
      return "play-circle-o"
    }
  }
  _boutonAppuie(){
    const action={type:'APPUI_RECEPTION'}
    this.props.dispatch(action)
  }
  tick(){
    if(this.props.receptionner){
      console.log("essai Photo")
      this.takePicture()
    }
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0, doNotSave:false, width:320,skipProcessing: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(JSON.stringify(data));
      this._addPhoto(data.uri);
  }}

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 800);
    this._unsubscribe = this.props.navigation.addListener('tabPress', e => {
      if (this.props.emettre){e.preventDefault();}
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this._unsubscribe();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

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

AppRegistry.registerComponent('App', () => Reception);
export default connect(mapStateToProps, mapDispatchToProps)(Reception)
