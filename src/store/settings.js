import { createSlice, createSelector } from '@reduxjs/toolkit';

export const {
    reducer,
    actions
} = createSlice({
    name: 'settings',
    initialState: {
        hidden: getArray('hidden')
    },
    reducers: {
        setHidden: (state, action) => ({
            ...state,
            hidden: action.payload
        })
    }
});

export function saveHidden(hidden) {
    return async (dispatch) => {
        setArray('hidden', hidden);

        dispatch(actions.setHidden(hidden));
    };
}

export const hiddenSelector = createSelector(
    (state) => state.settings,
    (state) => state.hidden
);

function getArray(field) {
    return JSON.parse(localStorage.getItem(field) || '[]');
}

function setArray(field, array) {
    localStorage.setItem(field, JSON.stringify(array));
}
