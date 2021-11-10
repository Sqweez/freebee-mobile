import { useNavigation } from '@react-navigation/core'
import { BarCodeScanner } from 'expo-barcode-scanner'
import  BarcodeMask  from 'react-native-barcode-mask'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import useAsyncEffect from 'use-async-effect'
import api from '../api/api'
import GradientButton from '../components/GradientButton'
import { Preloader } from '../components/Layout'
import { useIsFocused } from '@react-navigation/native';
import useQuery from "../hooks/useQuery";
import {PersonalInfo} from "../types";
import Login from "../components/Auth/Login";


const ScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [scanned, setScanned] = useState(false)
    const [dataLoading, setLoading] = useState(false)
    const [scannerLoading, setScannerLoading] = useState(true)
    const [loading, info, error, callback] = useQuery<PersonalInfo>('client/info')
    const isFocused = useIsFocused();
    const { navigate } = useNavigation()

    useEffect(() => {
        (async () => {
                try {
                    setScannerLoading(true)

                    const { status } = await BarCodeScanner.requestPermissionsAsync()
                    setHasPermission(status === 'granted')
                } finally {
                    setScannerLoading(false)
                }
        })()
    }, [])

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        let qrData: { code: string; company_id: string, type?: string, amount?: number } | null

        try {
            qrData = JSON.parse(data)
        } catch {
            qrData = null
        }

        setScanned(true)


        let alertTitle = 'Ошибка' // ты
        let alertText = 'Неизвестная ошибка'
        let alertCloseText = 'Закрыть'
        let onAlertClose = () => setScanned(false)

        if (qrData) {
            if (qrData.hasOwnProperty('type') && qrData.type == 'write_off_qr') {
                // @ts-ignore
                setScanned(true);
                navigate('WriteOffScreen', qrData)
                setScanned(false);
                return true;
            }

            try {
                setLoading(true)

                alertTitle = 'Готово'

                const { bonus, type, tickets} = await api.useTicket({ code: qrData.code })
                const tenge = bonus / 2.5

                switch (type) {
                    case 0:
                        alertText = `Вам было начислено ${bonus} Freebee (${tenge} тенге)! И ${tickets} билет(-ов) на розыгрыш!`
                        break
                    case 1:
                        alertText = 'Вы получили билет на еженедельный розыгрыш!'
                        break
                    case 2:
                        alertText = `Вам было начислено ${bonus} Freebee (${tenge} тенге) без участия в розыгрыше!`
                }

                alertCloseText = 'Перейти к компании'
                onAlertClose = () => {
                    setScanned(false)
                    // Typescript ebanulsya
                    if(qrData){
                        navigate('CompanyScreen', { id: qrData.company_id })
                    }
                }
            } catch ({ response }) {
                if (response) {
                    if (response.status === 400) alertText = 'Билет уже активирован!'
                    if (response.status === 404) alertText = 'Билет не найден'
                }
            } finally {
                setLoading(false)
            }
        } else {
            alertText = 'Недопустимый qr'
        }

        Alert.alert(alertTitle, alertText, [
            {
                text: alertCloseText,
                onPress: onAlertClose,
            },
        ])
    }

    if (scannerLoading) {
        return <Preloader />
    }

    if (!hasPermission) {
        return (
            <View style={styles.centered}>
                <GradientButton
                    onPress={async () => await BarCodeScanner.requestPermissionsAsync()}
                >
                    Разрешить доступ к камере
                </GradientButton>
            </View>
        )
    }

    return (
        <>
            {dataLoading && <Preloader />}

            {
                isFocused && <BarCodeScanner
                onBarCodeScanned={!scanned ? handleBarCodeScanned : undefined}
                style={styles.scanner}
            >
                <BarcodeMask />
            </BarCodeScanner>
            }

        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    centered: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
})
export default ScannerScreen
