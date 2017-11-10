import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api, { VERSION_CHECK_URL } from '../api'

class TestPage extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>aaaa</Text>
            </View>
        );
    }
}

export default TestPage;