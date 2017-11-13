import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import Camera from 'react-native-camera';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

/**
 * 二维码扫码界面封装
 * 支持设置扫描的横线图片
 * 
 * @class QRScanner
 * @extends {Component}
 */
class QRScanner extends Component {
    static defaultProps = {
        onScanResult: (e) => { /*alert('aaa' + e.data)*/ },
        reactWidth: 260,
        hintText: '将二维码/条码放入框内，即可自动扫描',

        cornerColor: '#00ff0a',

        scanLineColor: '#f02',
        scanImage: require('../resources/images/scanBar.png'),
        animateTime: 3,
    };
    constructor(props) {
        super(props)
        this._renderScanLine = this._renderScanLine.bind(this)
        this._scannerLineDown = this._scannerLineDown.bind(this)
        this._scannerLineUp = this._scannerLineUp.bind(this)
        this.state = {
            animatedValue: new Animated.Value(5),
        }
    }
    _renderScanLine() {
        const { scanLineColor, reactWidth, scanImage } = this.props
        return (
            scanImage ?
                <Image resizeMode='contain'
                    source={scanImage}
                    style={{
                        height: 3,
                        width: reactWidth - 40,
                        marginLeft: 20,
                    }} /> :
                <View style={{
                    backgroundColor: scanLineColor,
                    height: 2,
                    width: reactWidth - 40,
                    marginLeft: 20,
                }} />
        )
    }
    _scannerLineDown() {
        const { animateTime, reactWidth } = this.props
        Animated.timing(this.state.animatedValue, {
            toValue: reactWidth - 10,
            duration: animateTime * 1000,
            easing: Easing.linear
        }).start(() => this._scannerLineUp());
    }
    _scannerLineUp() {
        Animated.timing(this.state.animatedValue, {
            toValue: 5,
            duration: this.props.animateTime * 1000,
            easing: Easing.linear
        }).start(() => this._scannerLineDown());
    }
    componentDidMount() {
        this._scannerLineDown();
    }
    render() {
        const { onScanResult, reactWidth, cornerColor } = this.props

        const cornerLength = 18

        const topHeight = (SCREEN_HEIGHT - reactWidth - 64) / 2 - 50
        const bottomHeight = (SCREEN_HEIGHT - reactWidth - 64) / 2 + 50
        const leftWidth = (SCREEN_WIDTH - reactWidth) / 2

        const animatedStyle = {
            transform: [
                { translateY: this.state.animatedValue }
            ]
        };
        return (
            <View style={styles.container}>
                <Camera style={styles.container} onBarCodeRead={onScanResult}>
                    {/* 顶部 */}
                    <View style={[styles.scanMask, { width: SCREEN_WIDTH, height: topHeight }]} />
                    {/* 中间 */}
                    <View style={styles.centerView}>
                        {/* 中间扫码区域左边 */}
                        <View style={[styles.scanMask, { width: leftWidth, height: reactWidth }]} />
                        {/* 中间扫码区域 */}
                        <View style={{ height: reactWidth, width: reactWidth }}>
                            {/* 中间扫描的线条 */}
                            <Animated.View style={animatedStyle}>
                                {this._renderScanLine()}
                            </Animated.View>
                            <View style={[styles.cornerLeft, {
                                borderColor: cornerColor,
                                height: cornerLength,
                                width: cornerLength,
                                borderLeftWidth: 3,
                                borderTopWidth: 3,
                                top: 0,
                            }]} />
                            <View style={[styles.cornerRight, {
                                borderColor: cornerColor,
                                height: cornerLength,
                                width: cornerLength,
                                borderTopWidth: 3,
                                borderRightWidth: 3,
                                top: 0,
                            }]} />
                            <View style={[styles.cornerRight, {
                                borderColor: cornerColor,
                                height: cornerLength,
                                width: cornerLength,
                                borderRightWidth: 3,
                                borderBottomWidth: 3,
                                bottom: 0,
                            }]} />
                            <View style={[styles.cornerLeft, {
                                borderColor: cornerColor,
                                height: cornerLength,
                                width: cornerLength,
                                borderLeftWidth: 3,
                                borderBottomWidth: 3,
                                bottom: 0,
                            }]} />
                        </View>
                        {/* 中间扫码区域右边 */}
                        <View style={[styles.scanMask, { width: leftWidth, height: reactWidth, marginRight: 0 }]} />
                    </View>
                    {/* 底部 */}
                    <View style={[styles.scanMask, { width: SCREEN_WIDTH, height: bottomHeight }]}>
                        <Text style={styles.hintText}>{this.props.hintText}</Text>
                    </View>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerView: {
        flexDirection: 'row',
    },
    scanMask: {
        backgroundColor: '#0000006D',
        alignItems: 'center',
    },
    hintText: {
        marginTop: 20,
        color: '#fff',
    },
    cornerLeft: {
        position: 'absolute',
        left: 0,
    },
    cornerRight: {
        position: 'absolute',
        right: 0,
    },
})

export default QRScanner;