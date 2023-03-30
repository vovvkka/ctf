import {createSlice} from '@reduxjs/toolkit';

const name = 'competitions';

export const initialState = {
    competitions: [],
    competition: null,
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
        fetchOneCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOneCompetitionSuccess(state, action) {
            state.loading = false;
            state.competition = action.payload;
        },
        fetchOneCompetitionFailure(state, action) {
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
    fetchOneCompetitionRequest,
    fetchOneCompetitionSuccess,
    fetchOneCompetitionFailure,
    createCompetitionRequest,
    createCompetitionSuccess,
    createCompetitionFailure,
} = competitionsSlice.actions;

export default competitionsSlice;
