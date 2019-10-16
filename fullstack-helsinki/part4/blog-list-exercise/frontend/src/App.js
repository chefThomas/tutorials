import React, { useState, useEffect } from "react";
import {
  login,
  getBlogs,
  postBlog,
  removeBlog,
  voteUp
} from "./services/api-requests";
import { BlogForm } from "./components/BlogForm";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { Blog } from "./components/Blog";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const STYLE = {
    show: {
      visibility: "visible"
    },
    hide: {
      visibility: "hidden"
    }
  };

  useEffect(() => {
    // get token from local storage and make api req for blogs
    const getTokenFromLocalStorage = () => {
      return window.localStorage.getItem("userToken");
    };

    const retrieveBlogs = async () => {
      setToken(token);
      const { data } = await getBlogs(token);
      console.log("get blogs response: ", data);
      setBlogs(data);
    };

    const token = getTokenFromLocalStorage();
    if (token) {
      retrieveBlogs();
    }
  }, []);

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = async e => {
    e.preventDefault();
    if (!username || !password) {
      handleMessage("must enter username and password");
    } else {
      const response = await login(username, password);
      console.log("response data: ", response);
      const { message, token, currentUsername } = response.data;

      if (message) {
        handleMessage(message);
      } else {
        setToken(token);
        setCurrentUsername(currentUsername);
        window.localStorage.setItem("userToken", token);
        const { data } = await getBlogs(token);
        setBlogs(data);
        // setCurrentUsername();
      }
    }
  };

  const handleLogout = e => {
    window.localStorage.removeItem("userToken");
    setToken(null);
    setCurrentUsername("");
    setUsername("");
    setPassword("");
  };

  // blog form
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleBlogAuthorChange = e => {
    setAuthor(e.target.value);
  };
  const handleUrlChange = e => {
    setUrl(e.target.value);
  };
  ///////

  const handleMessage = messageDisplay => {
    setMessage(messageDisplay);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleNewBlogSubmit = async e => {
    e.preventDefault();

    if (!title || !author || !url) {
      return handleMessage("all new blogs must have title, author and url");
    } else {
      const newBlog = {
        title,
        author,
        url
      };
      console.log("newBlog", newBlog);
      const results = await postBlog(token, newBlog);
      console.log("posted blog results", results);
      const updatedBlogs = blogs.concat(results.data);
      setBlogs(updatedBlogs);
      handleMessage("new blog succesfully added");
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };
  const deleteBlog = async id => {
    const { data } = await removeBlog(token, id);
    console.log("delete result: ", data);
    // // remove deleted blog from state
    // const updatedBlogs = blogs.filter(blog => {
    //   return blog.id !== id;
    // });
    // setBlogs(updatedBlogs);

    console.log("delete blog id: ", id);
  };
  const generateBlogs = () => {
    // sort by decreasing number of likes
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    console.log("sorted blogs: ", sortedBlogs);

    return sortedBlogs.map(blog => {
      return (
        <Blog
          deleteBlog={deleteBlog}
          key={blog._id}
          id={blog._id}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          voteUp={incrementLike}
          userAddedId={blog.addedByUserId}
          addedBy={blog.addedBy}
          currentUser={currentUsername}
        />
      );
    });
  };

  const incrementLike = async id => {
    const [result] = blogs.filter(blog => blog.id === id);
    const updated = { ...result, likes: result.likes + 1 };
    // api PUT request
    console.log("does updated user change?: ", updated);
    const updatedBlog = await voteUp(id, updated);
    console.log("updatedBlog: ", updatedBlog);
    setBlogs(
      blogs.map(blog => {
        return blog.id === id ? { ...blog, likes: result.likes + 1 } : blog;
      })
    );
  };

  return (
    <div className="App">
      <h2 style={token ? STYLE.hide : STYLE.show}>log in to application</h2>
      <button style={!token ? STYLE.hide : STYLE.show} onClick={handleLogout}>
        logout
      </button>

      <Togglable user={token}>
        <LoginForm
          handleLogin={handleLogin}
          handleUsername={handleUsername}
          username={username}
          handlePassword={handlePassword}
          password={password}
        />
      </Togglable>
      <h2 style={token ? STYLE.show : STYLE.hide}>Add a blog</h2>
      <h3 style={message ? STYLE.show : STYLE.hide}>{message}</h3>
      <BlogForm
        handleNewBlogSubmit={handleNewBlogSubmit}
        style={!token ? STYLE.hide : STYLE.show}
        handleTitleChange={handleTitleChange}
        title={title}
        handleBlogAuthorChange={handleBlogAuthorChange}
        author={author}
        handleUrlChange={handleUrlChange}
        url={url}
      />
      <div>{token ? generateBlogs(blogs) : <div>no blogs</div>}</div>
      <div></div>
    </div>
  );
}

export default App;
