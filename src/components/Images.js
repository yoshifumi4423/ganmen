import React, { Fragment } from "react"
import styled from "styled-components"
import { fetchImages, fetchLike, fetchSkip } from "../api"

const Content = styled.div`
  margin: 40px 40px;
`
const ImageWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
`
const Image = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  button {
    border: 0;
    padding: 10px;
    background-color: #fafafa;

    &:hover {
      cursor: pointer;
    }

    &:active {
    }
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
    fetchImages()
    .then(json => {
      this.setState({ images: json.images })
    })
  }

  removeImage(imageId) {
    const newImages = this.state.images.filter((image) => {
      return image.id !== imageId 
    })
    this.setState({ images: newImages })
  }

  fetchMoreImages() {
    if (this.state.images.length > 5) return

    fetchImages()
    .then(json => {
      this.setState({ images: json.images })
    })
  }

  like(imageId) {
    fetchLike(imageId)
    .then(json => {
      if (json.result) {
        console.log("LIKE 成功")
        this.removeImage(imageId)
        this.fetchMoreImages()
      } else {
        console.log("LIKE 失敗")
      }
    })
  }

  skip(imageId) {
    fetchSkip(imageId)
    .then(json => {
      if (json.result) {
        console.log("SKIP 成功")
        this.removeImage(imageId)
        this.fetchMoreImages()
      } else {
        console.log("SKIP 失敗")
      }
    })
  }
  
  render() {
    return (
      <Content>
        {this.state.images.map((image) => (
          <ImageWrapper key={image.id}>
            <Image><img src={image.thumbnailUrl} /></Image>
            <Buttons>
              <button onClick={() => this.skip(image.id)}><img src="../skip.png" />{image.id}</button>
              <button onClick={() => this.like(image.id)}><img src="../like_fill.png" />{image.id}</button>
            </Buttons>
          </ImageWrapper>
        ))}
      </Content>
    )
  }
}

export default Images
