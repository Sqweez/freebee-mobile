import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import useAsyncEffect from 'use-async-effect'
import Bold from '../components/Bold'
import CardLink from '../components/CardLink'
import Header, { handleExit } from '../components/Header'
import Layout from '../components/Layout'
import colors from '../constants/colors'
import TokenContext from '../context/TokenContext'
import useQuery from '../hooks/useQuery'
import { normalizePhone } from '../normalizers'
import { PersonalInfo } from '../types'

const UserScreen = () => {
    const [loading, info, error, callback] = useQuery<PersonalInfo>('client/info')
    const { setTokens } = React.useContext(TokenContext)

    useAsyncEffect(async () => {
        // Fallback
        if (!loading && info === null) {
            await handleExit(setTokens)
            setTokens(false)
        }
    }, [loading])

    return (
        <Layout
            header={<Header exitBtn />}
            loading={[loading]}
            bgHeight={240}
            style={styles.container}
            refresh={loading}
            onRefresh={callback}
            static
        >
            <User name={info?.name} surname={info?.surname} login={info?.login} />
            <Balance balance={info?.balance} />

            <ScrollView
                contentContainerStyle={styles.cardsWrapper}
                showsVerticalScrollIndicator={false}
            >
                <CardLink
                    to="ChangePersonalDataScreen"
                    title="Личные данные"
                    subtitle="Настройки аккаунта"
                    left={<Icon name="person-circle-outline" />}
                />
                <CardLink
                    to="SecurityScreen"
                    title="Безопасность"
                    subtitle="Изменение пароля"
                    left={<Icon name="lock-closed" />}
                />
                <CardLink
                    to="PushSettingsScreen"
                    title="Push-уведомления"
                    subtitle="Настройки уведомлений"
                    left={<Icon name="notifications-circle-outline" />}
                />
                <CardLink
                    to="InfoScreen"
                    title="Справка"
                    subtitle="Контакты, справки"
                    left={<Icon name="information-circle-outline" />}
                    last
                />
            </ScrollView>
        </Layout>
    )
}

const Icon = ({ name }: { name: any }) => <Ionicons name={name} size={40} color={colors.accent} />

const Balance = ({ balance }: { balance?: number }) => (
    <View style={styles.balanceWrapper}>
        <View>
            <Text style={styles.balanceTitle}>{balance}</Text>
            <Bold style={styles.balanceSubTitle}>FreeBee</Bold>
        </View>
        <View>
            <Text style={styles.balanceTitle}>{(balance || 0) / 2.5}</Text>
            <Bold style={styles.balanceSubTitle}>Тенге</Bold>
        </View>
    </View>
)

const User = (props: { name?: string; surname?: string | null; login?: string }) => (
    <View style={styles.userInfo}>
        <Ionicons name="person-circle" size={120} color="#fff" />
        <Text style={styles.userName}>
            {props.name} {props.surname}
        </Text>
        <Text style={styles.userPhone}>{normalizePhone(props.login) || props.login}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 235,
        textAlign: 'center',
    },
    balanceWrapper: {
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 16,
        zIndex: 1,
    },
    balanceTitle: {
        fontSize: 20,
        color: colors.text.primary,
    },
    balanceSubTitle: {
        fontSize: 18,
        color: colors.text.primary,
        textAlign: 'center',
    },
    userName: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#fff',
    },
    userPhone: {
        fontSize: 17,
        color: '#fff',
    },
    cardsWrapper: {
        paddingVertical: 16,
    },
})

export default UserScreen
