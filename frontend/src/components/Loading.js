

import React, { Component } from 'react';
import LoadingIcon from './LoadingIcon';

class Loading extends Component {
  constructor(props) {
    super(props);
    
    // Initialize the state of the component with a loading step
    this.state = {
      step: 1 // The current step of the loading animation
    };
  }

  componentDidMount() {
    
    // Set an interval to update the loading step every second
    this.interval = setInterval(() => {
      this.setState(prevState => {
        
        // Update the step in the state to trigger the animation
        return { step: prevState.step + 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    
    // Clear the interval to avoid memory leaks
    clearInterval(this.interval);
  }

  render() {
    const { loadingShow } = this.props;
    const { step } = this.state;
    
    // Only display the loading icon if the loadingShow prop is true
    return (
      <>
        {loadingShow && <LoadingIcon step={step} />}
      </>
    );
  }
}

export default Loading;

