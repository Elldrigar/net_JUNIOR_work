import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-moment';
import PropTypes from 'prop-types';

const PostItem = ({
   auth,
   post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
   <div className="post bg-white margin-vertical-1 padding-1">
      <div>
         <a href="profile.html">
            <img
               className="img--round-left-right margin-vertical-1"
               src={avatar}
               alt="Gravatar"
            />
            <h4>{name}</h4>
         </a>
      </div>
      <div>
         <p className="margin-1">
	         {text}
         </p>
         <button className="btn">
            <i className="fas fa-thumbs-up" /> <span>4</span>
         </button>
         <button className="btn">
            <i className="fas fa-thumbs-down" /> <span>0</span>
         </button>
         <a className="btn btn-primary" href="post.html">
            Dyskusja
         </a>
      </div>
   </div>
);

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
