import Constants from 'expo-constants'
import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { ScrollView } from 'react-native-gesture-handler'
import BottomTabNavigator from '../components/Auth/BottomTabNavigator'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

const AuthScreen = () => {
    const [activeLink, setActiveLink] = useState(0)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.imageWrapper}>
                    <AutoHeightImage
                        source={require('../assets/images/login-logo.png')}
                        width={220}
                    />
                </View>

                <View style={styles.formWrapper}>
                    <View style={styles.form}>
                        {activeLink === 0 ? <Login /> : <Register />}
                    </View>
                </View>
            </ScrollView>
            <BottomTabNavigator active={activeLink} setActive={setActiveLink} />
        </KeyboardAvoidingView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        //paddingBottom: 30,
        marginTop: Constants.statusBarHeight,
        paddingBottom: 54,
        //flex: 1,
    },
    imageWrapper: {
        alignItems: 'center',
        marginVertical: 32,
    },
    formWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    form: {
        width: '100%',
    },
})
