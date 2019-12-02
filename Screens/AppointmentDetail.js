import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';

export default class AppointmentDetail extends Component {
    state = {
        patientuid: '',
        patientName: '',
        appointmentDate: '',
        appointmentStatus: ''
    }
    componentDidMount() {
        var patientuid = this.props.navigation.getParam('patientuid', '')
        var patientName = this.props.navigation.getParam('patientName', '')
        var appointmentStatus = this.props.navigation.getParam('AppointmentStatus', '')
        var appointmentDate = this.props.navigation.getParam('AppointmentDate', '')
        this.setState({
            patientuid: patientuid,
            patientName: patientName,
            appointmentDate: appointmentDate,
            appointmentStatus: appointmentStatus,
        })


    }
    render() {
        return (
            <View>
                <Text>
                    AppointmentDetail
                </Text>
                <Text style={{fontWeight:'bold', }}>Patient Name</Text>
                <Text style={{marginLeft:40}}>{this.state.patientName != ''? this.state.patientName:''}</Text>
                <Text style={{fontWeight:'bold', }}>Appointment Date</Text>

                <Text>{this.state.appointmentDate != ''? this.state.appointmentDate:''}</Text>
                <Text style={{fontWeight:'bold', }}>Appointment Status</Text>

                <Text>{this.state.appointmentStatus != ''? this.state.appointmentStatus:''}</Text>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={{
                            marginStart: 50,
                            backgroundColor: 'lightgreen',
                            width: 80,
                            height: 30,
                            justifyContent: 'center',
                            borderRadius: 3
                        }}
                        onPress={() => {
                            var patientuid = this.state.patientuid;
                            var ref = firebase.database().ref();
                            var user = firebase.auth().currentUser;
                            var uid;
                            if (user != null) {
                                uid = user.uid;
                            }
                            ref.child('users').child('Appointments').child(uid).child(patientuid).update({ 'status': 'confirmed' })
                                .then(() => {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                            NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                    // this.props.navigation.navigate('DoctorHome');
                                })
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}>confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginStart: 50,
                            backgroundColor: '#c91010',
                            justifyContent: 'center',
                            height: 30,
                            width: 80,
                            borderRadius: 3
                        }}
                        onPress={() => {
                            var patientuid = this.state.patientuid;
                            var ref = firebase.database().ref();
                            var user = firebase.auth().currentUser;
                            var uid;
                            if (user != null) {
                                uid = user.uid;
                            }
                            ref.child('users').child('Appointments').child(uid).child(patientuid).update({ 'status': 'canceled' })
                                .then(() => {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                            NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                    // this.props.navigation.navigate('DoctorHome');
                                })
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}