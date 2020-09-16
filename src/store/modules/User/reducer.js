export default function user(state = null, action){
    switch(action.type){
        case 'ADD_USER':
            state = action.payload;
            return state;
        case 'GET_USER':
            return state;
        default:
            return state;
    }
}