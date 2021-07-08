const reducer =(state={},action) =>
{
    switch(action.types) {
        case "UPDATE": return action.payload
        default: return state
    }
}

export default reducer;