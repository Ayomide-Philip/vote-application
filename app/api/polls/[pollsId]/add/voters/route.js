import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import { auth } from "@/auth";

export async function PUT(req, { params }) {
  const { pollsId } = await params;
  const { voters } = await req.json();
  console.log(pollsId, voters);
  // if polls id is not defined
  if (!pollsId) {
    return NextResponse.json(
      {
        error: "No poll id was specified",
      },
      {
        status: 400,
      },
    );
  }
  // if no voters is specified
  if (!voters) {
    return NextResponse.json(
      {
        error: "Voters are not specified",
      },
      {
        status: 400,
      },
    );
  }
  // if the array is empty
  if (Array.isArray(voters) && voters?.length === 0) {
    return NextResponse.json(
      { error: "Empty list of voters" },
      {
        status: 400,
      },
    );
  }

  try {
    return NextResponse.json({ message: "ADD voters" });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unable to add voters",
      },
      {
        status: 400,
      },
    );
  }
}

// export const PUT = auth(async function PUT(req, { params }) {
//   if (!req.auth || !req.auth.user) {
//     return NextResponse.json(
//       { error: "Unauthorized Access" },
//       {
//         status: 400,
//       },
//     );
//   }
//   const authorizationUserId = req?.auth?.user?.id;
//   const { pollsId, userId } = await params;
//   // check if no user authorizationUserId exist
//   if (!authorizationUserId) {
//     return NextResponse.json(
//       { error: "User is not authorized" },
//       {
//         status: 401,
//       },
//     );
//   }
//   // check if poll id doesnt exist
//   if (!pollsId) {
//     return NextResponse.json(
//       { error: "Polls not found" },
//       {
//         status: 400,
//       },
//     );
//   }
//   // check the user they want to add id
//   if (!userId) {
//     return NextResponse.json(
//       { error: "User does not exist" },
//       {
//         status: 400,
//       },
//     );
//   }
//   try {
//     await connectDatabase();
//     // check if the user even exist
//     const user = await User.findById(userId);
//     // if user does not exist
//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         {
//           status: 400,
//         },
//       );
//     }
//     // check if user adding him exist
//     const authorizationUser = await User.findById(authorizationUserId);

//     if (!authorizationUser) {
//       return NextResponse.json(
//         { error: "Invalid Parameters" },
//         {
//           status: 400,
//         },
//       );
//     }
//     // check if the user has access to the poll
//     const authorizationUserVoteInfo = authorizationUser?.voteInformation.find(
//       (info) => {
//         return info.pollId.toString() === pollsId.toString();
//       },
//     );
//     if (!authorizationUserVoteInfo) {
//       return NextResponse.json(
//         { error: "User doesnt have access to this poll" },
//         {
//           status: 400,
//         },
//       );
//     }

//     if (authorizationUserVoteInfo?.role !== "Owner") {
//       return NextResponse.json(
//         { error: "You don't have permission to add users to this poll" },
//         {
//           status: 403,
//         },
//       );
//     }

//     // check if the poll exist
//     const poll = await Polls.findById(pollsId);
//     if (!poll) {
//       return NextResponse.json(
//         { error: "Poll doesnt exist" },
//         {
//           status: 400,
//         },
//       );
//     }
//     // check if the user I want to belong to the voters already
//     if (poll?.voters.includes(userId)) {
//       return NextResponse.json(
//         { error: "User is already a voter" },
//         {
//           status: 403,
//         },
//       );
//     }
//     //add the user to the voters
//     poll?.voters?.push(userId);
//     user.voteInformation.push({
//       pollId: pollsId,
//       role: "Voters",
//     });
//     await user.save();
//     await poll.save();
//     // return successfully added user
//     return NextResponse.json(
//       { message: "User Successfully Added", voter: poll?.voters },
//       {
//         status: 200,
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { error: "An error occurred while adding user" },
//       {
//         status: 400,
//       },
//     );
//   }
// });
