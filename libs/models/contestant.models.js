import { Schema, model, models } from "mongoose";

const ContestantSchema = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
      ref: "Polls",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    candidates: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    voters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

// unique poll + position
ContestantSchema.index({ pollId: 1, position: 1 }, { unique: true });

const Contestant = models.Contestant || model("Contestant", ContestantSchema);
export default Contestant;
