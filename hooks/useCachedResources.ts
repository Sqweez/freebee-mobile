import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { Image } from 'react-native'
import { Asset } from 'expo-asset'

function cacheImages(images: string[]) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false)

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load fonts
                const font = Font.loadAsync({
                    ...Ionicons.font,
                    ...FontAwesome5.font,
                    timer: require('../assets/fonts/digital-7.regular.ttf')
                })

                const images = cacheImages([
                    require('../assets/images/loader.gif')
                ])

                await Promise.all([images, font])
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}
