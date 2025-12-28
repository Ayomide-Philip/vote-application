import { model, models, Schema } from "mongoose";

const pollsModels = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Polls = models.Polls || model("Polls", pollsModels);
export default Polls;
