import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {
  componentDidMount() {
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
    // firebase.analytics();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        this.setState({
          uid: user.uid,

        })
        console.log(user.uid);

      } else {
        // User not logged in or has just logged out.
      }
    });
  }
  state = {
    email: '',
    password: '',
    uid: 0,
  }
  render() {
    return (
      <View>
        <Text>email</Text>
        <TextInput
          placeholder='email here'
          keyboardType="email-address"
          onChangeText={(value) => {
            this.setState({
              email: value,
            })

          }} />
        <Text>password</Text>
        <TextInput
          placeholder='password here'
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(value) => {
            this.setState({
              password: value,
            })

          }} />
        <TouchableOpacity style={{ height: 40, width: 100, backgroundColor: 'lightgray' }}
          onPress={() => {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
              .then(() => {
                ToastAndroid.show('successful', ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show('failed', ToastAndroid.SHORT);

              }).then(() => {
                var database = firebase.database();
                firebase.database().ref('users/' + this.state.uid).set({
                  username: 'fasal',
                  email: 'prime@gmail.com',
                  profile_picture: 'imageUrl'
                });
                return firebase.database().ref('/users/').child(this.state.uid).on('value',function(snapshot) {
                  var username = (snapshot.val() && snapshot.val().email) || 'Anonymous';
                  console.log(username);
                  // ...
                });

              })

            // console.log(firebase.auth().currentUser.uid);
          }}
        >
          <Text style={{ alignSelf: 'center' }}>sign in</Text>
        </TouchableOpacity>

      </View>
    );
  }

};

const styles = StyleSheet.create({

});
