import { config } from "dotenv-flow";
import { CosmosClient, BulkOperationType } from "@azure/cosmos";
import { readFile } from "fs/promises";

config();

const client = new CosmosClient(process.env.CosmosDB || "");
const databaseId = process.env.COSMOS_DATABASE_ID || "trivia";
const containerId = process.env.COSMOS_CONTAINER_ID || "game";

export async function getContainer() {
  await client.databases.createIfNotExists({ id: databaseId });

  const database = client.database(databaseId);

  await database.containers.createIfNotExists({
    id: containerId,
    partitionKey: "/modelType",
  });
  const container = database.container(containerId);

  return container;
}

async function setupData() {
  const container = await getContainer();

  const questions = JSON.parse(await readFile("./trivia.json", "utf-8")).map(
    (q: Record<string, unknown>) => ({
      operationType: BulkOperationType.Create,
      resourceBody: q,
    })
  );

  try {
    const batchSize = 10;
    for (let i = 0; i < questions.length; i++) {
      const questionsBatch = questions.slice(
        i * batchSize,
        i * batchSize + batchSize
      );
      await container.items.bulk(questionsBatch);
    }

    console.log("All questions imported");
  } catch (e) {
    console.error(e);
  }
}

setupData();
