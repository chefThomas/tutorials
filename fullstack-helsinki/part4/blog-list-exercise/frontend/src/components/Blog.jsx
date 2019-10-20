import React, { useState } from "react";
import PropTypes from "prop-types";

const STYLE = {
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  },
  blog: {
    border: "1px solid green"
  }
};

const Blog = ({
  id,
  title,
  author,
  url,
  likes,
  voteUp,
  deleteBlog,
  addedBy,
  currentUser
}) => {
  const [visible, setVisibile] = useState(true);
  const toggleVisibility = () => {
    setVisibile(!visible);
  };

  const handleLikeClick = () => {
    voteUp(id);
  };

  const handleDelete = () => {
    deleteBlog(id);
  };

  return (
    <div key={id} style={STYLE.blog}>
      <div onClick={toggleVisibility} className="Blog-title Blog-content">
        {title}
      </div>
      <div style={visible ? STYLE.show : STYLE.hide}>
        <div>{author}</div>
        <div className="Blog-content">{url}</div>
        <div className="Blog-content">Added by user: {addedBy}</div>
        <button onClick={handleLikeClick}>like</button>
        <span className="Blog-content">{likes}</span>
        <br></br>
        <button
          style={currentUser === addedBy ? STYLE.show : STYLE.hide}
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  id: PropTypes.string.isRequired,
  voteUp: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  addedBy: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired
};

export { Blog };
