import { FormikHelpers } from 'formik'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type RootStackParamList = {
    Root: undefined
    NotFound: undefined
    Auth: undefined
    Home: undefined
    User: undefined
    PartnersScreen: undefined
    CompanyScreen: { id: string }
    DrawsScreen: { type: 'weekly' | 'main' | 'coupon' }
    NotificationScreen: undefined
    CompaniesScreen: undefined
    DrawScreen: { id: string; showDraw?: boolean }
    ChangePersonalDataScreen: undefined
    SecurityScreen: undefined
    PushSettingsScreen: undefined
    InfoScreen: undefined
    PublicConditionScreen: undefined
    OtherConditionScreen: undefined
    PasswordResetScreen: undefined,
    ReferalScreen: undefined
}

export type Token = {
    // Time created
    iat: number
    // Time expires
    exp: number
    id: number
    fingerprint: string
    name: string
    role: string
}

export namespace ButtonType {
    export type Gradient = {
        onPress: () => void
        colors?: string[]
        children: string
        style?: StyleProp<ViewStyle>
        loading?: boolean
    }

    export type Text = {
        onPress: () => void
        children: string | (string | boolean)[]
        btnStyle?: StyleProp<ViewStyle>
        textStyle?: StyleProp<TextStyle>
        loading?: boolean
    }
}

export type CodeConfirmModalType = {
    phone: string
    show: boolean
    close: () => void
}

export type FormGroupType = {
    error?: string
    children: any
    errorTextColor?: string
    touched?: boolean
}

export type PersonalInfo = {
    id?: number
    login?: string
    name?: string
    surname?: string | null
    email?: string | null
    balance?: number
    active?: boolean
    draws_notify?: boolean,
    olimp_login?: string,
    created_by?: string | null,
    promocode?: any
}

export type Condition = {
    id: number
    text: string
    created_at: string | null
    updated_at: string | null
}

export type PersonalInfoSecurity = {
    password: string
    newPassword: string
    newPasswordConfirm: string
}

export namespace FormValues {
    export type Login = {
        login: string
        password: string
        fingerprint: string
    }

    export type Register = {
        login: string
        name: string
        surname: string
        email: string
        password: string
        passwordConfirm: string
        fingerprint: string
    }
}

export type Company = {
    '2gis_url': string
    accountant_phone: string
    admin_phone: string
    company_phone: string
    city: string
    city_id: string
    commission: string
    created_at: string
    director_name: string
    email: string
    id: number
    logo: string
    name: string
    total_freebee: string
    updated_at: string
    write_off_wallet: 'tenge' | 'freebee'
    type: 1 | 2
}

export type Cities = {
    id: number
    name: string
}

export type Draw = {
    id: number
    title: string
    description: string
    type: number
    company_id: number
    start_time: number
    banner: string
    created_at: string
    prizes: {
        id: number
        prize_name: string
        winner_id: number | null
        winner_name: string | null
        winner_phone: string | null
    }[]
    memberUsers: number[]
    memberTickets: number
    company_name: string
    company_logo: string
    completed: boolean
    active: boolean
}

export type Ticket = {
    company_id: number
    name: string
    weekly_tickets: number
    main_tickets: number
    logo: string
}

export type Notification = {
    id: number
    user_id: number
    client_id: number
    sum: number
    type: number
    company_id: number
    created_at: string
    updated_at: string
    receipt: string | null
    company_name: string | null
    user_name: string
    client_name: string
    current_balance: number,
    currency: string
}

export interface OnSubmit<T> {
    (values: T, helpers: FormikHelpers<T>): void
}
