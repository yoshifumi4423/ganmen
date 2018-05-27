import React from "react"

// reactのcomponent
class Images extends React.Component {
  constructor() {
    super()
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    fetch('/api/images', {credentials: "same-origin"})
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({images: json.images})
      })
  }

  render() {
    return (
      <div>
        {
          this.state.images.map((image) => {
            return <img src={image.filename} key={image.id}/>
          })
        }
      </div>
    )
  }
}

export default Images
