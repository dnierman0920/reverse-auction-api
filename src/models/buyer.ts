import { ObjectId } from "mongodb";

export default class Buyer {
  constructor(public name?: string, public id?: ObjectId) {}
}
