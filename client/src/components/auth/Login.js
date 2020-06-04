import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const { email, password } = formData;
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = (e) => {
      e.preventDefault();
      login(email, password);
   };

   //*** REDIRECT IF LOGGED IN ***//
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}

   return (
      <Fragment>
         <h1 className="large text-primary">Zaloguj się</h1>
         <p className="lead">
            <i className="fas fa-user" /> Zaloguj się na swoje konto
         </p>
         <form className="form margin-vertical-3" onSubmit={onSubmit}>
            <div className="form__group">
               <input
                  className="form__input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={onChange}
                  required
               />
               <label className="form__label" htmlFor="email">
                  Podaj swój e-mail
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
                  minLength="8"
                  required
               />
               <label className="form__label" htmlFor="password">
                  Podaj swoje hasło
               </label>
            </div>
            <input type="submit" value="Zaloguj" className="btn btn-primary" />
            <p className="margin-vertical-1 already-account">
               Nie masz jeszcze konta?{' '}
               <Link to="/register"> Zarejestruj się</Link>
            </p>
         </form>
      </Fragment>
   );
};

Login.propTypes = {
   login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
