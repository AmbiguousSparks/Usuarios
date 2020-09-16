import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { atualizarDados, validarEmail, validarSenha } from '../Forms';
import { connect } from 'react-redux';
import { changeCurrent, setUser, getUser } from "../../actions";
import { bindActionCreators } from "redux";
const url = "https://localhost:44300/api/Usuarios/login";

class Login extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            Usuario: {
                email: '',
                senha: '',
                conectado: false
            },
            Alerta: {
                erro: false,
                senhaInvalida: '',
                emailInvalido: '',
                senhaNaoConfere: ''
            },
        };

        this.enviar = this.enviar.bind(this);
        this.validarInformacoes = this.validarInformacoes.bind(this);
    }
    enviar(e) {
        e.preventDefault();
        this.validarInformacoes();
        let state = this.state;
        if (state.Alerta.erro)
            return;
        let headers = new Headers();
        let form = new FormData(document.getElementById("form"));
        let init = {
            method: 'POST',
            headers,
            mode: 'cors',
            cache: 'default',
            body: form
        };
        fetch(url, init)
            .then(response => {
                response.json()
                    .then(res => {
                        this.props.setUser(res.user);
                    })
            });
    }

    validarInformacoes() {
        let state = this.state;
        let valido = true;
        state.Alerta.mensagem = ''
        if (!validarEmail(state.Usuario.email)) {
            state.Alerta.erro = true;
            valido = false;
        }
        if (!validarSenha(state.Usuario.senha)) {
            state.Alerta.erro = true;
            valido = false;
        }
        if (valido) {
            state.Alerta.erro = false;
        }
        this.setState(state);
    }



    render() {
        return (
            <div className="jumbotron w-50 text-center mx-auto p-4 mt-3 form-rounded">
                <form id="form" onSubmit={this.enviar}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input className="form-control" value={this.state.Usuario.email}
                            type="email" id="email" onChange={e => atualizarDados(e, this, 'Usuario')} name="email" />
                        <div className="invalid-feedback d-block">
                            {this.state.Alerta.emailInvalido}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input className="form-control" value={this.state.Usuario.senha}
                            type="password" id="senha" onChange={e => atualizarDados(e, this, 'Usuario')} name="senha" />
                        <div className="invalid-feedback d-block">
                            {this.state.Alerta.senhaInvalida}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input value={this.state.Usuario.conectado}
                                onChange={e => atualizarDados(e, this, 'Usuario')}
                                className="form-check-input" type="checkbox" id="conectado" name="conectado" />
                            <label className="form-check-label" htmlFor="conectado">Manter-se conectado</label>
                        </div>
                    </div>
                    <button type="submit" className="btn w-100 btn-success mt-3">Entrar</button>
                </form>
                <div>
                    <span className="">Não tem conta ainda? <NavLink onClick={() => this.props.changeCurrent('Cadastro')} to="/signin">Cadastre-se</NavLink></span>
                </div>
            </div>
        )
    }
}

const mapToDispatch = dispatch => {
    return bindActionCreators({ changeCurrent, setUser, getUser }, dispatch);
}

const mapStateToProps = state => {
    return { current: state.currentChange, user: state.user }
};


export default connect(mapStateToProps, mapToDispatch)(Login);