import React, { Component } from 'react';
import GitUser from './GitUser';

class SearchGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      gitUser: null
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    // Do something with the form data, e.g. submit to a server
    this.setState({ gitUser: null }, async () => {
      await this.setState({
        gitUser: <GitUser gitUser={ inputValue } />
      });
    });
    // Clear input value after submitting the form
    this.setState({ inputValue: '' });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search Git users:
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {this.state.gitUser}
      </>  
    );
  }
}

export default SearchGit;

