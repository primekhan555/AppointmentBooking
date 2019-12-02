import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import firebase from 'firebase'
export default class PatientHome extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity
                onPress={() => {
                    params.signOut()

                }}
                style={{
                    backgroundColor: '#ff6666',
                    height: 30,
                    width: 50,
                    justifyContent: 'center',
                    borderRadius: 3,
                    marginRight: 10
                }}><Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }}>logout</Text></TouchableOpacity>
        );
        return {headerRight};
    }
    state = {
        docName: '',
        specilization: '',
        arr: [],
        loading: true,
    }
    _logout() {
        firebase.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('PatientOptions');
            }).catch((error) => {
                console.log('internal error occured')
            });
    }
    componentDidMount() {
        this.props.navigation.setParams({ signOut: this._logout.bind(this) })
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var newarr = [];
        var ref = firebase.database().ref();
        ref.child('users').child('Appointments').on('value', (datasnapshot) => {
            var value = datasnapshot.val();
            var key = Object.keys(value);
            // console.log(key)
                for (let i = 0; i < key.length; i++) {
                    var k = key[i];
                    var obj = {};
                    // ref.child('users').child('Doctors').child(k).on('value', (datasnapshot2) => {
                    //     console.log(datasnapshot2.val().name)
                    //     obj["doctorName"] = datasnapshot2.val().name;
                    // })
                    ref.child('users').child('Appointments').child(k).child(uid).on('value', (datasnapshot1) => {
                        console.log(datasnapshot1.val().patientName)
                        console.log(datasnapshot1.val().status)
                        // var obj = {};
                        obj["patientName"] = datasnapshot1.val().patientName;
                        obj["docName"] = datasnapshot1.val().docName;
                        obj["AppointmentStatus"] = datasnapshot1.val().status;
                        obj["AppointmentDate"] = datasnapshot1.val().date;
                        obj["uid"] = k
                        newarr.push(obj);
                        console.log(obj)
                    })
                }

        })
        console.log(newarr)
        this.setState({
            arr: newarr
        })
        this._renderArr();
        this._stop();
    }

    _renderArr = () => {
        return this.state.arr.map(i => {
            return (
                <View key={i} style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: '97%',
                    marginTop: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    marginLeft: 5,
                    borderRadius:4,
                    marginEnd: 1
                }}>
                    <View style={{ marginLeft: 30, marginBottom: 30, flex: 8, marginTop: 20 }}>
                        <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.docName}</Text>
                    </View>
                    <View style={[styles.generalStyle]}>
                        <Text style={[styles.generalText,]}>{i.AppointmentDate}</Text>
                    </View>
                    {/* <View style={{
                        flex: 11,
                        marginEnd: 10
                    }}>
                        
                    </View> */}
                    <View style={{ marginLeft: 20, marginBottom: 30, flex: 8, marginTop: 20, paddingRight:10 }}>
                        <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.AppointmentStatus}</Text>
                    </View>
                </View>
            );
        });
    }
    _stop = () => {
        setTimeout(() => {
            // if (this.state.arr != null) {
            this.setState({

                loading: false
            })
            // }
        }, 4000);
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='doctor name'
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            docName: value
                        })
                    }} />
                <TextInput
                    placeholder='specilization'
                    underlineColorAndroid='black'
                    onChangeText={(value) => {
                        this.setState({
                            specilization: value
                        })
                    }} />
                <TouchableOpacity style={{
                    backgroundColor: '#ff6666',
                    height: 40,
                    width: 150,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
                    onPress={() => {
                        // AsyncStorage.setItem('docName', this.state.docName, ()=>{
                        //     AsyncStorage.setItem('specilization',this.state.specilization,()=>{
                        this.props.navigation.navigate('NewAppointment', {
                            docName: this.state.docName,
                            specilization: this.state.specilization,
                        })
                        // })
                        // })
                    }}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Book Appointment </Text>
                </TouchableOpacity>
 
                <Text style={{fontWeight:'bold', alignSelf:'center'}}>Booked Appointments</Text>
                <View>
                    {this.state.loading ? <ActivityIndicator /> : this._renderArr()}
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    generalStyle: {
        marginLeft: 10,
        marginRight:10,
        marginTop: 20,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})