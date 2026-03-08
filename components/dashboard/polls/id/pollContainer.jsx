"use client";
import PollsIdHeader from "@/components/dashboard/polls/id/header";
import PollsIdBody from "@/components/dashboard/polls/id/body";
import { useState, useEffect } from "react";
import { toast } from "sonner";
export default function PollIdContainer({ polls, pollsId, user }) {
  const [poll, setPoll] = useState(polls || {});
  useEffect(() => {
    const streamRequest = new EventSource(`/api/polls/${pollsId}/stream`, {
      withCredentials: true,
    });

    streamRequest.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setPoll(parsedData.poll);
      } catch (err) {
        toast.error("Abnormal Network. Please refresh the page.");
      }
    };
    streamRequest.onerror = () => {
      toast.error("Connection lost. Please refresh the page.");
      streamRequest.close();
    };
    return () => {
      streamRequest.close();
    };
  }, [pollsId]);
  return (
    <>
      <PollsIdHeader pollData={poll} />
      <PollsIdBody poll={poll} pollId={pollsId} user={user} />
    </>
  );
}
