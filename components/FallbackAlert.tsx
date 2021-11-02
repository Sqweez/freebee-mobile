import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import colors from '../constants/colors'

const FallbackAlert = ({ children }: { children: string }) => (
    <View style={styles.container}>
        <FallbackAlertText>{children}</FallbackAlertText>
    </View>
)

export const FallbackAlertText = (props: { children: string; style?: StyleProp<TextStyle> }) => (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
)

export default FallbackAlert

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        backgroundColor: colors.accent90,
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: colors.bg.primary,
        borderRadius: 16,
    },
})
