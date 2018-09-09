'use strict'
require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: "DEV_DB_URL"
  },
  test: {
    use_env_variable: "DEV_DB_URL"
  },
  production: {
    use_env_variable: "PROD_DB_URL"
  }
}
