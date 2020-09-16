import React, { Component } from 'react';
import logo from './../../logo.svg';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeCurrent, getUser } from "../../actions";
import { bindActionCreators } from "redux";

class Navbar extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top d-flex">
                <NavLink className="navbar-brand" onClick={() => this.props.changeCurrent('Home')} to="/"><img alt="logo" className="img-fluid w-25" src={logo} /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="ml-auto navbar-nav">
                        {                            
                            this.props.user !== null ?
                                <li className={this.props.current === "Perfil" ? "nav-item active" : "nav-item"}><NavLink to="/login" onClick={() => this.props.changeCurrent('Perfil')} className="nav-link"><img className="img-fluid w-30p mr-1" alt={this.props.user.fileName} src={"data:image/png;base64," + this.props.user.file} />{this.props.user.nome}</NavLink></li> :
                                <li className={this.props.current === "Logar" ? "nav-item active" : "nav-item"}><NavLink to="/login" onClick={() => this.props.changeCurrent('Logar')} className="nav-link">Logar</NavLink></li>
                        }
                        {
                            this.props.user !== null ?
                                '' :
                                <li className={this.props.current === "Cadastro" ? "nav-item active" : "nav-item"}><NavLink to="/signin" onClick={() => this.props.changeCurrent('Cadastro')} className="nav-link">Cadastrar</NavLink></li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}
const mapToDispatch = dispatch => {
    return bindActionCreators({ changeCurrent, getUser }, dispatch);
}

const mapStateToProps = state => {
    return {current: state.currentChange, user: state.user}
};
export default connect(mapStateToProps, mapToDispatch)(Navbar);