import React from 'react'
import {View} from 'react-native'
import Navigation from "./Navigation/Navigation";
import {Provider} from "react-redux";
import Store from './Store/configureStore'
//import FlashMessage from "react-native-flash-message";


export default class App extends React.Component {
  render() {
    return (
      /*<View style={{ flex: 1 }}>

        <FlashMessage ref="myLocalFlashMessage" />   {/!* <--- here as last component always with `ref` *!/}
      </View>*/
    <Provider store={Store}>
      <Navigation/>
    </Provider>

    )
  }
}
