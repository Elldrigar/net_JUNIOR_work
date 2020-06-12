import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading },
}) => {
   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile]);

   return loading && profile === null ? (
      <Spinner />
   ) : (
      <Fragment>
         <h1 className="large text-primary">Panel użytkownika</h1>
         <p className="lead">
            <i className="fas fa-user" /> Witaj {user && user.name}
         </p>
         {profile !== null ? (
            <Fragment>
               <DashboardActions />
               <Experience experience={profile.experience} />
               <Education education={profile.education} />

               <div className="margin-vertical-2">
                  <button
                     onClick={() => deleteAccount()}
                     className="btn btn-danger"
                  >
                     <i className="fas fa-user-minus" /> Usuń moje konto
                  </button>
               </div>
            </Fragment>
         ) : (
            <Fragment>
               <p>
                  Nie masz jeszcze utworzonego Profilu{' '}
                  <span aria-label="Sad face" role="img">
                     🙁
                  </span>
               </p>
               <Link
                  to="/create-profile"
                  className="btn btn-primary margin-vertical-2"
               >
                  Utworz profil
               </Link>
            </Fragment>
         )}
      </Fragment>
   );
};

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   deleteAccount: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
