import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentItem = ({
   postId,
   auth,
   deleteComment,
   comment: { _id, text, name, avatar, user, date },
}) => (
   <div className="post bg-white padding-1 margin-vertical-1">
      <div>
         <Link to={`/profile/${user}`}>
            <img className="img--round-left-right" src={avatar} alt="" />
            <h4>{name}</h4>
         </Link>
      </div>
      <div>
         <p className="margin-vertical-1">{text}</p>
         <p className="post-date">
            {' '}
            Napisany dnia: <Moment format="YYYY/MM/DD">{date}</Moment>
         </p>
         {!auth.loading && user === auth.user._id && (
            <button
               onClick={(e) => deleteComment(postId, _id)}
               type="button"
               className="btn btn-danger"
            >
	            <i className="far fa-trash-alt"/>
               Usuń
            </button>
         )}
      </div>
   </div>
);

CommentItem.propTypes = {
   postId: PropTypes.number.isRequired,
   comment: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
