import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText, useTheme } from 'react-native-paper'
import { FormGroupType } from '../types'

const FormGroup = ({ error, children, errorTextColor, touched }: FormGroupType) => {
    const { colors } = useTheme()

    return (
        <View style={styles.formGroup}>
            {children}
            {error && touched && (
                <HelperText
                    type="error"
                    visible={!!error}
                    style={[styles.error, { color: errorTextColor || colors.danger }]}
                >
                    {error}
                </HelperText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 16,
    },
    error: {
        marginTop: 5,
    },
})

export default FormGroup
