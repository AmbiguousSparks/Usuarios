import React from 'react'
import { Switch, Route } from 'react-router-dom'


import Login from '../components/Login'
import Main from '../components/Main'
import Cadastro from '../components/Cadastro'

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signin" exact component={Cadastro} />
            <Route path="/" exact component={Main} />
        </Switch>
    )
}