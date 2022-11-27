export default function updateAction(state, payload) {
    return {
        ...state,
        details: {
            ...state.details,
            ...payload,
        },
    };
}

export function clearAction(state, payload) {
    return {
        details: {
            mediums: [],
            surfaces: [],
            images: [],
            certificates: [],
        },
    };
}
