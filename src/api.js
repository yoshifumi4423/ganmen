'use strict'
export const fetchImages = () => {
  return fetch('/api/images', {
    credentials: "same-origin"
  })
  .then(response => {
    return response.json()
  })
}

export const fetchLike = (imageId) => {
  return fetch('api/like', {
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({imageId: imageId}),
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((response) => {
    return response.json()
  })
}

export const fetchSkip = (imageId) => {
  return fetch('api/skip', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({imageId: imageId}),
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((response) => {
    return response.json()
  })
}
