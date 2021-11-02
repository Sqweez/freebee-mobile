import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import colors from '../constants/colors'

interface SnackProps {
    show: boolean
    close: () => void
    children: string
}

const Snack = (props: SnackProps) => (
    <View style={styles.snackWrapper}>
        <Snackbar visible={props.show} onDismiss={props.close} style={styles.snack}>
            <View style={styles.snackText}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color={colors.bg.primary}
                    style={styles.snackIcon}
                />
                <Text style={{ color: colors.bg.primary }}>{props.children}</Text>
            </View>
        </Snackbar>
    </View>
)

const styles = StyleSheet.create({
    snackWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    snack: {
        backgroundColor: colors.accent,
    },
    snackText: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.accent90,
        color: colors.bg.primary,
    },
    snackIcon: {
        marginRight: 8,
    },
})

export default Snack
