import React from 'react'
import { StyleSheet, Text } from 'react-native'
import HTML from 'react-native-render-html'
import Layout from '../components/Layout'
import useQuery from '../hooks/useQuery'
import { Condition } from '../types'

const PublicConditionScreen = () => {
    const [loading, condition] = useQuery<Condition>('/conditions/read', { id: 1 })

    return (
        <Layout title="Договор публичной оферты" loading={[loading]}>
            <Text style={styles.title}>Условия использования</Text>
            <Text style={styles.title}>
                {condition?.text && <HTML source={{ html: condition?.text }} />}
            </Text>
        </Layout>
    )
}

export default PublicConditionScreen

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 22,
    },
    content: {
        marginTop: 20,
        fontSize: 18,
        padding: 16,
    },
})
