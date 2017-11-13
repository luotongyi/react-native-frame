
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NativeWebIOS } from '../components'
import { constant } from '../utils'

/**
 * RN界面，可以和原生的WKWebView交互
 * 
 * @class NativeWebViewIOS
 * @extends {Component}
 */
class NativeWebViewIOS extends Component {
    constructor(props) {
        super(props)
        this._finishLoad = this._finishLoad.bind(this)
        this.state = {
            title: ''
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title ?
            navigation.state.params.title : '加载中...'
    })
    render() {
        const params = this.props.navigation.state.params
        return (
            <View>
                <NativeWebIOS style={styles.container}
                    onFinishLoad={this._finishLoad}
                    url={params.url}
                    onClick={this._onClickAction} />
            </View>
        );
    }
    _onClickAction(e) {
        alert('aaaa' + e.nativeEvent);
    }
    _finishLoad(e) {
        this.props.navigation.setParams({ title: e.nativeEvent.title })
    }
}

const styles = StyleSheet.create({
    container: {
        width: constant.SCREEN_WIDTH,
        height: constant.SCREEN_HEIGHT - 64,
    },
});

export default NativeWebViewIOS;
