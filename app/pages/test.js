import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import * as api from '../api'
import { crypto, CryptoType } from '../utils'
import {
    PageControl,
    TabBarItem,
    Banner,
    QRScanner,
    GridItem,
    NativeWebViewIOS,
    GridView,
    GridViewType,
    NavigationItem,
    NavigationBar,
} from '../components'


class TestPage extends Component {
    render() {
        let banners = [{ imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }, { imageUrl: 'https://wap.cq.10086.cn/mall/ecrm/img/ecom/5076222890324376.jpg' }]

        return (
            <ScrollView style={{ marginTop: 20 }}>
                <Text>aaaa</Text>
                <Text>{crypto.MD5('aaa') + '\n' + CryptoType.CryptoType_AES}</Text>
                <PageControl numberOfPages={6} currentPage={3} />
                <NavigationBar leftItems={[<NavigationItem key={1} />, <NavigationItem key={2} />]}
                    rightItems={[<NavigationItem key={1} />]} />
                <Text>{api.VERSION_CHECK_URL2}</Text>
                <TabBarItem dot normalImage={require('../resources/images/home.png')} />
                <Banner bannerArray={banners} />
                {/* <QRScanner /> */}
                <GridItem image={require('../resources/images/menu_icon.png')} />
                <NativeWebViewIOS />
                <GridView gridArray={banners} type={GridViewType.GridViewType_Horizontal}
                    onItemClick={() => { alert('aa') }} />
                <NavigationItem />
            </ScrollView>
        );
    }
}

export default TestPage;