
/*
 * that fetches an image from a server 
 * and displays it as an <img> element in the rendered UI. 
 */
import React, { Component } from 'react';
import Loading from './Loading';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    };
  };

  componentDidMount() {
    
    /**
     * Fetch the image from the Express server
     * Fetches the image from the URL passed as a prop
     */
    this.waitFetchTimeout = setTimeout( () => { 
      fetch(this.props.urlsrc)
    
      // Converts the response to a Blob object
      .then(response => response.blob())
      .then(blob => {
  
        // Sets the Blob URL as the image source in the component's state
        this.setState({ imageSrc: URL.createObjectURL(blob) });
      })
      .catch(error => {
        console.error('Failed to fetch image:', error);
      });

    }, 5000 );
  }
  
  componentWillUnmount() {
    clearTimeout(this.waitFetchTimeout);
  }

  render() {
    const { imageSrc } = this.state;

    return (
      <div>
        {imageSrc ? (
          <img src={imageSrc} alt="Example" />
        ) : (
          <Loading loadingShow={!imageSrc} />
        )}
      </div>
    );
  }
}

export default ProfileImage;
