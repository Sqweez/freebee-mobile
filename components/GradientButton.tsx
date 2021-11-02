import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, TouchableRipple } from 'react-native-paper'
import colors from '../constants/colors'
import { ButtonType } from '../types'

const GradientButton = (props: ButtonType.Gradient) => (
    <LinearGradient
        colors={!props.loading ? props.colors || ['#f4465e', '#f46f46'] : ['#aaa', '#bbb']}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 0.0, x: 1.0 }}
        style={[styles.wrapper, props.style]}
    >
        <TouchableRipple
            onPress={() => !props.loading && props.onPress()}
            rippleColor={colors.ripple}
            disabled={props.loading}
        >
            <View style={styles.btnText}>
                {props.loading && <ActivityIndicator size="small" color="#fff" />}
                <Text style={styles.btn}>{!props.loading ? props.children : 'Загрузка'}</Text>
            </View>
        </TouchableRipple>
    </LinearGradient>
)

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 4,
    },
    btn: {
        textAlign: 'center',
        padding: 16,
        color: colors.bg.secondary,
        fontSize: 16,
    },
    btnText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default GradientButton
