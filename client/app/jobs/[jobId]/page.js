"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Panel } from "../../../components/ui";
import { api } from "../../../lib/api";

export default function PublicJobPage({ params }) {
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/jobs/${params.jobId}`).then((data) => setJob(data.job)).catch((err) => setError(err.message));
  }, [params.jobId]);

  if (error) return <main className="p-5 text-danger">{error}</main>;
  if (!job) return <main className="p-5">Loading...</main>;

  return (
    <main className="mx-auto grid min-h-screen max-w-3xl place-items-center p-5">
      <Panel>
        <h1 className="text-3xl font-semibold">{job.title}</h1>
        <p className="mt-3 text-muted">{job.description}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          {job.required_skills?.map((skill) => <span key={skill} className="rounded-md border border-border bg-surface px-2 py-1">{skill}</span>)}
        </div>
        <Link href={`/jobs/${job._id}/apply`}><Button className="mt-6">Apply now</Button></Link>
      </Panel>
    </main>
  );
}
