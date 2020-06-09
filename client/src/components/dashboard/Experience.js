import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
   const experiences = experience.map((exp) => (
      <tr key={exp._id}>
         <td className="col1">{exp.company}</td>
         <td className="hide-sm col2">{exp.title}</td>
         <td className="col3">
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
            {exp.to === null ? (
               ' Trwa'
            ) : (
               <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
         </td>
         <td>
            <button className="btn btn-danger">
               <i className="far fa-trash-alt" /> Usuń
            </button>
         </td>
      </tr>
   ));

   return (
      <Fragment>
         <h2 className="margin-vertical-2">Doświadczenie Zawodowe</h2>
         <table className="table">
            <thead>
               <tr>
                  <th>Firma</th>
                  <th className="hide-sm">Stanowisko</th>
                  <th className="hide-sm">Lata</th>
                  <th className="col4" />
               </tr>
            </thead>
            <tbody>{experiences}</tbody>
         </table>
      </Fragment>
   );
};

Experience.propTypes = {
   experience: PropTypes.array.isRequired,
};

export default Experience;
g