import React, { Component } from 'react';

class Dummy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',       // Initialize the searchText state
      searchResult: null,  // Initialize the searchResult state to store the API response
    };
  }

  handleSearchTextChange = (event) => {
    // Update the searchText state when the input value changes
    this.setState({ searchText: event.target.value });
  }

  handleSearch = () => {
    // Make an API call when the search button is clicked (you can replace the URL with your actual API endpoint)
    fetch(`http://localhost:8085/dummy/${this.state.searchText}`)
      .then((response) => response.json())
      .then((data) => {
        // Store the API response data in the searchResult state
        this.setState({ searchResult: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter search text"
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <button onClick={this.handleSearch}>Search</button>
        <div>
          {/* Display the API result text below the search bar */}
          {this.state.searchResult && (
            <div>
              <p>API Result:</p>
              <pre>{JSON.stringify(this.state.searchResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dummy;
