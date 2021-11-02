import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

interface BoldProps {
    children?: string | number | null | (string | number | null)[]
    style?: StyleProp<TextStyle>
}

const Bold = (props: BoldProps) => (
    <Text style={[props.style, { fontWeight: 'bold' }]}>{props.children}</Text>
)

export default Bold
