import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    requireNativeComponent,
    NativeModules
} from 'react-native';

const NativeView = requireNativeComponent('AIBaseWebView', NativeWebIOS);
const NativeWebModule = NativeModules.AIBaseWebViewManager
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

/**
 * 和原生WKWebView交互的js组件的封装
 * 只支持IOS
 * 
 * @class NativeWeb
 * @extends {Component}
 */
class NativeWebIOS extends Component {
    static defaultProps = {
        url: '',
        onClick: (e) => { },
        onFinishLoad: (e) => { },
    };
    render() {
        return (
            <NativeView {...this.props} />
        );
    }
    // componentDidMount() {
    //     NativeWebModule.testAction('和分胜负方式打发服务');
    // }
    componentWillUnmount() {
        NativeWebModule.removeWebPlugins();
    }
}


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
        // headerTitle: navigation.state.params.title ?
        //     navigation.state.params.title : '加载中...'
    })
    render() {
        // const params = this.props.navigation.state.params
        return (
            <View>
                <NativeWebIOS style={styles.container}
                    onFinishLoad={this._finishLoad}
                    url={''/*params.url*/}
                    onClick={this._onClickAction} />
            </View>
        );
    }
    _onClickAction(e) {
        alert('aaaa' + e.nativeEvent);
    }
    _finishLoad(e) {
        // this.props.navigation.setParams({ title: e.nativeEvent.title })
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 64,
    },
});

export default NativeWebViewIOS;