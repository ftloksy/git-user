import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchGit from '../components/SearchGit';

// Home component
class UserSearch extends Component {
  render() {
    return (
      <>
        <h1>Github.com User Search Page</h1>
        <SearchGit />
      </>
    );
  }
}

export default UserSearch;
