import axiosApi from '../../axiosApi';
import {
    createChallengeFailure,
    createChallengeRequest,
    createChallengeSuccess,
    fetchChallengesFailure, fetchChallengesRequest, fetchChallengesSuccess
} from "../slices/challengesSlice";
import {addNotification} from "./notifierActions";

export const fetchChallenges = query => {
    return async dispatch => {
        try {
            dispatch(fetchChallengesRequest());

            let response;

            if (query) {
                response = await axiosApi.get('/challenges' + query);
            } else {
                response = await axiosApi.get('/challenges');
            }

            dispatch(fetchChallengesSuccess(response.data));
        } catch (e) {
            dispatch(fetchChallengesFailure(e));
        }
    };
};

export const createChallenge = challengeData => {
    return async dispatch => {
        try {
            dispatch(createChallengeRequest());

            const response = await axiosApi.post('/challenges', challengeData);

            dispatch(createChallengeSuccess(response.data));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(createChallengeFailure(e.response.data));
                throw e;
            } else {
                dispatch(createChallengeFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};