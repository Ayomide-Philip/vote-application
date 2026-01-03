/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import PollsIdBodyTabs from "./tabs";
import OverviewTab from "./overview-tab";
import CandidatesTab from "./candidates-tab";
import VoteTab from "./vote-tab";
import VotersTab from "./voters-tab";
import SettingsTab from "./settings-tab";
import PositionsTab from "./positions-tab";

export default function PollsIdBody({ pollData, poll, pollId }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Keep the selected tab in sync with the URL hash so reloads restore the same view
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const initialTab = hash?.replace("#", "") || "overview";
    setActiveTab(initialTab);

    function handleHashChange() {
      const newHash = window.location.hash.replace("#", "");
      setActiveTab(newHash || "overview");
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.location.hash = tabId;
    }
  };
  return (
    <>
      <PollsIdBodyTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "overview" && (
          <div id="overview">
            <OverviewTab pollData={pollData} />
          </div>
        )}
        {activeTab === "candidates" && (
          <div id="candidates">
            <CandidatesTab pollData={pollData} poll={poll} pollId={pollId} />
          </div>
        )}
        {activeTab === "vote" && (
          <div id="vote">
            <VoteTab poll={poll} pollId={pollId} />
          </div>
        )}
        {activeTab === "positions" && (
          <div id="positions">
            <PositionsTab pollData={pollData} pollId={pollId} />
          </div>
        )}
        {activeTab === "voters" && (
          <div id="voters">
            <VotersTab pollData={pollData} poll={poll} pollId={pollId} />
          </div>
        )}
        {activeTab === "settings" && (
          <div id="settings">
            <SettingsTab pollData={pollData} />
          </div>
        )}
      </div>
    </>
  );
}
