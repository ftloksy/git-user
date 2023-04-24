import React, { Component } from 'react';
import ProfileImage from './ProfileImage';
import '../css/GitUser.css';

class GitUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imageurl: null, // profile picture's url
      bio: null,

      // A boolean to show or hide the loading spinner
      loadingShow: false,

      gitUsername: null,
      errorMessage: null,
      gitUser: this.props.gitUser,
      gitUserDetailLink: "/userdetail/" + this.props.gitUser,
      gitUserHomepage: "https://github.com/" + this.props.gitUser
    };
    
  };

  componentDidMount() {
    const { gitUser } = this.state;

    this.mountTimeout = setTimeout(() => {
    
      // Fetch user data after 3 seconds
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
        
        // Update state with user data
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
            className="outsidelink"
            href={gitUserHomepage}>
              { gitUsername }
          </a>
        </h1>
        {/* Profile Picture */}
        <ProfileImage urlsrc={ imageurl } />
        <p>{ bio }</p>
        {/* clicking on should go to user details page. */}
        <a href={gitUserDetailLink}>{gitUser} Detail</a>
      </div>
      )}
      </>
    );
  }
}

export default GitUser;

