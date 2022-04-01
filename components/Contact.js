import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
  Alert,
  // TextInput,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {WebView} from 'react-native-webview';
import {TextInput, Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Contact = () => {
  const [loader, setloader] = useState(false);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [showThank, setshowThank] = useState(true);
  const [hideThnk, sethideThnk] = useState(true);
  const [responseMsg, setresponseMsg] = useState('Thank You');
  const [showError, setshowError] = useState(true);

  useEffect(async () => {
    try {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      setname(sName + ' ' + sNameLast);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }
  }, []);

  const handleEmail = () => {
    if (description !== '') {
      setloader(true);
      let receiverEmail = "Library.helpdesk@bitsom.edu.in"
      let enquiry= 'BITSoM Applicatin Contact Enquiry'
      let url = `https://bitsomapi.libcon.in/api/sendEmail?toId=theartistnw@gmail.com&subject=${enquiry}&bodyText=${description}`;
      fetch(url, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
        },
      })
        .then(result => {
          result.json().then(resp => {
            console.log(resp);
            if (resp.status === 'success') {
              setdescription('Thank you');
              setshowThank(false);
              setloader(false);

              setTimeout(() => {
                sethideThnk(false);
              }, 5000);
            } else {
              setshowThank(false);
              setloader(false);
              setshowError(false);
              setresponseMsg('Something went wrong. Please try again.');
            }
          });
        })
        .catch(error => {
          setshowThank(false);
          setloader(false);
          setshowError(false);
          setresponseMsg('Something went wrong. Please try again.');
        });
    } else {
      Alert.alert('Alert!', 'Please Fill The Field Below.', [{text: 'Okay'}], {
        cancelable: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.ttl}>
        <TouchableOpacity
          style={{paddingLeft: '2%'}}
          onPress={() => this.props.navigation.goBack()}>
          <AntDesign name="arrowleft" color="#05375a" size={25} />
        </TouchableOpacity>
        <Appbar.Content title="Contact US" />
      </Appbar.Header>

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainContainer}>
            {/* ===============INFO======================= */}
            <View style={styles.uDetail}>
              <Text style={styles.uNme}>Hello</Text>
              <Text style={styles.uNme}>{name}</Text>
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

            {hideThnk && (
              <>
                {showThank ? (
                  <>
                    <View
                      style={{
                        marginTop: 20,
                      }}>
                      <TextInput
                        mode="outlined"
                        value={description}
                        numberOfLines={10}
                        placeholder="Please enter your Feedback
                                   /Suggestion/General Contact message"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        onChangeText={e => setdescription(e)}
                      />
                    </View>

                    <View style={styles.buttonMap}>
                      {loader ? (
                        <>
                          <TouchableOpacity style={styles.buttonStyle}>
                            <ActivityIndicator color="#57A3FF" size="large" />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          onPress={handleEmail}
                          style={styles.buttonStyle}>
                          <Text style={{fontSize: 20, color: '#252a60'}}>
                            Submit
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                ) : (
                  <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.thnks}>
                    <View style={styles.thnkRow}>
                      <Animatable.Text
                        animation={'rubberBand'}
                        style={styles.thnksText}>
                        {responseMsg}
                      </Animatable.Text>
                      <Animatable.View
                        style={styles.successIcon}
                        animation={'bounceIn'}>
                        {showError ? (
                          <Feather
                            name="check-circle"
                            color="green"
                            size={28}
                          />
                        ) : (
                          <MaterialIcons
                            name="error-outline"
                            color="#f66"
                            size={28}
                          />
                        )}
                      </Animatable.View>
                    </View>
                  </LinearGradient>
                )}
              </>
            )}

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
};

export default Contact;

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
  buttonMap: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 0,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
  },
  buttonStyle: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#f68d2c',
  },

  uDetail: {
    marginBottom: 20,
  },
  uNme: {
    fontSize: 25,
  },

  thnks: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginTop: '15%',
  },
  thnkRow: {
    flexDirection: 'row',
    padding: '5%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  thnksText: {
    fontWeight: 'bold',
    marginRight: '4%',
    marginTop: '1%',
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
  },
  successIcon: {
    justifyContent: 'center',
  },
});
