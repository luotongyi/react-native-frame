
import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    StyleSheet
} from 'react-native';

/**
 * TabBar控制器的item组件
 * 
 * @class TabBarItem
 * @extends {Component}
 */
class TabBarItem extends Component {
    static defaultProps = {
        dot: false,
        normalImage: null,
        activityImage: null,
        badge: 0,
        focused: false,

        //设置icon的大小
        style: { width: 26, height: 26, }
    };
    render() {
        const { activityImage, normalImage, dot, badge, focused } = this.props;
        //dot和bade不能同时存在
        let selectImage = activityImage ? activityImage : normalImage;
        let badgeWidth = 0;
        let badgeNumber = '';

        if (badge > 99) {
            badgeWidth = 36;
            badgeNumber = '99+';
        } else if (badge > 9) {
            badgeWidth = 26;
            badgeNumber = badge;
        } else if (badge > 0) {
            badgeWidth = 16;
            badgeNumber = badge;
        } else {
            badgeWidth = 0
            badgeNumber = ''
        }
        let cornerView;
        if (dot) {
            cornerView = <View style={styles.dotStyle} />;
        } else {
            cornerView = badgeWidth == 0 ? null :
                <View style={[styles.badgeView, { width: badgeWidth }]}>
                    <Text style={styles.badgeText}>{badgeNumber}</Text>
                </View>
        }
        return (
            <ImageBackground
                source={focused ? selectImage : normalImage}
                style={[styles.itemImage, this.props.style]}>
                {cornerView}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: -30,
        backgroundColor: '#f00',
    },
    itemImage: {
        alignItems: 'center',
    },
    badgeView: {
        marginRight: -30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f00',
        height: 16,
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
    }
})

export default TabBarItem;
