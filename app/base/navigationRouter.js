import { StackNavigator } from 'react-navigation';

import { color } from '../styles'
import StartUpPage from './startUp'
import TabBarRouter from './tabBarRouter'
import TestPage from '../pages/test'

import {
    NativeWebViewIOS,
    QRScanner
} from '../components'

const NavigationRouter = StackNavigator(
    {
        //界面路由
        defaultSence: { screen: StartUpPage },
        tabBarSence: { screen: TabBarRouter },

        webSence: { screen: NativeWebViewIOS },
        qrScanSence: { screen: QRScanner },

        testSence: { screen: TestPage },
    },
    {
        mode: 'card',
        // headerMode: 'screen',
        navigationOptions: {
            headerTintColor: color.white,
            headerBackTitle: null,
            headerTruncatedBackTitle: null,
            headerStyle: {
                backgroundColor: color.navigationBlue,
            },
            headerTitleStyle: {
                alignSelf: 'center'
            },
            gesturesEnabled: true,
        }
    }
)

export default NavigationRouter;
