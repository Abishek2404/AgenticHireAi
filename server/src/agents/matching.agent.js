export async function runMatchingAgent({ parsedResume, hiringSpec, ragContext }) {
  const candidateSkills = new Set((parsedResume.data.skills || []).map((skill) => skill.toLowerCase()));
  const required = hiringSpec.required_skills || [];
  const preferred = hiringSpec.preferred_skills || [];
  const requiredMatches = required.filter((skill) => candidateSkills.has(skill.toLowerCase()));
  const preferredMatches = preferred.filter((skill) => candidateSkills.has(skill.toLowerCase()));
  const requiredScore = required.length ? (requiredMatches.length / required.length) * 65 : 65;
  const preferredScore = preferred.length ? (preferredMatches.length / preferred.length) * 20 : 20;
  const experienceScore = parsedResume.data.experience >= (hiringSpec.min_experience || 0) ? 15 : 5;
  const matchScore = Math.round(requiredScore + preferredScore + experienceScore);

  return {
    success: true,
    data: {
      match_score: Math.min(matchScore, 100),
      missing_skills: [...required, ...preferred].filter((skill) => !candidateSkills.has(skill.toLowerCase())),
      recommendation: matchScore >= hiringSpec.minimum_score ? "Shortlist" : "Review",
      rag_context_used: ragContext.length
    }
  };
}
