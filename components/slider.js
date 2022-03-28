// import React, { Component } from 'react'
// import { ActivityIndicator, StyleSheet, View, Dimensions, ScrollView, Image, FlatList, Text,ImageBackground } from 'react-native'

// import { API_SLIDER } from "@env"

// import Carousel from 'react-native-snap-carousel';
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// const image = { uri: "https://reactjs.org/logo-og.png" };

// const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

// export default class slider extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             showSlider: false,
//             sliderData: [],
//             images: [
//                 { url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", name: "shakira" },
//                 { url: 'https://images.pexels.com/photos/9413/animal-cute-kitten-cat.jpg?cs=srgb&dl=adorable-animal-cat-9413.jpg&fm=jpg', name: "cat" },
//                 { url: 'https://i.pinimg.com/236x/c6/6b/11/c66b111bf4df809e87a1208f75d2788b.jpg', name: "baby" }
//             ]
//         }
//     }

//     // componentDidMount() {
//     //     this.getSliderData()
//     // }

//     // getSliderData() {
//     //     fetch(`${API_SLIDER}`, {
//     //         method: 'GET',
//     //         headers: {
//     //             Accept: 'application/json',
//     //             'Content-Type': 'application/json',
//     //         },
//     //     }).then(result => {
//     //         result.json().then(resp => {

//     //             if (resp.status === "success") {
//     //                 this.setState({
//     //                     sliderData: resp.data,
//     //                     showSlider: true
//     //                 })
//     //                 console.log("data :- ", this.state.sliderData)
//     //             } else {

//     //             }
//     //         })
//     //     }).catch(error => {
//     //         console.log(error)
//     //     })
//     // }

//     // _renderItem = ({ item, index }) => {
//     //     return (
//     //         <React.Fragment key={index}>

//     //             <View style={{ borderRadius: 8, }}>
//     //                 <View style={[{ marginTop: "5%", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}>
//     //                     <View style={{
//     //                         borderRadius: 8, shadowColor: '#000',
//     //                         shadowOffset: { width: 0, height: 1 },
//     //                         shadowOpacity: 0.2,
//     //                         shadowRadius: 2,
//     //                         elevation: 5
//     //                     }}>
//     //                         <Image style={{ width: 150, height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} source={{ uri: item.photo }} />
//     //                         <Text style={{ backgroundColor: "#fff", padding: 5 }}>{item.title}</Text>
//     //                         <Text style={{ backgroundColor: "#fff", paddingTop: 2, paddingLeft: 5, paddingBottom: 5 }}>{item.author}</Text>
//     //                     </View>
//     //                 </View>
//     //             </View>
//     //         </React.Fragment>
//     //     );
//     // }

//     render() {
//         return (

//             <View style={styles.container}>

//                 {/* <Carousel
//                     layout={'default'} layoutCardOffset={`18`}
//                     ref={(c) => { this._carousel = c; }}
//                     data={this.state.sliderData}
//                     renderItem={this._renderItem}
//                     sliderWidth={viewportWidth}
//                     itemWidth={155}
//                 /> */}

//                 <ImageBackground source={image} resizeMode="cover" style={styles.image}><Text style={styles.text}>Inside</Text>
//                 </ImageBackground>

//             </View>
//         )
//     }
// }

// const { width } = Dimensions.get('window');
// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: 'white', },
//     child: { justifyContent: 'center', alignItems: "center" },
//     text: { fontSize: width * 0.5, textAlign: 'center' },
// });

// import React, { useState, useEffect } from "react";
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import axios from "axios";
// import RNFetchBlob from 'rn-fetch-blob';

// import Posts from "./pagination/Post";
// import Pagination from "./pagination/Pagination";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function slider() {
//     const [posts, setPosts] = useState([]);
//     const [loader, setLoading] = useState(false);
//     const [showData, setshowData] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage] = useState(5);

//     useEffect(() => {

//         const fetchPosts = async () => {
//             // setLoading(true);
//             // const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//             // console.log(res.data)
//             // setPosts(res.data);
//             // setLoading(false);

//             setLoading(true);
//             const searchqueryLocal = JSON.parse(await AsyncStorage.getItem('searchquery'));
//             const email = JSON.parse(await AsyncStorage.getItem('email'));
//             const userId = JSON.parse(await AsyncStorage.getItem('userId'));
//             const sName = JSON.parse(await AsyncStorage.getItem('sName'));
//             const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
//             const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

//             const headers = {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             };
//             const body = JSON.stringify({
//                 searchQuery: searchqueryLocal,
//                 searchField: labelLocal,
//                 startPage: 0,
//                 userEmail: email,
//             }),
//                 path = 'https://bitsomt.refread.com/webservice/pub/documents';

//             RNFetchBlob.config({
//                 trusty: true,
//             })
//                 .fetch('POST', path, headers, body)
//                 .then(resp => {
//                     // console.log(resp.data)
//                     const detail = resp.data;
//                     const prs = JSON.parse(detail);
//                     console.log("data :- ",prs.refreadDocumentList)
//                     setPosts(prs.refreadDocumentList);
//                     setLoading(false);

//                     // this.setState({
//                     //     showData: true,
//                     //     booksDetails: prs.refreadDocumentList,
//                     //     loader: false,
//                     // });

//                     if (prs.refreadDocumentList.length != 0) {
//                         console.log("helo")
//                     }
//                     console.log("check :- ", prs.refreadDocumentList.length);

//                 })
//                 .catch((error, statusCode) => {
//                     // console.log('statusCode :', statusCode);
//                     console.log(
//                         'There has been a problem with your fetch operation: ' +
//                         error.message,
//                     );
//                 });
//         };

//         fetchPosts();
//     }, []);

//     // GET CURRENT POSTS

//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//     //CHANGE PAGE

//     const paginate = (pageNumber) => setCurrentPage(pageNumber)

//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 <Posts posts={currentPosts} loading={loader} />
//                 <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: "5%",
//         flex: 1
//     }
// });

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const slider = () => {
  const [showSideMenu, setshowSideMenu] = useState(false);
  const [upNdDownI, setupNdDownI] = useState(false);

  const upAndDown = () => {
    if (upNdDownI === false) {
      setupNdDownI(true);
    } else {
      setupNdDownI(false);
    }
    console.log(upNdDownI);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.showM}
        onPress={() => setshowSideMenu(true)}>
        <Feather name="menu" size={40} />
      </TouchableOpacity>

      {showSideMenu && (
        <>
          <TouchableOpacity
            style={styles.pop}
            activeOpacity={0}
            onPress={() => setshowSideMenu(false)}></TouchableOpacity>
          <View style={styles.popMenu}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <ImageBackground
                source={require('./image/menu.jpeg')}
                style={{padding: 20}}>
                <Image
                  source={require('./image/user.jpg')}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Roboto-Medium',
                    marginBottom: 5,
                  }}>
                  Deepak Singh
                </Text>
              </ImageBackground>

              <View style={{margin: 5}}>
                <View style={styles.menu}>
                  <Text style={styles.menuD}>Home</Text>

                  {upNdDownI ? (
                    <TouchableOpacity onPress={() => upAndDown()}>
                      <Entypo
                        name="chevron-up"
                        size={25}
                        style={styles.menuI}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => upAndDown()}>
                      <Entypo
                        name="chevron-down"
                        size={25}
                        style={styles.menuI}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {upNdDownI ? (
                  <View style={{borderWidth: 1, borderRadius: 5, padding: 10}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}>
                      <Text style={styles.menuD}>About</Text>
                      <Entypo
                        name="chevron-right"
                        size={25}
                        style={[styles.menuI, {marginRight: '6%'}]}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}>
                      <Text style={styles.menuD}>Contact</Text>
                      <Entypo
                        name="chevron-right"
                        size={25}
                        style={[styles.menuI, {marginRight: '6%'}]}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}>
                      <Text style={styles.menuD}>Policy</Text>
                      <Entypo
                        name="chevron-right"
                        size={25}
                        style={[styles.menuI, {marginRight: '6%'}]}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}>
                      <Text style={styles.menuD}>Setting</Text>
                      <Entypo
                        name="chevron-right"
                        size={25}
                        style={[styles.menuI, {marginRight: '6%'}]}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}>
                      <Text style={styles.menuD}>Log Out</Text>
                      <Entypo
                        name="chevron-right"
                        size={25}
                        style={[styles.menuI, {marginRight: '6%'}]}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </>
      )}

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>slider</Text>
      </View>
    </View>
  );
};

export default slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  pop: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  showM: {
    marginLeft: 10,
    marginTop: 10,
    width: '20%',
  },

  popMenu: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // bottom: 0,
    backgroundColor: '#fff',
    elevation: 5,
    width: '70%',
    height: '100%',
  },

  menu: {
    flexDirection: 'row',
    // backgroundColor: '#AD40AF',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  menuD: {
    marginTop: '1%',
    marginLeft: '5%',
    fontSize: 16,
    // color: '#fff',
    fontWeight: 'bold',
  },

  menuI: {
    marginLeft: '3%',
    // color: '#fff',
  },
});
