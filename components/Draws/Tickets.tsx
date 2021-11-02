import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Ticket } from '../../types'
import FallbackAlert from '../FallbackAlert'
import TicketItem from './TicketItem'

interface TicketsProps {
    tickets: Ticket[] | null
}

const Tickets = (props: TicketsProps) => {
    return (
        <>
            <ScrollView contentContainerStyle={styles.wrapper}>
                {props.tickets?.map((ticket, index) => (
                    <TicketItem key={index} {...ticket} />
                ))}
            </ScrollView>

            {!props.tickets?.length && <FallbackAlert>Купонов нет</FallbackAlert>}
        </>
    )
}

export default Tickets

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
})
