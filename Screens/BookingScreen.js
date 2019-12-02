import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import firebase from 'firebase'
import DatePicker from 'react-native-datepicker';
export default class BookingScreen extends Component {
    state = {
        docname: '',
        special: '',
        duid: '',
        date: '',
        patientname: '',
        patientemail: '',
    }
    componentDidMount() {
        AsyncStorage.getItem('docname', (err, result) => {
            if (result != null) {
                this.setState({
                    docname: result
                })
            }
        })
            .then(() => {
                AsyncStorage.getItem('special', (err, result) => {
                    if (result != null) {
                        this.setState({
                            special: result
                        })
                    }
                })
            })
            .then(() => {
                AsyncStorage.getItem('uid', (err, result) => {
                    if (result != null) {
                        this.setState({
                            duid: result
                        })
                    }
                })
            })
    }
    render() {
        return (
            <View>
                <View style={{ margin: 10, alignSelf: 'center', marginTop: 30, }}>
                    <DatePicker
                        style={{ width: 275 }}
                        mode="date"
                        date={this.state.date}
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1980-01-01"
                        maxDate="2025-01-01"
                        showIcon={false}
                        customStyles={{
                            dateIcon: {
                                position: 'relative',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 10
                            }
                        }}
                        onDateChange={(newDate) => {

                            this.setState({
                                date: newDate,
                            })
                        }} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        var user = firebase.auth().currentUser;
                        var uid;
                        if (user != null) {
                            uid = user.uid;
                        }
                        var username, userEmail, date, docuid, doctorName;
                        date = this.state.date;
                        docuid = this.state.duid;
                        doctorName = this.state.docname
                        var ref = firebase.database().ref().child('users').child('Patients').child(uid);
                        ref.once('value').then(function (snapshot) {
                            username = snapshot.val().name;
                            userEmail = snapshot.val().email;
                            firebase.database().ref('users').child('Appointments').child(docuid).child(uid).set({
                                docName: doctorName,
                                patientName: username,
                                patientEmail: userEmail,
                                date: date,
                                status: 'pending'
                            })

                        })

                    }}
                    style={{
                        height: 40,
                        width: 120,
                        backgroundColor: '#ff6666',
                        alignSelf: 'center',
                        borderRadius: 5,
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}