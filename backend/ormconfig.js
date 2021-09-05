module.exports = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'chatting',
  synchronize: false,
  entities: ['dist/**/entities/*.entity.{ts,js}'],
};
