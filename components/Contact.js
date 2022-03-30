import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
  Image,
  Alert,
  // TextInput,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {WebView} from 'react-native-webview';
import email from 'react-native-email';
import {TextInput, Button} from 'react-native-paper';
import Mailer from 'react-native-mail';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      name: 'NaN',
      description: '',
    };
  }

  async componentDidMount() {
    try {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      this.setState({
        name: sName + ' ' + sNameLast,
      });
      // console.log('name : ', this.state.name);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }
  }

  handleEmail = () => {
    if (this.state.description !== '') {
      const to = ['Library.helpdesk@bitsom.edu.in']; // string or array of email addresses
      // const to = ['theartistnw@gmail.com']; // string or array of email addresses
      email(to, {
        // Optional additional arguments
        // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
        // bcc: 'mee@mee.com', // string or array of email addresses
        subject: 'BITSoM Application Contact Enquiry',
        body: this.state.description,
      })
        .then(result => {
          console.log('result :- ', result);
          if (result === true) {
            console.log('rsult true');
            this.setState({
              description: 'Thank you'
            });
            // setTimeout(() => {
            //   this.setState({
            //     description: ''
            //   });
            // }, 9000);
          } else {
            const lnk = Linking.openURL(
              `mailto:Library.helpdesk@bitsom.edu.in?subject=BITSoM Applicatin Contact Enquiry&body=${this.state.description}`,
            );
            const url = lnk;
            Linking.canOpenURL(url).then(supported => {
              console.log('supported :- ', supported);
              if (supported) {
                return Linking.openURL(url);
              }
            });
          }
          // result.json().then((resp)=>{
          //   console.log("resp :- ",resp)
          // })
        })
        .catch(error => {
          const lnk = Linking.openURL(
            `mailto:Library.helpdesk@bitsom.edu.in?subject=BITSoM Applicatin Contact Enquiry&body=${this.state.description}`,
          );
          const url = lnk;
          Linking.canOpenURL(url).then(supported => {
            console.log('supported :- ', supported);
            if (supported) {
              return Linking.openURL(url);
            }
          });
        });

      // Mailer.mail({
      //   subject: 'BITSoM Applicatin Contact Enquiry',
      //   // recipients: ['Library.helpdesk@bitsom.edu.in'],
      //   recipients: ['theartistnw@gmail.com'],
      //   // ccRecipients: ['supportCC@example.com'],
      //   // bccRecipients: ['supportBCC@example.com'],
      //   body: this.state.description,
      //   // customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      //   isHTML: true,
      //   // attachments: [{
      //   //   // Specify either `path` or `uri` to indicate where to find the file data.
      //   //   // The API used to create or locate the file will usually indicate which it returns.
      //   //   // An absolute path will look like: /cacheDir/photos/some image.jpg
      //   //   // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
      //   //   path: '', // The absolute path of the file from which to read data.
      //   //   uri: '', // The uri of the file from which to read the data.
      //   //   // Specify either `type` or `mimeType` to indicate the type of data.
      //   //   type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      //   //   mimeType: '', // - use only if you want to use custom type
      //   //   name: '', // Optional: Custom filename for attachment
      //   // }]
      // }, (error, event) => {
      //   if (error !== undefined && error !== null) {
      //     const lnk = Linking.openURL(`mailto:Library.helpdesk@bitsom.edu.in?subject=BITSoM Applicatin Contact Enquiry&body=${this.state.description}`)
      //     const url = lnk;
      //     Linking.canOpenURL(url).then(supported => {
      //       console.log("supported :- ",supported)
      //       if (supported) {
      //         return Linking.openURL(url);
      //       }
      //     });
      //   }
      // });
    } else {
      Alert.alert('Alert!', 'Please Fill The Field Below.', [{text: 'Okay'}], {
        cancelable: true,
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>
          <Appbar.Content title="Contact The Library" />
        </Appbar.Header>

        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* {this.state.loader && (
              <View style={styles.activityIndicatorStyle}>
                <ActivityIndicator color="#57A3FF" size="large" />
              </View>
            )} */}

            <View style={styles.mainContainer}>
              {/* ===============INFO======================= */}
              <View style={styles.uDetail}>
                <Text style={styles.uNme}>Hello</Text>
                <Text style={styles.uNme}>{this.state.name}</Text>
                <Text style={{marginTop: 10, color: '#8A8A8A'}}>
                  Welcome to Learning Resource Center, BITSoM
                </Text>

                {/* <Text style={{marginTop: 10, color: '#8A8A8A'}}>
                  Given below is the contact information for your library.
                </Text> */}
              </View>

              <View style={styles.info}>
                <Text style={styles.fontInfo}>Dr. Sanjay Kataria</Text>
                <Text style={styles.fontInfo}>Librarian,</Text>
                <Text style={styles.fontInfo}>BITS- School of Management,</Text>
                <Text style={styles.fontInfo}>
                  E-mail: sanjay.kataria@bitsom.edu.in
                </Text>
              </View>

              {/* <View style={styles.addInfo}>
                <Text
                  style={{fontSize: 17, color: '#242960', fontWeight: '700'}}>
                  ADDRESS
                </Text>

                <View>
                  <Text style={{color: '#8A8A8A'}}>
                    8th Floor, Hiranandani Knowledge Park, Powai, Mumbai -
                    400076
                  </Text>
                </View>
              </View> */}

              {/* <Button title="Send Mail" onPress={this.handleEmail} /> */}

              <View
                style={{
                  // borderRadius: 10,
                  // shadowColor: '#000',
                  // shadowOffset: {width: 0, height: 1},
                  // shadowOpacity: 0.18,
                  // shadowRadius: 1.0,
                  // elevation: 1,
                  marginTop: 20,
                }}>
                <TextInput
                  mode="outlined"
                  value={this.state.description}
                  numberOfLines={10}
                  placeholder="Please enter your Feedback
                  /Suggestion/General Contact message"
                  underlineColorAndroid="transparent"
                  multiline={true}
                  onChangeText={e => this.setState({description: e})}
                  // scrollEnabled={true}
                  // backgroundColor="#f1f1f1"
                />
              </View>

              <View style={styles.buttonMap}>
                {/* <TouchableOpacity
                  style={styles.buttonStyle}
                  // onPress={() =>
                  //   Linking.openURL('https://goo.gl/maps/C9wFHaEwwDAMGCaq8')
                  // }
                  onPress={this.handleEmail}>
                  <Text style={{fontSize: 18, color: '#252a60'}}>Submit</Text>
                </TouchableOpacity> */}

                <Button
                  // onPress={() => Linking.openURL(`mailto:Library.helpdesk@bitsom.edu.in?subject=BITSoM Applicatin Contact Enquiry&body=${this.state.description}`) }
                  onPress={this.handleEmail}
                  // color='#f68d2c'
                  // style={{fontSize:25}}
                  mode="outlined"
                  uppercase={false}>
                  <Text style={{fontSize: 18, color: '#252a60'}}>Submit</Text>
                </Button>
              </View>

              {/* <View
                style={{
                  width: '100%',
                  height: '100%',
                  marginBottom: 300,
                  marginTop: 20,
                }}>
                <WebView
                  setSupportMultipleWindows={true}
                  source={{
                    uri: `https://docs.google.com/forms/d/e/1FAIpQLSelAGnCe27x9myZCCpMfEOYB_BqLgi7_YeZ9PgkVLQpGr4YOw/viewform?fbzx=5452600519703962225`,
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  setJavaScriptCanOpenWindowsAutomatically={true}
                  thirdPartyCookiesEnabled={true}
                  injectedJavaScript={INJECTED_JAVASCRIPT}
                  onMessage={onMessage}
                  ref={r => (this.webref = r)}
                  onNavigationStateChange={this.getnextUrl}
                  onLoadStart={() =>
                    this.setState({
                      loader: true,
                    })
                  }
                  onLoadEnd={() =>
                    this.setState({
                      loader: false,
                    })
                  }
                />
              </View> */}

              {/* <View style={styles.buttonMap}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  // onPress={() =>
                  //   Linking.openURL('https://goo.gl/maps/C9wFHaEwwDAMGCaq8')
                  // }
                  onPress={this.handleEmail}>
                  <Text style={{fontSize: 16, color: '#252a60'}}>Send</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </ScrollView>
        </>

        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 8,
            // marginTop: '37%',
            // position: "absolute",
            // left: "30%",
            // bottom: 0
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://libcon.in/')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Powered by</Text>
            <Text style={{color: '#f68823'}}> LIBCON</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const INJECTED_JAVASCRIPT = `(function() {
  const tokenLocalStorage = window.localStorage.getItem('userId');
  window.ReactNativeWebView.postMessage(tokenLocalStorage);
})();`;

const onMessage = (payload, async) => {
  console.log('payload', payload);
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  ttl: {
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '50%',
  },
  fontInfo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '1%',
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: '-10%',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  addInfo: {
    marginTop: '5%',
    marginBottom: '2%',
  },
  buttonMap: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 0,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
  },
  buttonStyle: {
    padding: 5,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#f68d2c',
  },

  uDetail: {
    // marginTop: 10,
    marginBottom: 20,
  },
  uNme: {
    fontSize: 25,
  },
});
