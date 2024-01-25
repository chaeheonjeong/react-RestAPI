import React, { useState, useEffect } from "react";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [editingIdx, setEditingIdx] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const deletePost = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "DELETE",
    }).then(() => setPosts(posts.filter((post) => post.id !== id)));
  };

  const modifyPost = (post) => {
    setEditingIdx(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const updatePost = () => {
    const updatedPost = {
      id: editingIdx,
      title: editTitle,
      body: editBody,
    };

    setPosts(
      posts.map((post) => (post.id === editingIdx ? updatedPost : post))
    );
    setEditingIdx(-1);

    // fetch(`https://jsonplaceholder.typicode.com/posts/${editingIdx}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify(updatedPost),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPosts(
    //       posts.map((post) => (post.id === editingIdx ? updatedPost : post))
    //     );
    //     setEditingIdx(-1);
    //   });
  };

  const addPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newData) => {
        setPosts([...posts, newData]);
        setNewTitle("");
        setNewBody("");
      });
  };

  return (
    <div>
      <h2>추가하기</h2>
      <h3>제목</h3>
      <textarea
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        rows="2"
        cols="100"
      />
      <h3>내용</h3>
      <textarea
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        rows="10"
        cols="100"
      />
      <button onClick={addPost}>완료</button>
      {posts.map((post, index) => (
        <div key={post.id + index}>
          <h3>{index + 1}</h3>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => deletePost(post.id)}>삭제</button>
          <button onClick={() => modifyPost(post)}>수정</button>

          {editingIdx === post.id && (
            <div>
              <p>제목</p>
              <textarea
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                rows="2"
                cols="100"
              />
              <p>내용</p>
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows="10"
                cols="100"
              />
              <button onClick={updatePost}>수정 완료</button>
            </div>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}
