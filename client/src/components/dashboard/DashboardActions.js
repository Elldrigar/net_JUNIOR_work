import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
   return (
      <div className="dash-buttons">
         <Link to="/edit-profile" className="btn">
            <i className="fas fa-user-circle" /> Edytuj profil
         </Link>
         <Link to="/add-experience" className="btn">
            <i className="fas fa-laptop-code" /> Dodaj doświadczenie
         </Link>
         <Link to="/add-education" className="btn text-primary">
            <i className="fas fa-graduation-cap" /> Dodaj wykrztałcenie
         </Link>
      </div>
   );
};

export default DashboardActions;
