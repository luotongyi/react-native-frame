import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

class Button extends Component {
    static defaultProps = {
        title: 'button',
        titleStyle: {
            textAlign: 'center',
            textAlignVertical: 'center',//android独有
            fontWeight: 'normal',
            fontSize: 15,
            color: '#000',
            backgroundColor: 'transparent'
        },

        disabled: false,
        onClick: () => { },

        highlightColor: '#d3d3d3',
        normalColor: '#4ea0f1',

        border: false,
        borderStyle: {},
        borderRadius: 0,

        image: null,
        backgroundImage: null,
    };
    render() {
        const { backgroundImage } = this.props
        return (
            !backgroundImage ?
                <TouchableHighlight
                    style={{ width: 200, height: 50, backgroundColor: '#0000ff' }}>
                    <Text>{this.props.title}</Text>
                </TouchableHighlight> :
                <TouchableOpacity activeOpacity={0.6}
                    style={{ width: 200, height: 50, backgroundColor: '#00aaff' }}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

})

export default Button;