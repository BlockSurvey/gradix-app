export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  applicationType: string;
  rubricCriteria: string;
  rubrics: Array<{
    name: string;
    percentage: number;
  }>;
}

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'ai-hackathon-judge',
    name: 'AI Hackathon Judge Event',
    description: 'Evaluates AI/ML hackathon projects with comprehensive rubrics focusing on innovation, technical execution, and business viability',
    applicationType: 'AI/ML Hackathon Projects',
    rubricCriteria: `Evaluate AI hackathon projects based on the following criteria:

• Problem Relevance (20%): How well does the solution address a real-world problem? Is the problem statement clear and significant?

• Innovation & Creativity (20%): Does the solution demonstrate novel approaches, creative thinking, or unique applications of AI/ML technologies?

• Technical Execution (25%): Quality of code implementation, proper use of AI/ML frameworks, scalability, and technical sophistication.

• UX/UI (15%): User experience design, interface usability, accessibility, and overall user interaction quality.

• Business Viability (10%): Commercial potential, market fit, sustainability, and practical implementation feasibility.

• Presentation (10%): Quality of demo, clarity of explanation, team communication, and ability to convey the solution's value.

Focus on technical excellence while considering real-world application and user impact.`,
    rubrics: [
      { name: 'Problem Relevance', percentage: 20 },
      { name: 'Innovation & Creativity', percentage: 20 },
      { name: 'Technical Execution', percentage: 25 },
      { name: 'UX/UI', percentage: 15 },
      { name: 'Business Viability', percentage: 10 },
      { name: 'Presentation', percentage: 10 }
    ]
  },
  {
    id: 'ai-founder-registration',
    name: 'AI Founder Event Registration',
    description: 'Evaluates AI founder event registration applications focusing on leadership experience, vision, and startup potential',
    applicationType: 'AI Founder Event Registration',
    rubricCriteria: `Evaluate AI founder event registration applications based on the following criteria:

• Leadership Experience (25%): Previous leadership roles, team management experience, and demonstrated ability to build and lead teams effectively.

• AI/Tech Vision (20%): Understanding of AI trends, clear vision for AI application, and strategic thinking about technology's future impact.

• Entrepreneurial Track Record (20%): Previous startup experience, business development achievements, and history of executing business ideas.

• Network & Influence (15%): Industry connections, thought leadership, speaking engagements, and ability to drive community engagement.

• Innovation Potential (12%): Creative problem-solving, unique perspectives, and potential to contribute novel insights to the AI ecosystem.

• Communication Skills (8%): Ability to articulate ideas clearly, compelling storytelling, and effective presentation capabilities.

Focus on identifying founders who can drive AI innovation and contribute meaningfully to the entrepreneurial community.`,
    rubrics: [
      { name: 'Leadership Experience', percentage: 25 },
      { name: 'AI/Tech Vision', percentage: 20 },
      { name: 'Entrepreneurial Track Record', percentage: 20 },
      { name: 'Network & Influence', percentage: 15 },
      { name: 'Innovation Potential', percentage: 12 },
      { name: 'Communication Skills', percentage: 8 }
    ]
  },
  {
    id: 'ai-startup-pitch',
    name: 'AI Startup Pitch Event Registration',
    description: 'Evaluates AI startup pitch event applications focusing on business model, market opportunity, and team strength',
    applicationType: 'AI Startup Pitch Applications',
    rubricCriteria: `Evaluate AI startup pitch event applications based on the following criteria:

• Business Model Strength (22%): Revenue model clarity, scalability potential, competitive advantages, and financial projections accuracy.

• Market Opportunity (20%): Market size assessment, target audience definition, competitive landscape understanding, and growth potential.

• Team Competency (18%): Technical expertise, complementary skills, previous experience, and team chemistry and commitment.

• Product Development (15%): MVP quality, technical feasibility, user feedback incorporation, and development roadmap clarity.

• Traction & Validation (12%): Customer acquisition, revenue generation, partnerships, and market validation evidence.

• Pitch Quality (8%): Presentation clarity, storytelling effectiveness, time management, and audience engagement.

• Innovation Factor (5%): Uniqueness of AI application, technological differentiation, and potential for industry disruption.

Focus on identifying startups with strong business fundamentals and significant growth potential in the AI space.`,
    rubrics: [
      { name: 'Business Model Strength', percentage: 22 },
      { name: 'Market Opportunity', percentage: 20 },
      { name: 'Team Competency', percentage: 18 },
      { name: 'Product Development', percentage: 15 },
      { name: 'Traction & Validation', percentage: 12 },
      { name: 'Pitch Quality', percentage: 8 },
      { name: 'Innovation Factor', percentage: 5 }
    ]
  }
];