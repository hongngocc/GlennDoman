import initialState from './reducers/initialState';
export const app = (state = initialState.app, action) => {
    switch (action.type) {
        case 'TEMP': {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}