import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

class Button extends Component {
    static defaultProps = {
        title: 'button',
        titleStyle: {},

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
            backgroundImage ?
                <TouchableOpacity disabled={false} activeOpacity={0.6}
                    style={{ width: 200, height: 50, backgroundColor: '#0000ff' }}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity> :
                <TouchableOpacity disabled={false} activeOpacity={0.6}
                    style={{ width: 200, height: 50, backgroundColor: '#00aaff' }}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

})

export default Button;