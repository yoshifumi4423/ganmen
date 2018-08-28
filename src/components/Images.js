'use strict'
import React, { Fragment } from "react"
import styled from "styled-components"
import { fetchImages, fetchLike, fetchSkip } from "../api"

const Image = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`
const ImageWrapper = styled.div`
  margin-bottom: 10px;
  width: 500px;
`

const Content = styled.div`
  margin: 40px 40px;
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
            <button onClick={() => this.like(image.id)}>いいね {image.id}</button>
            <button onClick={() => this.skip(image.id)}>スキップ {image.id}</button>
            <Image><img src={image.thumbnailUrl} /></Image>
          </ImageWrapper>
        ))}
      </Content>
    )
  }
}

export default Images
