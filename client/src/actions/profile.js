import axios from 'axios';
import { setAlert } from './alert';
import {
   GET_PROFILE,
   GET_PROFILES,
   PROFILE_ERROR,
   UPDATE_PROFILE,
   CLEAR_PROFILE,
   DELETE_ACCOUNT,
} from './types';

//*** GET CURRENT USER PROFILE***//
export const getCurrentProfile = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/profile/me');

      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// *** GET ALL PROFILES *** //
export const getProfiles = () => async (dispatch) => {
   dispatch({
      type: CLEAR_PROFILE,
   });
   try {
      const res = await axios.get('/api/profile');

      dispatch({
         type: GET_PROFILES,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

// *** GET PROFILES BY ID*** //
export const getProfileById = (userId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** CREATE OR UPDATE PROFILE***//
export const createProfile = (formData, history, edit = false) => async (
   dispatch,
) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const res = await axios.post('/api/profile', formData, config);
      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });
      dispatch(
         setAlert(
            edit ? 'Profil zaktualizowany' : 'Profil Utworzony',
            'success',
         ),
      );
      if (!edit) {
         history.push('/dashboard');
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** ADD EXPERIENCE ***//
export const addExperience = (formData, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const res = await axios.put('/api/profile/experience', formData, config);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
      dispatch(setAlert('Doświadczenie dodane', 'success'));
      history.push('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** ADD EDUCATION ***//
export const addEducation = (formData, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const res = await axios.put('/api/profile/education', formData, config);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
      dispatch(setAlert('Edukacja dodana', 'success'));
      history.push('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** DELETE EXPERIENCE ***//
export const deleteExperience = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
      dispatch(setAlert('Doświadczenie usunięto', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** DELETE EDUCATION ***//
export const deleteEducation = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
      dispatch(setAlert('Edukację usunięto', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      });
   }
};

//*** DELETE ACCOUNT ***//
export const deleteAccount = () => async (dispatch) => {
   if (window.confirm('Jesteś pewny? To NIEODWRACALNE!')) {
      try {
         const res = await axios.delete('/api/profile');
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: DELETE_ACCOUNT });
         dispatch(setAlert('Twoje konto zostało usunięte!', 'success'));
      } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: {
               msg: err.response.statusText,
               status: err.response.status,
            },
         });
      }
   }
};
