const { MongoClient } = require("mongodb");

const uri = "mongodb://10.0.0.240:27017";
const dbName = "swift_nsql_database";

let client;

async function connectToMongoDB() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected successfully to server");
  }
  return client.db(dbName);
}

async function insertDocument(collectionName, document) {
  const db = await connectToMongoDB();

  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log(`Documento insertado con el ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error("Error al insertar documento:", error);
    throw error;
  }
}

async function findDocuments(collectionName, query = {}) {
  const db = await connectToMongoDB();

  try {
    const collection = db.collection(collectionName);
    const cursor = await collection.find(query);
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error("Error al buscar documentos:", error);
    throw error;
  }
}

async function closeConnection() {
  if (client && client.isConnected()) {
    await client.close();
    console.log("Conexión a MongoDB cerrada");
  }
}

module.exports = {
  insertDocument,
  findDocuments,
  closeConnection,
};
