import React from 'react'
import { StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import DrawSwitch from '../components/PushSettings/DrawSwitch'
import useQuery from '../hooks/useQuery'
import { PersonalInfo } from '../types'

const PushSettingsScreen = () => {
    const [personalInfoLoading, personalInfo] = useQuery<PersonalInfo>('/client/info')

    return (
        <Layout title="Push-уведомления" loading={[personalInfoLoading]} style={styles.container}>
            <DrawSwitch {...personalInfo} />
        </Layout>
    )
}

export default PushSettingsScreen

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
})
