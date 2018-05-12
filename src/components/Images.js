import React from "react"

// reactのcomponent
class Images extends React.Component {
  constructor() {
    super()
    this.state = {
      image: {}
    }
  }

  componentDidMount() {
    fetch('/api/images')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({image: json.image})
      })
  }

  render() {
    return (
      <div>
        <img src={this.state.image.filename} />
      </div>
    )
  }
}

export default Images
