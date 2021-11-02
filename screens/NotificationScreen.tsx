import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FallbackAlert from '../components/FallbackAlert'
import Layout from '../components/Layout'
import colors from '../constants/colors'
import useQuery from '../hooks/useQuery'
import { Notification } from '../types'

const NotificationList = () => {
    const [loading, notifications, error, updateNotifications] = useQuery<Notification[]>(
        '/client/get-notifications'
    )
    const [notificationDates, setNotificationDates] = useState<string[]>([])

    useEffect(() => {
        if (notifications) {
            let notificationsDatesAll: string[] = []

            notifications.map(
                ({ created_at }) =>
                    (notificationsDatesAll = [...notificationsDatesAll, formatDate(created_at)])
            )

            notificationsDatesAll = [...new Set(notificationsDatesAll)]

            setNotificationDates(notificationsDatesAll)
        }
    }, [notifications])

    return (
        <Layout
            title="Уведомления"
            loading={[loading]}
            noBg
            refresh={loading}
            onRefresh={updateNotifications}
        >
            {notificationDates.map((date, index) => (
                <View style={index + 1 !== notificationDates.length && styles.section} key={index}>
                    <Text style={styles.date}>{date}</Text>

                    {notifications?.map(
                        notification =>
                            date === formatDate(notification.created_at) && (
                                <NotificationItem key={notification.id} {...notification} />
                            )
                    )}
                </View>
            ))}

            {!notifications?.length && <FallbackAlert>Уведомлений нет</FallbackAlert>}
        </Layout>
    )
}

const NotificationItem = memo((props: Notification) => {
    const type = props.type === 1 ? 'Пополнение' : 'Списание'
    const createdTime = moment(props.created_at).format('H:mm')
    const sum = props.currency === 'freebee' ? props.sum : props.sum / 2.5;
    const currency = props.currency === 'freebee' ? 'Freebee' : 'Тенге';

    return (
        <>
            <View style={styles.item}>
                <NotificationText>
                    {type}: {sum} {currency}
                </NotificationText>
                <NotificationText>
                    {props.company_name || 'Название компании недоступно'}
                </NotificationText>
                {props.current_balance ? (
                    <NotificationText>Доступно: {props.current_balance} Freebee</NotificationText>
                ) : null}
            </View>
            <Text style={styles.time}>{createdTime}</Text>
        </>
    )
})

const NotificationText = (props: { children: (string | number) | (number | string)[] }) => (
    <Text style={styles.itemText}>{props.children}</Text>
)

const formatDate = (date: string) => moment(date).format('DD.MM.YYYY')

const styles = StyleSheet.create({
    section: {
        marginBottom: 16,
    },
    date: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#e5e5ea',
        borderRadius: 16,
        marginTop: 10,
        padding: 10,
    },
    itemText: {
        fontSize: 18,
        marginBottom: 8,
        color: colors.text.primary,
    },
    time: {
        fontSize: 14,
        color: colors.text.secondary,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 16,
    },
})

export default NotificationList
