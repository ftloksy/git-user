/**
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
      resposDetail: null,
      repositories: [],
      lastCommits: []
    };
    
    this.showName = this.showName.bind(this);
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
        console.log(json);     
        this.setState({
          repositories: json.repositories
        });
        return json.repositories[0].name;
      })
    ).then((name) => fetch('/api/users/ftloksy/repos/' + name )
      .then(response => response.json()
        .then(json => {
          console.log("reposDatil: ");
          console.log(json);
          this.setState({
            resposDetail: json,
            lastCommits: this.getLastFiveItem(json.commits)
          });
        })
      )
    )
  }

  getLastFiveItem(paramArray) {
    const arrayLength = paramArray.length;
    if (arrayLength >= 5) {
      const lastFiveItems = paramArray.slice(arrayLength - 5, arrayLength);
      return lastFiveItems;
    } else {
      return paramArray;
    }
  }

  showName(name) {

    setTimeout(() => {
      fetch('/api/users/ftloksy/repos/' + name)
      .then(response => response.json()
        .then(json => {
          console.log("reposDatil: ");
          console.log(json);
          this.setState({
            resposDetail: json,
            lastCommits: this.getLastFiveItem(json.commits)
          });
        })
      )
    }, 3000)
  }

  render() {
    const { imageurl, bio, gitUsername, 
        repositories, resposDetail, lastCommits } = this.state;

    return (
      <div>
        <h1>{ gitUsername }</h1>
        <ProfileImage urlsrc={ imageurl } />
        <p>{ bio }</p>
        <div id="respo">
          <div id="respoBar">
            <ul>
              {repositories.map(repo => (
                <li key={repo.name}><button onClick={() => this.showName(repo.name)}>{repo.name}</button></li>
              ))}
            </ul>
          </div>
          <div id="respoDetail">
          {resposDetail ? (
            <>
              <h2>Name: {resposDetail.name}</h2>
              <h3>Create At: {resposDetail.created_at}</h3>
              <h3>Last commit date: {resposDetail.last_commit_date}</h3>
              <p>Description: {resposDetail.description}</p>
              <h3>Last Commit:</h3>
              <ul>
                {lastCommits.map(commit => (
                  <li>{commit.description}</li>
                ))}
              </ul>
            </>
            ) : null }
          </div>
        </div>
      </div>
    );
  }
}

export default GitUser;

