export default function updateAction(state, payload) {
    return {
        ...state,
        details: {
            ...state.details,
            ...payload,
        },
    };
}
