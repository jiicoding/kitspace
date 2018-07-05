import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {Link, Redirect} from 'react-router-dom'
import superagent from 'superagent'

const QUERY = gql`
  query {
    user {
      username
      avatar_url
    }
    projects {
      id
      path_with_namespace
    }
  }
`

function Home(props) {
  const {user, projects} = props.data
  return (
    <div className="Home">
      <pre>{(user || {}).username}</pre>
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/settings">settings</Link>
        </li>
      </ul>
      {(() => {
        if (user) {
          return (
            <button
              onClick={() => {
                superagent.get('/!login/api/sign_out').then(r => {
                  window.location.replace('/login')
                })
              }}
            >
              sign out
            </button>
          )
        }
      })()}

      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  )
}

export default graphql(QUERY, {
  options: {errorPolicy: 'all'},
})(Home)