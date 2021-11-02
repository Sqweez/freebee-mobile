import AsyncStorage from '@react-native-async-storage/async-storage'
import { Timer } from 'easytimer.js'
import Constants from 'expo-constants'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native'
import MaskedInput from 'react-native-masked-input-text'
import { TextInput } from 'react-native-paper'
import * as yup from 'yup'
import instance from '../api/instance'
import FormGroup from '../components/FormGroup'
import GradientButton from '../components/GradientButton'
import Layout from '../components/Layout'
import TextButton from '../components/TextButton'
import colors from '../constants/colors'
import TokenContext from '../context/TokenContext'
import { OnSubmit } from '../types'

const timer = new Timer()

const initial = {
    phone: '+7',
    code: '',
}

const validationSchema = yup.object().shape({
    phone: yup
        .string()
        .test(
            'phoneLength',
            'Неверный формат телефона',
            value => value?.replace(/\D/g, '')?.length === 11
        ),
})

const resetInitial = {
    newPassword: '',
    newPasswordConfirm: '',
}

const resetValidationSchema = yup.object().shape({
    newPassword: yup.string().required('Введите новый пароль'),
    newPasswordConfirm: yup
        .string()
        .required('Введите подтверждение пароля')
        .oneOf([yup.ref('newPassword'), null], 'Пароли не совпадают'),
})

const timeInitial = '00:00'

const startTimer = () => timer.start({ countdown: true, startValues: { minutes: 1 } })

const PasswordResetScreen = () => {
    const [showCode, setShowCode] = useState(false)
    const [resendTime, setResendTime] = useState(timeInitial)
    const [resetToken, setResetToken] = useState('')
    const { setTokens } = useContext(TokenContext)

    const onSubmit: OnSubmit<typeof initial> = async (
        { phone, code },
        { setSubmitting, setErrors }
    ) => {
        try {
            if (showCode) {
                if (!code) {
                    setErrors({ code: 'Не заполнено' })
                } else {
                    const { data } = await instance.post<{ token: string }>(
                        '/auth/password-reset',
                        {
                            phone,
                            code,
                        }
                    )
                    setResetToken(data.token)
                }
            } else {
                await instance.post('/auth/password-reset', { phone })
                setShowCode(true)
            }
        } catch ({ response }) {
            if (response) {
                response.status === 404 && setErrors({ phone: 'Номер телефона не найден' })
                response.status === 400 && setErrors({ code: 'Неверный код подтверждения' })

                if (response.status === 424) {
                    setShowCode(false)
                    setErrors({
                        code: 'Превышено количество попыток подтверждение. Повторите отправку кода',
                    })
                }
            }
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        setResendTime(timer.getTimeValues().toString(['minutes', 'seconds']))

        timer.addEventListener('secondsUpdated', () => {
            setResendTime(timer.getTimeValues().toString(['minutes', 'seconds']))
        })
    }, [])

    const resend = async (
        setErrors: (values: { phone: string }) => void,
        setTouched: (value: { phone: boolean }) => void,
        phone: string
    ) => {
        if (phone.replace(/\D/g, '').length !== 11)
            return setErrors({ phone: 'Неверный формат телефона' }), setTouched({ phone: true })

        const notBlocked = timer.getTimeValues().toString(['minutes', 'seconds']) === timeInitial

        if (notBlocked) {
            await instance.post('/auth/password-reset', { phone })
            setShowCode(true)
            startTimer()
        }
    }

    const resetSubmit: OnSubmit<typeof resetInitial> = async (
        { newPassword },
        { setSubmitting }
    ) => {
        try {
            const fingerprint = Constants.deviceId || Constants.sessionId

            const { data } = await instance.post('/auth/password-reset', {
                reset_token: resetToken,
                new_password: newPassword,
                fingerprint,
            })

            await AsyncStorage.setItem('access_token', data.access_token)
            await AsyncStorage.setItem('refresh_token', data.refresh_token)
            setTokens(true)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Восстановление пароля</Text>
            {resetToken ? (
                <Formik
                    initialValues={resetInitial}
                    onSubmit={resetSubmit}
                    validationSchema={resetValidationSchema}
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
                                error={errors.newPassword}
                                errorTextColor="#fff"
                                touched={touched.newPassword}
                            >
                                <TextInput
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    secureTextEntry
                                    placeholder="Новый пароль"
                                    left={<TextInput.Icon name="lock-outline" color="#f4465e" />}
                                    error={!!errors.newPassword}
                                />
                            </FormGroup>
                            <FormGroup
                                error={errors.newPasswordConfirm}
                                errorTextColor="#fff"
                                touched={touched.newPasswordConfirm}
                            >
                                <TextInput
                                    onChangeText={handleChange('newPasswordConfirm')}
                                    onBlur={handleBlur('newPasswordConfirm')}
                                    value={values.newPasswordConfirm}
                                    secureTextEntry
                                    placeholder="Подтвердите пароль"
                                    left={<TextInput.Icon name="lock-outline" color="#f4465e" />}
                                    error={!!errors.newPasswordConfirm}
                                />
                            </FormGroup>
                            <GradientButton onPress={handleSubmit} loading={isSubmitting}>
                                Сохранить
                            </GradientButton>
                        </>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={initial}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setErrors,
                        setTouched,
                        values,
                        errors,
                        isSubmitting,
                        touched,
                    }) => (
                        <>
                            <Text style={styles.subtitle}>Введите ваш номер телефона</Text>

                            <FormGroup
                                error={errors.phone}
                                errorTextColor={colors.bg.primary}
                                touched={touched.phone}
                            >
                                <TextInput
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    keyboardType="phone-pad"
                                    placeholder="+7 (___) ___-__-__"
                                    left={<TextInput.Icon name="phone-outline" />}
                                    error={!!errors.phone && touched.phone}
                                    render={props => (
                                        // @ts-ignore
                                        <MaskedInput mask="+7 (000) 000-00-00" {...props} />
                                    )}
                                />
                            </FormGroup>

                            {showCode && (
                                <>
                                    <Text style={styles.subtitle}>
                                        Введите 6-значный код, который был отправлен на ваш номер
                                        телефона
                                    </Text>
                                    <FormGroup
                                        error={errors.code}
                                        errorTextColor={colors.bg.primary}
                                        touched={touched.code}
                                    >
                                        <TextInput
                                            onChangeText={handleChange('code')}
                                            onBlur={handleBlur('code')}
                                            value={values.code}
                                            left={<TextInput.Icon name="email-outline" />}
                                            keyboardType="numeric"
                                            maxLength={6}
                                        />
                                    </FormGroup>
                                </>
                            )}
                            <GradientButton onPress={handleSubmit} loading={isSubmitting}>
                                {showCode ? 'Подтвердить' : 'Отправить код'}
                            </GradientButton>
                            {showCode && (
                                <TextButton
                                    onPress={() => resend(setErrors, setTouched, values.phone)}
                                    btnStyle={styles.resendBtn}
                                    textStyle={styles.resendBtnText}
                                >
                                    Отправить код еще раз{' '}
                                    {resendTime !== timeInitial && `(${resendTime})`}
                                </TextButton>
                            )}
                        </>
                    )}
                </Formik>
            )}
        </KeyboardAvoidingView>
    )
}

export default PasswordResetScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg.red,
        padding: 50,
    },
    title: {
        color: colors.bg.primary,
        fontSize: 28,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: colors.bg.primary,
        textAlign: 'center',
        marginBottom: 16,
    },
    resendBtn: {
        marginTop: 16,
    },
    resendBtnText: {
        color: colors.bg.primary,
    },
})
