export function changeCurrent(current){
    return {
        type: 'CHANGE_CURRENT',
        payload: current
    };
}

export function setUser(user){
    return {
        type: 'ADD_USER',
        payload: user
    };
}

export function getUser(){
    return {
        type: 'GET_USER'
    }
}