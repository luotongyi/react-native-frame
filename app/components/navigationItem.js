import React, { Component } from 'react';
import {
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

class NavigationItem extends Component {
    static defaultProps = {
        title: '',
        titleStyle: { color: '#fff' },

        image: require('../resources/images/menu_icon.png'),

        onClick: () => { }
    };

    render() {
        const { title, titleStyle, image, onClick } = this.props

        let IconImage = !image ? null :
            <Image style={styles.imageStyle} source={image} />

        let TextView = title == '' ? null :
            <Text style={[styles.textStyle, { fontSize: IconImage ? 11 : 15 }, titleStyle]}>
                {this.props.title}</Text >

        return (
            <TouchableOpacity activeOpacity={.8}
                onPress={onClick}
                style={styles.container}>
                {IconImage}
                {TextView}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    imageStyle: {
        width: 25,
        height: 25,
    },
    textStyle: {
        backgroundColor: 'transparent'
    }
})

export default NavigationItem;