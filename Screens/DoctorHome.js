import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import firebase from 'firebase'
export default class DoctorHome extends Component {
    state = {
        loading: true,
        arr: [],
    }
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
        return { headerRight };
    }
    _logout() {
        firebase.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('DoctorOptions');
            }).catch((error) => {
                console.log('internal error occured')
            });
    }
    componentDidMount() {
        this.props.navigation.setParams({ signOut: this._logout.bind(this) });
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var newarr = [];
        var ref = firebase.database().ref();
        ref.child('users').child('Appointments').child(uid).on('value', (datasnapshot) => {
            var value = datasnapshot.val();
            var key = Object.keys(value);
            console.log(key)
            for (let i = 0; i < key.length; i++) {
                var k = key[i];
                console.log("this" + k)
                var obj = {};
                ref.child('users').child('Appointments').child(uid).child(k).on('value', (datasnapshot1) => {
                    console.log(datasnapshot1.val().patientName)
                    console.log(datasnapshot1.val().status)
                    obj["patientName"] = datasnapshot1.val().patientName;
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
                <View key={i}
                    style={{
                        flexDirection: 'column',
                        borderColor: 'lightgray',
                        borderWidth: 1,
                        width: '97%',
                        marginTop: 10,
                        marginLeft: 5,
                        borderRadius: 4,
                        marginEnd: 1,
                        backgroundColor: 'white',
                        paddingBottom: 20
                    }}>
                    <View style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                    }}>
                        <View style={{ marginLeft: 30, marginBottom: 30, flex: 8, marginTop: 20 }}>
                            <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.patientName}</Text>
                        </View>
                        <View style={[styles.generalStyle]}>
                            <Text style={[styles.generalText,]}>{i.AppointmentDate}</Text>
                        </View>
                        <View style={{ marginLeft: 20, marginBottom: 30, flex: 8, marginTop: 20, paddingRight: 10 }}>
                            <Text style={{ 
                                color: '#434547', 
                                fontWeight: 'bold', 
                                fontSize: 15 }}>{i.AppointmentStatus}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf:'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                marginStart: 50,
                                backgroundColor: 'lightgreen',
                                width: 80,
                                height: 30,
                                justifyContent: 'center',
                                borderRadius: 3,
                                alignSelf:'center'
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('AppointmentDetail',{
                                    patientuid:i.uid,
                                    AppointmentDate:i.AppointmentDate,
                                    AppointmentStatus:i.AppointmentStatus,
                                    patientName:i.patientName,
                                })
                             
                            }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}>Detail</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            );
        });
    }
    _stop = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 4000);
    }
    render() {
        return (
            <View>
                <View>
                    {this.state.loading ? <ActivityIndicator /> : this._renderArr()}
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    generalStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})