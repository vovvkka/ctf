import axiosApi from '../../axiosApi';
import {message} from "antd";
import {
    createCompetitionFailure,
    createCompetitionRequest,
    createCompetitionSuccess,
    fetchCompetitionsFailure,
    fetchCompetitionsRequest,
    fetchCompetitionsSuccess, fetchOneCompetitionFailure,
    fetchOneCompetitionRequest, fetchOneCompetitionSuccess
} from "../slices/competitionsSlice";

export const fetchCompetitions = () => {
    return async dispatch => {
        try {
            dispatch(fetchCompetitionsRequest());

            const response = await axiosApi.get('/competitions');

            dispatch(fetchCompetitionsSuccess(response.data));
        } catch (e) {
            dispatch(fetchCompetitionsFailure(e));
        }
    };
};

export const fetchOneCompetition = id => {
    return async dispatch => {
        try {
            dispatch(fetchOneCompetitionRequest());

            const response = await axiosApi.get('/competitions/' + id);

            dispatch(fetchOneCompetitionSuccess(response.data));
        } catch (e) {
            dispatch(fetchOneCompetitionFailure(e));
        }
    };
};

export const createCompetition = competitionData => {
    return async dispatch => {
        try {
            dispatch(createCompetitionRequest());

            const response = await axiosApi.post('/competitions', competitionData);

            dispatch(createCompetitionSuccess(response.data));
            message.success("The new competition was created successfully!");
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createCompetitionFailure(e.response.data));
                throw e;
            } else {
                dispatch(createCompetitionFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};