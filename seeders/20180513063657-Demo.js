'use strict';
const models = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const userPromises = []
    for (let i = 0; i < 5; i++) {
      userPromises[i] = models.User.create({
        email: `user${i}@example.com`,
        password: `userpassword${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return Promise.all(userPromises).then(users => {
      const imagePromises = []
      const test_images = ["test_image1.png", "test_image2.png","test_image3.png"]
      users.forEach(user => {
        for (let i = 0; i < 3; i++) {
          imagePromises.push(models.Image.create({
            fieldname: "faceImage",
            originalname: "test.png",
            encoding: "7bit",
            mimetype: "image/png",
            destination: "uploads/",
            filename: test_images[i],
            size: 27109,
            userId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
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
    const dbName = ['Users', 'Ratings', 'Images']
    for (let i = 0; i < 3; i++) {
      promises[i] = queryInterface.bulkDelete(dbName[i], null, {})
    }
    
    return Promise.all(promises)
  }
};