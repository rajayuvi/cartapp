import React, { Component } from 'react';
import {
    Text, View, Image, Dimensions, StyleSheet,
    TouchableOpacity, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { storeItems } from '../redux/actions/cartAction'
var { height, width } = Dimensions.get('window')

class Starters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startersList: [
                {
                    value: "N",
                    amount: 7,
                    name: "guac de la costa",
                    content: "tortills de mais , ruit de la passsion",
                },
                {
                    value: "N",
                    amount: 6,
                    name: "Chicharron y cerveza",
                    content: "Second Item/corona sauce",
                },
                {
                    value: "N",
                    amount: 9,
                    name: "Chilitos con",
                    content: "padrones tempura , gambas",
                },
            ],
            enableAddButton: true,
            totalPrice: 0,
            totalItems: 0,
            count: 0
        }
    }
    goToCart = () => {
        this.props.navigation.navigate("Mycart")
    }
    changeButton = (index, amount) => {

        let arr = this.state.startersList;
        arr[index].count = 1;
        this.setState({
            startersList: arr,
            totalPrice: amount
        }, () => {
            this.addtoCard()
        })
    }
    changeQnty = (type, index) => {
        let starters = this.state.startersList;
        if (type == 'INCREASE') {
            starters[index].count = starters[index].count + 1;
        } else {
            starters[index].count = starters[index].count - 1;
        }
        this.setState({
            startersList: starters
        }, () => {
            this.addtoCard()
        });
    }
    addtoCard = () => {
        let starters = this.state.startersList;
        let cartItem = starters.filter((item) => item.count && item.count > 0);
        this.props.storeItems(cartItem)
    }

    renderStaterList = (data) => {
        let item = data.item;
        return (

            <View style={styles.listView}>
                <View style={{ flex: 0.1 }}>
                    <Text style={styles.valueTxt}>{item.value}</Text>
                </View>
                <View style={{ flex: 0.6, paddingLeft: 10 }}>
                    <Text style={{}}>{item.name}</Text>
                    <Text style={{}}>{item.content}</Text>
                    <Text style={{ color: '#f0c03e', paddingTop: 2 }}>${item.amount}</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    {
                        !(item.count && item.count > 0) ?
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => {
                                    this.changeButton(data.index, item.amount)
                                }}>

                                <Text style={styles.addTxt}>ADD</Text>
                            </TouchableOpacity>
                            :
                            <View style={styles.countView}>
                                <TouchableOpacity style={styles.qnty}
                                    onPress={() => {
                                        this.changeQnty("DECREASE", data.index)
                                    }}>
                                    <Text style={{ fontSize: 16 }}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.qnty}>
                                    <Text style={{ fontSize: 16 }}>{item.count}</Text>
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
            </View>
        )
    }

    render() {

        return (
            <>
                <Text style={styles.starterText}>Starters</Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={this.state.startersList}
                    renderItem={this.renderStaterList}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.data}
                />
                <View style={styles.floatMenu}>
                    <View style={styles.imgMain}>
                        <Image style={styles.forkImg}
                            source={require('../images/fork.png')}>
                        </Image>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>
                        <Text style={{}}>
                            MENU
                    </Text>
                    </View>
                </View>
                {
                    this.props.getCartDetails.length > 0 ?
                        <TouchableOpacity style={styles.cartButton}
                            onPress={this.goToCart}>
                            <View style={styles.cartIcon}>
                                <Image style={{ height: 35, width: 40, backgroundColor: '#fff' }}
                                    source={require('../images/cart.png')}>
                                </Image>
                            </View>

                            <View style={styles.cartText}>
                                <Text style={{ color: '#fff' }}>VIEW CART [{this.props.getCartDetails.length} ITEMS]</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                }

            </>
        );
    }
}
function mapStateToProps(state) {
    return {
        getCartDetails: state.cartDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeItems: (n) => { dispatch(storeItems(n)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Starters);
const styles = StyleSheet.create({

    starterText: {
        marginLeft: 30, marginTop: 120,
    },
    addButton: {
        height: 30, width: 80, backgroundColor: '#00b300',
        justifyContent: 'center'
    },
    listView: {
        height: 90, flexDirection: 'row'
    },
    countView: {
        flexDirection: 'row', borderWidth: 0.5, height: 30,
        width: 80, borderColor: '#f0c03e'
    },
    cartButton: {
        height: height / 100 * 8, backgroundColor: '#00284d',
        flexDirection: 'row'
    },
    qnty: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    cartIcon: {
        flex: 0.4, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10
    },
    cartText: {
        flex: 0.6, justifyContent: 'center'
    },
    addTxt: {
        textAlign: 'center', color: '#fff'
    },
    valueTxt: {
        borderRadius: 2, borderWidth: 0.5, padding: 2,
        textAlign: 'center', margin: 10
    },
    floatMenu: {
        position: 'absolute', zIndex: 5, bottom: 70, backgroundColor: '#ccae5a',
        height: height / 100 * 5, borderRadius: 5,
        width: '30%', marginLeft: 120, flexDirection: 'row'
    },
    imgMain: {
        flex: 0.4, justifyContent: 'center', alignItems: 'center'
    },
    forkImg: {
        height: 20, width: 25, backgroundColor: '#fff', alignItems: 'center'
    }

})