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

    this.mountTimeout = setTimeout(() => {
    
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
      
        this.setState({
          repositories: json.repositories,
          errorMessage: null 
        });
        return json.repositories[0].name;
      })
      .then((name) => fetch('/api/users/' + gitUser + '/repos/' + name )
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
           
          this.setState({
            resposDetail: json,
            errorMessage: null,
            lastCommits: this.getLastFiveItem(json.commits)
          });
        })
      )
    
      .catch(error => {
        this.setState({
          errorMessage: 'Fetch error: ' + error
        });
      });
    }, 3000);
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

    const { gitUser } = this.state;

    this.setState({ loadingShow: true });

    this.loadingTimeout = setTimeout(() => {

      // After 5 seconds, set the loadingShow state to false
      this.setState({ loadingShow: false });
    }, 3000);

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
                <li key={repo.name}><button onClick={() => this.showName(repo.name)}>{repo.name}</button></li>
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

