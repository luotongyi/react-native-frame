
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
        bannerArray: [],//图片地址必须是imageUrl作为key
        onItemClick: (info, i) => { },
        defaultImage: null,

        imageStyle: { width: SCREEN_WIDTH, height: SCREEN_WIDTH / 3 },
        swipeStyle: { width: SCREEN_WIDTH, height: SCREEN_WIDTH / 3 + 5 },

        autoplayTime: 2,
        autoplay: true,

        dotColor: '#d3d3d3',
        activeDotColor: '#808080',
    };

    render() {
        const { bannerArray, onItemClick, defaultImage, imageStyle, swipeStyle } = this.props
        let bannerImages = bannerArray.map(
            (info, i) => {
                return (
                    <TouchableOpacity key={i}
                        activeOpacity={0.8}
                        onPress={() => { onItemClick(info, i) }}>
                        <Image source={{ uri: info.imageUrl }}
                            resizeMode='contain'
                            defaultSource={defaultImage}
                            style={[imageStyle, styles.imageItem]} />
                    </TouchableOpacity>
                )
            }
        )
        const { autoplay, autoplayTime, dotColor, activeDotColor } = this.props
        return (
            <View style={[swipeStyle, styles.container]}>
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
        backgroundColor: '#fff',
    },
    imageItem: {
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