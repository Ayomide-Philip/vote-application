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
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    endDate: {
      type: Date,
      required: true,
    },
    rule: {
      type: {
        emailPrefix: {
          type: String,
          default: "",
        },
        departmentCodes: {
          type: [String],
          lowercase: true,
          default: [],
        },
      },
    },
    voters: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    contestants: {
      type: [Schema.Types.ObjectId],
      ref: "Candidates",
      default: [],
    },
    completedVoters: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "Contestant",
    },
    role: {
      type: [
        {
          userRole: {
            type: String,
            enum: ["Owner", "Admin"],
          },
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Polls = models.Polls || model("Polls", pollsModels);
export default Polls;
