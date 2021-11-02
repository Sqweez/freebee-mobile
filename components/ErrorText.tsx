import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const ErrorText = ({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) => {
    const { colors } = useTheme()

    return <Text style={[style, styles.errorText, { color: colors.danger }]}>{children}</Text>
}

const styles = StyleSheet.create({
    errorText: {},
})

export default ErrorText
