import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Mine extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>mine</Text>
            </View>
        );
    }
}

export default Mine;