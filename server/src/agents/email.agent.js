import { renderAndSendEmail } from "../emails/email.service.js";

export async function runEmailAgent({ candidate, job, shortlisting }) {
  const templateKey = shortlisting.data.decision === "shortlist" ? "interview" : shortlisting.data.decision;
  const email = await renderAndSendEmail(templateKey, {
    to: candidate.email,
    candidateName: candidate.name,
    jobTitle: job.title
  });

  return {
    success: true,
    data: email
  };
}
