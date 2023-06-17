// External
import express, { Request, Response, Router } from "express";
import Buyer from "../models/buyer";
import { ObjectId } from "mongodb";
import { db } from "../app";

// Global Config
const router = Router();
router.use(express.json());

// GET
router.get("/", async (_req: Request, res: Response) => {
  try {
    const collectionBuyers = db.collections.buyers;
    if (collectionBuyers) {
      const buyers = (await collectionBuyers.find({}).toArray()) as Buyer[];
      res.send(buyers);
    }
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// POST
router.post("/", async (req: Request, res: Response) => {
  try {
    const newBuyer = req.body as Buyer;
    const collectionBuyers = await db.collections.buyers;
    if (collectionBuyers) {
      const result = await collectionBuyers.insertOne(newBuyer);
      result
        ? res
            .status(201)
            .send(
              `Successfully created a new buyer with the name ${JSON.stringify(
                newBuyer.name
              )}`
            )
        : res.status(500).send("Failed to create a new buyer");
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// PUT
router.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedBuyer: Buyer = req.body as Buyer;
    const query = { _id: new ObjectId(id) };
    const collectionBuyers = await db.collections.buyers;
    if (collectionBuyers) {
      const result = await collectionBuyers.updateOne(query, {
        $set: updatedBuyer,
      });

      result
        ? res
            .status(200)
            .send(`Successfully updated buyer with id ${updatedBuyer}`)
        : res.status(304).send(`Buyer with id: ${id} not updated`);
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// DELETE

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const collectionBuyers = await db.collections.buyers;
    if (collectionBuyers) {
      const result = await collectionBuyers.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed buyer with id ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove buyer with id ${id}`);
      } else if (!result.deletedCount) {
        res.status(404).send(`Buyer with id ${id} does not exist`);
      }
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

export default router;
