import React, { Component } from 'react';
import {
    Text, View, Image, Dimensions, StyleSheet,
    TouchableOpacity, FlatList, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { storeItems } from '../redux/actions/cartAction'
var { height, width } = Dimensions.get('window')
var totalAmnt = 0;
class Mycart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderList: [],
            totalAmnt: 0,
            showMore: false,
            takeAway: true
        }
    }
    static getDerivedStateFromProps(nextProps) {
        totalAmnt = 0;
        if (nextProps.getCartDetails) {
            nextProps.getCartDetails.map(item => {
                var amount = item.count * item.amount;
                totalAmnt += amount;
            })
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
    changeQnty = (type, index) => {
        let starters = this.props.getCartDetails;
        if (type == 'INCREASE') {
            starters[index].count = starters[index].count + 1;
        } else {
            starters[index].count = starters[index].count - 1;
        }
        this.setState({
            orderList: starters
        }, () => {
            this.addtoCard()
        });
    }
    addtoCard = () => {
        let starters = this.state.orderList;
        let cartItem = starters.filter((item) => item.count && item.count > 0);
        this.props.storeItems(cartItem)
    }
    showMore = () => {

        this.setState({
            showMore: true
        })
    }
    changeRadioButton = () => {
        this.setState({
            takeAway: !this.state.takeAway
        })
    }

    renderStaterList = (data) => {
        console.log("flatlist", data)
        return (
            <View style={styles.list}>
                <View style={{ flex: 0.1 }}>
                    <Text style={styles.valueTxt}>{data.item.value}</Text>
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10 }}>
                    <Text style={{}}>{data.item.name}</Text>
                    <Text style={{}}>{data.item.content}</Text>
                    <Text style={{ color: '#f0c03e', paddingTop: 10 }}>${data.item.amount}</Text>
                </View>
                <View style={{ flex: 0.3, flexDirection: 'column' }}>
                    <View style={{ flex: 0.6, alignItems: 'center' }}>
                        {
                            !(data.item.count && data.item.count > 0) ?
                                null
                                :
                                <View style={styles.countView}>
                                    <TouchableOpacity style={styles.qnty}
                                        onPress={() => {
                                            this.changeQnty("DECREASE", data.index)
                                        }}>
                                        <Text style={{ fontSize: 16 }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={styles.qnty}>
                                        <Text style={{ fontSize: 16 }}>{data.item.count}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.qnty}
                                        onPress={() => {
                                            this.changeQnty("INCREASE", data.index)
                                        }}>
                                        <Text style={{ fontSize: 16 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                    <View style={{ flex: 0.6, alignItems: "flex-end", marginRight: 15 }}>
                        <Image style={{ height: 20, width: 20, backgroundColor: '#fff', marginTop: 5, }}
                            source={require('../images/comment.png')}>
                        </Image>
                    </View>

                </View>
            </View>
        )
    }
    showList = () => {
        return (
            <>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={this.state.showMore ? this.props.getCartDetails : this.props.getCartDetails.slice(0, 2)}
                    renderItem={this.renderStaterList}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props.data}
                />
                {
                    this.props.getCartDetails.length > 2 ?
                        <Text style={styles.showMore}
                            onPress={this.showMore}>
                            Show more
                        </Text>
                        :
                        null
                }

                <Text style={{ paddingLeft: 20, paddingTop: 20 }}>
                    Delivery Options
                </Text>
                <View style={styles.orderType}>
                    <View style={styles.typeAction}>
                        {/* //for icon */}
                    </View>
                    <View style={styles.typeText}>
                        <Text style={{}}>
                            Dine-in
                       </Text>
                    </View>
                    <TouchableOpacity style={styles.typeAction}
                        onPress={this.changeRadioButton}>

                        {
                            this.state.takeAway ?
                                <Image style={{ height: 20, width: 20, backgroundColor: '#fff' }}
                                    source={require('../images/radio-on-button.png')}>
                                </Image>
                                :
                                <Image style={{ height: 20, width: 20, backgroundColor: '#fff', }}

                                    source={require('../images/circle-outline.png')}>
                                </Image>

                        }
                    </TouchableOpacity>
                    <View style={styles.typeAction}>
                        {/* //for icon */}
                    </View>
                    <View style={styles.typeText}>
                        <Text style={{}}>
                            Take away
                    </Text>
                    </View>
                    <TouchableOpacity style={styles.typeAction}
                        onPress={this.changeRadioButton}>
                        {
                            this.state.takeAway ?
                                <Image style={{ height: 20, width: 20, backgroundColor: '#fff', }}

                                    source={require('../images/circle-outline.png')}>
                                </Image> :
                                <Image style={{ height: 20, width: 20, backgroundColor: '#fff' }}
                                    source={require('../images/radio-on-button.png')}>
                                </Image>
                        }

                    </TouchableOpacity>
                </View>
            </>
        )
    }

    render() {
        return (
            <>
                <SafeAreaView>
                    <View style={styles.headerView}>
                        <TouchableOpacity style={{ flex: 0.2 }}
                            onPress={this.goBack}>
                            <Image style={{ height: 25, width: 35, backgroundColor: '#fff', marginLeft: 10, marginTop: 5 }}
                                source={require('../images/left-arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View style={{ flex: 0.8, justifyContent: 'center' }}>
                            <Text style={styles.cartText}>
                                My Cart
                        </Text>
                        </View>
                    </View>
                    <View style={styles.bgImage}
                        onPress={this.goBack}>
                        <View style={styles.totalAmtView}>
                            <Text style={styles.totalCost}>
                                Total cost
                        </Text>
                            <Text style={{ textAlign: 'center' }}>
                                ${totalAmnt}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ paddingLeft: 20, marginTop: 20 }}>
                        Review Orders
                </Text>
                    {
                        this.props.getCartDetails.length == 0 ?
                            <TouchableOpacity style={styles.addItemView}
                                onPress={this.goBack}>
                                <Text style={{ color: '#fff' }}>
                                    ADD ITEMS
                            </Text>
                            </TouchableOpacity>
                            :
                            this.showList()
                    }

                </SafeAreaView>
                {
                    this.props.getCartDetails.length > 0 ?
                        < TouchableOpacity style={styles.placeOrderButton}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>PLACE ORDER</Text>
                        </TouchableOpacity>
                        :
                        null
                }
            </>
        );

    }
}
function mapStateToProps(state) {
    console.log("mapstate", state.cartDetails)
    return {
        getCartDetails: state.cartDetails
    }
}
function mapDispatchToProps(dispatch) {
    return {
        storeItems: (n) => { dispatch(storeItems(n)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mycart);
const styles = StyleSheet.create({
    headerView: {
        height: height / 100 * 6, flexDirection: 'row', backgroundColor: '#00284d',
    },
    bgImage: {
        height: height / 100 * 25, backgroundColor: '#00284d',
        justifyContent: 'center',
    },
    floatView: {
        position: 'absolute', zIndex: 5, top: 120, backgroundColor: '#fff',
        height: height / 100 * 25, borderRadius: 5,
        width: '85%', marginLeft: 30
    },
    imageStyle: {
        width: '100%',
        height: 200,
    },
    valueTxt: {
        borderRadius: 2, borderWidth: 0.5, padding: 2,
        textAlign: 'center', margin: 10
    },
    showMore: {
        paddingRight: 15, textDecorationLine: 'underline', textAlign: 'right'
    },
    qnty: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    countView: {
        flexDirection: 'row', borderWidth: 0.5, height: 30,
        width: 80, borderColor: '#f0c03e'
    },
    typeAction: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    typeText: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center'
    },
    orderType: {
        flexDirection: 'row', height: height / 100 * 8
    },
    totalCost: {
        textAlign: 'center', paddingBottom: 10, color: '#f0c03e'
    },
    deliveryTxt: {
        paddingLeft: 20, paddingTop: 20
    },
    addItemView: {
        height: height / 100 * 6, justifyContent: 'center', alignItems: 'center',
        marginLeft: 140, marginRight: 140, backgroundColor: '#00b300', borderRadius: 5
    },
    totalAmtView: {
        height: height / 100 * 12, backgroundColor: '#fff',
        justifyContent: 'center', marginLeft: 100, marginRight: 100, borderRadius: 5
    },
    placeOrderButton: {
        height: height / 100 * 8, backgroundColor: '#00284d', justifyContent: 'center', bottom: 0,
        position: 'absolute', width: '100%'
    },
    cartText: {
        color: '#fff', fontSize: 18
    },
    list:{ height: 90, flexDirection: 'row', borderBottomWidth: 0.5, marginTop: 10 }
})