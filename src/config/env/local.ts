const {
  DB_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  PASS_SWAGGER,
  NODE_ENV
} = process.env;

export default () => ({
    DB_DEV,
    DB_HOST_DEV,
    DB_PORT_DEV,
    DB_USERNAME_DEV,
    DB_PASSWORD_DEV,
    PASS_SWAGGER,
    NODE_ENV
})