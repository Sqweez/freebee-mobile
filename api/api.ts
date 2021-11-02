import { FormValues, PersonalInfo, PersonalInfoSecurity } from '../types'
import instance from './instance'

const api = {
    async qrWriteOff(id: any) {
        return  await instance.get(`/v2/qr/write-off/${id}`)
    },
    async getRules(id: number) {
        return await instance.get(`/text-rules/read?id=${id}`)
    },
    async login(values: FormValues.Login) {
        const { data } = await instance.post('/auth/client-login', values)
        return data
    },
    async register(formData: FormValues.Register) {
        const { data } = await instance.post('/auth/client-register', formData)
        return data
    },
    async refreshToken(formData: FormData) {
        const { data } = await instance.post('/auth/refresh-token', formData)
        return data
    },
    async logout(values: { refresh_token: string }) {
        await instance.post('/auth/logout', values)
    },
    async registerConfirm(values: { phone: string; code: string; fingerprint: string }) {
        const { data } = await instance.post('/auth/client-confirm', values)
        return data
    },
    async registerConfirmResend(code: string, phone: string) {
        await instance.post('/auth/client-confirm/resend', { code, phone })
    },
    async personalInfo() {
        const { data } = await instance.get('/client/info')
        return data
    },
    async changePersonalInfo(data: PersonalInfo) {
        await instance.post('/client/info/edit', data)
    },
    async changePassword(data: PersonalInfoSecurity) {
        await instance.post('/client/info/edit/password', data)
    },
    async getCondition(id: number) {
        const { data } = await instance.get('/conditions/read', { params: { id } })
        return data
    },
    async getCompanies(id?: number) {
        const { data } = await instance.get('/companies/read', { params: id && { id } })
        return data
    },
    async getCities(id?: number) {
        const { data } = await instance.get('/cities/read', { params: id && { id } })
        return data
    },
    async getTicketsCount(company_id: number) {
        const { data } = await instance.get('/client/tickets-count', { params: { company_id } })
        return data
    },
    async getDraws(type?: number) {
        const { data } = await instance.get('/client/get-draws', { params: type && { type } })
        return data
    },
    async useTicket(values: { code: string }) {
        const { data } = await instance.post('/tickets/use-ticket', values)
        return data
    },
    async getCoupons() {
        const { data } = await instance.get('/client/get-coupons')
        return data
    },
}

export default api
