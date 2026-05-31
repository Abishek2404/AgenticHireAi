export async function runInterviewAgent({ job, hiringSpec, parsedResume }) {
  const skills = hiringSpec.required_skills || parsedResume.data.skills || [];
  return {
    success: true,
    data: {
      rounds: hiringSpec.interview_rounds,
      questions: skills.slice(0, 5).map((skill) => `Describe a production problem you solved with ${skill}.`),
      coding_task: `Build a small ${job.title} feature using the role's required stack.`,
      rubric: ["technical depth", "clarity", "tradeoff reasoning", "delivery quality"]
    }
  };
}
