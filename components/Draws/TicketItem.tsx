import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../constants/colors'
import Card from '../Card'

interface TicketItemProps {
    company_id: number
    name: string
    weekly_tickets: number | string
    main_tickets: number | string
    logo: string
}

const TicketItem = (props: TicketItemProps) => {
    const { navigate } = useNavigation()

    const mainDrawTickets = props.main_tickets
        ? `Главный ${props.main_tickets} билет(-ов)`
        : `До главного купона осталось ${10 - +props.weekly_tickets} билет(-ов)`

    return (
        <TouchableOpacity
            onPress={() => navigate('CompanyScreen', { id: props.company_id })}
            activeOpacity={0.95}
        >
            <Card
                title={props.name}
                left={() => <Image source={{ uri: props.logo }} style={styles.logo} />}
            >
                <View>
                    <View style={styles.tickets}>
                        <Ionicons name="star" color={colors.accent} size={30} />
                        <Text style={styles.ticketText}>
                            Еженедельный {props.weekly_tickets} билет(-ов)
                        </Text>
                    </View>
                    <View style={styles.tickets}>
                        <Ionicons name="star" color={colors.accent} size={30} />
                        <Text style={styles.ticketText}>{mainDrawTickets}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default TicketItem

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 45,
        height: 45,
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    tickets: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ticketText: {
        marginHorizontal: 8,
    },
})
