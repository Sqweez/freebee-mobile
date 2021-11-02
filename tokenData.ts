import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import { Token } from './types'

const initial = {
    iat: null,
    exp: null,
    id: null,
    fingerprint: null,
    name: null,
    role: null,
}

const tokenData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token')
    return accessToken ? jwtDecode<Token>(accessToken) : initial
}

export default tokenData
