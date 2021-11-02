import React from 'react'
import { StyleSheet } from 'react-native'
import { Card as PaperCard, Divider } from 'react-native-paper'

interface CardProps {
    children?: JSX.Element | (JSX.Element | boolean)[]
    title: string
    onPress?: () => void
    left?: () => JSX.Element
    last?: boolean
}

const Card = (props: CardProps) => {
    return (
        <PaperCard
            style={[styles.wrapper, props.last && { marginBottom: 0 }]}
            onPress={props.onPress}
        >
            <PaperCard.Title title={props.title} left={props.left} />

            {props.children && (
                <PaperCard.Content>
                    <Divider style={{ marginBottom: 8 }} />

                    {props.children}
                </PaperCard.Content>
            )}
        </PaperCard>
    )
}

export default Card

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 16,
        marginBottom: 16,
    },
})
