import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { Card } from 'react-native-paper'
import colors from '../constants/colors'
import { RootStackParamList } from '../types'

interface CardLinkProps {
    to: keyof RootStackParamList
    toArgs?: { [key: string]: string }
    title: string
    subtitle?: string
    left: JSX.Element
    style?: StyleProp<ViewStyle>
    last?: boolean
}

const CardLink = (props: CardLinkProps) => {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigate(props.to, props.toArgs)} activeOpacity={0.95}>
            <Card.Title
                style={[styles.card, props.style, props.last && { marginBottom: 0 }]}
                title={props.title}
                subtitle={props.subtitle}
                left={() => props.left}
            />
        </TouchableOpacity>
    )
}

export default CardLink

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.bg.primary,
        borderRadius: 16,
        marginBottom: 16,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
})
