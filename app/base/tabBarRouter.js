import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import { TabBarItem } from '../components'
import { color } from '../styles'
import HomePage from '../pages/home'
import MinePage from '../pages/mine'

const TabBarRouter = TabNavigator(
    {
        homeSence: {
            screen: HomePage,
            navigationOptions: {
                headerTitle: '主页',

                tabBarLabel: '首页',
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        dot={true}
                        normalImage={require('../resources/images/home.png')}
                        activityImage={require('../resources/images/home_selected.png')} />
                ),
                // tabBarOnPress: (({ route, index }, jumpToIndex) => {
                //     // console.log(route);        
                //     // alert(index);
                //     // 只有调用jumpToIndex方法之后才会真正的跳转页面。
                //     jumpToIndex(index);
                // }),
            }
        },
        mineSence: {
            screen: MinePage,
            navigationOptions: {
                headerTitle: '我的信息',

                tabBarLabel: '我的',
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        badge={110}
                        normalImage={require('../resources/images/home.png')}
                        activityImage={require('../resources/images/home_selected.png')} />
                ),
            }
        },
    },
    {
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.navigationBlue,
            inactiveTintColor: color.darkGray,
            scrollEnabled: false,
            showLabel: true,
            style: {
                backgroundColor: color.white,
            },
        }
    }
)

export default TabBarRouter;
