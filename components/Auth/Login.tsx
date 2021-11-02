import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import Constants from 'expo-constants'
import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import MaskedInput from 'react-native-masked-input-text'
import { TextInput } from 'react-native-paper'
import * as yup from 'yup'
import api from '../../api/api'
import colors from '../../constants/colors'
import TokenContext from '../../context/TokenContext'
import ErrorText from '../ErrorText'
import FormGroup from '../FormGroup'
import GradientButton from '../GradientButton'
import TextButton from '../TextButton'

const initial = {
    login: '+7',
    password: '',
}

const validationSchema = yup.object().shape({
    login: yup.string().required('Введите номер телефона'),
    password: yup.string().required('Введите пароль'),
})

const Login = () => {
    const [error, setError] = useState<string | null>(null)
    const { setTokens } = useContext(TokenContext)
    const { navigate } = useNavigation()

    const onSubmit = async (
        values: typeof initial,
        { setSubmitting }: { setSubmitting: (val: boolean) => void }
    ) => {
        const fingerprint = Constants.deviceId || Constants.sessionId

        try {
            const { ok, refresh_token, access_token } = await api.login({ ...values, fingerprint })

            if (ok === true) {
                await AsyncStorage.setItem('access_token', access_token)
                await AsyncStorage.setItem('refresh_token', refresh_token)
                setTokens(true)
            }
        } catch ({ response }) {
            if (response) {
                response.status === 400 && setError('Неверный логин или пароль')
                response.status === 404 && setError('Пользователь не найден')
            }
        }

        setSubmitting(false)
    }

    return (
        <>
            <Formik initialValues={initial} onSubmit={onSubmit} validationSchema={validationSchema}>
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
                        <FormGroup error={errors.login} touched={touched.login}>
                            <TextInput
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                                value={values.login}
                                style={styles.input}
                                keyboardType="phone-pad"
                                placeholder="+7 (___) ___-__-__"
                                left={<TextInput.Icon name="phone-outline" />}
                                error={!!errors.login && touched.login}
                                render={props => (
                                    // @ts-ignore
                                    <MaskedInput mask="+7 (000) 000-00-00" {...props} />
                                )}
                            />
                        </FormGroup>
                        <FormGroup error={errors.password} touched={touched.password}>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}
                                secureTextEntry
                                placeholder="Пароль"
                                left={<TextInput.Icon name="lock-outline" />}
                                error={!!errors.password && touched.password}
                            />
                        </FormGroup>

                        {error && <ErrorText style={styles.errorText}>{error}</ErrorText>}

                        <GradientButton
                            colors={['#f4465e', '#f46f46']}
                            onPress={handleSubmit}
                            style={styles.btn}
                            loading={isSubmitting}
                        >
                            Войти
                        </GradientButton>

                        <TextButton
                            onPress={() => navigate('PasswordResetScreen')}
                            btnStyle={styles.btn}
                        >
                            Забыли пароль?
                        </TextButton>
                    </>
                )}
            </Formik>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.bg.primary,
        borderBottomColor: colors.bg.primary,
    },
    link: {
        marginBottom: 16,
    },
    errorText: {
        marginBottom: 16,
    },
    btn: {
        marginTop: 16,
    },
})

export default Login
