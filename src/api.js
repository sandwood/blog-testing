import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  posts: {
    fetchAll: post =>
      axios.post("/api/posts", { post }).then(res => res.data.posts),
    create: post =>
      axios.post("/api/posts/create", { post }).then(res => res.data.post),
    update: post =>
      axios.post("/api/posts/update", { post }).then(res => res.data.post),
    delete: post =>
      axios.post("/api/posts/delete", { post }).then(res => res.data.post)
  }
};
