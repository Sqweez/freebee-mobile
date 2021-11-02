import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import colors from '../constants/colors'
import { ButtonType } from '../types'

const TextButton = ({ onPress, children, btnStyle, textStyle, loading }: ButtonType.Text) => (
    <TouchableHighlight
        onPress={onPress}
        activeOpacity={1}
        underlayColor="rgba(255, 59, 48, .15)"
        style={[styles.wrapper, btnStyle]}
        disabled={loading}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <ActivityIndicator size="small" color="#fff" />}
            <Text style={[styles.btn, textStyle]}>{!loading ? children : 'Загрузка'}</Text>
        </View>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 4,
    },
    btn: {
        textAlign: 'center',
        padding: 16,
        color: colors.accent,
        fontSize: 16,
    },
})

export default TextButton
