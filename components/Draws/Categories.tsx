import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'

interface CategoriesProps {
    active: 0 | 1 | 2
    setActive: (active: 0 | 1 | 2) => void
}

const Categories = (props: CategoriesProps) => {
    return (
        <View style={styles.wrapper}>
            <Tab active={props.active === 0} onPress={() => props.setActive(0)}>
                Еженедельный
            </Tab>
            <Tab active={props.active === 1} onPress={() => props.setActive(1)}>
                Главный
            </Tab>
            <Tab active={props.active === 2} onPress={() => props.setActive(2)} last>
                Купоны
            </Tab>
        </View>
    )
}

interface TabProps {
    active: boolean
    onPress: () => void
    children: string
    last?: boolean
}

const Tab = (props: TabProps) => (
    <Text
        style={[styles.btn, props.active && styles.btnActive, props.last && styles.btnBorder]}
        onPress={props.onPress}
    >
        {props.children}
    </Text>
)

export default Categories

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.bg.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        zIndex: 2,
    },
    btn: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.text.secondary,
        fontSize: 16,
        width: `${100 / 3}%`,
        height: 30,
    },
    btnActive: {
        fontWeight: 'bold',
        color: colors.accent,
    },
    btnBorder: {
        borderRightColor: '#eee',
        borderRightWidth: 1,
    },
})
