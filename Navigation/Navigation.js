import 'react-native-gesture-handler'
import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from "react-native-vector-icons/Entypo";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Emission from "../Component/Emission";
import Reception from "../Component/Reception";
import Traduction from "../Component/Traduction";
import AffichageImage from "../Component/AffichageImage";
import {connect} from "react-redux";

const Tab=createBottomTabNavigator();

class OptionTabNavigator extends React.Component{
  constructor(props){
    super(props)
  }
  _bgEmission(){
    if (this.props.receptionner || this.props.emettre){
      return {
        activeTintColor: '#065FA4',
        inactiveTintColor: '#9c9c9c',
        activeBackgroundColor: '#FFAD3F', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#d5d5d5', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false
      }
    }
    else{
      return {
        activeTintColor: '#065FA4',
        inactiveTintColor: '#64A0CF',
        activeBackgroundColor: '#FFAD3F', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#ffd9a6', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false
      }
    }
  }

  _icons(component){
    if ((this.props.receptionner && component !=  'Reception') || (this.props.emettre && component != 'Emission')){
      return {
        tabBarIcon: ({ color, size }) => (
        <Entypo name="lock" color={color} size={size+10} />
      )
      }
    }
    else if (component=='Emission'){
      return {
        tabBarIcon: ({ color, size }) => (
          <Entypo name="flashlight" color={color} size={size+10} />
        )
      }
    }
    else if (component=='Reception'){
      return {
        tabBarIcon: ({ color, size }) => (
          <Entypo name="camera" color={color} size={size+10} />
        )
      }
    }
    else {
      return {
        tabBarIcon: ({ color, size }) => (
          <Entypo name="language" color={color} size={size+10} />
        )
      }
    }
  }
  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator
          swipeEnabled={true}
          tabBarOptions={this._bgEmission()}
        >
          <Tab.Screen
            name="Emission"
            component={Emission}
            options={{
              tabBarLabel: 'Émission' },
            this._icons('Emission')}

          />

          <Tab.Screen
            name="Reception"
            component={Reception}
            options={{
              tabBarLabel: 'Reception' },
              this._icons('Reception')}

          />

          <Tab.Screen
            name="Traduction"
            component={Traduction}
            options={{
              tabBarLabel: 'Traduction' },
              this._icons('Traduction')}

          />

        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emettre : state.emettre,
    receptionner : state.receptionner
  }
}

export default connect(mapStateToProps)(OptionTabNavigator)
