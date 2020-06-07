import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
   profile: { profile, loading },
   createProfile,
   getCurrentProfile,
   history,
}) => {
   const [formData, setFormData] = useState({
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
   });

   const [displaySocialInputs, toggleSocialInputs] = useState(false);

   useEffect(() => {
      getCurrentProfile();

      setFormData({
         company: loading || !profile.company ? '' : profile.company,
         website: loading || !profile.website ? '' : profile.website,
         location: loading || !profile.location ? '' : profile.location,
         status: loading || !profile.status ? '' : profile.status,
         skills: loading || !profile.skills ? '' : profile.skills.join(','),
         githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
         bio: loading || !profile.bio ? '' : profile.bio,
         twitter: loading || !profile.twitter ? '' : profile.twitter,
         facebook: loading || !profile.facebook ? '' : profile.facebook,
         linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
         youtube: loading || !profile.youtube ? '' : profile.youtube,
         instagram: loading || !profile.instagram ? '' : profile.instagram,
      });
   }, [loading]);

   const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
   } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, history, true);
   };

   return (
      <Fragment>
         <h1 className="large text-primary">Stwórz swoj profil</h1>
         <p className="lead">
            <i className="fas fa-user" /> Zdobądźmy trochę informacji, aby Twój
            profil się wyróżniał.
         </p>
         <small className="">* wymagane</small>
         <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form__group margin-vertical-2">
               <select
                  className="form__input--noborder"
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                  // required
               >
                  <option selected disabled value="0">
                     * Wybierz status zawodowy
                  </option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Developer">Mid Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Projekt Manager</option>
                  <option value="Student or Learning">
                     Student lub Samouk
                  </option>
                  <option value="Instructor">Instruktor lub Nauczyciel</option>
                  <option value="Intern">Stażysta</option>
                  <option value="Other">Inne</option>
               </select>
            </div>
            <div className="form__group">
               <input
                  className="form__input--noborder"
                  type="text"
                  id="text"
                  placeholder="Firma"
                  value={company}
                  onChange={(e) => onChange(e)}
                  name="company"
               />
               <label className="form__label" htmlFor="text">
                  <strong>Firma:</strong> Twoja firma lub firma, w której
                  pracujesz
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="Strona internetowa"
                  value={website}
                  onChange={(e) => onChange(e)}
                  name="website"
               />
               <label className="form__label" htmlFor="text">
                  <strong>Strona internetowa:</strong> Twoja lub firmy, w której
                  pracujesz
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="Lokalizacja"
                  value={location}
                  onChange={(e) => onChange(e)}
                  name="location"
               />
               <label className="form__label" htmlFor="text">
                  <strong>Lokalizacja:</strong> Miejsce pracy
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="* Umiejętności"
                  value={skills}
                  onChange={(e) => onChange(e)}
                  name="skills"
                  // required
               />
               <label className="form__label" htmlFor="text">
                  <strong>Umiejętności:</strong> Proszę odziel przecinkami
                  (np.HTML,CSS)
               </label>
            </div>
            <div className="form__group">
               <input
                  className="form__input--noborder"
                  type="text"
                  placeholder="Github Nazwa użytkownika"
                  value={githubusername}
                  onChange={(e) => onChange(e)}
                  name="githubusername"
               />
               <label className="form__label" htmlFor="text">
                  <strong>Github:</strong> Jeśli chcesz mieć swoje najnowsze
                  repo i link Github, podaj swoją nazwę użytkownika
               </label>
            </div>
            <div className="form__group">
               <textarea
                  className="form__input--noborder"
                  placeholder="Krótko o Tobie"
                  value={bio}
                  onChange={(e) => onChange(e)}
                  name="bio"
               />
               <label className="form__label--area" htmlFor="text">
                  <strong>Opis:</strong> Opisz się w kilku zdaniach
               </label>
            </div>

            <div className="margin-vertical-2">
               <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
               >
                  Dodaj linki do sieci społecznościowej
               </button>
               <span>Opcjonalnie</span>
            </div>

            {displaySocialInputs && (
               <Fragment>
                  <div className="form__group social-input margin-vertical-1">
                     <i className="fab fa-twitter fa-2x" />
                     <input
                        className="form__input--noborder"
                        type="text"
                        placeholder="Twitter URL"
                        value={twitter}
                        onChange={(e) => onChange(e)}
                        name="twitter"
                     />
                  </div>
                  <div className="form__group social-input margin-vertical-1">
                     <i className="fab fa-facebook fa-2x" />
                     <input
                        className="form__input--noborder"
                        type="text"
                        placeholder="Facebook URL"
                        value={facebook}
                        onChange={(e) => onChange(e)}
                        name="facebook"
                     />
                  </div>
                  <div className="form__group social-input margin-vertical-1">
                     <i className="fab fa-youtube fa-2x" />
                     <input
                        className="form__input--noborder"
                        type="text"
                        placeholder="YouTube URL"
                        value={youtube}
                        onChange={(e) => onChange(e)}
                        name="youtube"
                     />
                  </div>
                  <div className="form__group social-input margin-vertical-1">
                     <i className="fab fa-linkedin fa-2x" />
                     <input
                        className="form__input--noborder"
                        type="text"
                        placeholder="Linkedin URL"
                        value={linkedin}
                        onChange={(e) => onChange(e)}
                        name="linkedin"
                     />
                  </div>
                  <div className="form__group social-input margin-vertical-1">
                     <i className="fab fa-instagram fa-2x" />
                     <input
                        className="form__input--noborder"
                        type="text"
                        placeholder="Instagram URL"
                        value={instagram}
                        onChange={(e) => onChange(e)}
                        name="instagram"
                     />
                  </div>
               </Fragment>
            )}

            <input
               type="submit"
               value="Zatwierdź"
               className="btn btn-primary margin-vertical-1"
            />
            <a className="btn btn-light margin-vertical-1" href="#!">
               Wróć
            </a>
         </form>
      </Fragment>
   );
};

EditProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
   withRouter(EditProfile),
);
