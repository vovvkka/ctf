import axiosApi from '../../axiosApi';
import {message} from "antd";
import {
    createCompetitionFailure,
    createCompetitionRequest,
    createCompetitionSuccess
} from "../slices/competitionsSlice";

// export const fetchChallenges = query => {
//     return async dispatch => {
//         try {
//             dispatch(fetchChallengesRequest());
//
//             let response;
//
//             if (query) {
//                 response = await axiosApi.get('/challenges' + query);
//             } else {
//                 response = await axiosApi.get('/challenges');
//             }
//
//             dispatch(fetchChallengesSuccess(response.data));
//         } catch (e) {
//             dispatch(fetchChallengesFailure(e));
//         }
//     };
// };

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