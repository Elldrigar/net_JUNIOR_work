import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
   const [formData, setFormData] = useState({
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
   });

   const [toDateDisabled, toggleDisabled] = useState(false);
   const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
   } = formData;
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   return (
      <Fragment>
         <h1 className="large text-primary">Dodaj doświadczenie</h1>
         <p className="lead">
            <i className="fas fa-laptop-code" />
            Dodaj dowolne stanowisko programistyczne, które posiadałeś w
            przeszłości
         </p>
         <small className="">* wymagane</small>
         <form className="form" onSubmit={e => {
         	e.preventDefault();
         	addExperience(formData, history);
         }}>
            <div className="margin-vertical-1">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Stanowisko"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  required
               />
               <label className="form__label">
                  <strong>Stanowisko:</strong> Na jakim stanowisku pracowałeś?
               </label>
            </div>
            <div>
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Firma"
                  name="company"
                  value={company}
                  onChange={(e) => onChange(e)}
                  required
               />
               <label className="form__label">
                  <strong>Firma:</strong> Nazwa firmy
               </label>
            </div>
            <div className="margin-vertical-1">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="Lokalizacja"
                  value={location}
                  onChange={(e) => onChange(e)}
                  name="location"
               />
               <label className="form__label">
                  <strong>Lokalizacja:</strong> Gdzie pracowałeś?
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
                        Obecna praca
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
                  placeholder="Opisz krótko czym się zajmowałeś"
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

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(withRouter(AddExperience));
