import React from "react"
import styled from "styled-components"

const Image = styled.div`
  position: absolute;
  max-width: 500px;
  img {
    width: 100%;
  }
 `

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
            return <Image key={image.id}><img src={image.filename}/></Image>
          })
        }
      </div>
    )
  }
}

export default Images
