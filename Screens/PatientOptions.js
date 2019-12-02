import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class PatientOptions extends Component{
render(){
    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16,}}>Patient</Text>
            <TouchableOpacity 
            onPress={()=>{
                this.props.navigation.navigate('PatientSignIn')
            }}
            style={{
                backgroundColor:'#ff6666', 
                height:40,
                width:180, 
                justifyContent:'center',
                borderRadius:5
                }}>
            <Text style={{
                color:'white', 
                alignSelf:'center', 
                fontWeight:'bold'}}>Already have an Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
                this.props.navigation.navigate('PatientRegister')
            }}
            style={{
                backgroundColor:'#ff6666', 
                height:40,
                marginTop:20,
                width:180, 
                justifyContent:'center',
                borderRadius:5
                }}>
            <Text style={{
                color:'white', 
                alignSelf:'center', 
                fontWeight:'bold'}}>Create new Account</Text>
            </TouchableOpacity>
            
        </View>
    )
}
}