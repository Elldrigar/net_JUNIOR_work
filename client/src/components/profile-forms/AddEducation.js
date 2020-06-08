import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
   });

   const [toDateDisabled, toggleDisabled] = useState(false);
   const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
   } = formData;
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   return (
      <Fragment>
         <h1 className="large text-primary">Dodaj swoją edukację</h1>
         <p className="lead">
            <i className="fas fa-laptop-code" />
            Dodaj dowolną szkołe, bootcamp lub kurs który ukonczyłeś
         </p>
         <small className="">* wymagane</small>
         <form
            className="form"
            onSubmit={(e) => {
               e.preventDefault();
               addEducation(formData, history);
            }}
         >
            <div className="margin-vertical-1">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Szkoła/kurs"
                  name="school"
                  value={school}
                  onChange={(e) => onChange(e)}
                  required
               />
               <label className="form__label">
                  <strong>Szkoła:</strong> Nazwa szkoły, którą ukonczyłeś?
               </label>
            </div>
            <div>
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Stopień/Certyfikat"
                  name="degree"
                  value={degree}
                  onChange={(e) => onChange(e)}
                  required
               />
               <label className="form__label">
                  <strong>Stopień lub Certyfikat:</strong> jaki otrzymałeś po
                  ukończeniu
               </label>
            </div>
            <div className="margin-vertical-1">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="Kierunek szkoły"
                  value={fieldofstudy}
                  onChange={(e) => onChange(e)}
                  name="fieldofstudy"
               />
               <label className="form__label">
                  <strong>Kierunek szkoły:</strong> lub kursu?
               </label>
            </div>
            <div className="form__date">
               <div className="form__date--2">
                  <h4>Od dnia:</h4>
                  <input
                     className="form__input--noborder"
                     type="date"
                     name="from"
                     value={from}
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form__date--2">
                  <div className="form__date">
                     <h4>Do dnia:</h4>
                     <p>
                        <input
                           type="checkbox"
                           name="current"
                           checked={current}
                           value={current}
                           onChange={(e) => {
                              setFormData({ ...formData, current: !current });
                              toggleDisabled(!toDateDisabled);
                           }}
                        />{' '}
                        Nadal trwa
                     </p>
                  </div>
                  <input
                     className="form__input--noborder"
                     type="date"
                     name="to"
                     value={to}
                     onChange={(e) => onChange(e)}
                     disabled={toDateDisabled ? 'disabled' : ''}
                  />
               </div>
            </div>
            <div className="form__group margin-vertical-3">
               <textarea
                  className="form__input--noborder"
                  name="description"
                  cols="30"
                  rows="5"
                  value={description}
                  onChange={(e) => onChange(e)}
                  placeholder="Opisz krótko program szkoły/kursu"
               />
            </div>
            <input
               type="submit"
               value="Zatwierdź"
               className="btn btn-primary margin-vertical-1"
            />
            <Link className="btn margin-vertical-1" to="/dashboard">
               Wróć
            </Link>
         </form>
      </Fragment>
   );
};

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
};
export default connect(null, { addEducation })(AddEducation);
