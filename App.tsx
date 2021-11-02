import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { DefaultTheme, Portal, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Preloader } from './components/Layout'
import colors from './constants/colors'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            danger: string
        }

        // interface Theme {
        //     myOwnProperty: boolean
        // }
    }
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.accent,
        accent: 'green',
        background: colors.bg.primary,
        danger: 'red',
    },
}

const App = () => {
    const isLoadingComplete = useCachedResources()

    return (
        <PaperProvider theme={theme}>
            {!isLoadingComplete ? (
                <Preloader />
            ) : (
                <SafeAreaProvider>
                    <StatusBar style="auto" backgroundColor={colors.bg.primary} />
                    <Portal.Host>
                        <Navigation />
                    </Portal.Host>
                </SafeAreaProvider>
            )}
        </PaperProvider>
    )
}

export default App
