import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from "../components/Layout";
import Bold from "../components/Bold";
import {Ionicons} from "@expo/vector-icons";
import colors from "../constants/colors";
import HTML from "react-native-render-html";
import useQuery from "../hooks/useQuery";
import api from "../api/api";
import {PersonalInfo} from "../types";

const ReferalScreen = () => {
    const [loading, info, error, callback] = useQuery<PersonalInfo>('client/info')
    console.log(info);

    const [rules, setRules] = useState('');

    useEffect(() => {
        (async () => {
            const response = await api.getRules(5);
            setRules(response.data.data)
        })();
    }, []);

    return (
        <Layout title="Ваш промокод">
            <View style={styles.rule}>
                <View style={styles.title}>
                    <Ionicons
                        name="barcode-outline"
                        size={24}
                        color={colors.accent}
                        style={styles.titleIcon}
                    />
                    <Bold>Ваш промокод: { info?.promocode.promocode }</Bold>
                </View>
                {rules.length > 0 && <HTML source={{ html: rules }} />}
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
    rule: {
        backgroundColor: colors.bg.primary,
        padding: 16,
        borderRadius: 16,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIcon: {
        marginRight: 8,
    },
    noDraws: {
        marginBottom: 16,
        textAlign: 'center',
    },
})


export default ReferalScreen;
