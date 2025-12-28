import { model, models, Schema } from "mongoose";

const pollsModels = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    endTime: {
      type: Date,
      required: true,
    },
    rule: {
      type: {
        emailPrefix: {
          type: String,
        },
        departmentCodes: {
          type: [String],
          lowercase: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Polls = models.Polls || model("Polls", pollsModels);
export default Polls;
