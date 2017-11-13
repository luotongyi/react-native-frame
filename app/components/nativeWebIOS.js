
import React, { Component } from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';

const NativeView = requireNativeComponent('AIBaseWebView', NativeWebIOS);
const NativeWebModule = NativeModules.AIBaseWebViewManager

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

export default NativeWebIOS;

