import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

/**
 * NavigationBar支持android和iOS
 * 
 * @class NavigationBar
 * @extends {Component}
 */
class NavigationBar extends Component {
    static defaultProps = {
        title: '',
        titleStyle: {
            color: '#fff',
            fontSize: 17,
            fontWeight: 'normal',
            position: 'absolute',//这个和flex必须有其一，不然布局有问题
            // flex: 1
        },

        backgroundColor: '#0af',//和backgroundImage不共存
        backgroundImage: null,//require('../resource/images/menu_icon.png')，也可以使用网络图{uri:xxxxx}

        centerView: null,//可以自定义中间的view，默认是只有标题
        leftItems: [],
        rightItems: [],

    };
    render() {
        let barHeight = 44;
        if (Platform.OS == 'ios') {
            barHeight = 64;
        }
        const { leftItems,
            rightItems,
            centerView,
            title,
            titleStyle,
            backgroundImage,
            backgroundColor } = this.props

        let itemsCount = leftItems.length > rightItems.length ? leftItems.length : rightItems.length;
        let containWidth = itemsCount * 35;

        let leftItemsView = <View style={[styles.itemViewStyle, { left: 10 }]}>{leftItems}</View>
        let rightItemsView = <View style={[styles.itemViewStyle, { right: 10 }]}>{rightItems}</View>

        let centerContainView = centerView ? centerView :
            <Text numberOfLines={1}
                ellipsizeMode={"middle"}
                style={[styles.textStyle, titleStyle, { left: containWidth + 10, width: SCREEN_WIDTH - containWidth * 2 - 20 }]}>{title}</Text>

        return (
            <ImageBackground source={backgroundImage}
                resizeMode={'stretch'}
                style={{ backgroundColor: backgroundColor, height: barHeight }}>
                <View style={styles.statusStyle} />
                <View style={styles.containerStyle} >
                    {leftItemsView}
                    {centerContainView}
                    {rightItemsView}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    itemViewStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    textStyle: {
        textAlign: 'center',
        lineHeight: 44,
        backgroundColor: 'transparent',
    },
    statusStyle: {
        height: 20,
        backgroundColor: 'transparent'
    },
    containerStyle: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'transparent'
    }
})

export default NavigationBar;
