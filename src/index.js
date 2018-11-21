import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const TITLE = 'React GraphQL GitHub Client';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  header: {
    Autheorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
})

const GET_ORGANIZATION = `
{
  organization(login: "facebook"){
    name
    url
  }
}
`
class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
  };

  componentDidMount() {
    this.onFetchFromGitHub()
  }
// page 52
  onChange = event => {
    this.setState({ path: event.target.value })
  }

  onSubmit = event => {
  // fetch data

    event.preventDefault();
  }

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then( result => console.log(result))
  }


  render() {
    const { path } = this.state;
    return (
      <Fragment>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor='url'>
            Show open issues for https://github.com/
          </label><br/>
          <input
            id="url"
            type="text"
            onChange={this.onChange}
            value={path}
            style={{width: '20em'}}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {/* {results} */}
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));