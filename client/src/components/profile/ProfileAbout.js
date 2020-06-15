import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
   profile: {
      bio,
      skills,
      user: { name },
   },
}) => (
   <div className="profile-about bg-light padding-2">
      {bio && (
         <Fragment>
            <h2 className="text-primary">
               {name.trim().split(' ')[0]} o sobie:
            </h2>
            <p>{bio}</p>
            <div className="line" />
         </Fragment>
      )}
      <h2 className="text-primary">Umiejętności twarde</h2>
      <div className="skills">
         {skills.map((skill, index) => (
            <div className="padding-1">
               <i className="fas fa-check-square" /> {skill}
            </div>
         ))}
      </div>
   </div>
);

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
