import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';


const AddExperience = (props) => {
   const [formData, setDormData] = useState({
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
   });

   return (
      <Fragment>
         <h1 className="large text-primary">Dodaj doświadczenie</h1>
         <p className="lead">
            <i className="fas fa-laptop-code" />
            Dodaj dowolne stanowisko programistyczne, które posiadałeś w
            przeszłości
         </p>
         <small className="">* wymagane</small>
         <form className="form">
            <div className="margin-vertical-1">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Stanowisko"
                  name="title"
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
                  />
               </div>
               <div className="form__date--2">
                  <div className="form__date">
                     <h4>Do dnia:</h4>
                     <p>
                        <input type="checkbox" name="current" value="" /> Obecna
                        praca
                     </p>
                  </div>
                  <input
                     className="form__input--noborder"
                     type="date"
                     name="to"
                  />
               </div>
            </div>
            <div className="form__group margin-vertical-3">
               <textarea
                  className="form__input--noborder"
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Opisz krótko czym się zajmowałeś"
               />
            </div>
            <input
               type="submit"
               value="Zatwierdź"
               className="btn btn-primary margin-vertical-1"
            />
            <a className="btn margin-vertical-1" href="dashboard.html">
               Wróć
            </a>
         </form>
      </Fragment>
   );
};

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
};
export default connect(null, { addExperience })(AddExperience);
