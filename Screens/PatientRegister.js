import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';
import firebase from 'firebase'
export default class DoctorRegister extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        uid: 0,
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <View style={{
                paddingLeft: 20,
                paddingEnd: 20,
                paddingTop: 20
            }}>
                <Text>Patient Name</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Name here'
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            name: value
                        })
                    }} />
                <Text>Email</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Email here'
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            email: value
                        })
                    }} />
                <Text>password</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Password here'
                    secureTextEntry={true}
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            password: value
                        })
                    }} />
                <Text>Confirm password</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Confirm password here'
                    secureTextEntry={true}
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            confirmPassword: value
                        })
                    }} />

                <TouchableOpacity
                    onPress={() => {
                        if (this.state.name == '') {
                            return;
                        }
                        if (this.state.email == '') {
                            return;
                        }
                        if (this.state.password == '') {
                            return;
                        }
                        if (this.state.confirmPassword == '') {
                            return;
                        }
                        if (this.state.password == this.state.confirmPassword) {
                            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                                .then(() => {
                                    var curr = firebase.auth().currentUser.uid;
                                    console.log(curr)

                                    firebase.database().ref('users').child('Patients').child(curr).set({
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password,
                                    })
                                })
                                .then(()=>{
                                    AsyncStorage.setItem('patientName', this.state.name,()=>{
                                        AsyncStorage.setItem('patientemail',this.state.email,()=>{
                                            this.props.navigation.navigate('PatientHome')
                                        })
                                    })
                                })
                                .catch(function (error) {
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                })
                        }

                    }}
                    style={{
                        backgroundColor: '#ff6666',
                        width: 150,
                        height: 40,
                        justifyContent: "center",
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 10,
                        borderRadius: 5
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Submit</Text>
                </TouchableOpacity>

            </View>
        )
    }
}