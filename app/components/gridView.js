import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    GridItem,
    PageControl
} from '../components'

const SCREEN_WIDTH = Dimensions.get('window').width

export const GridViewType = {
    GridViewType_Vertical: 0,   //默认
    GridViewType_Horizontal: 1,
}

/**
 * 宫格view
 * 支持向下排版和左右排版
 * 
 * @class GridView
 * @extends {Component}
 */
class GridView extends Component {
    constructor(props) {
        super(props)
        this._scrollEnd = this._scrollEnd.bind(this)
        this.state = {
            currentPage: 0,
        }
    }

    static defaultProps = {
        gridArray: [],   //数据来源，显示文字字段key是name，显示图片字段key是imageUrl的网络图片
        onItemClick: () => { },

        defaultImage: null,   //icon的默认图片

        type: GridViewType.GridViewType_Vertical,
        columns: 4,//当上下排列时有效

        lines: 2,//只有当水平排列有效，水平排列也用到columns
    };
    render() {
        const { gridArray, onItemClick, defaultImage, type, columns, lines } = this.props
        let gridItems = gridArray.map(
            (info, i) => (
                < GridItem
                    key={i}
                    columns={columns}
                    title={info.name}
                    image={{ uri: info.imageUrl }}//还需要完善本地图片部分
                    defaultImage={defaultImage}
                    onClick={() => { onItemClick(info, i) }} />
            )
        )
        let showDefaultDirection = type == GridViewType.GridViewType_Vertical;
        let gridItemsView = []
        if (!showDefaultDirection) {
            let pageSize = lines * columns
            var pageCount = Math.ceil(gridItems.length / pageSize)
            for (let i = 0; i < pageCount; i++) {
                let length = gridItems.length < (i * pageSize) ?
                    gridItems.length - (i * pageSize) : pageSize
                let items = gridItems.slice(i * pageSize, i * pageSize + length)
                let menuView = (
                    <View key={i} style={[styles.gridItemView, { width: SCREEN_WIDTH }]}>
                        {items}
                    </View>
                )
                gridItemsView.push(menuView)
            }
        }
        let customView;
        if (showDefaultDirection) {
            customView = <View style={styles.gridItemView}>
                {gridItems}
            </View>
        } else {
            customView = <View>
                <ScrollView horizontal={true}
                    onMomentumScrollEnd={this._scrollEnd}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    style={styles.scroll}>
                    {gridItemsView}</ScrollView>
                <PageControl numberOfPages={pageCount}
                    currentPage={this.state.currentPage} />
            </View>
        }
        return (
            <View style={styles.container}>
                {customView}
            </View>
        );
    }
    _scrollEnd(e) {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / SCREEN_WIDTH)
        if (this.state.currentPage != currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    gridItemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    scroll: {
        backgroundColor: 'transparent'
    }
})

export default GridView;