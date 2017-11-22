import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import { createPost } from "../../actions/posts";

class BlogWriteForm extends React.Component {
  state = {
    data: {
      title: "",
      writer: this.props.user.email,
      content: "",
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .createPost(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        ).then(window.location.reload());
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "비워둘 수 없어요";
    if (!data.content) errors.content = "비워둘 수 없어요";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form className="blogWriteForm" onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.title}>
          <Form.Input
            label="제목"
            id="title"
            name="title"
            value={data.title}
            onChange={this.onChange}
          />
          {errors.title && <InlineError text={errors.title} />}
        </Form.Field>
        <Form.Field error={!!errors.content}>
          <Form.TextArea
            label="내용"
            id="content"
            name="content"
            value={data.content}
            onChange={this.onChange}
          />
          {errors.content && <InlineError text={errors.content} />}
        </Form.Field>
        <Form.Field>
          <Button type="submit" primary>
            올리기
          </Button>
        </Form.Field>
        {errors.global && <InlineError text={errors.global} />}
      </Form>
    );
  }
}

BlogWriteForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { createPost })(BlogWriteForm);
