import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
   const authLinks = (
      <ul>
          <li>
              <Link to="/profiles">
                  Profile Użytkowników
              </Link>
          </li>
         <li>
            <Link to="/dashboard">
               <i className="far fa-id-card" />{' '}
               <span className="hide-sm">Panel użytkownika</span>
            </Link>
         </li>
         <li>
            <a onClick={logout} href="#!">
               <i className="fas fa-sign-out-alt" />{' '}
               <span className="hide-sm">Wyloguj</span>
            </a>
         </li>
      </ul>
   );

   const guestLinks = (
      <ul>
         <li>
            <Link to="/profiles=">Juniorzy</Link>
         </li>
         <li>
            <Link to="/register">Rejestracja</Link>
         </li>
         <li>
            <Link to="/login">Logowanie</Link>
         </li>
      </ul>
   );

   return (
      <nav className="navbar bg-dark">
         <h1>
            <Link to="/dashboard">
               <i className="fas fa-users" /> Junior Network
            </Link>
         </h1>
         {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
         )}
      </nav>
   );
};

Navbar.protoType = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
