import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';

const PostForm = ({ addPost }) => {
   const [text, setText] = useState('');

   return (
      <div className="post-form">
         <div className="post-form-header bg-primary">
            <h3>Napisz coś</h3>
         </div>
         <form
            className="margin-vertical-1"
            onSubmit={(e) => {
               e.preventDefault();
               addPost({ text });
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
               placeholder="Napisz coś"
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

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
