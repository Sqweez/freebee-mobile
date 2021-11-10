import React, {useEffect, useState} from 'react';
import { View, Share, StyleSheet } from 'react-native';
import Layout from "../components/Layout";
import Bold from "../components/Bold";
import {Ionicons} from "@expo/vector-icons";
import colors from "../constants/colors";
import HTML from "react-native-render-html";
import useQuery from "../hooks/useQuery";
import api from "../api/api";
import {PersonalInfo} from "../types";
import GradientButton from "../components/GradientButton";

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

    const onShare = () => {
        const response = Share.share({
            message: 'Мой промокод в Frebee: ' + info?.promocode.promocode,
        })
    }

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
                <GradientButton onPress={onShare}>
                    Поделиться
                </GradientButton>
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
