export default (state, action) => {

     switch(action.type) {
        case 'POPULATE_CATEGORIES':
            return action.categories
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.category
            ]
        default:
            return state
     }

}
