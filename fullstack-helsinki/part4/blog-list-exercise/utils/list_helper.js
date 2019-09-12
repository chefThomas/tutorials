const dummy = blog => {
  return 1;
};

const totalLikes = posts => {
  return posts.reduce((accum, post) => accum + post.likes, 0);
};

const favoriteBlog = blogs => {
  // return blog with most posts
  if (blogs.length === 1 || blogs.length === 0) {
    return blogs;
  } else {
    const sorted = blogs.sort((a, b) => b.likes - a.likes);
    return sorted[0];
  }
};

const mostProlificAuthor = blogs => {
  // create object to hold count
  if (blogs.length === 0) {
    return "no blogs";
  }

  const count = {};
  // iterate through blogs, if author in output, increment, else add to output
  for (let blog of blogs) {
    if (Object.keys(count).includes(blog["author"])) {
      count[blog["author"]]++;
    } else {
      count[blog["author"]] = 1;
    }
  }
  // find max of output with for-in loop
  let output = { author: "", count: 0 };
  let max = 0;
  for (let author in count) {
    if (count[author] > max) {
      output = { author, count: count[author] };
      max = count[author];
    }
  }
  return output;
};

const mostPopularAuthor = blogs => {
  // create object to hold all likes
  if (!blogs.length) {
    return "no blogs";
  }
  const likesCount = {};
  //iterate through blogs and add to likesCount if author not there, else sum likes
  for (let blog of blogs) {
    const author = blog["author"];
    const likes = blog["likes"];
    if (likesCount[author]) {
      likesCount[author] += likes;
    } else {
      likesCount[author] = likes;
    }
  }
  // create obj to hold maxLikes
  let maxLikes = {};
  let max = 0;
  // iter through likesCount to find max
  for (let writer in likesCount) {
    if (likesCount[writer] > max) {
      maxLikes = { author: writer, likes: likesCount[writer] };
      max = likesCount[writer];
    }
  }
  // return max
  return maxLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostProlificAuthor,
  mostPopularAuthor
};
