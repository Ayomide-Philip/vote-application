import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import User from "@/libs/models/user.models";

export async function PUT(req, { params }) {
  const { userId } = await req.json();
  const { pollsId } = await params;
  try {
    await connectDatabase();
    // get user info
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        }
      );
    }
    // get the poll
    const poll = await Polls.findById(pollsId);
    // if no polls return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the user already exist in the poll
    const userExist = poll?.voters.includes(userId);
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 400,
        }
      );
    }
    // check poll status
    if (poll?.status === "Closed") {
      return NextResponse.json(
        { error: "Poll already closed" },
        {
          status: 400,
        }
      );
    }
    // check if the vote time has passed
    if (new Date(poll?.endDate) < new Date()) {
      poll.status = "Closed";
      await poll.save();
      return NextResponse.json(
        { error: "Vote time has expired" },
        {
          status: 400,
        }
      );
    }
    // breaking rule
    const { emailPrefix, departmentCodes } = poll.rule;
    // checking the email prefix rule made
    if (emailPrefix) {
      if (!user?.email?.includes(emailPrefix)) {
        return NextResponse.json(
          { error: `User must have ${emailPrefix} email address` },
          {
            status: 400,
          }
        );
      }
    }
    // checking the departments code
    if (departmentCodes.length > 0) {
      const userDepartmentCode = departmentCodes.find((code) => {
        const emailRegex = new RegExp(
          `^[a-zA-Z0-9_.]+\\.${code}\\d+${emailPrefix.replace(/\./g, "\\.")}$`
        );
        return emailRegex.test(user?.email);
      });

      if (!userDepartmentCode) {
        return NextResponse.json(
          { error: "User does not belong to the allowed departments" },
          {
            status: 400,
          }
        );
      }
    }
    // add the user to the list of voters
    poll.voters.push(userId);
    await poll.save();
    // add the poll to the list of the user poll
    user.voteInformation = { pollId: pollsId, role: "Voters" };
    await user.save();
    //return a success message
    return NextResponse.json(
      {
        message: "Successfully joined poll",
        voters: poll.voters,
        userVoteInformation: user.voteInformation,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to join poll" },
      {
        status: 400,
      }
    );
  }
}
