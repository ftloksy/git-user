import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserSearch from './UserSearch';
import UserDetailWithParams from './UserDetailWithParams';


// App component
class GitUserRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Define a nested route for the UserSearch component */}
            {/* Home page for search Git User */}
            <Route index element={<UserSearch />} /> 
            {/* Define a nested route for the UserDetailWithParams component */}
            <Route path="userdetail">
              {/* Define a dynamic route parameter :userId for UserDetailWithParams component */}
              {/* When user search in input field. */} 
              {/* Will set a link in search result */}
              <Route path=":userId" element={<UserDetailWithParams />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default GitUserRoute;

