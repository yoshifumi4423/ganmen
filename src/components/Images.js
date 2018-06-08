import React, { Fragment } from "react"
import styled from "styled-components"

const Image = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`
const ImageWrapper = styled.div`
  width: 500px;
  position: absolute;
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
    fetch('/api/images', {
      credentials: "same-origin"
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ images: json.images })
      })
  }

  like(imageId) {
    fetch('/api/like', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({imageId: imageId}),
      credentials: "same-origin",
      method: "POST",
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      if (json.result) {
        console.log("成功")
        const newImages = this.state.images.filter((image) => {
          return image.id !== imageId 
        })
        this.setState({ images: newImages })
      } else {
        console.log("失敗")
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.images.map((image) => {
            return (
              <ImageWrapper key={image.id}>
                <button onClick={() => this.like(image.id)}>いいね {image.id}</button>
                <button >スキップ {image.id}</button>
                <Image><img src={image.filename} /></Image>
              </ImageWrapper>
            )
          })
        }
      </div>
    )
  }
}

export default Images
