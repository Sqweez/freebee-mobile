import { useNavigation } from '@react-navigation/core'
import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../constants/colors'
import sizes from '../constants/sizes'
import HeaderWithBackBtn from './HeaderWithBackBtn'

interface LayoutProps {
    bgHeight?: number
    title?: string
    children: any
    style?: StyleProp<ViewStyle>
    loading?: boolean[]
    header?: JSX.Element
    refresh?: boolean
    onRefresh?: () => void
    noBg?: boolean
    static?: boolean
}

const Layout = (props: LayoutProps) => {
    const { goBack } = useNavigation()
    const [loading, setLoading] = useState(true)

    const bgHeight = props.bgHeight ? { height: props.bgHeight } : null

    useEffect(() => {
        if (props.loading) {
            const loadedValues = props.loading.filter(elem => elem)
            setLoading(loadedValues.length === props.loading.length)
        }
    }, [props.loading])

    return (
        <View style={styles.container}>
            {props.header || <HeaderWithBackBtn back={goBack} title={props.title} />}

            {loading && props.loading ? (
                <Preloader />
            ) : (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[
                        styles.content,
                        props.style,
                        props.static && { flex: 1 },
                    ]}
                    refreshControl={
                        (props.refresh !== undefined && props.onRefresh !== undefined && (
                            <RefreshControl
                                refreshing={props.refresh}
                                onRefresh={props.onRefresh}
                                colors={[colors.accent]}
                            />
                        )) ||
                        undefined
                    }
                >
                    {props.children}
                </ScrollView>
            )}

            {/* Background */}
            {!props.noBg && <View style={[styles.background, bgHeight]} />}
        </View>
    )
}

export const Preloader = () => (
    <View style={styles.preloadWrapper}>
        <ActivityIndicator size="large" color={colors.accent} style={styles.preload} />
    </View>
)

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    content: {
        position: 'relative',
        flexGrow: 1,
        padding: 16,
    },
    background: {
        position: 'absolute',
        top: sizes.header,
        left: 0,
        backgroundColor: '#f4465e',
        height: 295,
        width: '100%',
        zIndex: -1,
        borderBottomLeftRadius:
            Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        borderBottomRightRadius:
            Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    },
    preloadWrapper: {
        position: 'absolute',
        top: sizes.header,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
    preload: {
        backgroundColor: colors.bg.primary,
        borderRadius: 100,
        padding: 5,
    },
})
