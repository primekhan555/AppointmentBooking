import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import firebase from'firebase';
export default class OptionsScreen extends Component{
    componentDidMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyASl8eIzspE9bnPxe8HlaMJdlA3xtz1IS8",
            authDomain: "appintmentbooking.firebaseapp.com",
            databaseURL: "https://appintmentbooking.firebaseio.com",
            projectId: "appintmentbooking",
            storageBucket: "appintmentbooking.appspot.com",
            messagingSenderId: "512449088784",
            appId: "1:512449088784:web:7f533ae4d40e1508bfa995",
            measurementId: "G-TY5RFBYT23"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          var user = firebase.auth().currentUser;

          if (user) {
            this.pro
          } else {
            // No user is signed in.
          }

    }
    render(){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
                onPress={()=>{
                    this.props.navigation.navigate('DoctorOptions')
                }}
                style={{
                    backgroundColor:'#ff6666', 
                    height:40,
                    width:120, 
                    justifyContent:'center',
                    borderRadius:5
                    }}>
                <Text style={{
                    color:'white', 
                    alignSelf:'center', 
                    fontWeight:'bold'}}>Doctor Account</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                    this.props.navigation.navigate('PatientOptions')
                }}
                style={{
                    backgroundColor:'#ff6666', 
                    height:40,
                    marginTop:20,
                    width:120, 
                    justifyContent:'center',
                    borderRadius:5
                    }}>
                <Text style={{
                    color:'white', 
                    alignSelf:'center', 
                    fontWeight:'bold'}}>Patient Account</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}