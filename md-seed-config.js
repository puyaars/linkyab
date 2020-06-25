import "dotenv/config";
import mongoose from 'mongoose';

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/birds';

import Topics from './seeders/topics.seeder';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Topics

};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
