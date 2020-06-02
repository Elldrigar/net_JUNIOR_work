import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
         console.log('Hasła nie sa takie same!');
      } else {
         console.log(formData);
      }
   };

   return (
      <Fragment>
         <h1 className="large text-primary">Zapisz się</h1>
         <p className="lead">
            <i className="fas fa-user" /> Utwórz Swoje konto
         </p>
         <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form__group">
               <input
                  className="form__input"
                  type="text"
                  name="name"
                  placeholder="Imię"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                  minLength="5"
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
                  onChange={(e) => onChange(e)}
                  required
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
                  onChange={(e) => onChange(e)}
                  minLength="8"
                  required
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
                  onChange={(e) => onChange(e)}
                  minLength="8"
                  required
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

export default Register;
