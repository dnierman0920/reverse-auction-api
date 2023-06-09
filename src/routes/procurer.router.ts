// External
import express, { Request, Response, Router } from "express";
import { collections } from "../services/database.service";
import Procurer from "../models/procurer";
import { ObjectId } from "mongodb";

// Global Config
const procurerRouter = Router();
procurerRouter.use(express.json());

// GET
procurerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const collectionProcurers = await collections.procurers;
    if (collectionProcurers) {
      const procurers = (await collectionProcurers
        .find({})
        .toArray()) as Procurer[];
      res.status(200).send(procurers);
    }
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// POST
procurerRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newProcurer = req.body as Procurer;
    const collectionProcurers = await collections.procurers;
    if (collectionProcurers) {
      const result = await collectionProcurers.insertOne(newProcurer);
      result
        ? res
            .status(201)
            .send(
              `Successfully created a new procurer with id ${result.insertedId}`
            )
        : res.status(500).send("Failed to create a new procurer");
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// PUT
procurerRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedProcurer: Procurer = req.body as Procurer;
    const query = { _id: new ObjectId(id) };
    const collectionProcurers = await collections.procurers;
    if (collectionProcurers) {
      const result = await collectionProcurers.updateOne(query, {
        $set: updatedProcurer,
      });

      result
        ? res
            .status(200)
            .send(`Successfully updated procurer with id ${updatedProcurer}`)
        : res.status(304).send(`Procurer with id: ${id} not updated`);
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// DELETE

procurerRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const collectionProcurers = await collections.procurers;
    if (collectionProcurers) {
      const result = await collectionProcurers.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed procurer with id ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove procurer with id ${id}`);
      } else if (!result.deletedCount) {
        res.status(404).send(`Procurer with id ${id} does not exist`);
      }
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

export default procurerRouter;
