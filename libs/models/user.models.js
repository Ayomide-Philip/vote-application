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
    voteInfo: {
      type: {
        voteId: {
          type: Schema.Types.ObjectId,
          default: null,
        },
        role: {
          type: String,
          enum: ["voter", "admin"],
          default: "voter",
        },
      },
      default: {},
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);
export default User;
