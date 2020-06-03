import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Register = ({ setAlert, register }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });

   const { name, email, password, confirmPassword } = formData;
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setAlert('Hasła nie sa takie same!', 'danger');
      } else {
         register({ name, email, password });
      }
   };

   return (
      <Fragment>
         <h1 className="large text-primary">Zapisz się</h1>
         <p className="lead">
            <i className="fas fa-user" /> Utwórz Swoje konto
         </p>
         <form className="form margin-vertical-3" onSubmit={onSubmit}>
            <div className="form__group">
               <input
                  className="form__input"
                  type="text"
                  name="name"
                  placeholder="Imię"
                  value={name}
                  onChange={onChange}
                  // required
                  // minLength="5"
               />
               <label className="form__label" htmlFor="name">
                  Imię min. 5 znaków
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={onChange}
                  // required
               />
               <label className="form__label" htmlFor="email">
                  E-mail. Strona używa Gravatara do zdjęcia profilowego
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input"
                  type="password"
                  placeholder="Hasło"
                  name="password"
                  value={password}
                  onChange={onChange}
                  // minLength="8"
                  // required
               />
               <label className="form__label" htmlFor="password">
                  Twoje unikatowe hasło min. 8 znaków
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input"
                  type="password"
                  placeholder="Potwierdź hasło"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  // minLength="8"
                  // required
               />
               <label className="form__label" htmlFor="confirmPassword">
                  Potwierdź swoje hasło
               </label>
            </div>
            <input
               type="submit"
               value="Utwórz konto"
               className="btn btn-primary"
            />
            <p className="margin-vertical-1 already-account">
               Masz juz konto? <Link to="/login"> Zaloguj się</Link>
            </p>
         </form>
      </Fragment>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
};

export default connect(
    null,
    { setAlert, register }
    )(Register);
