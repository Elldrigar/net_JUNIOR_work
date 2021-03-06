import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
   profile: {
      status,
      company,
      location,
      website,
      social,
      user: { name, avatar },
   },
}) => {
   return (
      <div className="profile-top bg-primary padding-2">
         <img
            className="img--round-bottom margin-vertical-1"
            src={avatar}
            alt="Gravatar"
         />
         <h1 className="large">{name}</h1>
         <p className="lead">
            {status} {company && <span> w {company}</span>}
         </p>
         <p>{location && <span>{location}</span>}</p>
         <div className="icons margin-vertical-1">
            {website && (
               <a href={website}>
                  <i className="fas fa-globe fa-2x" />
               </a>
            )}
            {social && social.twitter && (
               <a href={social.twitter}>
                  <i className="fab fa-twitter fa-2x" />
               </a>
            )}
            {social && social.facebook && (
               <a href={social.facebook}>
                  <i className="fab fa-facebook fa-2x" />
               </a>
            )}
            {social && social.linkedin && (
               <a href={social.linkedin}>
                  <i className="fab fa-linkedin fa-2x" />
               </a>
            )}
            {social && social.instagram && (
               <a href={social.instagram}>
                  <i className="fab fa-instagram fa-2x" />
               </a>
            )}
	         {social && social.youtube && (
		         <a href={social.youtube}>
			         <i className="fab fa-youtube fa-2x" />
		         </a>
	         )}
         </div>
      </div>
   );
};

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileTop;
