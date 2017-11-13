
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * 显示总共多少页和当前页的组件
 * 
 * @class PageControl
 * @extends {Component}
 */
class PageControl extends Component {
    static defaultProps = {
        numberOfPages: 0,
        currentPage: 0,

        dotColor: '#d3d3d3',
        activeDotColor: '#808080',

        style: { width: 8, height: 8 },
    };
    render() {

        const { width, height } = this.props.style
        const { currentPage, numberOfPages, dotColor, activeDotColor } = this.props

        let pages = [];

        for (let i = 0; i < numberOfPages; i++) {
            pages.push(<View key={i}
                style={[styles.dotView, {
                    width: width,
                    height: height,
                    backgroundColor: i == currentPage ? activeDotColor : dotColor,
                    borderRadius: height / 2,
                }]} />);
        }
        return (
            <View style={styles.container}>
                {pages}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 15,
        backgroundColor: 'transparent'
    },
    dotView: {
        marginLeft: 3,
        marginRight: 3,
    }
});

export default PageControl;