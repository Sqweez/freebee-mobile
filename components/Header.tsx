import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Appbar, TouchableRipple } from 'react-native-paper'
import api from '../api/api'
import colors from '../constants/colors'
import sizes from '../constants/sizes'
import TokenContext from '../context/TokenContext'
// @ts-ignore
import Logo from './../assets/images/logo.png'

const Header = ({ exitBtn }: { exitBtn?: boolean }) => {
    return (
        <Appbar.Header style={styles.header}>
            <AutoHeightImage source={Logo} width={150} />
            {exitBtn && <ExitBtn />}
        </Appbar.Header>
    )
}

const ExitBtn = () => {
    const { setTokens } = useContext(TokenContext)

    return (
        <TouchableRipple
            onPress={() => {
                handleExit(setTokens)
            }}
            rippleColor="rgba(0, 0, 0, 0.15)"
            style={styles.exitBtn}
            borderless
        >
            <Ionicons name="exit-outline" color="#f4465e" size={30} />
        </TouchableRipple>
    )
}

export const handleExit = async (changeTokens: (token: boolean) => void) => {
    const refresh_token = await AsyncStorage.getItem('refresh_token')

    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('refresh_token')
    changeTokens(false)

    if (refresh_token) {
        await api.logout({ refresh_token })
    }
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.bg.primary,
        justifyContent: 'center',
        height: sizes.header,
        zIndex: 2,
    },
    exitBtn: {
        position: 'absolute',
        top: 5,
        right: 10,
        borderRadius: 50 / 2,
        padding: 10,
    },
})
