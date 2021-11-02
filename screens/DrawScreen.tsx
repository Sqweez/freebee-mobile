import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useRoute } from '@react-navigation/core'
import Timer from 'easytimer.js'
import moment from 'moment'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import useAsyncEffect from 'use-async-effect'
import { useStateIfMounted } from 'use-state-if-mounted'
import CompanyCard from '../components/Draws/CompanyCard'
import InfoCard from '../components/Draws/InfoCard'
import PrizesCard from '../components/Draws/PrizesCard'
import WinnersCard from '../components/Draws/WinnersCard'
import WinnersList from '../components/Draws/WinnersList'
import Layout from '../components/Layout'
import colors from '../constants/colors'
import useQuery from '../hooks/useQuery'
import { Draw, RootStackParamList } from '../types'
import Bold from "../components/Bold";

const timer = new Timer()

const drumTimeout = 5300

const timerLabelInitial = '00:00:00:00'

const DrawScreen = () => {
    const { params } = useRoute<RouteProp<RootStackParamList, 'DrawScreen'>>()
    const [loading, draw, err, updateDraw] = useQuery<Draw>('/client/get-draws', { id: params.id })

    const [timerLabel, setTimerLabel] = useStateIfMounted(timerLabelInitial)
    const [showDrum, setShowDrum] = useStateIfMounted(false)
    const [showWinners, setShowWinners] = useStateIfMounted(false)
    const [viewed, setViewed] = useState(false)
    const [viewedLoading, setViewedLoading] = useState(true)

    useAsyncEffect(async () => {
        setTimerLabel(timerLabelInitial)

        if (draw && timerLabel === timerLabelInitial) {
            try {
                const viewed = (await AsyncStorage.getItem(`fw_d_${draw.id}`)) === '1'

                // Если пользователь уже заходил и розыгрыш прошел
                if (viewed && draw.completed) {
                    setViewed(true)
                    setShowWinners(true)
                } else if (!viewed && draw.completed) {
                    setShowDrum(true)

                    const timeout = setTimeout(() => {
                        setShowDrum(false)
                        setShowWinners(true)
                        AsyncStorage.setItem(`fw_d_${draw.id}`, '1')
                    }, drumTimeout)

                    return () => {
                        timer.stop()
                        clearTimeout(timeout)
                    }
                } else {
                    const diffTime = draw.start_time - moment().unix() - 4
                    const time = moment.duration(diffTime * 1000, 'milliseconds')

                    timer.start({
                        countdown: true,
                        startValues: {
                            days: time.days(),
                            hours: time.hours(),
                            minutes: time.minutes(),
                            seconds: time.seconds(),
                        },
                    })

                    const timerTick = () => {
                        setTimerLabel(
                            timer.getTimeValues().toString(['days', 'hours', 'minutes', 'seconds'])
                        )
                    }

                    timerTick()

                    timer.addEventListener('secondsUpdated', timerTick)

                    const showDrum = () => {
                        setShowDrum(true)

                        setTimeout(() => {
                            setShowDrum(false)
                            setShowWinners(true)
                            AsyncStorage.setItem(`fw_d_${draw.id}`, '1')
                        }, drumTimeout)
                    }

                    timer.addEventListener('targetAchieved', showDrum)

                    return () => {
                        timer.stop()
                        timer.removeEventListener('targetAchieved', showDrum)
                        timer.removeEventListener('secondsUpdated', timerTick)
                    }
                }
            } finally {
                setViewedLoading(false)
            }
        }
    }, [draw])

    return (
        <Layout
            title={draw?.company_name || 'Загрузка...'}
            loading={[loading]}
            style={styles.container}
            static={showWinners}
            noBg
        >
            {draw && !viewedLoading && (
                <>
                    {!showWinners ? (
                        <>
                            {(!draw.completed && !draw.hasOwnProperty('show_timer')) &&
                            <>
                                <Text style={styles.timerLabel}>{timerLabel}</Text>
                                <View style={styles.timerTitle}>
                                    <Bold style={styles.timerTitleItem}>Дней</Bold>
                                    <Bold style={styles.timerTitleItem}>Часов</Bold>
                                    <Bold style={styles.timerTitleItem}>Минут</Bold>
                                    <Bold style={styles.timerTitleItem}>Секунд</Bold>
                                </View>
                            </>

                            }

                            <AutoHeightImage
                                source={{ uri: draw?.banner }}
                                width={Dimensions.get('screen').width}
                            />

                            <View style={styles.cards}>
                                <CompanyCard {...draw} />
                                <InfoCard {...draw} />
                                <PrizesCard {...draw} />
                                <WinnersCard {...draw} last />
                            </View>
                        </>
                    ) : (
                        <WinnersList
                            drawId={draw.id}
                            hide={() => {
                                setShowWinners(false)
                            }}
                        />
                    )}

                    {!viewed && showDrum && (
                        <View style={styles.drumWrapper}>
                            <AutoHeightImage
                                source={require('../assets/images/loader.gif')}
                                style={styles.drum}
                                width={Dimensions.get('screen').width + 300}
                            />
                        </View>
                    )}
                </>
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    cards: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        transform: [{ translateY: -10 }],
    },
    timerLabel: {
        fontSize: 63,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#000',
        height: 70,
        color: '#ffffff',
        paddingTop: 10,
        fontFamily: 'timer',
        letterSpacing: 7
    },
    drumWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.bg.drum,
    },
    drum: {
        transform: [{ translateY: 6 }, { translateX: 10 }],
    },
    drumCounter: {
        position: 'absolute',
        fontSize: 30,
        zIndex: 1,
        fontWeight: 'bold',
        color: colors.accent,
    },
    timerTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: '1%',
        textAlign: 'center',
        backgroundColor: '#393939',
    },
    timerTitleItem: {
        color: '#b1b1b1',
        marginBottom: '1%',
        fontFamily: 'timer',
    }
})

export default DrawScreen
