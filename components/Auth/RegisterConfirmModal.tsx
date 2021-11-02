// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Portal, Text, TextInput } from 'react-native-paper'
import * as yup from 'yup'
import api from '../../api/api'
import colors from '../../constants/colors'
import TokenContext from '../../context/TokenContext'
import { CodeConfirmModalType, OnSubmit } from '../../types'
import FormGroup from '../FormGroup'
import GradientButton from '../GradientButton'
import HeaderWithBackBtn from './../HeaderWithBackBtn'

const initial = {
    code: '',
}

const validationSchema = yup.object().shape({
    code: yup.string().required('Введите код'),
})

const RegisterConfirmModalContainer = ({ phone, show, close }: CodeConfirmModalType) => {
    const { setTokens } = useContext(TokenContext)

    const onSubmit: OnSubmit<typeof initial> = async ({ code }, { setSubmitting, setErrors }) => {
        const fingerprint = Constants.deviceId || Constants.sessionId

        try {
            const { ok, access_token, refresh_token } = await api.registerConfirm({
                phone,
                code,
                fingerprint,
            })

            if (ok === true) {
                await AsyncStorage.setItem('access_token', access_token)
                await AsyncStorage.setItem('refresh_token', refresh_token)
                setTokens(true)
            }
        } catch ({ response }) {
            if (response) {
                response.status === 404 && setErrors({ code: 'Номер телефона не найден' })
                response.status === 400 && setErrors({ code: 'Неверный код' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return show ? <RegisterConfirmModal onSubmit={onSubmit} close={close} /> : null
}

const RegisterConfirmModal = ({
    onSubmit,
    close,
}: {
    onSubmit: OnSubmit<typeof initial>
    close: () => void
}) => (
    <Portal>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <HeaderWithBackBtn back={close} />
            <View style={styles.body}>
                <Text style={styles.title}>Код подтверждения</Text>
                <Text style={styles.subTitle}>
                    Введите 6-значный код, который был отправлен на ваш номер телефона
                </Text>
                <Formik
                    initialValues={initial}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isSubmitting,
                        touched,
                    }) => (
                        <>
                            <FormGroup
                                error={errors.code}
                                errorTextColor={colors.bg.primary}
                                touched={touched.code}
                            >
                                <TextInput
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    maxLength={6}
                                />
                            </FormGroup>
                            <GradientButton onPress={handleSubmit} loading={isSubmitting}>
                                Подтвердить
                            </GradientButton>
                        </>
                    )}
                </Formik>
                {/* <TextButton
                    onPress={() => {}}
                    btnStyle={styles.resendBtn}
                    textStyle={styles.resendBtnText}
                >
                    Отправить код еще раз
                </TextButton> */}
            </View>
        </KeyboardAvoidingView>
    </Portal>
)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    body: {
        flex: 1,
        backgroundColor: colors.bg.red,
        justifyContent: 'center',
        paddingLeft: '20%',
        paddingRight: '20%',
    },
    input: {
        padding: 0,
        height: 44,
    },
    title: {
        color: colors.bg.primary,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        paddingTop: 16,
        paddingBottom: 16,
        color: colors.bg.primary,
        textAlign: 'center',
    },
    resendBtn: {
        marginTop: 16,
    },
    resendBtnText: {
        color: colors.bg.primary,
    },
})

export default RegisterConfirmModalContainer
