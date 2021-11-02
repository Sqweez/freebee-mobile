import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../constants/colors'
import useQuery from '../../hooks/useQuery'
import { Draw } from '../../types'
import Bold from '../Bold'
import GradientButton from '../GradientButton'

interface WinnersListProps {
    drawId: number
    hide: () => void
}

const WinnersList = (props: WinnersListProps) => {
    const [_, draw] = useQuery<Draw>('/client/get-draws', { id: props.drawId })

    return (
        <View style={styles.layout}>
            <ScrollView contentContainerStyle={styles.container}>
                {draw && (
                    <>
                        <View style={styles.title}>
                            <Ionicons
                                name="trophy-outline"
                                size={30}
                                color={colors.accent}
                                style={styles.titleIcon}
                            />
                            <Text style={styles.titleText}>Победители</Text>
                        </View>
                        {draw.prizes.map((prize, index) => (
                            <View style={styles.prize} key={prize.id}>
                                <Bold style={styles.text}>
                                    #{index + 1} {prize.prize_name}
                                </Bold>
                                <Text style={styles.text}>
                                    {prize.winner_id
                                        ? `${formatPhone(prize.winner_phone)} — ${
                                              prize.winner_name
                                          }`
                                        : 'Не определен'}
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>

            <View style={styles.hideWrapper}>
                <GradientButton onPress={props.hide}>Открыть розыгрыш</GradientButton>
            </View>
        </View>
    )
}

const formatPhone = (phone: string | null) => {
    if (!phone) return null

    const chars = phone.split('')
    return `+7 (***) ***-${chars[7]}${chars[8]}-${chars[9]}${chars[10]}`
}

export default WinnersList

const styles = StyleSheet.create({
    layout: {
        backgroundColor: colors.bg.drum,
        flex: 1,
    },
    container: {
        padding: 16,
    },
    prize: {
        marginBottom: 30,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    titleIcon: {
        marginRight: 16,
    },
    titleText: {
        color: colors.bg.primary,
        fontSize: 24,
    },
    text: {
        color: colors.bg.primary,
        fontSize: 24,
    },
    hideWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
})
