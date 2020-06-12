import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
   profile: {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills,
   },
}) => {
   return (
      <div className="profile bg-light">
         <img className="img--round-left-right" src={avatar} alt="Gravatar" />
         <div>
            <h2>{name}</h2>
            <p>
               {status} {company && <span> w {company}</span>}
            </p>
            <p className="margin-vertical-1">
               {location && <span>{location}</span>}
            </p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">
               Zobacz więcej
            </Link>
         </div>
	      <ul>
		      {skills.slice(0, 4).map((skill, index) => (
		      	<li key={index} className="text-primary" >
			        <i className='fas fa-check'/> {skill}
		        </li>
		      ))}
	      </ul>
      </div>
   );
};

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileItem;
