import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({showLoading: true});

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
        <Loading loadingShow={this.state.showLoading} />
        {this.props.params ? 
           <GitUserDetail gitUser={this.props.params.userId} />
         : <h1>UserDetail Page</h1> }
         <Link to="/">Home</Link>
      </>
    );
  }
}

export default UserDetail;
