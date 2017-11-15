import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <Text onPress={() => {
                    this.props.navigation.navigate('testSence')
                }}>跳转Test</Text>
                <Text onPress={() => {
                    this.props.navigation.navigate('webSence', {
                        url: 'http://wwww.baidu.com'
                    })
                }}>跳转Web</Text>
                <Text onPress={() => {
                    this.props.navigation.navigate('qrScanSence')
                }}>跳转二维码扫码</Text>
            </View>
        );
    }
}

export default Home;