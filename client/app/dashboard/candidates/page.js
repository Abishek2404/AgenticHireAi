"use client";

import { useEffect, useState } from "react";
import { Panel } from "../../../components/ui";
import { api } from "../../../lib/api";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/candidates").then((data) => setCandidates(data.candidates)).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-semibold">Candidates</h1>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="grid gap-3">
        {candidates.map((candidate) => (
          <Panel key={candidate._id} className="grid gap-2 md:grid-cols-4">
            <div><p className="text-xs text-muted">Name</p><p className="font-medium">{candidate.name}</p></div>
            <div><p className="text-xs text-muted">Job</p><p>{candidate.job_id?.title}</p></div>
            <div><p className="text-xs text-muted">Score</p><p>{candidate.match_score ?? "Pending"}</p></div>
            <div><p className="text-xs text-muted">Status</p><p className="capitalize">{candidate.status}</p></div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
