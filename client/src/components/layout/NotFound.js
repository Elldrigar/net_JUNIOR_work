import React, { Fragment } from 'react';

const NotFound = () => {
   return (
      <Fragment>
         <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle" /> Nie znaleziono strony
         </h1>
         <p className="large">Przepraszamy, ta strona nie istnieje</p>
      </Fragment>
   );
};

export default NotFound;
