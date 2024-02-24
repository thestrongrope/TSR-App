import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase, SQLTransaction, SQLError, SQLResultSet } from 'expo-sqlite';

const db: SQLiteDatabase = SQLite.openDatabase('db.db');

type Params = (string | number | null)[];

const DatabaseService = {
  execute: async (sql: string, params: Params = []): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          sql,
          params,
          (_, result: SQLResultSet) => resolve(result),
          (_, error: SQLError): boolean => {
            console.error('Error executing SQL:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  fetch: async <T = any>(sql: string, params: Params = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          sql,
          params,
          (_, { rows }: SQLResultSet) => resolve(rows._array as T[]),
          (_, error: SQLError): boolean => {
            console.error('Error fetching data:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  },
};

export default DatabaseService;
