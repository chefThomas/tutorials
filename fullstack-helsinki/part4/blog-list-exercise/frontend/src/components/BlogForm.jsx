import React, { useState } from "react";

const BlogForm = ({
  style,
  handleTitleChange,
  title,
  handleBlogAuthorChange,
  author,
  handleUrlChange,
  url,
  handleNewBlogSubmit
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <form onSubmit={handleNewBlogSubmit} style={style}>
      <label>Title</label>
      <input type="text" onChange={handleTitleChange} value={title}></input>
      <br></br>
      <label>Author</label>
      <input
        type="text"
        onChange={handleBlogAuthorChange}
        value={author}
      ></input>
      <br></br>
      <label>Url</label>
      <input type="text" onChange={handleUrlChange} value={url}></input>
      <br></br>
      <input type="submit" />
    </form>
  );
};

export { BlogForm };
