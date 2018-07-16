'use strict'
const models = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    // Users
    const userPromises = []
    for (let i = 0; i < 100; i++) {
      userPromises[i] = bcrypt.hash(`user${i}password`, 10).then((hash) => {
        const now = new Date()
      
        return models.User.create({
          email: `user${i}@example.com`,
          password: hash,
          birthday: '2018-01-01',
          gender: 'man',
          countryId: i,
          createdAt: now,
          updatedAt: now,
        })
      })  
    }
    return Promise.all(userPromises).then(users => {

      // Images
      const imagePromises = []
      const test_images = ["test_image1.png", "test_image2.png","test_image3.png"]
      const test_images_thumbnail = ["test_image1-640x640.png", "test_image2-640x640.png","test_image3-640x640.png"]
      users.forEach(user => {
        for (let i = 0; i < 3; i++) {
          const now = new Date()

          imagePromises[i] = models.Image.create({
            fieldname: "faceImage",
            originalname: "test.png",
            encoding: "7bit",
            mimetype: "image/png",
            originalUrl: `http://localhost:3000/${test_images[i]}`,
            thumbnailUrl: `http://localhost:3000/${test_images_thumbnail[i]}`,
            userId: user.id,
            createdAt: now,
            updatedAt: now,
          })
        }
      })
      return Promise.all(imagePromises)
      /*.then(images => {
        const ratingPromises = []
        images.forEach(image => {
          users.forEach(user => {
            if (user.id !== image.userId) {
              ratingPromises.push(models.Rating.create({
                like: true,
                userId: user.id,
                imageId: image.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              }))
            }
          })
        })
        return Promise.all(ratingPromises)
      })*/
    })
  },

  down: (queryInterface, Sequelize) => {
    const promises = []
    const tables = ['Users', 'Ratings', 'Images']
    for (let i = 0; i < tables.length; i++) {
      promises[i] = queryInterface.bulkDelete(tables[i], null, {})
    }
    
    return Promise.all(promises)
  }
}
