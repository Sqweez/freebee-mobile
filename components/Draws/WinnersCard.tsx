import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { Draw } from '../../types'
import Card from '../Card'

const WinnersCard = (props: Draw & { last?: boolean }) => {
    return (
        <Card title="Победители" last={props.last}>
            <View style={styles.wrapper}>
                <View>
                    {props?.prizes.map((_, index) => (
                        <Text key={index}>{index + 1}</Text>
                    ))}
                </View>
                <View>
                    {props?.prizes.map(prize => (
                        <Text
                            style={[
                                styles.textRight,
                                !prize.winner_name && { color: colors.text.secondary },
                            ]}
                            key={prize.id}
                        >
                            {prize.winner_name || 'Не определен'}
                        </Text>
                    ))}
                </View>
            </View>
        </Card>
    )
}

export default WinnersCard

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textRight: {
        textAlign: 'right',
    },
})
