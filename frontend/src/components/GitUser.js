import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProfileImage from './ProfileImage';
import Loading from './Loading';


class GitUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imageurl: null,
      bio: null,

      // A boolean to show or hide the loading spinner
      loadingShow: false,

      gitUsername: null,
      errorMessage: null,
      gitUser: this.props.gitUser,
      gitUserDetailLink: "/userdetail/" + this.props.gitUser,
      gitUserHomepage: "https://github.com/" + this.props.gitUser
    };
    
    //this.showName = this.showName.bind(this);
  };

  componentDidMount() {
    const { gitUser } = this.state;

    this.mountTimeout = setTimeout(() => {
    
      fetch('/api/users/' + gitUser )
      .then(response => {
   
        if (!response) {
          throw new Error("Cannot give information from github.com .");
        }
        return response.json();
        
      })
      .then(user => {
        
        if (user.error) {
          throw new Error(user.error);
        }
        
        this.setState({ 
          imageurl: user.avatar_url,
          bio: user.bio,
          gitUsername: user.name 
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: 'Fetch error: ' + error
        });
      });
    }, 3000);

  }

  componentWillUnmount() {

    // Clear the fetch and loading timeout
    clearTimeout(this.mountTimeout);
  }

  render() {
    const { imageurl, bio, gitUser, gitUserHomepage,
      gitUsername, gitUserDetailLink, errorMessage } = this.state;

    return (
    <>
    { errorMessage ? (
      <h1>{errorMessage}</h1>
      ): ( 
      <div>
        <h1>
          <a 
            className="gituserhome"
            href={gitUserHomepage}>
              { gitUsername }
          </a>
        </h1>
        <ProfileImage urlsrc={ imageurl } />
        <p>{ bio }</p>
        <Link to={gitUserDetailLink}>{gitUser} Detail</Link>
      </div>
      )}
      </>
    );
  }
}

export default GitUser;

