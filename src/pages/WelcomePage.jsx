import request from "graphql-request"
import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { categoriesQuery } from "../queries"

class WelcomePage extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    request("http://localhost:4000/", categoriesQuery)
      .then(({ categories }) => this.setState({ ...this.state, categories }))
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div>
        <h1>Welcome to the Scandiweb Test Assignment</h1>
        <p>Here are the list of Categories to explore</p>
        <ul>
          {this.state.categories.map((category) => (
            <li key={category.name}>
              <NavLink exact to={`/${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default WelcomePage
