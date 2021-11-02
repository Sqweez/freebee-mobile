import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch as SwitchBtn } from 'react-native-paper'
import colors from '../../constants/colors'

interface SwitchProps {
    children: string
    on: boolean
    toggle: (on: boolean) => void
}

const Switch = (props: SwitchProps) => {
    return (
        <View style={styles.switchItem}>
            <Text>{props.children}</Text>
            <SwitchBtn value={props.on} onValueChange={props.toggle} color={colors.accent} />
        </View>
    )
}

export default Switch

const styles = StyleSheet.create({
    switchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.bg.primary,
    },
})
