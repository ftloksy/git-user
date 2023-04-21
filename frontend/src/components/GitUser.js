/*
 * This is a React component called CarImage 
 * that fetches an image from a server 
 * and displays it as an <img> element in the rendered UI. 
 * Let's go through the code 
 * and add comments to explain what each part does:
 */
import React, { Component } from 'react';
import ProfileImage from './ProfileImage';

class GitUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imageurl: null,
      bio: null,
      gitUsername: null,
      repositories: []
    };
    
  };

  componentDidMount() {
    
    /**
     * Fetch the image from the Express server
     * Fetches the image from the URL passed as a prop
     */

    fetch('/api/users/ftloksy')
      // Converts the response to a Blob object
    .then(response => response.json())
    .then(user => {
      console.log(user);
      this.setState({ 
        imageurl: user.avatar_url,
        bio: user.bio,
        gitUsername: user.name 
      });
      console.log( this.state.imageurl );
    });

    fetch('/api/users/ftloksy/details')
    .then(response => response.json()
                    .then(json => {
                        console.log("Repositorise: ");
                        console.log(json.repositories); 
                        this.setState({
                          repositories: json.repositories
                        });
                    })
            );
  }

  render() {
    const { imageurl, bio, gitUsername, repositories } = this.state;

    return (
      <div>
        <h1>{ gitUsername }</h1>
        <ProfileImage urlsrc={ imageurl } />
        <p>{ bio }</p>
        <ul>
          {repositories.map(repo => (
            <li>{repo.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GitUser;

