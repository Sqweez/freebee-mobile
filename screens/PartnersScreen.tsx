import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
// @ts-ignore
import Select2 from 'react-native-select-two'
import { useStateIfMounted } from 'use-state-if-mounted'
import CardLink from '../components/CardLink'
import FallbackAlert from '../components/FallbackAlert'
import Layout from '../components/Layout'
import colors from '../constants/colors'
import useQuery from '../hooks/useQuery'
import { Cities, Company } from '../types'

const PartnersScreen = () => {
    const [selectedCities, setSelectedCities] = useState<number[]>([])
    const [companiesLoading, companies] = useQuery<Company[]>('/companies/read')
    const [citiesLoading, cities] = useQuery<Cities[]>('/cities/read')
    const [partners, setPartners] = useStateIfMounted<Company[] | undefined>(undefined)

    useEffect(() => {
        setPartners(companies?.filter(company => company.type === 2))

        if (selectedCities.length)
            setPartners(
                partners?.filter(partner => selectedCities.includes(parseInt(partner.city_id)))
            )
    }, [companiesLoading, selectedCities])

    return (
        <Layout title="Наши партнеры" loading={[companiesLoading, citiesLoading]}>
            <View>
                <Select2
                    style={styles.picker}
                    selectedTitleStyle={styles.pickerSelected}
                    colorTheme={colors.accent}
                    popupTitle="Выберите город"
                    title="Выберите город"
                    data={cities || []}
                    onSelect={(data: number[]) => {
                        setSelectedCities(data)
                    }}
                    onRemoveItem={(data: number[]) => {
                        setSelectedCities(data)
                    }}
                    showSearchBox={false}
                    cancelButtonText="Отмена"
                    selectButtonText="Выбрать"
                />
            </View>

            {partners?.map(({ logo, name, id }, index) => (
                <CardLink
                    to="CompanyScreen"
                    toArgs={{ id: id.toString() }}
                    title={name}
                    left={<Image source={{ uri: logo }} style={styles.logo} />}
                    last={index + 1 === partners.length}
                    key={id}
                />
            ))}

            {!partners?.length && <FallbackAlert>Партнеры отсутствуют</FallbackAlert>}
        </Layout>
    )
}

const styles = StyleSheet.create({
    picker: {
        marginBottom: 15,
        borderRadius: 16,
        color: colors.text.primary,
        backgroundColor: colors.bg.primary,
    },
    pickerSelected: {
        backgroundColor: colors.bg.secondary,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
})

export default PartnersScreen
