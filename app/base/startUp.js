import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { constant } from '../utils'

class StartUp extends Component {
    static navigationOptions = {
        header: null,
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'tabBarSence',
                })],
            });
            this.props.navigation.dispatch(resetAction);
        }, 1000);
    }
    componentWillMount() {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <ImageBackground style={styles.imageContainer}
                source={require('../resources/images/lanuchimage.png')} />
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: constant.SCREEN_WIDTH,
        height: constant.SCREEN_HEIGHT
    },
});

export default StartUp;