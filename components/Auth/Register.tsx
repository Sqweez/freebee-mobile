import Constants from 'expo-constants'
import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native'
import MaskedInput from 'react-native-masked-input-text'
import { TextInput } from 'react-native-paper'
import * as yup from 'yup'
import api from '../../api/api'
import colors from '../../constants/colors'
import ErrorText from '../ErrorText'
import FormGroup from '../FormGroup'
import GradientButton from '../GradientButton'
import RegisterConfirmModal from './RegisterConfirmModal'

const initial = {
    login: '+7',
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    olimp_login: '',
    promocode: ''
}

const validationSchema = yup.object().shape({
    login: yup
        .string()
        .test(
            'phoneLength',
            'Неверный формат телефона',
            value => value?.replace(/\D/g, '').length === 11
        ),
    name: yup
        .string()
        .required('Введите имя')
        .max(60, 'Максимальная длинна имени 60 символов')
        .min(2, 'Минимальная длинна имени 2 символа'),
    surname: yup
        .string()
        .required('Введите фамилию')
        .max(60, 'Максимальная длинна фамилии 60 символов')
        .min(2, 'Минимальная длинна фамилии 2 символа'),
    email: yup.string().email('Неверный формат почты').required('Введите электронную почту'),
    password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required('Введите пароль'),
    passwordConfirm: yup
        .string()
        .required('Введите подтверждение пароля')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
    olimp_login: yup.string(),
    promocode: yup.string(),
})

const Register = () => {
    const [error, setError] = useState<string | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [sent, setSent] = useState(false)

    const onSubmit = async (
        values: typeof initial,
        { setSubmitting }: FormikHelpers<typeof initial>
    ) => {
        if (!sent) {
            const fingerprint = Constants.deviceId || Constants.sessionId

            try {
                await api.register({ ...values, fingerprint })

                setShowConfirmModal(true)
                setSent(true)
                Keyboard.dismiss()
            } catch ({ response }) {
                if (response) {
                    response.status === 400 &&
                        setError('Пользователь с таким номером уже существует')
                }
            } finally {
                setSubmitting(false)
            }
        }
    }

    return (
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
                        <FormGroup error={errors.name} touched={touched.name}>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.input}
                                placeholder="Имя"
                                left={<TextInput.Icon name="account-outline" />}
                                error={!!errors.name && touched.name}
                            />
                        </FormGroup>
                        <FormGroup error={errors.surname} touched={touched.surname}>
                            <TextInput
                                onChangeText={handleChange('surname')}
                                onBlur={handleBlur('surname')}
                                value={values.surname}
                                style={styles.input}
                                placeholder="Фамилия"
                                left={<TextInput.Icon name="account-outline" />}
                                error={!!errors.surname && touched.surname}
                            />
                        </FormGroup>
                        <FormGroup error={errors.email} touched={touched.email}>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                                placeholder="Электронная почта"
                                left={<TextInput.Icon name="email-outline" />}
                                error={!!errors.email && touched.email}
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
                        <FormGroup error={errors.passwordConfirm} touched={touched.passwordConfirm}>
                            <TextInput
                                onChangeText={handleChange('passwordConfirm')}
                                onBlur={handleBlur('passwordConfirm')}
                                value={values.passwordConfirm}
                                style={styles.input}
                                secureTextEntry
                                placeholder="Подтвердите пароль"
                                left={<TextInput.Icon name="lock-outline" />}
                                error={!!errors.passwordConfirm && touched.passwordConfirm}
                            />
                        </FormGroup>
                        <FormGroup error={errors.olimp_login} touched={touched.olimp_login}>
                            <TextInput
                                onChangeText={handleChange('olimp_login')}
                                onBlur={handleBlur('olimp_login')}
                                value={values.olimp_login}
                                style={styles.input}
                                placeholder="Логин олимп"
                                left={<TextInput.Icon name="account-outline" />}
                                error={!!errors.olimp_login && touched.olimp_login}
                            />
                        </FormGroup>
                        <FormGroup error={errors.promocode} touched={touched.promocode}>
                            <TextInput
                                onChangeText={handleChange('promocode')}
                                onBlur={handleBlur('promocode')}
                                value={values.promocode}
                                style={styles.input}
                                placeholder="Промокод"
                                left={<TextInput.Icon name="email-outline" />}
                                error={!!errors.promocode && touched.promocode}
                            />
                        </FormGroup>
                        {error && <ErrorText style={styles.errorText}>{error}</ErrorText>}
                        <GradientButton
                            onPress={handleSubmit}
                            style={styles.btn}
                            loading={isSubmitting}
                        >
                            Зарегистрироваться
                        </GradientButton>

                        <RegisterConfirmModal
                            phone={values.login}
                            show={showConfirmModal}
                            close={() => setShowConfirmModal(false)}
                        />
                    </>
                )}
            </Formik>
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
        marginBottom: 30,
    },
})

export default Register
