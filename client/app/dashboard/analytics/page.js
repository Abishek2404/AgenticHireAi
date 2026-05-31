"use client";

import { useEffect, useMemo, useState } from "react";
import { Panel } from "../../../components/ui";
import { api } from "../../../lib/api";

export default function AnalyticsPage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    api("/candidates").then((data) => setCandidates(data.candidates)).catch(() => setCandidates([]));
  }, []);

  const stats = useMemo(() => {
    const shortlisted = candidates.filter((candidate) => ["shortlist", "interview_invited"].includes(candidate.status)).length;
    return {
      total: candidates.length,
      shortlisted,
      shortlistRate: candidates.length ? Math.round((shortlisted / candidates.length) * 100) : 0,
      averageScore: candidates.length ? Math.round(candidates.reduce((sum, item) => sum + (item.match_score || 0), 0) / candidates.length) : 0
    };
  }, [candidates]);

  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Panel><p className="text-sm text-muted">Candidates</p><p className="text-3xl font-semibold">{stats.total}</p></Panel>
        <Panel><p className="text-sm text-muted">Shortlisted</p><p className="text-3xl font-semibold">{stats.shortlisted}</p></Panel>
        <Panel><p className="text-sm text-muted">Shortlist rate</p><p className="text-3xl font-semibold">{stats.shortlistRate}%</p></Panel>
        <Panel><p className="text-sm text-muted">Average score</p><p className="text-3xl font-semibold">{stats.averageScore}</p></Panel>
      </div>
    </div>
  );
}
