import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

export const setupTestDBEnv = (
  postgresContainer: StartedPostgreSqlContainer,
) => {
  process.env.DATABASE_NAME = postgresContainer.getDatabase();
  process.env.DATABASE_HOST = postgresContainer.getHost();
  process.env.DATABASE_USERNAME = postgresContainer.getUsername();
  process.env.DATABASE_PASSWORD = postgresContainer.getPassword();
  process.env.DATABASE_PORT = postgresContainer.getMappedPort(5432).toString();
};
