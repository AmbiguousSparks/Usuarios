export function atualizarDados(e, comp, stateToChange) {
    let state = comp.state;
    let valido = true;
    if (e.target.type === 'file') {
        state[stateToChange][e.target.name] = e.target.files[0];
    }
    else if (e.target.type === 'checkbox') {
        state[stateToChange][e.target.name] = !Boolean(state[stateToChange][e.target.name]);
    } else {
        state[stateToChange][e.target.name] = e.target.value;
    }
    if (e.target.name === "senha") {
        if (!validarSenha(state[stateToChange][e.target.name])) {
            state.Alerta.senhaInvalida = "Senha inválida. É necessário ter pelo menos um caracter numérico.";
            valido = false;
        } else {
            state.Alerta.senhaInvalida = "";
        }
        if (state[stateToChange][e.target.name] !== state[stateToChange].confirmarSenha) {
            state.Alerta.senhaNaoConfere = "Senhas não conferem";
            valido = false;
        } else {
            state.Alerta.senhaNaoConfere = "";
        }
    } else if (e.target.name === "email") {
        if (!validarEmail(state[stateToChange][e.target.name])) {
            state.Alerta.emailInvalido = "Por favor informe um e-mail válido.";
            valido = false;
        } else {
            state.Alerta.emailInvalido = "";
        }        
    } else if (e.target.name === "confirmarSenha") {
        if (state[stateToChange][e.target.name] !== state[stateToChange].senha) {
            state.Alerta.senhaNaoConfere = "Senhas não conferem";
            valido = false;
        } else {
            state.Alerta.senhaNaoConfere = "";
        }
    }
    state.Alerta.erro = !valido;
    comp.setState(state);
}

export function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validarSenha(password) {
    const re = /[0-9]/
    return re.test(password);
}