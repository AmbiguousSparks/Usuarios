import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { atualizarDados, validarEmail, validarSenha } from '../Forms'
import { connect } from 'react-redux';
import { changeCurrent } from "../../actions";
import { bindActionCreators } from "redux";
const url = "https://localhost:44300/api/Usuarios";

class Cadastro extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            Usuario: {
                nome: '',
                email: '',
                senha: '',
                confirmarSenha: '',
                foto: 'Nenhum'
            },
            Alerta: {
                erro: false,
                senhaInvalida: '',
                emailInvalido: '',
                senhaNaoConfere: ''
            },
            imagem: null
        }
        this.enviar = this.enviar.bind(this);
        this.validarInformacoes = this.validarInformacoes.bind(this);
        this.mudarNomeFoto = this.mudarNomeFoto.bind(this);
        this.fileInput = React.createRef();
    }

    enviar(e) {
        e.preventDefault();
        let state = this.state;        
        this.validarInformacoes();
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

        });
    }

    mudarNomeFoto(){
        let state = this.state;
        if(this.fileInput.current.files[0])
            state.Usuario.foto = this.fileInput.current.files[0].name;
        if(FileReader && this.fileInput.current.files[0]){
            state.imagem = URL.createObjectURL(this.fileInput.current.files[0]);
        }
        this.setState(state);
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
        if(state.Usuario.senha !== state.Usuario.confirmarSenha){
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
            <div className="jumbotron w-50 text-center mx-auto p-5 mt-3 form-rounded">
                <form id="form" encType="multipart/form-data" onSubmit={this.enviar}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input className="form-control" value={this.state.Usuario.nome}
                            onChange={e => atualizarDados(e, this, 'Usuario')} id="nome" type="text" name="nome" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input className="form-control" value={this.state.Usuario.email}
                            onChange={e => atualizarDados(e, this, 'Usuario')} id="email" type="email" name="email" />
                        <div className="invalid-feedback d-block">
                            {this.state.Alerta.emailInvalido}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input className="form-control" value={this.state.Usuario.senha}
                            onChange={e => atualizarDados(e, this, 'Usuario')} id="senha" type="password" name="senha" />
                        <div className="invalid-feedback d-block">
                            {this.state.Alerta.senhaInvalida}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Confirmar senha:</label>
                        <input className="form-control" value={this.state.Usuario.confirmarSenha}
                            onChange={e => atualizarDados(e, this, 'Usuario')} id="confirmarSenha" type="password" name="confirmarSenha" />
                        <div className="invalid-feedback d-block">
                            {this.state.Alerta.senhaNaoConfere}
                        </div>
                    </div>
                    <div className="custom-file mt-2 mb-2">
                        <input ref={this.fileInput} type="file" name="foto" 
                        onChange={this.mudarNomeFoto}
                        className="custom-file-input" id="foto" />
                            <label className="custom-file-label" htmlFor="foto">{this.state.Usuario.foto}</label>
                    </div>
                    <img className="img-fluid w-50 my-3" src={this.state.imagem} alt="" />

                    <button type="submit" className="btn w-100 btn-success mt-3">Cadastrar</button>
                </form>
                <div className="mt-3">
                    <span className="">Já tem conta? <NavLink onClick={() => this.props.changeCurrent('Logar')} to="/login">Entrar</NavLink></span>
                </div>
            </div>
        )
    }
}


const mapToDispatch = dispatch => {
    return bindActionCreators({ changeCurrent }, dispatch);
}

export default connect(null, mapToDispatch)(Cadastro);