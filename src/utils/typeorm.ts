import { DataSource } from 'typeorm';
import { Product } from '@database/entity/product';
import { Variant } from '@database/entity/variant';
import { config } from '@utils/config.utils';

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: config.databaseUrlSql,
  entities: [Product, Variant],
  synchronize: config.typeorm.synchronize,
  logging: config.typeorm.logging,
});
