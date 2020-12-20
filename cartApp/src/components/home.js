import React, { Component } from 'react';
import {
    Text, View, Image, Dimensions, StyleSheet,
    TouchableOpacity, SafeAreaView, ImageBackground
} from 'react-native';
import Starters from './starters';
var { height, width } = Dimensions.get('window')

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <View style={styles.bgImage}>
                    <ImageBackground style={styles.imageStyle}
                        source={require('../images/bg.jpg')}>
                        <View style={styles.imgView}>
                            <Image style={styles.leftArrow}
                                source={require('../images/left-arrow.png')}>
                            </Image>
                        </View>

                        <View style={styles.exitImg}>
                            <Image style={styles.ExitCont}
                                source={require('../images/exit.png')}>
                            </Image>
                        </View>
                        <View style={styles.ponitView}>
                            <Image style={styles.pointImg}
                                source={require('../images/point.png')}>
                            </Image>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.floatView}>
                    <View style={styles.resView}>
                        <Text style={{ color: 'black', fontSize: 20 }}>Inka Restaurant
                        </Text>
                    </View>
                    <View style={styles.secondCol}>
                        <View style={styles.starView}>
                            <Image style={styles.starImg}
                                source={require('../images/star.png')}>
                            </Image>
                        </View>
                        <View style={styles.calDetail}>
                            <Text style={{ fontSize: 10 }}>5.0(200+) | All days : 09.00 AM - 06.00 PM

                            </Text>
                        </View>

                    </View>
                    <View style={styles.thirdRow}>
                        <View style={styles.calView}>
                            <Image style={{ height: 20, width: 20 }}
                                source={require('../images/call.png')}>
                            </Image>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text style={{ fontSize: 10 }}>Reach us at : 9876543210

                            </Text>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.bookTable}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>BOOK A TABLE

                            </Text>
                    </TouchableOpacity>
                </View>
                <Starters
                    navigation={this.props.navigation} />
            </SafeAreaView>

        );

    }
}

const styles = StyleSheet.create({

    bgImage: {
        height: height / 100 * 25, backgroundColor: 'red'
    },
    floatView: {
        position: 'absolute', zIndex: 5, top: 120,
        backgroundColor: '#fff',
        height: height / 100 * 25, borderRadius: 5,
        width: '85%', marginLeft: 30
    },
    imageStyle: {
        width: '100%',
        height: 200, flexDirection: 'row'
    },
    mainView: {
        height: '100%'
    },
    imgView: {
        flex: 0.6, marginTop: 5
    },
    leftArrow: {
        height: 25, width: 35, marginLeft: 10
    },
    exitImg: {
        flex: 0.2, alignItems: 'flex-end', marginTop: 5
    },
    ExitCont: {
        height: 35, width: 35
    },
    ponitView: {
        flex: 0.2, alignItems: 'flex-end', marginRight: 10, marginTop: 5
    },
    pointImg: {
        height: 40, width: 35,
    },
    resView: {
        flex: 0.30, justifyContent: 'center', alignItems: 'center'
    },
    starImg: {
        height: 15, width: 15
    },
    secondCol: {
        flex: 0.2, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'
    },
    starView: {
        flex: 0.2, justifyContent: 'center',
        alignItems: 'flex-end', marginRight: 5
    },
    thirdRow: {
        flex: 0.2, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row'
    },
    calView: {
        flex: 0.3, justifyContent: 'center',
        alignItems: 'flex-end', marginRight: 10
    },
    calDetail: { flex: 0.8, justifyContent: 'center' },
    bookTable: {
        flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor:
            'black', borderRadius: 5,
        marginLeft: 90, marginRight: 90
    }
})

export default Home;