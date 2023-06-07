import { ObjectId } from "mongodb";

export default class Procurer {
  constructor(public name?: string, public id?: ObjectId) {}
}
