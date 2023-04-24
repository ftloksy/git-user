import React, { Component } from 'react';
import Loading from './Loading';

class GitUserDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

      // A boolean to show or hide the loading spinner
      loadingShow: false,

      resposDetail: null,
      repositories: [],
      lastCommits: [],
      errorMessage: null,
      gitUser: this.props.gitUser
    };
    
    this.showName = this.showName.bind(this);
  };

  componentDidMount() {
    const { gitUser } = this.state;

     // Set a timeout to simulate loading state for 3 seconds
    this.mountTimeout = setTimeout(() => {
    
      // Fetch user details from API  
      fetch('/api/users/' + gitUser + '/details')
      .then(response => {
 
        if (!response) {
          throw new Error("Cannot give information from github.com .");
        }
        return response.json()
        
      })
      .then(json => {
        
        if (json.error) {
          throw new Error(json.error);
        };
      
        // Update state with fetched repositories and reset error message
        this.setState({
          repositories: json.repositories,
          errorMessage: null 
        });
        return json.repositories[0].name;
      })
      .then((name) => 
      
        // Fetch details of the first repository from the fetched repositories
        fetch('/api/users/' + gitUser + '/repos/' + name )
        .then(response => {
 
          if (!response) {
            throw new Error("Cannot give information from github.com .");
          }
          return response.json();
          
        })
        .then(json => {
           
          if (json.error) {
            throw new Error(json.error);
          };
           
          // Update state with fetched repository details and last five commits
          this.setState({
            resposDetail: json,
            errorMessage: null,
            lastCommits: this.getLastFiveItem(json.commits)
          });
        })
      )
    
      .catch(error => {

        // Update state with error message if fetch fails
        this.setState({
          errorMessage: 'Fetch error: ' + error
        });
      });
    }, 3000);
  }

  // Utility function to get the last five items from an array
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
    const { gitUser } = this.state;

    // Set loadingShow state to true to show the loading spinner
    this.setState({ loadingShow: true });

    // Set a timeout to hide the loading spinner after 3 seconds
    this.loadingTimeout = setTimeout(() => {

      // After 3 seconds, set the loadingShow state to false
      this.setState({ loadingShow: false });
    }, 3000);

    // Fetch repository details from API
    this.fetchTimeout = setTimeout(() => {
      fetch('/api/users/' + gitUser + '/repos/' + name)
      .then(response => {
 
        if (!response) {
          throw new Error("Cannot give information from github.com .");
        }
        return response.json();
      })
      .then(json => {
        
        if (json.error) {
          throw new Error(json.error);
        };
        
        // Update state with fetched repository details and last five commits
        this.setState({
          resposDetail: json,
          errorMessage: null,
          lastCommits: this.getLastFiveItem(json.commits)
        });

      })
     .catch(error => {
       this.setState({
         errorMessage: 'Fetch error: ' + error
       });
     });
    }, 3000)
  }

  componentWillUnmount() {

    // Clear the fetch and loading timeout
    clearTimeout(this.fetchTimeout);
    clearTimeout(this.loadingTimeout);
    clearTimeout(this.mountTimeout);
  }

  render() {
    const { repositories, resposDetail, 
      lastCommits, errorMessage, loadingShow } = this.state;

    return (
    <>
    { errorMessage ? (
      <h1>{errorMessage}</h1>
      ): ( 
        <div id="respo">
          <div id="respoBar">
            <ul>
              {repositories.map(repo => (
                <li key={repo.name}>
                  <button onClick={() => this.showName(repo.name)}>{repo.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div id="respoDetail">
          {resposDetail ? (
            <>
              <Loading loadingShow={loadingShow} />
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
      )}
      </>
    );
  }
}

export default GitUserDetail;

