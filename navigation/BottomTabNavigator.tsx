import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import colors from '../constants/colors'
import sizes from '../constants/sizes'
import ChangePersonalDataScreen from '../screens/ChangePersonalDataScreen'
import CompaniesScreen from '../screens/CompaniesScreen'
import CompanyScreen from '../screens/CompanyScreen'
import DrawScreen from '../screens/DrawScreen'
import DrawsScreen from '../screens/DrawsScreen'
import HomeScreen from '../screens/HomeScreen'
import InfoScreen from '../screens/InfoScreen'
import NotificationScreen from '../screens/NotificationScreen'
import OtherCondition from '../screens/OtherConditionScreen'
import PartnersScreen from '../screens/PartnersScreen'
import PublicCondition from '../screens/PublicConditionScreen'
import PushSettingsScreen from '../screens/PushSettingsScreen'
import ScannerScreen from '../screens/ScannerScreen'
import SecurityScreen from '../screens/SecurityScreen'
import UserScreen from '../screens/UserScreen'
import WriteOffScreen from '../screens/WriteOffScreen'
import ReferalScreen from "../screens/ReferalScreen";

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: colors.accent,
                showLabel: false,
                style: {
                    height: sizes.bottomTabNavigator,
                },
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Scanner"
                component={ScannerNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="camera-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    )
}

interface TabBarIconProps {
    name: React.ComponentProps<typeof Ionicons>['name']
    color: string
}

function TabBarIcon(props: TabBarIconProps) {
    // Styling qr scanner button
    return props.name === 'camera-outline' ? (
        <CameraIcon {...props} />
    ) : (
        <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
    )
}

const CameraIcon = (props: TabBarIconProps) => (
    <TouchableRipple style={styles.cameraIconWrapper}>
        <Ionicons style={styles.cameraIcon} {...props} />
    </TouchableRipple>
)

const styles = StyleSheet.create({
    cameraIconWrapper: {
        borderRadius: 100,
        width: sizes.bottomTabNavigator + 10,
        height: sizes.bottomTabNavigator + 10,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: -3,
        color: colors.bg.primary,
        fontSize: 30,
    },
})

const HomeStack = createStackNavigator()

function HomeNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="PartnersScreen"
                component={PartnersScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="CompanyScreen"
                component={CompanyScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="WriteOffScreen"
                component={WriteOffScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="ReferalScreen"
                component={ReferalScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="DrawsScreen"
                component={DrawsScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="CompaniesScreen"
                component={CompaniesScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <HomeStack.Screen
                name="DrawScreen"
                component={DrawScreen}
                options={{ headerShown: false, animationEnabled: true }}
            />
        </HomeStack.Navigator>
    )
}

const ScannerStack = createStackNavigator()

function ScannerNavigator() {
    return (
        <ScannerStack.Navigator>
            <ScannerStack.Screen
                name="ScannerScreen"
                component={ScannerScreen}
                options={{ headerShown: false }}
            />
        </ScannerStack.Navigator>
    )
}

const UserStack = createStackNavigator()

function UserNavigator() {
    return (
        <UserStack.Navigator>
            <UserStack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="ChangePersonalDataScreen"
                component={ChangePersonalDataScreen}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="PushSettingsScreen"
                component={PushSettingsScreen}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="SecurityScreen"
                component={SecurityScreen}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="InfoScreen"
                component={InfoScreen}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="PublicCondition"
                component={PublicCondition}
                options={{ headerShown: false }}
            />
            <UserStack.Screen
                name="OtherCondition"
                component={OtherCondition}
                options={{ headerShown: false }}
            />
        </UserStack.Navigator>
    )
}
