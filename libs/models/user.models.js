import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    matricNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    department: {
      type: String,
      default: null,
    },
    faculty: {
      type: String,
      default: null,
    },
    voteInformation: {
      type: {
        pollId: {
          type: Schema.Types.ObjectId,
          ref: "Polls",
        },
        role: {
          type: ["Voters", "Candidate"],
          default: "Voters",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);
export default User;
