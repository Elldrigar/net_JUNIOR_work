import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');
   return (
      <div className="post-form">
         <div className="post-form-header bg-primary">
            <h3>Zostaw komentarz</h3>
         </div>
         <form
            className="margin-vertical-1"
            onSubmit={(e) => {
               e.preventDefault();
               addComment(postId, { text });
               setText('');
            }}
         >
            <textarea
               className="form__input--noborder"
               name="text"
               cols="30"
               rows="5"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Napisz komentarz"
            />
            <input
               type="submit"
               className="btn btn-dark margin-vertical-1"
               value="Zatwierdź"
            />
         </form>
      </div>
   );
};

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
