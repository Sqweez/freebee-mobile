import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import CardLink from '../components/CardLink'
import Layout from '../components/Layout'
import useQuery from '../hooks/useQuery'
import {Cities, Company} from '../types'
import colors from "../constants/colors";
// @ts-ignore
import Select2 from 'react-native-select-two'
import {useStateIfMounted} from "use-state-if-mounted";

const CompaniesScreen = () => {
    const [companiesLoading, companies] = useQuery<Company[]>('/companies/read')
    const [selectedCities, setSelectedCities] = useState<number[]>([])
    const [citiesLoading, cities] = useQuery<Cities[]>('/cities/read')
    const [_companies, setCompanies] = useStateIfMounted<Company[] | undefined>(undefined);

    useEffect(() => {
        setCompanies(companies?.filter(company => company.type === 1))

        if (selectedCities.length)
            setCompanies(
                _companies?.filter(partner => selectedCities.includes(parseInt(partner.city_id)))
            )
    }, [companiesLoading, selectedCities])

    return (
        <Layout title="Кассы" loading={[companiesLoading]}>
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
            {_companies?.map(
                ({ logo, name, id, type }, index) =>
                    type === 1 && (
                        <CardLink
                            to="CompanyScreen"
                            toArgs={{ id: id.toString() }}
                            title={name}
                            left={
                                <Image
                                    source={{
                                        uri: logo,
                                    }}
                                    style={styles.logo}
                                />
                            }
                            last={index + 1 === companies.length}
                            key={id}
                        />
                    )
            )}
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

export default CompaniesScreen
