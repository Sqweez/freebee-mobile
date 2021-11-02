import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Draw } from '../../types'
import Card from '../Card'
import DateItem, { getDate, getHour } from './DateItem'

const CompanyCard = (props: Draw & { last?: boolean }) => {
    const { navigate } = useNavigation()

    const Logo = () => (
        <Image
            style={styles.logo}
            source={{
                uri: props.company_logo,
            }}
        />
    )

    return (
        <Card
            title={props.company_name}
            left={Logo}
            onPress={() => navigate('CompanyScreen', { id: props.company_id })}
            last={props.last}
        >
            <View style={styles.dates}>
                <DateItem icon="time-outline">{getHour(props.start_time)}</DateItem>
                <DateItem icon="calendar-outline">{getDate(props.start_time)}</DateItem>
            </View>
        </Card>
    )
}

export default CompanyCard

const styles = StyleSheet.create({
    logo: {
        width: 45,
        height: 45,
    },
    dates: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
