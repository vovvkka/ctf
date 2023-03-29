import {createSlice} from '@reduxjs/toolkit';

const name = 'competitions';

export const initialState = {
    competitions: [],
    loading: false,
    error: null
};

const competitionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCompetitionsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCompetitionsSuccess(state, action) {
            state.loading = false;
            state.competitions = action.payload;
        },
        fetchCompetitionsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createCompetitionSuccess(state, action) {
            state.loading = false;
            state.competitions = [...state.competitions, action.payload];
        },
        createCompetitionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCompetitionsRequest,
    fetchCompetitionsSuccess,
    fetchCompetitionsFailure,
    createCompetitionRequest,
    createCompetitionSuccess,
    createCompetitionFailure,
} = competitionsSlice.actions;

export default competitionsSlice;
