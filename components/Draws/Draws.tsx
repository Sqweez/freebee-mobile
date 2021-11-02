import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import HTML from 'react-native-render-html'
import colors from '../../constants/colors'
import { Draw } from '../../types'
import Bold from '../Bold'
import DrawItem from './DrawItem'

interface DrawsProps {
    draws: Draw[] | null
    // 0 - Еженедельный. 1 - Главный
    type: 0 | 1
    rule: string
    loading: boolean
}

const Draws = (props: DrawsProps) => {
    const [draws, setDraws] = useState<Draw[] | undefined>(undefined)

    useEffect(() => {
        if (!props.loading) {
            const currentDraws = props.draws?.filter(({ type }) => type === props.type)
            setDraws(currentDraws)
        }
    }, [props.type, props.loading])

    if (props.loading) return null

    return (
        <>
            <ScrollView contentContainerStyle={styles.wrapper}>
                {draws?.map(draw => (
                    <DrawItem key={draw.id} {...draw} />
                ))}

                {!draws?.length && (
                    <View style={styles.rule}>
                        <Bold style={styles.noDraws}>Розыгрышей нет</Bold>
                        <View style={styles.title}>
                            <Ionicons
                                name="alert-circle-outline"
                                size={24}
                                color={colors.accent}
                                style={styles.titleIcon}
                            />
                            <Bold>Правила</Bold>
                        </View>
                        <HTML source={{ html: props.rule }} />
                    </View>
                )}
            </ScrollView>
        </>
    )
}

export default Draws

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
    rule: {
        backgroundColor: colors.bg.primary,
        padding: 16,
        borderRadius: 16,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIcon: {
        marginRight: 8,
    },
    noDraws: {
        marginBottom: 16,
        textAlign: 'center',
    },
})
