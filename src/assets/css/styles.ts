import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  // Flex
  flex1: { flex: 1 },
  w100: { width: '100%' },
  h100: { height: '100%' },
  // Flex
  // flex direction
  fdrjcsb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // flex direction
  // Font Sizes
  fs55: {
    fontSize: 55,
  },
  fs45: {
    fontSize: 45,
  },
  fs50: {
    fontSize: 50,
  },
  fs40: {
    fontSize: 40,
  },
  fs35: {
    fontSize: 35,
  },
  fs30: {
    fontSize: 30,
  },
  fs25: {
    fontSize: 25,
  },
  fs22: {
    fontSize: 22,
  },
  fs20: {
    fontSize: 20,
  },
  fs18: {
    fontSize: 18,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fs12: {
    fontSize: 12,
  },
  fs10: {
    fontSize: 10,
  },
  // Font Sizes
  // Font Families
  ffbl: {
    fontFamily: 'Roboto-Black',
  },
  ffbli: {
    fontFamily: 'Roboto-BlackItalic',
  },
  ffb: {
    fontFamily: 'Roboto-Bold',
  },
  ffbi: {
    fontFamily: 'Roboto-BoldItalic',
  },
  ffi: {
    fontFamily: 'Roboto-Italic',
  },
  ffl: {
    fontFamily: 'Roboto-Light',
  },
  ffli: {
    fontFamily: 'Roboto-LightItalic',
  },
  ffmi: {
    fontFamily: 'Roboto-MediumItalic',
  },
  ffr: {
    fontFamily: 'Roboto-Regular',
  },
  ffm: {
    fontFamily: 'Roboto-Medium',
  },
  ffmt: {
    fontFamily: 'Roboto-MediumThin',
  },
  ffmti: {
    fontFamily: 'Roboto-MediumThinItalic',
  },
  // Font Families
  // Colors

  colorWhite: {
    color: '#ffffff',
  },
  colorBlack: {
    color: '#31363b',
  },
  colorBlue:{
    color:'#0066b2'
  },
  // #2856A2
  colorgreen: {
    color: '#1fcc7c',
  },
  colorLightBlue:{
    color:'#0caae6'
  },
  colorlightgreen: {
    color: '#a0ffd3',
  },
  colorlightred: {
    color: '#ff9d98',
  },
  colorred: {
    color: '#f85951',
  },
  colorlightpurple: {
    color: '#7471eb',
  },
  colorpurple: {
    color: '#4733da',
  },
  colorgrey: {
    color: '#a3a3a3',
  },
  colorlightgrey: {
    color: '#fefefe',
  },
  colorlightblack: {
    color: '#191919',
  },
  colorextralightpurple: {
    color: '#e9e8fd',
  },
  colorLightWhite: {
    color: '#758692',
  },
  colororange: {
    color: '#faaf16',
  },
  colorgrey2: {
    color: '#7d7d7d',
  },
  // Colors
  // Background Colors
  bgColorYellow: {
    backgroundColor: '#FFF600',
  },
  bgColorRed: {
    backgroundColor: '#f85951',
  },
  bgColorWhite: {
    backgroundColor: '#ffffff',
  },
  bgcolorblack: {
    backgroundColor: '#000000',
  },
  bgLightBlue: {
    backgroundColor: '#0caae6',
  },
  bgColorBlue: {
    backgroundColor: '#0066b2',
    // #1d4779
  },
  bgColorGray: {
    backgroundColor: '#e4e9f5',
  },
  bgcolorlightgrey: {
    backgroundColor: '#fefefe',
  },
  bgcolorlightgrey2: {
    backgroundColor: '#f3f3f3',
  },
  bgcolorlightblack: {
    backgroundColor: '#191919',
  },
  bgcolororange: {
    backgroundColor: '#faaf16',
  },
  // Background Colors
  // line Height
  lh5: {
    lineHeight: 5,
  },
  lh10: {
    lineHeight: 10,
  },
  lh15: {
    lineHeight: 15,
  },
  lh20: {
    lineHeight: 20,
  },
  lh25: {
    lineHeight: 25,
  },
  lh30: {
    lineHeight: 30,
  },
  // line Height
  // border Radius
  br5: {
    borderRadius: 5,
  },
  br8: {
    borderRadius: 8,
  },
  br10: {
    borderRadius: 10,
  },
  br12: {
    borderRadius: 12,
  },
  br15: {
    borderRadius: 15,
  },
  br18: {
    borderRadius: 18,
  },
  br20: {
    borderRadius: 20,
  },
  br25: {
    borderRadius: 25,
  },
  br30: {
    borderRadius: 30,
  },

  br35: {
    borderRadius: 35,
  },
  br40: {
    borderRadius: 40,
  },
  br45: {
    borderRadius: 45,
  },
  br50: {
    borderRadius: 50,
  },
  br55: {
    borderRadius: 55,
  },
  br60: {
    borderRadius: 60,
  },
  // border Radius

  // Padding
  p5: { padding: 5 },
  p10: { padding: 10 },
  p15: { padding: 15 },
  p20: { padding: 20 },
  p25: { padding: 25 },
  p30: { padding: 30 },
  p35: { padding: 35 },
  p40: { padding: 40 },
  p45: { padding: 45 },
  // Padding
  // paddingRight
  pr5: { paddingRight: 5 },
  pr10: { paddingRight: 10 },
  pr15: { paddingRight: 15 },
  pr20: { paddingRight: 20 },
  pr25: { paddingRight: 25 },
  pr30: { paddingRight: 30 },
  pr35: { paddingRight: 35 },
  pr40: { paddingRight: 40 },
  pr45: { paddingRight: 45 },
  // paddingRight
  // paddingTop
  pt5: { paddingTop: 5 },
  pt10: { paddingTop: 10 },
  pt15: { paddingTop: 15 },
  pt20: { paddingTop: 20 },
  pt25: { paddingTop: 25 },
  pt30: { paddingTop: 30 },
  pt35: { paddingTop: 35 },
  pt40: { paddingTop: 40 },
  pt45: { paddingTop: 45 },
  // paddingTop
  // paddingBottom
  pb5: { paddingBottom: 5 },
  pb10: { paddingBottom: 10 },
  pb15: { paddingBottom: 15 },
  pb20: { paddingBottom: 20 },
  pb25: { paddingBottom: 25 },
  pb30: { paddingBottom: 30 },
  pb35: { paddingBottom: 35 },
  pb40: { paddingBottom: 40 },
  pb45: { paddingBottom: 45 },
  // paddingBottom
  // paddingLeft
  pl5: { paddingLeft: 5 },
  pl10: { paddingLeft: 10 },
  pl15: { paddingLeft: 15 },
  pl20: { paddingLeft: 20 },
  pl25: { paddingLeft: 25 },
  pl30: { paddingLeft: 30 },
  pl35: { paddingLeft: 35 },
  pl40: { paddingLeft: 40 },
  pl45: { paddingLeft: 45 },
  // paddingLeft
  // margin
  m10: { margin: 10 },
  m15: { margin: 15 },
  m20: { margin: 20 },
  m25: { margin: 25 },
  m30: { margin: 30 },
  m35: { margin: 35 },
  m40: { margin: 40 },
  m45: { margin: 45 },
  // margin
  // paddingRight
  mr5: { marginRight: 5 },
  mr10: { marginRight: 10 },
  mr15: { marginRight: 15 },
  mr20: { marginRight: 20 },
  mr25: { marginRight: 25 },
  mr30: { marginRight: 30 },
  mr35: { marginRight: 35 },
  mr40: { marginRight: 40 },
  mr45: { marginRight: 45 },
  // marginRight
  // marginTop
  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  mt15: { marginTop: 15 },
  mt20: { marginTop: 20 },
  mt25: { marginTop: 25 },
  mt30: { marginTop: 30 },
  mt35: { marginTop: 35 },
  mt40: { marginTop: 40 },
  mt45: { marginTop: 45 },
  // marginTop
  // marginBottom
  mb5: { marginBottom: 5 },
  mb10: { marginBottom: 10 },
  mb15: { marginBottom: 15 },
  mb20: { marginBottom: 20 },
  mb25: { marginBottom: 25 },
  mb30: { marginBottom: 30 },
  mb35: { marginBottom: 35 },
  mb40: { marginBottom: 40 },
  mb45: { marginBottom: 45 },
  // marginBottom
  // marginLeft
  ml5: { marginLeft: 5 },
  ml10: { marginLeft: 10 },
  ml15: { marginLeft: 15 },
  ml20: { marginLeft: 20 },
  ml25: { marginLeft: 25 },
  ml30: { marginLeft: 30 },
  ml35: { marginLeft: 35 },
  ml40: { marginLeft: 40 },
  ml45: { marginLeft: 45 },
  // marginLeft

  // Shadow of box
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.074,
    shadowRadius: 3.84,

    elevation: 4,
  },

  // shadow of box

  Container: {
    flex: 1,
    padding: 16,
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    flex:1
  },
  mapEmergency: {
    flex:1
  },
  cardview: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardtopheading: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "#444",
    textTransform:'uppercase'
  },
  cardtopnormal: {
      fontSize: 16,
      fontFamily: "Roboto-Medium",
      marginBottom: 10,
      color: "#444",
      width:Dimensions.get('screen').width-93
  },
  cardtopnormal2: {
      fontSize: 14,
      fontFamily: "Roboto-Regular",
      marginBottom: 10,
      color: "#444",
  },
  cardtopprice:{
      fontSize: 35,
      fontFamily: "Roboto-Bold",
      marginBottom: 10,
      color: "#444"
  },
  WelcomeContent: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  LoginContainer: {
    paddingHorizontal: 40,
  },
  LoginContent: {
    paddingTop: 20,
  },
  RegisterContent: {
    flex: 1,
    padding: 48,
  },
  VerifyContent: {
    flex: 1,
    padding: 48,
  },
  borderStyleBase: {
    width: 40,
    height: 65,
    backgroundColor: 'red',
  },
  borderStyleHighLighted: {
    borderColor: 'red',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: 'grey',
  },
  // Welcome screen CSS
  headingwelcome: {
    paddingVertical: 8,
  },
  descwelcome: {
    paddingVertical: 20,
    textAlign: 'center',
  },
  faqsdetailtxt3:{
    color: "#1a1a1a",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    // marginTop:10
  },
  // Welcome screen CSS
  // Help Screen CSS
  cardhelp: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shadow5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 40,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Help Screen CSS
  inputField: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#d8dfe4',
    borderWidth: 1,
    height: 60,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    overflow: 'hidden',
    borderRadius:5
  },
  inputFields: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#d8dfe4',
    borderWidth: 1,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  icon: {
    marginLeft: 12,
  },
  errorField: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Roboto-Regular',
  },
  inputFieldText: {
    width: '100%',
    fontSize: 20,
    marginLeft: 10,
    color: '#31363b',
    fontFamily: 'Roboto-Regular',
  },
  dropdown: {
    width: (Dimensions.get('screen').width - 130) / 2,
    borderWidth: 0,
    marginTop: -15,
    paddingLeft: 10,
  },
  Dropdown: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#31363b',
  },
  camerabtn: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  menuview: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menutxt: {
    color: '#7d7d7d',
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  uploadBox: {
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    height: 130,
  },
  customLargeText:{
    fontSize:20,
    fontFamily: 'Roboto-Bold',
    color:'#fff'
  },
  smallButton:{
    paddingHorizontal:10,
    paddingVertical:5,
    backgroundColor:'#3766B3',
    borderRadius:5
  },
  backgroundVideo: {
    width:Dimensions.get('screen').width-40,
    height:230
  },
  profileViewSP:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
},
mapsView: {
  ...StyleSheet.absoluteFillObject,
},
});

const colors = {
  primary: '#31363b',
};

export default styles;
