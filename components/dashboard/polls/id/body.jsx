"use client";

import { useState } from "react";
import PollsIdBodyTabs from "./tabs";
import OverviewTab from "./overview-tab";
import CandidatesTab from "./candidates-tab";
import VoteTab from "./vote-tab";
import VotersTab from "./voters-tab";
import SettingsTab from "./settings-tab";
import PositionsTab from "./positions-tab";

export default function PollsIdBody({ pollData, poll, pollId }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <PollsIdBodyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "overview" && <OverviewTab pollData={pollData} />}
        {activeTab === "candidates" && (
          <CandidatesTab pollData={pollData} poll={poll} pollId={pollId} />
        )}
        {activeTab === "vote" && <VoteTab pollData={pollData} />}
        {activeTab === "positions" && (
          <PositionsTab pollData={pollData} pollId={pollId} />
        )}
        {activeTab === "voters" && (
          <VotersTab pollData={pollData} poll={poll} pollId={pollId} />
        )}
        {activeTab === "settings" && <SettingsTab pollData={pollData} />}
      </div>
    </>
  );
}
