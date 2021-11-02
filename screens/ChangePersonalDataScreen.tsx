import { StackScreenProps } from '@react-navigation/stack'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useStateIfMounted } from 'use-state-if-mounted'
import * as yup from 'yup'
import api from '../api/api'
import FormGroup from '../components/FormGroup'
import GradientButton from '../components/GradientButton'
import Layout from '../components/Layout'
import Snack from '../components/Snack'
import colors from '../constants/colors'
import useQuery from '../hooks/useQuery'
import { normalizePhone } from '../normalizers'
import { PersonalInfo, RootStackParamList } from '../types'

const initial = {
    login: '',
    name: '',
    surname: '',
    email: '',
    olimp_login: ''
}

const validationSchema = yup.object().shape({
    login: yup.string().required(),
    name: yup.string().required(),
    surname: yup.string().nullable(),
    email: yup.string().email().nullable(),
    olimp_login: yup.string(),
})

const PersonalData = ({ navigation }: StackScreenProps<RootStackParamList, 'User'>) => {
    const [personalInfoLoading, personalInfo] = useQuery<PersonalInfo>('/client/info')
    const [defaultValues, setDefaultValues] = useStateIfMounted(initial)
    const [success, setSuccess] = useStateIfMounted(false)

    useEffect(() => {
        setDefaultValues({
            login: normalizePhone(personalInfo?.login) || '',
            name: personalInfo?.name || '',
            surname: personalInfo?.surname || '',
            email: personalInfo?.email || '',
            olimp_login: personalInfo?.olimp_login || '',
        })
    }, [personalInfo])

    const onSubmit = async (
        values: typeof initial,
        { setSubmitting }: { setSubmitting: (val: boolean) => void }
    ) => {
        try {
            await api.changePersonalInfo(values)
            setSuccess(true)
        } catch ({ response }) {
            if (response) {
                // response.status === 400 && setError('Неверный логин или пароль')
                // response.status === 404 && setError('Пользователь не найден')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Layout title="Настройки аккаунта" loading={[personalInfoLoading]}>

            <KeyboardAvoidingView >
            <Formik
                initialValues={defaultValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
                    <>
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.input}
                                placeholder="Имя"
                                left={
                                    <TextInput.Icon color="#f4465e" name="account-circle-outline" />
                                }
                                error={!!errors.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('surname')}
                                onBlur={handleBlur('surname')}
                                value={values.surname}
                                style={styles.input}
                                placeholder="Фамилия"
                                left={
                                    <TextInput.Icon color="#f4465e" name="account-circle-outline" />
                                }
                                error={!!errors.surname}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                                value={values.login}
                                style={styles.input}
                                placeholder="Номер телефона"
                                left={<TextInput.Icon color="#f4465e" name="phone" />}
                                error={!!errors.login}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                                keyboardType="email-address"
                                placeholder="Email (example@freebee.kz)"
                                left={<TextInput.Icon color="#f4465e" name="email" />}
                                error={!!errors.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextInput
                                onChangeText={handleChange('olimp_login')}
                                onBlur={handleBlur('olimp_login')}
                                value={values.olimp_login}
                                style={styles.input}
                                placeholder="Логин Олимп"
                                left={
                                    <TextInput.Icon color="#f4465e" name="account-circle-outline" />
                                }
                                error={!!errors.olimp_login}
                            />
                        </FormGroup>
                        <GradientButton onPress={handleSubmit} loading={isSubmitting}>
                            Сохранить
                        </GradientButton>
                    </>
                )}
            </Formik>
            </KeyboardAvoidingView>

            <Snack show={success} close={() => setSuccess(false)}>
                Изменения сохранены
            </Snack>
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.bg.primary,
        borderBottomColor: colors.bg.primary,
    },
})

export default PersonalData
