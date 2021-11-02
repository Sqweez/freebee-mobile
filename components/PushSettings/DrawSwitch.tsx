import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useAsyncEffect } from 'use-async-effect'
import api from '../../api/api'
import { PersonalInfo } from '../../types'
import Switch from './Switch'

const DrawSwitch = (props: PersonalInfo) => {
    const [on, setOn] = useState(!!props.draws_notify)

    const toggle = () => setOn(on => !on)

    useAsyncEffect(async () => {
        await api.changePersonalInfo({ draws_notify: on })
    }, [on])

    return (
        <Switch on={on} toggle={toggle}>
            Розыгрыши
        </Switch>
    )
}

export default DrawSwitch

const styles = StyleSheet.create({})
