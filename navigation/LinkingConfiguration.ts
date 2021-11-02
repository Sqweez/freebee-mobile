import * as Linking from 'expo-linking'

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Auth: 'Auth',
            Root: {
                screens: {
                    home: {
                        screens: {
                            HomeScreen: 'Home',
                            PartnersScreen: 'PartnersScreen',
                            PartnersPage: 'PartnersPage',
                            DrawList: 'DrawList',
                            DrawPage: 'DrawPage',
                            WriteOffScreen: 'WriteOff'
                        },
                    },
                    scanner: {
                        screens: {
                            ScannerScreen: 'Scanner',
                        },
                    },
                    user: {
                        screens: {
                            UserScreen: 'User',
                        },
                    },
                },
            },
            NotFound: '*',
        },
    },
}
