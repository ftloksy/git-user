import React, { Component } from 'react';
import GitUserDetail from '../components/GitUserDetail';
import Loading from '../components/Loading';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false
    };
  }

  componentDidMount() {
    // Show loading indicator when component mounts
    this.setState({showLoading: true});

    // Set a timeout to hide the loading indicator after 5 seconds
    this.loadingTimeout = setTimeout(() => {
      this.setState({showLoading: false});
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.loadingTimeout);
  }

  render() {
    return (
      <>
        {/* Render the Loading Icon with showLoading state as prop */}
        <Loading loadingShow={this.state.showLoading} />

        {/* Conditionally render GitUserDetail component based on props.params */}
        {/* GitUserDetail need a props of the github user */}
        {/* then fetch it from api.github.com */}
        {this.props.params ? 
           <GitUserDetail gitUser={this.props.params.userId} />
         : <h1>UserDetail Page</h1> }
         <a href="/">Home</a>
      </>
    );
  }
}

export default UserDetail;
