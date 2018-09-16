'use strict'
const express = require('express')
const router = express.Router()

exports.years = () => {
  const date = new Date()
  const startYear = 1920
  const thisYear = date.getFullYear()
  const years = []
  for (let i = startYear; i <= thisYear; i++) {
    years.push(i)
  }

  return years
}

exports.months = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

exports.days = () => {
  return [1,  2,  3,  4,  5,  6,  7,  8,  9,  10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31]
}


