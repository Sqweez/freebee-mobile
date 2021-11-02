import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Draw } from '../../types'
import Card from '../Card'

const PrizesCard = (props: Draw & { last?: boolean }) => {
    return (
        <Card title="Призы" last={props.last}>
            {props.prizes.map((prize, index) => (
                <Text key={index}>
                    {index + 1}. {prize.prize_name}
                </Text>
            ))}
        </Card>
    )
}

const prizeEmoji = (place: number) => {
    switch (place) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
        default:
            return place
    }
}

export default PrizesCard

const styles = StyleSheet.create({})
