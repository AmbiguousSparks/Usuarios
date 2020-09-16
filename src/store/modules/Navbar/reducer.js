export default function currentChange(state = 'Home', action){
    switch(action.type){
        case "CHANGE_CURRENT":
            return action.payload;
        default:
            return state;
    }
}