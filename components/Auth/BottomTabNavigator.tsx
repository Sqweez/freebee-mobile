import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

interface BottoTabNavigatorProps {
    active: number
    setActive: (active: number) => void
}

const BottoTabNavigator = (props: BottoTabNavigatorProps) => {
    return (
        <View style={styles.container}>
            <Tab active={props.active === 0} onPress={() => props.setActive(0)}>
                Вход
            </Tab>
            <Tab active={props.active === 1} onPress={() => props.setActive(1)}>
                Регистрация
            </Tab>
        </View>
    )
}

interface TabProps {
    active: boolean
    onPress: () => void
    children: string
}

const Tab = (props: TabProps) => {
    const activeStyle = props.active && { color: colors.accent }

    return (
        <View style={styles.tab}>
            <Text style={[styles.tabText, activeStyle]} onPress={props.onPress}>
                {props.children}
            </Text>
        </View>
    )
}

export default BottoTabNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.bg.primary,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    tab: {
        width: '50%',
        height: 44,
        justifyContent: 'center',
    },
    tabText: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.text.secondary,
    },
})
