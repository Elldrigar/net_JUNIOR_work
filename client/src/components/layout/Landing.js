import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
   if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
   }
   return (
      <section className="landing">
         <div className="dark-overly">
            <div className="landing-inner">
               <h1 className="x-large">Junior Network</h1>
               <p className="lead">
                  Stwórz juniorski profil i portfolio, dziel się postami i
                  uzyskuj pomoc od innych deweloperów
               </p>
               <div className="buttons">
                  <Link to="/register" className="btn btn-primary">
                     Zarejestruj się
                  </Link>
                  <Link to="/login" className="btn">
                     Zaloguj się
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
};

Landing.propTypes = {
   isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
