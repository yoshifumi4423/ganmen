'use strict'
require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: "DEV_DB_URL",
    use_env_variable_port: "DEV_PORT"
  },
  test: {
    use_env_variable: "DEV_DB_URL",
    use_env_variable_port: "DEV_PORT"
  },
  production: {
    use_env_variable: "PROD_DB_URL",
    use_env_variable_port: "PROD_PORT"
  }
}
