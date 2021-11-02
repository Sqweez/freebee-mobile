import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import * as yup from 'yup'
import api from '../api/api'
import ErrorText from '../components/ErrorText'
import FormGroup from '../components/FormGroup'
import GradientButton from '../components/GradientButton'
import Layout from '../components/Layout'
import Snack from '../components/Snack'
import colors from '../constants/colors'

const initial = {
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
}

const validationSchema = yup.object().shape({
    password: yup.string().required(),
    newPassword: yup
        .string()
        .required('Введите новый пароль')
        .notOneOf([yup.ref('password'), null], 'Пароль не должен совпадать со старым'),
    newPasswordConfirm: yup
        .string()
        .required('Введите подтверждение пароля')
        .oneOf([yup.ref('newPassword'), null], 'Пароли не совпадают'),
})

const SecurityScreen = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const onSubmit = async (
        values: typeof initial,
        { setSubmitting, resetForm }: FormikHelpers<typeof initial>
    ) => {
        try {
            setError(null)
            await api.changePassword(values)
            setSuccess(true)
            resetForm()
        } catch (error) {
            console.log(error);
            if (error.response) {
                error.response.status === 400 && setError('Неверный пароль')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Layout title="Безопасность">
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
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}
                                secureTextEntry
                                placeholder="Текущий пароль"
                                left={<TextInput.Icon name="lock-outline" color="#f4465e" />}
                                error={!!errors.password}
                            />
                        </FormGroup>
                        <FormGroup
                            error={errors.newPassword}
                            errorTextColor="rgba(0, 0, 0, 0.5)"
                            touched={touched.newPassword}
                        >
                            <TextInput
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                                style={styles.input}
                                secureTextEntry
                                placeholder="Новый пароль"
                                left={<TextInput.Icon name="lock-outline" color="#f4465e" />}
                                error={!!errors.newPassword}
                            />
                        </FormGroup>
                        <FormGroup
                            error={errors.newPasswordConfirm}
                            touched={touched.newPasswordConfirm}
                        >
                            <TextInput
                                onChangeText={handleChange('newPasswordConfirm')}
                                onBlur={handleBlur('newPasswordConfirm')}
                                value={values.newPasswordConfirm}
                                style={styles.input}
                                secureTextEntry
                                placeholder="Подтвердите пароль"
                                left={<TextInput.Icon name="lock-outline" color="#f4465e" />}
                                error={!!errors.newPasswordConfirm}
                            />
                        </FormGroup>
                        {error?.length && <ErrorText style={styles.errorText}>{error}</ErrorText>}
                        <GradientButton onPress={handleSubmit} loading={isSubmitting}>
                            Сохранить
                        </GradientButton>
                    </>
                )}
            </Formik>

            <Snack show={success} close={() => setSuccess(false)}>
                Пароль обновлен
            </Snack>
        </Layout>
    )
}

export default SecurityScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.bg.primary,
        borderBottomColor: colors.bg.primary,
    },
    errorText: {
        marginBottom: 16,
    },
})
