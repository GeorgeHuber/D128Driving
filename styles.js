import { StyleSheet,Dimensions } from 'react-native';




//a stylsheet to hold common styles which render onto the react components

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default StyleSheet.create({
  //day of night selector styling
  selector1: { marginHorizontal: 0.04*width, borderRadius: 7, backgroundColor:"rgba(190, 226, 250,1)",borderWidth:2 },
  selector2: { marginHorizontal: 0.04*width, borderRadius: 7,backgroundColor:"rgba(255,255,255,0.9)",borderWidth:2  },
  nightDayButton: { color: "black", margin: 0.0084*height, fontSize: 20 },
  //allow for easy font change
  uvFont: { fontFamily: "Noto-Regular"},//"Avenir-Book" },
  uvBoldFont: { fontFamily: "Noto-Bold" },//"Avenir-Black" },
  //Text boxes in Input hour page
  textBox: { borderRadius:3,margin:4,borderColor: "black", borderWidth: 2, paddingVertical:0.01*height,paddingHorizontal:0.05*width, width: .9*width, alignSelf: 'center',height:height*0.06 },
  buttonContainer:{ alignItems: "center",paddingHorizontal:0.053*width,paddingVertical:0.00615*height, backgroundColor: "rgba(255, 255, 255,0.6)",borderRadius: 10,borderWidth:2 },
  //blurb box on export page
  congrats:{alignItems:"center",marginVertical:.05*height,marginHorizontal:0.053*width,borderRadius:10,borderWidth:1,paddingVertical:0.0133*height, paddingHorizontal:0.0267*width,backgroundColor: "rgba(255,255,255,0.8)"},
  //Home page hour total styling
  hourTotalText:{textAlign:"right", fontSize:22,marginHorizontal:0.0267*width,borderTopWidth:1,borderBottomWidth:1},
  hourTotalLines1:{backgroundColor:"rgba(255,255,255,1)",borderWidth:1,marginBottom:height*0.02,borderRadius:2},
  hourTotalLines2:{backgroundColor:"rgba(255,255,255,1)",borderWidth:1,marginBottom:height*0.02,borderRadius:2},
  imageRow:{flexDirection:"row",width:width,justifyContent:"space-around"},
  imageInRow1:{width: .2*height, height: .2*height,marginTop:.062*height},
  imageInRow2:{width: .25*height, height: .25*height,marginTop:.062*height},
  welcomeContainer:{width:.9*width,marginTop: .062*height,marginBottom:.04*height, marginHorizontal:.04*height, borderRadius:5,
    paddingHorizontal: .04*width, paddingVertical: .02*height, borderWidth:2,backgroundColor: "rgba(255, 255, 255,1)"},
  homeHourTotalText:{marginTop: 0.061*height,fontSize:30,backgroundColor:"rgba(255,255,255,0.9)",paddingHorizontal:width*0.05,},
  
  addButton:{ alignSelf: "center",marginVertical:0.027*width, marginHorizontal: 0.053*width, paddingHorizontal: 0.053*width, borderWidth: 4, borderRadius: 10,backgroundColor:"rgba(255,255,255,0.9)" },
    //infoPage
  sectionTitle:{textAlign:"center",fontSize:30,marginVertical:0.0334*height,marginHorizontal:0.0267*width,color:'rgb(0,89,162)'},
  infoContainer:{paddingVertical:height*0.02, marginHorizontal:0.04*width,alignContent:"center",alignItems:"center",marginVertical:.05*height,backgroundColor:"rgba(255,255,255,0.8)",borderRadius:5},
  infoBodyText:{fontSize:20,marginBottom:0.025*height,textAlign:"left",color:"black",marginHorizontal:width*0.03},

  //login and sign in
  headerText:{ marginVertical: 0.025*height, fontSize: 30,color:"rgb(255,255,255)"},
  frontButtonText:{fontSize:20,marginVertical:0.005*height,textAlign:"center",textAlignVertical:"center",color:"rgb(255,255,255)"},
  smallFrontButton:{fontSize:16,marginVertical:0.01*height,color:"rgb(255,255,255)"},
  frontButtonContainer:{alignSelf:"center",borderColor:"rgb(255,255,255)",height:0.05*height,width:width*.6,borderRadius:20,borderWidth:2,marginBottom:0.01*height,marginTop:0.05*height},
  textInput:{paddingVertical:.0133*height,paddingHorizontal:.0267*width,width:.8*width,borderWidth:2},
  textInputV:{backgroundColor:"rgba(255,255,255,0.9)",marginBottom:.01*height},
  container:{flex:1,alignItems:"center"},
  loginImage:{ width: 0.4*height, height:0.4*height,marginTop:height*0.05,marginBottom:height*0.02 },
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -2,
    width:width,
    height:height,
    
    
   },
   inputBox:{height:height*.9,alignSelf:"center",paddingHorizontal:width*0.05,paddingVertical:height*0.02,flexDirection:'column',alignContent:'center',backgroundColor:"rgba(255,255,255,0.9)",width:width*0.95,borderRadius:5},
});
