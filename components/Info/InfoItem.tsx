import { Ionicons } from '@expo/vector-icons'
import React, { memo } from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import colors from '../../constants/colors'

interface InfoItemProps {
    icon: React.ReactNode
    title: string
    link: string
}

const InfoItem = memo((props: InfoItemProps) => (
    <TouchableOpacity
        style={styles.wrapper}
        onPress={() => Linking.openURL(props.link)}
        activeOpacity={0.95}
    >
        <Card.Title
            title={props.title}
            left={() => props.icon}
            right={() => (
                <Ionicons
                    name="chevron-forward-circle-outline"
                    size={30}
                    color={colors.text.secondary}
                />
            )}
            style={styles.title}
        />
    </TouchableOpacity>
))

export default InfoItem

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: colors.bg.primary,
    },
    title: {
        paddingRight: 16,
    },
})
