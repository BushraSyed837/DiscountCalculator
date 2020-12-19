import * as React from 'react';
import { View, Text, Button,Alert,StyleSheet,TextInput,TouchableOpacity,ScrollView,Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BTN from "./components/CustomButton"

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state={  
      list:[] ,  
     check:true
    }
    {this.setState({list:(this.state.list=this.props.route.params)})}
  }
   removeListItems=(ikey)=>{
  const features=this.state.list.slice(0, ikey).concat(this.state.list.slice(ikey + 1,     this.state.list.length));
    this.setState({list:(this.state.list=features)})
    this.props.route.params=this.state.list
}
scrollView=()=>{
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight:10, marginTop:6 }}>
          <Ionicons
            name="trash"
            size={21}
            color="red"
            onPress={() =>{
              this.setState({list:(this.state.list=[])})
              }}/>
            
        </View>
      ),
    });
    return(
      <ScrollView>
      
              <View style={styles.adjustModal}>
              <Text style={{alignSelf:"center", color:"white",fontSize:14, fontFamily:"Times New Roman"}}>Original Price  -  Discount  =  Final Price</Text>
              </View>
            <View>
            {this.state.list.map((item, key) =>{return <TouchableOpacity style={styles.adjustModal} key={key}  onPress={() => {this.updateListItems(key)}}>{item}
            <TouchableOpacity
            style={styles.button}    
            onPress={() => {this.removeListItems(key)}}
            >
            <Text style={{alignSelf:"center"}}> X </Text>        
            </TouchableOpacity></TouchableOpacity>})}
            </View>                          
           </ScrollView>
    );

  }
  emptyView=()=>{
    return(
      <View>
          <Text style={{alignSelf:"center", marginTop:12, color:"red", fontStyle:"italic"}}>
            History Not Available
          </Text>
       </View>
    );
  }
  render(){
    
    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{marginLeft:8}}>
          <Ionicons
          name="arrow-back"
          size={25}
          color="red"
          onPress={() => {
            this.props.navigation.navigate('Discount Calculator',{list:this.state.list})
          }}
          />
        </View>
      ),
    });
    return(
      <View style={{ backgroundColor: '#3A4655', flex: 1 }}>
       <View>
       {(this.state.list.length<=0)?this.emptyView():this.scrollView()}
       </View>
      </View>
    )
  }
}
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalPrice: 0,
      save: 0,
      discount: 0,
      msg:"",
      price: 0,
      list : [],
      disable:true,
      recheck:false,
    };
  }
  updateList = (item) => {
    if(this.props.route.params!=undefined||this.props.route.params==[]){
      {this.setState({list:(this.state.list=this.props.route.params.list)})}
      this.setState({list:(this.state.list.concat(""+this.state.price+"..........-.......... "+(this.state.discount)+"%........=........... "+this.state.finalPrice))})
    this.setState({text:this.state.text=""})
    this.setState({textinp:this.state.textinp=""})
    this.setState({disable:(this.state.disable=true)})
    }else{
    this.setState({list:(this.state.list.concat(""+this.state.price+"..........-.......... "+(this.state.discount)+"%........=........... "+this.state.finalPrice))})
    this.setState({text:this.state.text=""})
    this.setState({textinp:this.state.textinp=""})
    this.setState({disable:(this.state.disable=true)})
    }
  }
  calculateDiscount(){
    const dis=(this.state.discount / 100)
    const fp= (this.state.price-(dis*this.state.price)).toFixed(2)
    this.setState({ finalPrice:this.state.finalPrice=fp })
    const saved = (dis*this.state.price).toFixed(2)
    this.setState({ save: this.state.save = saved  })
  }
  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight:10, marginTop:6 }}>
          <FontAwesome
            name="history"
            size={23}
            color="red"
            onPress={() =>{
            this.props.navigation.navigate('History',this.state.list)}}/>
            
        </View>
      ),
    });
    return (
      <View style={{ backgroundColor: '#3A4655', flex: 1 }}>
          <View style={styles.heading}>
            <Text style={{ fontStyle:"italic",color: "red", fontSize: 20, borderBottomWidth:2,borderBottomColor:"grey", textAlign: "center" }}>Calculate Discount Here!</Text>
          </View>
          <View style={{alignSelf:"center", marginBottom:"10%",}}>
          <Text style={{ fontStyle:"bold",color: "red", fontSize: 13, borderBottomWidth:1,borderBottomColor:"red", textAlign: "center" }}>
            {this.state.msg}
          </Text>
          </View>
          <View style={{ backgroundColor:"grey",borderWidth: 3, marginLeft: "8%", marginRight: "8%", borderColor: '#fff', }}>
            <View style={styles.text}>
              <Text style={{ color: '#fff', fontSize: 17, marginBottom: "3%",marginLeft: "3%" }}>You Pay: {"   "+this.state.finalPrice}</Text>
              <Text style={{ color: '#fff', fontSize: 17, marginBottom: "3%",marginLeft: "3%"}}>You Save: {" "+this.state.save}</Text>
            </View>
            <View>
            </View>
          </View>
          <View>
            <TextInput 
              style={styles.textInput}
              placeholder="original price" onChangeText={(value)=>{
              if (value >0) {
                  this.setState({ textinp: (this.state.textinp = value) })
                  this.setState({ price: (this.state.price = this.state.textinp) })
                  this.setState({ finalPrice: this.state.finalPrice = 0})
                  this.setState({ save: this.state.save = 0})
                  this.setState({ disable: this.state.disable = false})
                  {(this.state.price&&this.state.discount>0)?this.calculateDiscount():console.log("error")}
                }
                else {
                  this.setState({ price: (this.state.price = 0) })
                  this.setState({ msg: (this.state.msg = "Invalid Input") })                  
                }
              }}
             placeholderTextColor="grey"
             value={this.state.price==0?'':(this.state.textinp)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="discount price"
              onChangeText={(value) => {
                if (value>0&&value <= 100) {
                  this.setState({ text: (this.state.text = value) })
                  this.setState({ discount: (this.state.discount = this.state.text) })
                  this.setState({ finalPrice: this.state.finalPrice = 0})
                  this.setState({ save: this.state.save = 0})
                  this.setState({ disable: this.state.disable = false})
                  {(this.state.price&&this.state.discount>0)?this.calculateDiscount():console.log("error")}
                }
                else {
                  this.setState({ discount: (this.state.discount = 0) })
                  this.setState({ msg: (this.state.msg = "Invalid Input") })
                }
              }}
              placeholderTextColor="grey"
              value={this.state.discount==0?'':(this.state.text)}
            />
          </View>
          <View style={styles.btn}>
            <View >
            <BTN color={"grey"} disable={this.state.disable} title={'  Save  '} textcolor={"white"} event={this.updateList.bind(this)}/>
            </View>
          </View>
        </View>
    );
  }
}
const Stack = createStackNavigator();

class App extends React.Component{
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"#3A4655",
         headerStyle:{
           backgroundColor:"light-grey",
           borderWidth:2,
          borderColor:"#3A4655",
         },
      }}
      >
        <Stack.Screen name="Discount Calculator" component={MainScreen} />
        <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: '33%',
    marginLeft: '29%',
    marginRight: '15%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  text: {
    borderColor: '#fff',
    borderWidth: 0,
    marginTop: '3%',
    marginBottom: '3%',
  },
  centeredView: {
    height: "50%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    margin: "25%",
    color: "black",
    backgroundColor: "white"

  },
  textInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    marginTop: '3%',
    flexDirection: 'row',
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "space-between",
    color:"white"
  },
  calcBody: {
    margin: 'auto',
    minHeight: '400px',
  },
  calcButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  heading: {
    fontSize: 2,
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '9%',
    fontfamily:"Times New Roman",
    margin: '15%',
    
  },
  adjustModal: {
    flexDirection:"column",
    justifyContent:"center",
    backgroundColor:"grey",
    marginLeft:"6%",
    textAlign:"center",

    fontSize:14,
    color:"white",    
    borderRadius:12,
    width:"90%",
    margin:6,
    padding:3,
  },
  button: {
    backgroundColor: "red",
    marginLeft: '90%',
    color:"grey",
    borderWidth:1.5,
    borderRadius:10,
    borderColor:"grey,"
  },
});


            // <Icon name="history" size="100" color="red" 
            // onPress={() => {console.log("ji"),this.props.navigation.navigate('History')}}>
            // </Icon>

