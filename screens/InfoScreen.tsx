import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { ComponentProps, memo } from 'react'
import InfoItem from '../components/Info/InfoItem'
import Layout from '../components/Layout'
import colors from '../constants/colors'

const InfoScreen = memo(() => (
    <Layout title="Справка">
        <InfoItem
            title="@sportbaraktau"
            link="https://t.me/sportbaraktau"
            icon={<FontAwesome5 name="telegram" size={30} color={colors.accent} />}
        />
        <InfoItem
            title="+7 (708) 915-22-74"
            link="https://wa.me/77089152274"
            icon={<Icon name="logo-whatsapp" />}
        />
        <InfoItem
            title="+7 (708) 915-22-74"
            link="tel:+77089152274"
            icon={<Icon name="call-outline" />}
        />
        <InfoItem
            title="mail@freebee.kz"
            link="mailto:mail@freebee.kz"
            icon={<Icon name="mail-outline" />}
        />
    </Layout>
))

const Icon = (props: { name: ComponentProps<typeof Ionicons>['name'] }) => (
    <Ionicons name={props.name} size={30} color={colors.accent} />
)

export default InfoScreen
