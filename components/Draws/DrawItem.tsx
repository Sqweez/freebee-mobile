import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Card, Divider, Paragraph } from 'react-native-paper'
import { Draw } from '../../types'
import Bold from '../Bold'
import DateItem, { getDate, getHour } from './DateItem'

const DrawItem = (props: Draw) => {
    const { navigate } = useNavigation()

    const Logo = () => (
        <Image
            style={{ width: 45, height: 45 }}
            source={{
                uri: props.company_logo,
            }}
        />
    )

    return (
        <Card style={styles.wrapper} onPress={() => navigate('DrawScreen', { id: props.id })}>
            <Card.Title title={props.company_name} left={Logo} />

            <AutoHeightImage
                source={{ uri: props.banner }}
                // 60 - Это padding 30 по бокам
                width={Dimensions.get('screen').width - 32}
            />

            <Card.Content>
                <View style={styles.dateTimeContainer}>
                    <DateItem icon="time-outline">{getHour(props.start_time)}</DateItem>
                    <DateItem icon="calendar-outline">{getDate(props.start_time)}</DateItem>
                </View>

                <Divider style={{ marginBottom: 8 }} />

                <View>
                    <Bold>{props.title}</Bold>
                    <Paragraph numberOfLines={5}>{props.description}</Paragraph>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dateTimeWrapper: {
        flexDirection: 'row',
    },
    icon: {
        color: '#f4465e',
        marginRight: 5,
    },
    wrapper: {
        marginBottom: 16,
        borderRadius: 16,
    },
})

export default DrawItem
