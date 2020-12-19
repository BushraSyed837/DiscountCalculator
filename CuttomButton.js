import * as React from 'react';
import { Text,TouchableOpacity , View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

export default class BTN extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0,
    }
  }
  btn=()=>{
   this.props.event();
  }
  render(props){
    return (
      <View>
        <View style={{width:"100%", alignSelf: "center"}}>
         <TouchableOpacity disabled={this.props.disable} style={{backgroundColor:this.props.color, width:this.props.width,padding:8}} onPress={this.btn}>
         <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:15 ,color:this.props.textcolor}} >{this.props.title}</Text>
         </TouchableOpacity>
        </View>          
      </View>
    );
  } 
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
