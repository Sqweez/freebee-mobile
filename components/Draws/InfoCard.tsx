import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper'
import colors from '../../constants/colors'
import { Draw } from '../../types'
import Card from '../Card'

const InfoCard = (props: Draw & { last?: boolean }) => {
    const [numOfLines, setNumOfLines] = useState<number | undefined>(5)
    const [textIsLong, setTextIsLong] = useState(false)

    const toggleDescription = () => {
        numOfLines === 5 ? setNumOfLines(undefined) : setNumOfLines(5)
    }

    const onTextLayout = useCallback(({ nativeEvent }) => {
        setTextIsLong(nativeEvent.lines.length > 5)
    }, [])

    return (
        <Card title={props.title} onPress={toggleDescription} last={props.last}>
            <Paragraph numberOfLines={numOfLines} onTextLayout={onTextLayout}>
                {props.description}
            </Paragraph>
            {textIsLong && (
                <>
                    {numOfLines === 5 && (
                        <Paragraph style={styles.link}>Показать полность</Paragraph>
                    )}
                    {numOfLines === undefined && (
                        <Paragraph style={styles.link}>Свернуть</Paragraph>
                    )}
                </>
            )}
        </Card>
    )
}

export default InfoCard

const styles = StyleSheet.create({
    link: {
        color: colors.text.secondary,
        fontWeight: 'bold',
    },
})
