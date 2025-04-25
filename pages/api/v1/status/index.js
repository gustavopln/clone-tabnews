import database from "infra/database.js";

async function status(request, response) {
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = dbMaxConnectionsResult.rows[0].max_connections;

  const dbName = process.env.POSTGRES_DB;
  const dbOpenedCoonectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';"
  const dbOpenedConnectionsValue = dbOpenedCoonectionsResult.rows.length;

  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnectionsValue),
        opened_connections: dbOpenedConnectionsValue,
      },
    },
  });
}

export default status;
