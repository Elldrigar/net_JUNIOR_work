import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
   experience: { company, title, to, from, description },
}) => (
   <div>
      <h3 className="text-dark">{company.name}</h3>
      <p>
         <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
         {!to ? ' Trwa' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
         <strong>Pozycja: </strong> {title}
      </p>
      <p>
         <strong>Opis: </strong> {description}
      </p>
   </div>
);

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
