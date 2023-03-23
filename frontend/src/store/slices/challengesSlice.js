import {createSlice} from '@reduxjs/toolkit';

const name = 'challenges';

export const initialState = {
    challenges: [],
    challenge: null,
    loading: false,
    error: null
};

const challengesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchChallengesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchChallengesSuccess(state, action) {
            state.loading = false;
            state.challenges = action.payload;
        },
        fetchChallengesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createChallengeRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createChallengeSuccess(state, action) {
            state.loading = false;
            state.challenges = [...state.challenges, action.payload];
        },
        createChallengeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchChallengesRequest,
    fetchChallengesSuccess,
    fetchChallengesFailure,
    createChallengeRequest,
    createChallengeSuccess,
    createChallengeFailure
} = challengesSlice.actions;

export default challengesSlice;
