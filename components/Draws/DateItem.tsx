import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'

interface DateItemProps {
    icon: ComponentProps<typeof Ionicons>['name']
    children: string | null
}

const DateItem = (props: DateItemProps) => (
    <View style={styles.wrapper}>
        <Ionicons color={colors.accent} name={props.icon} size={20} style={styles.text} />
        <Text style={{ color: colors.accent }}>{props.children}</Text>
    </View>
)

export const getDate = (time?: number) => (time ? moment.unix(time).format('DD.MM.YYYY') : null)
export const getHour = (time?: number) => (time ? moment.unix(time).format('HH:mm') : null)

export default DateItem

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginRight: 5,
    },
})
