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
import firebase from 'firebase';
export default class NewAppointment extends Component {
    state = {
        docName: '',
        specilization: '',
        arr: [],
        loading:true
    }
    componentDidMount() {
        // AsyncStorage.getItem('docName', (err, result) => {
        //     if (result != null) {
        //         this.setState({
        //             docName: result,
        //         })
        //         // console.log(result)
        //     }
        // })
        //     .then(() => {
        //         AsyncStorage.getItem('specilization', (err, result) => {
        //             if (result != null) {
        //                 this.setState({
        //                     specilization: result
        //                 })
        //                 // console.log(result)
        //             }
        //         })
        //     })
        //     .then(() => {
        var docname = JSON.stringify(this.props.navigation.getParam('docName', 'nothing'))
        var docspecilization = JSON.stringify(this.props.navigation.getParam('specilization', 'nothing'))
        docname = docname.replace(/['"]+/g, '')
        var ref = firebase.database().ref();
        var newarr = [];
        ref.child('users').child('Doctors').on('value', function (datasnapshot) {
            var value = datasnapshot.val();
            var key = Object.keys(value);
            for (let i = 0; i < key.length; i++) {
                var k = key[i];
                var name = value[k].name;
                var specilization = value[k].specilization;
                if (docname == name) {
                    var obj = {};
                    obj["name"] = name;
                    obj["special"] = specilization;
                    obj["uid"] = k
                    newarr.push(obj);
                }   
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
                    backgroundColor: 'whiteS',
                    flexDirection: 'row',
                    width: '97%',
                    marginTop: 10,
                    borderColor: 'lightgray',
                    borderRadius:4,
                    justifyContent:'center',
                    borderWidth: 1,
                    marginLeft: 5,
                    marginEnd: 1
                }}>
                    <View style={{ marginLeft: 30, marginBottom: 30, flex: 8, marginTop: 15 }}>
                        <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.name}</Text>
                    </View>
                    <View style={[styles.generalStyle]}>
                        <Text style={[styles.generalText,]}>{i.special}</Text>
                    </View>
                    <View style={{
                        flex: 11,
                        marginEnd: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.setItem('docname', i.name, () => {
                                    AsyncStorage.setItem('special', i.special, () => {
                                        AsyncStorage.setItem('uid', i.uid, () => {
                                            this.props.navigation.navigate('BookingScreen')
                                        })
                                    })
                                })
                            }}
                            style={{
                                marginLeft: 65,
                                marginTop: 10,
                                marginEnd: 50,
                                backgroundColor: '#ff6666',
                                height: 30,
                                width: 70,
                                marginEnd: 10,
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
    }
    _stop = () => {
        setTimeout(() => {
            this.setState({
                loading:false
            })

        }, 3000);
    }
    render() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View>
                    {
                        this._renderArr()
                    }
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    generalStyle: {
        marginLeft: 10,
        marginTop: 15,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})