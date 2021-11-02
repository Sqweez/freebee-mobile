import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import colors from '../constants/colors'
import sizes from '../constants/sizes'

interface HeaderWithBackBtnType {
    back: () => void
    title?: string
}

const HeaderWithBackBtn = (props: HeaderWithBackBtnType) => (
    <Appbar.Header style={styles.container}>
        <Appbar.BackAction onPress={props.back} color={colors.accent} />
        {props.title && <Appbar.Content title={props.title} />}
    </Appbar.Header>
)

export default HeaderWithBackBtn

const styles = StyleSheet.create({
    container: {
        height: sizes.header,
        backgroundColor: '#fff',
        zIndex: 2,
    },
})
