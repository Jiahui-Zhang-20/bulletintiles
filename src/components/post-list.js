import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostListItem from './post-list-item';
import { fetchPosts } from '../actions';

class PostList extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.allPosts === null) {
      return (
        <div />
      );
    }
    const PostItems = this.props.allPosts.filter(
      (post) => {
        if (this.props.searchTerm.trim() === '') {
          return true;
        }
        let hasTag = false;
        let searchTerms = this.props.searchTerm.trim().toLowerCase().split(/[, ]+/);
        searchTerms = searchTerms.filter((term) => {
          return term.trim() !== '' && term.trim() !== ',';
        });
        for (let k = 0; k < searchTerms.length; k += 1) {
          if (hasTag) {
            break;
          }
          const tagsList = post.tags.toLowerCase().split(',');
          for (let i = 0; i < tagsList.length; i += 1) {
            const currTag = tagsList[i].trim().toLowerCase();
            if (currTag.includes(searchTerms[k].trim())) {
              hasTag = true;
              break;
            }
          }
          const postTitle = post.title.toLowerCase();
          if (postTitle.includes(searchTerms[k].trim())) {
            hasTag = true;
            break;
          }
          const postAuthorName = post.author.authorName.toLowerCase();
          if (postAuthorName.includes(searchTerms[k].trim())) {
            hasTag = true;
            break;
          }
        }
        return hasTag;
      },
    ).map((post) => {
      let createdDate = new Date(post.created_at);
      createdDate = createdDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      let updatedDate = new Date(post.updated_at);
      updatedDate = updatedDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      if (createdDate === updatedDate) {
        updatedDate = undefined;
      }
      let authorName = '';
      if (post.author !== undefined && post.author.authorName !== undefined) {
        authorName = post.author.authorName;
      }
      return (
        <li key={post.id}><PostListItem id={post.id} title={post.title} authorName={authorName} coverUrl={post.coverUrl} tags={post.tags} createdDate={createdDate} updatedDate={updatedDate} /></li>
      );
    });

    // render() {
    return (
      <div>
        <ul id="post-list">
          {PostItems}
        </ul>
      </div>
    );
  }
}

// define a `mapStateToProps` function that takes in state and maps it to a key in an object.
const mapStateToProps = (reduxState) => (
  {
    allPosts: reduxState.blog.allPosts,
    searchTerm: reduxState.search.searchTerm,
  });

// connect videolist so that now props.videos comes from redux
export default connect(mapStateToProps, { fetchPosts })(PostList);
