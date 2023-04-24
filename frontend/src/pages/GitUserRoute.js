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
            <Route index element={<UserSearch />} />
            <Route path="userdetail">
              <Route path=":userId" element={<UserDetailWithParams />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default GitUserRoute;

