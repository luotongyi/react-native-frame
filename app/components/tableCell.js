import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

/**
 * Table的cell
 * 包括icon、arrow、标题、描述，
 * 可以只有标题或者只有描述，或者icon配合标题（描述）
 * 
 * @class TableCell
 * @extends {Component}
 */
class TableCell extends Component {
    static defaultProps = {
        title: '标题',
        detail: '详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息',

        detailLines: 2,
        lineStyle: { height: 1, marginLeft: 15 },//高度最高不超过1

        titleStyle: { fontSize: 15 },
        detailStyle: { fontSize: 12 },

        image: require('../resources/images/menu_icon.png'),//可以是本地图片require('xxxx')，也可以是网络图片{uri:xxxx}
        imageStyle: { height: 40, width: 40 },//icon的图片大小

        showArrow: true,//是否显示右边的箭头

        cellHeight: 60,//行高

        onClick: () => { },
    };

    render() {
        const { onClick,
            lineStyle,
            image,
            imageStyle,
            showArrow,
            cellHeight,
            title,
            titleStyle,
            detail,
            detailLines,
            detailStyle } = this.props

        let IconImage = !image ? null :
            <Image style={[styles.iconImageStyle, imageStyle]} source={image} />
        let ArrowView = !showArrow ? null :
            <Image style={styles.arrowImageStyle} source={require('../resources/images/arrow.png')} />

        let TitleLabel = !title ? null : (title == '' ? null :
            <Text numberOfLines={1} ellipsizeMode='tail'
                style={[styles.titleStyle, titleStyle]}>{title}</Text>)

        let DetailLabel = !detail ? null : (detail == '' ? null :
            <Text numberOfLines={detailLines} ellipsizeMode='tail'
                style={[styles.detailStyle, detailStyle]}>{detail}</Text>)

        return (
            <TouchableHighlight onPress={onClick} underlayColor={'#000'}>
                <View style={styles.container}>
                    <View style={[styles.smallContainer, { height: cellHeight - 1 }]}>
                        {IconImage}
                        <View style={[styles.centerViewStyle, {
                            height: cellHeight, justifyContent:
                                (title && title != '' && detail && detail != '') ? 'flex-start' : 'space-around'
                        }]}>
                            {TitleLabel}
                            {DetailLabel}
                        </View>
                        {ArrowView}
                    </View>
                    <View style={[styles.lineStyle, lineStyle]} />
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineStyle: {
        backgroundColor: '#ddd',
        width: SCREEN_WIDTH,
    },
    centerViewStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft: 10,
        marginRight: 10,
    },
    iconImageStyle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    arrowImageStyle: {
        height: 16,
        width: 8,
        marginLeft: 5,
        marginRight: 10,
        backgroundColor: 'transparent'
    },
    titleStyle: {
        backgroundColor: 'transparent',
        marginTop: 8,
    },
    detailStyle: {
        color: '#a0a0a0',
        backgroundColor: 'transparent',
        marginTop: 5,
    }
})

export default TableCell;
