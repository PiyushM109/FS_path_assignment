import { useState } from "react";

export default function CommentsForm() {
  let [formData, setFormData] = useState({
    username: "",
    comment: "",
    rating: 0,
  });
  let handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    setFormData({
      username: "",
      comment: "",
      rating: 0,
    });
  };
  let handleComment = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  return (
    <div onSubmit={handleSubmit}>
      <h4>Give a Comment</h4>
      <form>
        <label htmlFor="username">Username</label>&nbsp;&nbsp;
        <input
          placeholder="username"
          id="username"
          type="text"
          value={formData.username}
          onChange={handleComment}
          name="username"
        />
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="remark">Remark</label>&nbsp;&nbsp;
        <textarea
          placeholder="Give a Remark"
          id="remark"
          cols="30"
          rows="3"
          value={formData.comment}
          onChange={handleComment}
          name="comment"
        >
          Remarks
        </textarea>
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="rating">Rating</label>&nbsp;&nbsp;
        <input
          placeholder="rating"
          type="number"
          id="rating"
          min={1}
          max={5}
          value={formData.rating}
          onChange={handleComment}
          name="rating"
        />
        <br />
        <br />
        <br />
        <br />
        <button>Add Comment</button>
      </form>
    </div>
  );
}
