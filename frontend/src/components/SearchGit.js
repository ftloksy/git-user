
import React, { Component } from 'react';
import GitUser from './GitUser';

class SearchGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '', // State to hold input value
      gitUser: null // State to hold GitUser component
    };
  }

  handleInputChange = (e) => {
    // Update inputValue state with input value
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    this.setState({ gitUser: null }, async () => {
      await this.setState({
        // Update gitUser state with GitUser component passing inputValue as prop
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

