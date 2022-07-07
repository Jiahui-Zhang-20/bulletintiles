import React, { Component } from 'react';
import { connect } from 'react-redux';
import produce, { enableAllPlugins } from 'immer';
import ReactMarkdown from 'react-markdown';
import { fetchPost, updatePost, deletePost } from '../actions';
import withRouter from './with-router';
import ErrorPage from './error-page';

// enables immer
enableAllPlugins();

class PostDetail extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.currentPost);
    this.state = {
      editing: false,
      titleAlert: false,
      id: this.props.params.postid,
      title: props.currentPost.title,
      tags: props.currentPost.tags,
      coverUrl: props.currentPost.coverUrl,
      content: props.currentPost.content,
      authenticated: this.props.authenticated,
    };
  }

  componentDidMount() {
    // console.log('component did mount');
    this.props.fetchPost(this.props.params.postid);
  }

  onEditButtonClick = (event) => {
    this.setState({
      editing: true,
    });
    this.setState(
      produce((draftState) => {
        draftState.titleAlert = false;
        draftState.title = this.props.currentPost.title;
        draftState.tags = this.props.currentPost.tags;
        draftState.coverUrl = this.props.currentPost.coverUrl;
        draftState.content = this.props.currentPost.content;
      }),
    );
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      titleAlert: false,
    });
  };

  onTagsChange = (event) => {
    this.setState({
      tags: event.target.value,
    });
  };

  onCoverUrlChange = (event) => {
    this.setState({
      coverUrl: event.target.value,
    });
  };

  onContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  onEditSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({
        titleAlert: true,
      });
    } else {
    // need to call dispatch function
      this.setState({
        editing: false,
      });
      const editedPost = {
        title: this.state.title,
        tags: this.state.tags,
        coverUrl: this.state.coverUrl,
        content: this.state.content,
      };
      this.props.updatePost(this.state.id, editedPost);
    }
  };

  onEditCancel = (event) => {
    // need to call dispatch function
    this.setState({
      editing: false,
      titleAlert: false,
    });
    this.setState(
      produce((draftState) => {
        draftState.title = this.props.currentPost.title;
        draftState.tags = this.props.currentPost.tags;
        draftState.coverUrl = this.props.currentPost.coverUrl;
        draftState.content = this.props.currentPost.content;
      }),
    );
  };

  onDelete = (event) => {
    this.props.deletePost(this.state.id, this.props.navigate);
  };

  render() {
    let createdDate, updatedDate;

    if (this.props.currentPost.created_at !== undefined) {
      createdDate = new Date(this.props.currentPost.created_at);
      createdDate = createdDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (this.props.currentPost.updated_at !== undefined) {
      updatedDate = new Date(this.props.currentPost.updated_at);
      updatedDate = updatedDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (createdDate === updatedDate) {
      updatedDate = undefined;
    }
    let titleClass = 'standard-textarea';
    if (this.state.titleAlert) {
      titleClass = 'alert-textarea';
    }
    if (this.props.error.hasError) {
      return (
        <ErrorPage errorMessage={this.props.error.message} errorExplanation="An error has occurred..." />
      );
    }
    if (this.state.editing) {
      return (
        <div id="edit-form" className="post-form">
          <form onSubmit={this.onEditSubmit} className="post-edit">
            <div className="form-group">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="title-edit" />
              Title
              <textarea id="title-edit"
                className={`title-input ${titleClass}`}
                type="text"
                placeholder="title"
                onChange={this.onTitleChange}
                value={this.state.title}
                rows="2"
                cols="75"
              />
            </div>
            <div className="form-group">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="tags-edit" />
              Tags
              <textarea id="tags-edit"
                className="tags-input"
                type="text"
                placeholder="comma separated tags"
                onChange={this.onTagsChange}
                value={this.state.tags}
                rows="3"
                cols="75"
              />
            </div>
            <div className="form-group">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="cover-url-edit" />
              Cover Image Url
              <textarea id="cover-url-edit"
                className="cover-image-url-input"
                type="text"
                placeholder="cover image URL"
                onChange={this.onCoverUrlChange}
                value={this.state.coverUrl}
                rows="1"
                cols="75"
              />
            </div>
            <div className="form-group">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="content-edit" />
              Content
              <textarea id="content-edit"
                className="content-input"
                type="text"
                placeholder="content"
                onChange={this.onContentChange}
                value={this.state.content}
                rows="20"
                cols="75"
              />
            </div>
            <div className="post-details-buttons">
              <button className="btn btn-warning btn" type="button" onClick={this.onEditCancel}>cancel editing</button>
              <button className="btn btn-success btn" type="button" onClick={this.onEditSubmit}>done editing</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="card-wrapper">
          <div className="card post-details-card">
            <div className="card-header">
              <h3 className="post-details-title"><ReactMarkdown>{this.props.currentPost.title}</ReactMarkdown></h3>
              { this.props.currentPost.author !== undefined && this.props.currentPost.author.authorName !== undefined
              && <h5 className="post-details-title"><ReactMarkdown>{this.props.currentPost.author.authorName}</ReactMarkdown></h5>}
              <div className="post-details-times">
                { createdDate != null && createdDate !== undefined
              && (
                <span>created on {createdDate}</span>
              )}
                { updatedDate != null && updatedDate !== undefined
              && (
                <span>last edited on  {updatedDate}</span>
              )}
              </div>
            </div>
            <div className="card-body">
              { (this.props.currentPost.coverUrl !== undefined && this.props.currentPost.coverUrl !== null && this.props.currentPost.coverUrl.trim() !== '')
              && <img className="post-details-image" src={this.props.currentPost.coverUrl} alt="" />}
              <div className="post-details-tags"> {this.props.currentPost.tags} </div>
              <div className="post-details-content"><ReactMarkdown>{this.props.currentPost.content}</ReactMarkdown></div>
              <div className="post-details-buttons">
                {this.state.authenticated && this.props.currentPost.author !== undefined
                && (this.props.currentPost.author.email === this.props.email)
              && (
              <div className="post-details-buttons">
                <button className="btn btn-info btn" type="button" onClick={this.onEditButtonClick}>edit</button>
                <button className="btn btn-danger btn" type="button" onClick={this.onDelete}>delete</button>
              </div>
              )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => (
  {
    currentPost: reduxState.blog.currentPost,
    error: reduxState.error,
    authenticated: reduxState.auth.authenticated,
    email: reduxState.auth.email,
  }
);

// need to dispatch on submit
export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(PostDetail));
