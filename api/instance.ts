import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Constants from 'expo-constants'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import { Token } from '../types'

const instance = axios.create({
    baseURL: 'https://admin.freebee.kz/api/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})

instance.interceptors.request.use(
    async config => {
        if (config.url !== '/auth/login') {
            const accessToken = await AsyncStorage.getItem('access_token')
            const refreshToken = await AsyncStorage.getItem('refresh_token')

            if (!accessToken || !refreshToken) {
                await AsyncStorage.removeItem('access_token')
                await AsyncStorage.removeItem('refresh_token')
            } else {
                const token: Token = jwtDecode(accessToken)

                if (moment().unix() >= token.exp) {
                    try {
                        const formData = new FormData()
                        formData.append('refresh_token', refreshToken)
                        formData.append('fingerprint', Constants.deviceId || 'cant load')

                        const { data } = await instance.post('/auth/refresh-token', formData)

                        await AsyncStorage.setItem('access_token', data.tokens.access_token)
                        await AsyncStorage.setItem('refresh_token', data.tokens.refresh_token)
                    } catch (err) {
                        await AsyncStorage.removeItem('access_token')
                        await AsyncStorage.removeItem('refresh_token')
                    }
                }

                config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
                    'access_token'
                )}`
            }
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance
