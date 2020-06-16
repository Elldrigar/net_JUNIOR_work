import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
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
         <p className="margin-1">{text}</p>
         <p>
            Napisany : <Moment format="YYYY/MM/DD">{date}</Moment>
         </p>
         <button className="btn">
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && (<span>{likes.length}</span>)}</span>
         </button>
         <button className="btn">
            <i className="fas fa-thumbs-down" /> <span>0</span>
         </button>
         <Link className="btn btn-primary" to={`/post/${_id}`}>
            Komentarze{' '}
            {comments.length > 0 && <span className="">{comments.length}</span>}
         </Link>
         {!auth.loading && user === auth.user._id && (
            <button type="button" className="btn btn-danger">
               <i className="fas fa-times" />
            </button>
         )}
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
