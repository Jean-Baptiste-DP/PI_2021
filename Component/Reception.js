'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";


class Reception extends React.Component {
  constructor(props){
    super(props)
    this.prendrePhoto=false;
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
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this._boutonAppuie()} style={styles.capture}>
            <Icon name="play-circle-o" size={50} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _boutonAppuie(){
    if (this.prendrePhoto){
      this.prendrePhoto=false
      console.log('fin reception')
    }
    else {
      this.prendrePhoto=true
      console.log('début reception')
    }
  }
  tick(){
    if(this.prendrePhoto){
      console.log("essai Photo")
      this.takePicture()
    }
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.1, doNotSave:false, width:288};
      const data = await this.camera.takePictureAsync(options);
      console.log(JSON.stringify(data));
      this._addPhoto(data.uri);
  }}

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1800);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    photos : state.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

AppRegistry.registerComponent('App', () => Reception);
export default connect(mapStateToProps, mapDispatchToProps)(Reception)
