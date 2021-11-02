// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import TokenContext from '../context/TokenContext'
import AuthScreen from '../screens/AuthScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import PasswordResetScreen from '../screens/PasswordResetScreen'
import { RootStackParamList } from '../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'

const Navigation = () => (
    <NavigationContainer linking={LinkingConfiguration}>
        <RootNavigator />
    </NavigationContainer>
)

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    const [loading, setLoading] = useState(true)
    const [tokens, setTokens] = useState(false)

    useAsyncEffect(async () => {
        try {
            setLoading(true)

            const accessToken = await AsyncStorage.getItem('access_token')
            const refreshToken = await AsyncStorage.getItem('refresh_token')

            setTokens(!!accessToken && !!refreshToken)
        } finally {
            setLoading(false)
        }
    }, [])

    if (loading) return null

    return (
        <TokenContext.Provider value={{ tokens, setTokens }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!tokens ? (
                    <>
                        <Stack.Screen name="Auth" component={AuthScreen} />
                        <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Root" component={BottomTabNavigator} />
                )}
                <Stack.Screen
                    name="NotFound"
                    component={NotFoundScreen}
                    options={{ title: 'Oops!' }}
                />
            </Stack.Navigator>
        </TokenContext.Provider>
    )
}

export default Navigation
