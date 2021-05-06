import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class AuthScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            pass:'',

        }
    }

    login=async(email,pass)=>{
        if(email && pass){
             try{
        const data = await  firebase.auth().signInWithEmailAndPassword(email,pass).then((Response)=>{
            return console.log("Logged in");//Alert.alert( "logged in", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        });
                
          if(data){
             //this.props.navigation.navigate('Transaction');
          } 
       }catch(error){
         if(error.code=='auth/user-not-found'){
          console.log("User does'nt exist");//Alert.alert( "use doesnt exist", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
         else if(error.code=='auth/invalid-email'){
  
          console.log("emailID invalid");//Alert.alert( "email id invalid", "eamilid envalid", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
         }
       }
     }
     else{
       console.log("Please enter your email id and password");//Alert.alert( "Please enter your email id and password", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
     }
  }

    signup=async(email,pass)=>{
        try{  
            firebase.auth().createUserWithEmailAndPassword(email,pass).then((response)=>{
            return console.log("User added succedfully"); //Alert.alert("user created succesfully", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
        })
    }
      catch(error){
          return console.log(error.message+","+error.code);//Alert.alert( error.message+","+error.code, "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
      }

    }
    render(){
        return(
            <View>
              <Text style={{marginBottom:100}}>see the console to see the status</Text>

              <TextInput
          //style={styles.inputBox}
           placeholder="email ID"
           keyboardType="email-address"
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

           <TextInput
           style={{marginTop:5}}
           placeholder="password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>

        <TouchableOpacity
          style={{marginTop:10,backgroundColor:'green',alignItems:'center',width:100,alignSelf:'center',borderRadius:20,height:20}}
          onPress={()=>{
           this.login(this.state.emailid,this.state.pass)
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
                
        <TouchableOpacity
         style={{marginTop:10,backgroundColor:'green',alignItems:'center',width:100,alignSelf:'center',borderRadius:20,height:20}}
         onPress={()=>{
            this.signup(this.state.emailid,this.state.pass)
           }}>        
            <Text>SignUp</Text>
        </TouchableOpacity>
            </View>
        )
    }
}