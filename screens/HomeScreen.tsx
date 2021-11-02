import {Ionicons} from '@expo/vector-icons'
import React from 'react'
import CardLink from '../components/CardLink'
import Header from '../components/Header'
import Layout from '../components/Layout'
import colors from '../constants/colors'

const HomeScreen = () => (
    <Layout header={<Header/>}>
        <CardLink
            to="User"
            title="Мой аккаунт"
            subtitle="Настройки аккаунта"
            left={<Icon name="person-circle-outline"/>}
        />
        <CardLink
            to="PartnersScreen"
            title="Наши партнёры"
            subtitle="Список заведений и магазинов"
            left={<Icon name="people-outline"/>}
        />
        <CardLink
            to="DrawsScreen"
            title="Розыгрыши"
            subtitle="Окно розыгрышей"
            left={<Icon name="ribbon-outline"/>}
        />
        <CardLink
            to="CompaniesScreen"
            title="Кассы"
            subtitle="Кассы пополнения БК"
            left={<Icon name="cash-outline"/>}
        />
        <CardLink
            to="NotificationScreen"
            title="Уведомления"
            subtitle="Оповещение о балансе"
            left={<Icon name="chatbox-ellipses-outline"/>}
        />
        <CardLink
            to="ReferalScreen"
            subtitle="Реферальная ссылка"
            title="Ваш промокод"
            left={<Icon name="barcode-outline"/>}
            last
        />
    </Layout>
)

const Icon = (props: { name: React.ComponentProps<typeof Ionicons>['name'] }) => (
    <Ionicons name={props.name} size={40} color={colors.accent}/>
)

export default HomeScreen
