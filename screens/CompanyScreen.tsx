import { Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Dimensions, Image, Linking, StyleSheet, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { useStateIfMounted } from 'use-state-if-mounted'
import Card from '../components/Card'
import TicketItem from '../components/Draws/TicketItem'
import GradientButton from '../components/GradientButton'
import Layout from '../components/Layout'
import colors from '../constants/colors'
import useQuery from '../hooks/useQuery'
import { Company, RootStackParamList, Ticket } from '../types'

const CompanyScreen = () => {
    const { params } = useRoute<RouteProp<RootStackParamList, 'CompanyScreen'>>()
    const isFocused = useIsFocused()
    const [companyLoading, company, errorCompany, updateCompany] = useQuery<Company>(
        '/companies/read',
        { id: +params.id }
    )
    const [ticketsLoading, tickets, errorTickets, updateTickets] = useQuery<Ticket[]>(
        '/client/get-tickets'
    )
    const [weeklyTicketsCount, setWeeklyTicketsCount] = useStateIfMounted<string | number>('нет')
    const [mainTicketsCount, setMainTicketsCount] = useStateIfMounted<string | number>('нет')

    useEffect(() => {
        const ticket = tickets?.find(ticket => ticket.company_id === +params.id)

        if (ticket) {
            setWeeklyTicketsCount(ticket.weekly_tickets)
            setMainTicketsCount(ticket.main_tickets)
        }
    }, [ticketsLoading, isFocused])

    return (
        <Layout
            title={company?.name || 'Загрузка...'}
            loading={[companyLoading, ticketsLoading]}
            style={styles.container}
            noBg
            refresh={companyLoading && ticketsLoading}
            onRefresh={() => {
                updateCompany({ id: +params.id })
                updateTickets()
            }}
        >
            {company?.logo && (
                <AutoHeightImage
                    source={{
                        uri: company?.logo,
                    }}
                    width={Dimensions.get('screen').width}
                />
            )}

            <View style={styles.content}>
                {(company?.type === 1 && weeklyTicketsCount !== -1 && mainTicketsCount !== -1 && (
                    <TicketItem
                        company_id={company.id}
                        name={company.name}
                        logo={company.logo}
                        weekly_tickets={weeklyTicketsCount}
                        main_tickets={mainTicketsCount}
                    />
                )) || (
                    <Card
                        title={company?.name || 'Загрузка'}
                        left={() => (
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: company?.logo,
                                }}
                            />
                        )}
                    />
                )}
                <Card
                    title="Адрес"
                    left={() => <Ionicons name="map-outline" size={30} color={colors.accent} />}
                >
                    <Text
                        style={{ color: colors.accent }}
                        onPress={() => company && Linking.openURL(company['2gis_url'])}
                    >
                        Открыть в 2GIS
                    </Text>
                </Card>
                <View style={styles.callWrapper}>
                    <GradientButton
                        onPress={() => Linking.openURL(`tel:${company?.company_phone}`)}
                    >
                        Позвонить
                    </GradientButton>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 45,
        height: 45,
    },
    tickets: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        padding: 0,
    },
    content: {
        paddingHorizontal: 8,
        transform: [{ translateY: -30 }],
    },
    cardTitle: {
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 1,
        fontWeight: 'bold',
    },
    textRight: {
        textAlign: 'right',
        color: '#626262',
    },
    callWrapper: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: colors.bg.primary,
        borderRadius: 16,
    },
})

export default CompanyScreen
