
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width

/**
 * 轮播图
 * 
 * @class Banner
 * @extends {Component}
 */
class Banner extends Component {
    static defaultProps = {
        bannerArray: [{ imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5051848590046038.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5051848590046038.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5051848590046038.jpg' }, { imageUrl: 'http://wap.cq.10086.cn/mall/ecrm/img/ecom/5051848590046038.jpg' },],//图片地址必须是imageUrl作为key
        onItemClick: (info, i) => { },
        defaultImage: null,

        autoplayTime: 2,
        autoplay: true,

        dotColor: '#d3d3d3',
        activeDotColor: '#808080',
    };

    render() {
        const { bannerArray, onItemClick, defaultImage } = this.props
        let bannerImages = bannerArray.map(
            (info, i) => {
                return (
                    <TouchableOpacity key={i}
                        activeOpacity={0.8}
                        onPress={() => { onItemClick(info, i) }}>
                        <Image source={{ uri: info.imageUrl }}
                            resizeMode='contain'
                            defaultSource={defaultImage}
                            style={styles.imageItem} />
                    </TouchableOpacity>
                )
            }
        )
        const { autoplay, autoplayTime, dotColor, activeDotColor } = this.props
        return (
            <View style={styles.container}>
                <Swiper autoplay={autoplay}
                    autoplayTimeout={autoplayTime}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                    dotColor={dotColor}
                    activeDotColor={activeDotColor}>
                    {bannerImages}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 3 + 5,
        backgroundColor: '#fff',
    },
    imageItem: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 3,
        backgroundColor: 'transparent',
    },
    dot: {
        marginBottom: -30
    },
    activeDot: {
        marginBottom: -30
    }

})

export default Banner;