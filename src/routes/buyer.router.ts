// External
import express, { Request, Response, Router } from "express";
import { BuyerController } from "../controllers/buyer.controller";
import { Buyer } from "models/buyer";

// Global Config
const router = Router();
router.use(express.json());
const controller = new BuyerController();

// GET
router.get("/", async (_req: Request, res: Response) => {
  try {
    const buyers = await controller.getBuyers();
    res.send(buyers);
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

// POST
router.post("/", async (req: Request, res: Response) => {
  if (!req.body.name || req.body.name.length === 0) {
    return res
      .status(400)
      .send("Failed to create a new buyer. Buyer obj w/ name is required.");
  }
  const newBuyer = req.body as Buyer;
  (await controller.createBuyer(newBuyer))
    ? res
        .status(201)
        .send(
          `Successfully created a new buyer with the name ${JSON.stringify(
            newBuyer.name
          )}`
        )
    : res.status(500).send("Failed to create a new buyer");
});

// PUT
router.put("/:id", async (req: Request, res: Response) => {
  if (!req.body.name || req.body.name.length === 0) {
    return res
      .status(400)
      .send("Failed to update buyer. Buyer obj w/ name is required.");
  }
  const id = req?.params?.id;

  try {
    const updatedBuyer = req.body as Buyer;
    (await controller.updateBuyer(updatedBuyer, id))
      ? res.status(200).send(`Successfully updated buyer with id ${id}`)
      : res.status(304).send(`Buyer with id: ${id} not updated`);
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
    const result = await controller.deleteBuyer(id);
    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed buyer with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove buyer with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Buyer with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).send(message);
  }
});

export default router;
