import Buyer from "models/buyer";
import { collections } from "../services/database/databaseDependency";
import { ObjectId } from "mongodb";

export class BuyerController {
  collectionBuyers = collections.buyers;

  async getBuyers() {
    return (await collections.buyers?.find({}).toArray()) as Buyer[];
  }

  async createBuyer(newBuyer: Buyer) {
    return await collections.buyers?.insertOne(newBuyer);
  }
  async updateBuyer(updatedBuyer: Buyer, id: string) {
    return await collections.buyers?.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBuyer }
    );
  }
  async deleteBuyer(id: string) {
    return await collections.buyers?.deleteOne({ _id: new ObjectId(id) });
  }
}
