import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import * as api from '../api'
import { crypto, CryptoType } from '../utils'
import {
    PageControl,
    TabBarItem,
    Banner,
    Button,
    QRScanner,
} from '../components'


class TestPage extends Component {
    state = {}
    render() {
        return (
            <ScrollView style={{ marginTop: 20 }}>
                <Text>aaaa</Text>
                <Text>{crypto.MD5('aaa') + '\n' + CryptoType.CryptoType_AES}</Text>
                <PageControl numberOfPages={6} currentPage={3} />
                <Text>{api.VERSION_CHECK_URL2}</Text>
                <TabBarItem dot normalImage={require('../resources/images/home.png')} />
                <Banner />
                <Button />
                {/* <QRScanner /> */}

            </ScrollView>
        );
    }
}

export default TestPage;