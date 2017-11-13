import { Dimensions, Platform } from 'react-native';

/**
 * 常用的常量定义
 */
export default {
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    OS_TYPE: Platform.OS,//'ios' | 'android' | 'windows' | 'web'
    OS_VERSION: Platform.Version,
    IS_IOS: Platform.OS == 'ios' ? true : false,//只考虑iOS和android
}