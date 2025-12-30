"use client";

import { useState } from "react";
import PollsIdBodyTabs from "./tabs";
import OverviewTab from "./overview-tab";
import CandidatesTab from "./candidates-tab";
import VotersTab from "./voters-tab";
import SettingsTab from "./settings-tab";

export default function PollsIdBody({ pollData }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <PollsIdBodyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "overview" && <OverviewTab pollData={pollData} />}
        {activeTab === "candidates" && <CandidatesTab pollData={pollData} />}
        {activeTab === "voters" && <VotersTab pollData={pollData} />}
        {activeTab === "settings" && <SettingsTab pollData={pollData} />}
      </div>
    </>
  );
}
