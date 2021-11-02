import { useNavigation } from '@react-navigation/core'
import {Text, View, Image, Alert, StyleSheet} from 'react-native'
import Layout, {Preloader} from '../components/Layout'
import React, {useState} from "react";
import useQuery from "../hooks/useQuery";
import {PersonalInfo} from "../types";
import colors from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import GradientButton from "../components/GradientButton";
import api from "../api/api";
const WriteOffScreen = (props: any) => {
    const { navigate } = useNavigation();
    const [loading, info, error, callback] = useQuery<PersonalInfo>('client/info')
    const [load, setLoad] = useState(false);

    if (loading || load) {
        return <Preloader />;
    }

    let company = props.route.params.company;

    if (!company) {
        company = {
            name: 'Неизвестно',
            logo: 'https://freebee.kz/assets/index/wp-content/uploads/2021/03/Logo.png'
        }
    }

    let date = props.route.params.created_at;

    date = date.split('T');
    const _date = date[0].split('-').reverse().join('.');
    const time = date[1].split('.')[0]


    const handlePress = async () => {
        setLoad(true);
        try {
            const response = await api.qrWriteOff(props.route.params.id);
            console.log(response);
            Alert.alert('Успешно', `С вашего баланса списано ${props.route.params.amount} freebee!`, [
                {
                    text: 'Закрыть',
                    onPress: () => navigate('HomeScreen')
                }
            ])

        } catch (e) {
            Alert.alert('Ошибка', e.response.data.message, [
                {
                    text: 'Закрыть',
                    onPress: () => navigate('HomeScreen')
                }
            ])
        } finally {
            setLoad(false)
        }
    }

    return (
        <Layout title="Списание по QR">
            <View>
               <View style={styles.card}>
                   <View style={styles.container_top}>
                       <Image source={{uri: company.logo}} style={styles.logo}/>
                       <Text style={{fontWeight: '500', fontSize: 18, marginLeft: 10}}>
                           { company.name }
                       </Text>
                   </View>
                   <View style={styles.divider} />
                   <View style={styles.bottom_container}>
                       <View style={{flexDirection: 'row', alignItems: 'center'}}>
                           <Ionicons
                           name="alarm-outline"
                           size={24}
                           color={colors.accent}
                           style={{marginRight: 7}}
                           />
                           <Text>{time}</Text>
                       </View>
                       <View style={{flexDirection: 'row', alignItems: 'center'}}>
                           <Ionicons
                               name={'calendar-outline'}
                               size={24}
                               color={colors.accent}
                               style={{marginRight: 7}}
                           />
                           <Text>{_date}</Text>
                       </View>
                   </View>
               </View>
                <View style={styles.card}>
                    <View style={{...styles.container_top, paddingVertical: 20, justifyContent: 'center'}}>
                        <View style={{marginRight: '40%', alignItems: 'center'}}>
                            <Text style={{ fontSize: 28, fontWeight: '500' }}>{ props.route.params.amount }</Text>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'grey' }}>FreeBee</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 28, fontWeight: '500' }}>{ props.route.params.amount / 2.5} </Text>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'grey' }}>Тенге</Text>
                        </View>
                    </View>
                </View>
                <GradientButton onPress={handlePress}>
                    <Text>Подтвердить</Text>
                </GradientButton>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container_top: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottom_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: colors.bg.primary,
        borderRadius: 16,
        marginBottom: 16,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    divider: {
        marginVertical: 10,
        height: 1,
        backgroundColor: '#d3d3d3',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
})

export default WriteOffScreen;
