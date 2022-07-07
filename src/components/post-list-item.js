import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { fetchPost } from '../actions';

const PostListItem = (props) => {
  return (
    <NavLink style={{ textDecoration: 'none' }} onClick={() => props.fetchPost(props.id)} to={`/posts/${props.id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="list-post-title"><ReactMarkdown>{props.title}</ReactMarkdown></h4>
          <h5 className="list-post-author-name"><ReactMarkdown>{props.authorName}</ReactMarkdown></h5>
        </div>
        <div className="card-body">
          {props.coverUrl !== undefined && props.coverUrl !== null && props.coverUrl.trim() !== ''
          && <img className="list-post-image" src={props.coverUrl} alt="" />}
          <div className="list-post-hover">
            <div className="list-post-tags"> {props.tags} </div>
            <div className="list-post-times">
              <span>created on {props.createdDate}</span>
              { props.updatedDate != null && props.updatedDate !== undefined
              && <span>last edited on {props.updatedDate}</span>}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default connect(null, { fetchPost })(PostListItem);
