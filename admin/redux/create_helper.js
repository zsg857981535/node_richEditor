/**
 * Created by DaGuo on 2017/3/22.
 */
/**
 *
 * @param type string
 * @param argNames any
 * @returns {Function} actionCreator
 */
export function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action
    }
}
/**
 *
 * @param initialState any
 * @param handlers  object
 * @returns {Function}  reducer
 */
export function createReducer(initialState, handlers) {
    return function (state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}