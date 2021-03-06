import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { parse } from 'pg-connection-string';

const defaultOptions: SequelizeModuleOptions = {
  dialect: 'postgres',
  synchronize: true,
  autoLoadModels: true,
  sync: {
    alter: true,
  },
};

const getProdConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  const DATABASE_URL = configService.get('DATABASE_URL');

  if (!DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set. Set it to connect to the database.',
    );
  }
  const parser = parse(DATABASE_URL);

  return {
    username: parser.user,
    database: parser.database,
    password: parser.password,
    host: parser.host,
    port: parseInt(parser.port, 10),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    ...defaultOptions,
  };
};

const getDEVConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  ...defaultOptions,
});

const getDBConfig = (configService: ConfigService): SequelizeModuleOptions => {
  const isProd = configService.get('NODE_ENV') === 'production';
  return isProd ? getProdConfig(configService) : getDEVConfig(configService);
};

export { getDBConfig };
