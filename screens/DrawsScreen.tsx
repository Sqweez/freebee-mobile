import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Categories from '../components/Draws/Categories'
import Draws from '../components/Draws/Draws'
import Tickets from '../components/Draws/Tickets'
import Layout from '../components/Layout'
import useQuery from '../hooks/useQuery'
import { Draw, Ticket } from '../types'

const DrawsScreen = () => {
    // 0 - Еженедельный. 1 - Главный. 2 - Купоны
    const [type, setType] = useState<0 | 1 | 2>(0)
    const [drawsLoading, draws, drawErr, drawUpdate] = useQuery<Draw[]>('/client/get-draws')
    const [ticketsLoading, tickets, ticketsErr, ticketsUpdate] = useQuery<Ticket[]>(
        '/client/get-tickets'
    )
    console.log(tickets)

    // Правила всех видов (еженедельный и главный) розыгрышей
    const [rulesLoading, rule, ruleErr, ruleUpdate] = useQuery<string>('/text-rules/read', {
        id: 2,
    })

    return (
        <Layout
            title="Розыгрыши"
            loading={[drawsLoading, ticketsLoading, rulesLoading]}
            style={styles.container}
            refresh={drawsLoading && ticketsLoading && rulesLoading}
            onRefresh={() => {
                drawUpdate()
                ticketsUpdate()
                ruleUpdate({ id: 2 })
            }}
            static
        >
            <Categories active={type} setActive={setType} />

            {(type === 0 || type === 1) && rule && (
                <Draws draws={draws} type={type} rule={rule} loading={drawsLoading} />
            )}
            {type === 2 && <Tickets tickets={tickets} />}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
})

export default DrawsScreen
