import fs from "fs/promises";
import pdf from "pdf-parse";

const skillDictionary = ["React", "JavaScript", "CSS", "Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "TypeScript"];

export async function runResumeParser({ candidate }) {
  const buffer = await fs.readFile(candidate.resume_url);
  const parsed = await pdf(buffer);
  const text = parsed.text || "";
  const skills = skillDictionary.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()));
  const experienceMatch = text.match(/(\d+)\+?\s*(years|yrs)/i);

  return {
    success: true,
    data: {
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      skills,
      experience: experienceMatch ? Number(experienceMatch[1]) : 0,
      education: /b\.?tech|bachelor|degree/i.test(text) ? "Degree" : "Not specified",
      projects: text.match(/project/gi)?.length || 0,
      raw_text: text.slice(0, 4000)
    }
  };
}
