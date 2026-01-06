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

export default function PollsIdBody({ poll, pollId, user }) {
  const [activeTab, setActiveTab] = useState("overview");

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
      <PollsIdBodyTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        user={user}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "overview" && (
          <div id="overview">
            <OverviewTab poll={poll} />
          </div>
        )}
        {activeTab === "candidates" && (
          <div id="candidates">
            <CandidatesTab poll={poll} pollId={pollId} user={user} />
          </div>
        )}
        {activeTab === "vote" && (
          <div id="vote">
            <VoteTab poll={poll} pollId={pollId} />
          </div>
        )}
        {activeTab === "positions" && (
          <div id="positions">
            <PositionsTab pollId={pollId} user={user} />
          </div>
        )}
        {activeTab === "voters" && (
          <div id="voters">
            <VotersTab poll={poll} pollId={pollId} user={user} />
          </div>
        )}
        {activeTab === "settings" && (
          <div id="settings">
            <SettingsTab pollData={poll} />
          </div>
        )}
      </div>
    </>
  );
}
