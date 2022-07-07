import produce from 'immer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions';
// import withRouter from './with-router';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleAlert: false,
      title: '',
      tags: '',
      coverUrl: '',
      content: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onTitleChange = (event) => {
    this.setState({ title: event.target.value, titleAlert: false });
  };

  // eslint-disable-next-line class-methods-use-this
  onTagsChange = (event) => {
    const tags = event.target.value;
    this.setState({ tags });
  };

  // eslint-disable-next-line class-methods-use-this
  onCoverUrlChange = (event) => {
    this.setState({ coverUrl: event.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  onInputSubmit = (event) => {
    event.preventDefault();
    this.onButtonSubmit();
  };

  // eslint-disable-next-line class-methods-use-this
  onButtonSubmit = (event) => {
    if (this.state.title === '') {
      this.setState(
        produce((draftState) => {
          draftState.titleAlert = true;
        }),
      );
    } else {
      const newPost = {
        title: this.state.title,
        tags: this.state.tags,
        coverUrl: this.state.coverUrl,
        content: this.state.content,
      };
      // console.log(this.props.navi);
      this.props.createPost(newPost, this.props.navigate);
    }
  };

  render() {
    let titleClass = 'standard-textarea';
    if (this.state.titleAlert) {
      titleClass = 'alert-textarea';
    }
    return (
      <form id="new-post" onSubmit={this.onInputSubmit}>
        <div className="form-group">
          <label htmlFor="input-title">
            Title
            <textarea type="title"
              className={`form-control ${titleClass}`}
              id="input-title"
              placeholder="title (cannot be empty)"
              onChange={this.onTitleChange}
              value={this.state.title}
              rows="2"
              cols="75"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="input-tags">
            Tags
            <textarea type="tags"
              className="form-control"
              id="input-tags"
              placeholder="comma separated tags"
              onChange={this.onTagsChange}
              value={this.state.tags}
              rows="3"
              cols="75"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="cover-image">
            Cover Image Url
            <textarea type="cover-image"
              className="form-control"
              id="cover-image"
              placeholder="cover image URL"
              onChange={this.onCoverUrlChange}
              value={this.state.coverUrl}
              rows="1"
              cols="75"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="input-content">
            Content
            <textarea type="content"
              className="form-control"
              id="input-content"
              placeholder="content"
              onChange={this.onContentChange}
              value={this.state.content}
              rows="20"
              cols="75"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    );
  }
}

export default connect(null, { createPost })(NewPost);
