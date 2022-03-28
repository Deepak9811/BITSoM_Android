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
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {WebView} from 'react-native-webview';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      name: 'NaN',
    };
  }

  async componentDidMount() {
    try {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      this.setState({
        name: sName + ' ' + sNameLast,
      });
      console.log('name : ', this.state.name);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + error.message);
    }
  }

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
                  Welcome to Learning Resource Center, BITSoM{' '}
                </Text>

                <Text style={{marginTop: 10, color: '#8A8A8A'}}>
                  Given below is the contact information for your library.
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.fontInfo}>Dr. Sanjay Kataria</Text>
                <Text style={styles.fontInfo}>Librarian,</Text>
                <Text style={styles.fontInfo}>BITS- School of Management,</Text>
                <Text style={styles.fontInfo}>
                  E-mail: sanjay.kataria@bitsom.edu.in
                </Text>
              </View>

              <View style={styles.addInfo}>
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
              </View>

              <View style={{width: '100%', height: '100%'}}>
                <WebView
                  setSupportMultipleWindows={true}
                  source={{
                    uri: `https://docs.google.com/forms/d/e/1FAIpQLSdVbgqVY77fpDMGvunw6_A1gWB9EXqkVGD9cw30pjh7KbD8gA/viewform?usp=sf_link`,
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
              </View>

              <View style={styles.buttonMap}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() =>
                    Linking.openURL('https://goo.gl/maps/C9wFHaEwwDAMGCaq8')
                  }>
                  <Text style={{ fontSize: 16, color: '#252a60' }}>Open Map</Text>
                </TouchableOpacity>
              </View>


              
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
    marginBottom:"100%"
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
    marginLeft: '70%',
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
