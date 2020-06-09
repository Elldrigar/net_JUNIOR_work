import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
   const educations = education.map(edu => (
       <tr key={edu._id}>
          <td className="col1">{edu.school}</td>
          <td className="hide-sm col2">{edu.degree}</td>
          <td className="col3">
             <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
             {edu.to === null ? (
                 ' Trwa'
             ) : (
                 <Moment format="YYYY/MM/DD">{edu.to}</Moment>
             )}
          </td>
          <td>
             <button className="btn btn-danger">
                <i className="far fa-trash-alt"/> Usuń
             </button>
          </td>
       </tr>
   ));

   return <Fragment>
      <h2 className="margin-vertical-2">Edukacja</h2>
      <table className="table">
         <thead>
         <tr>
            <th>Szkoła/Kurs</th>
            <th className="hide-sm">Stopień</th>
            <th className="hide-sm">Lata</th>
            <th className="col4"/>
         </tr>
         </thead>
         <tbody>{educations}</tbody>
      </table>
   </Fragment>
};

Education.propTypes = {
   education: PropTypes.array.isRequired,
};

export default Education;
