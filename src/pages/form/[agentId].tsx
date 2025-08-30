import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { agentTemplates } from '@/data/templates';

const GradixIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="#6b7280">
    <path d="M80 44.8153H51.4065L70.738 64.1467L64.3507 70.5288L44.6542 50.8322V78.8034H35.6338V51.1665L15.1196 71.6808L8.3209 64.8821L28.3826 44.8153H0V35.183H29.0255L9.4883 15.6458L15.8704 9.26372L35.6338 29.0374V1.19995H44.6542V28.5283L64.8804 8.30203L71.6791 15.1213L51.6174 35.183H80V44.8153Z" />
  </svg>
);

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
}

interface AgentFormData {
  agentName: string;
  applicationType: string;
  rubricCriteria: string;
}

export default function PublicFormPage() {
  const router = useRouter();
  const { agentId } = router.query;
  const [agentData, setAgentData] = useState<AgentFormData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    responses: {} as { [key: string]: string }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get contextual form fields based on agent type
  const getContextualFormFields = (agentName: string, applicationType: string): FormField[] => {
    const agentNameLower = agentName.toLowerCase();
    const applicationTypeLower = applicationType.toLowerCase();

    // AI Hackathon specific fields
    if (agentNameLower.includes('hackathon') || applicationTypeLower.includes('hackathon')) {
      return [
        { id: 'teamName', label: 'Team Name *', type: 'text', placeholder: 'Enter your team name' },
        { id: 'githubUrl', label: 'GitHub Repository URL *', type: 'url', placeholder: 'https://github.com/username/project' },
        { id: 'demoUrl', label: 'Project Demo/Link', type: 'url', placeholder: 'https://your-demo-link.com' },
        { id: 'idea', label: 'Idea *', type: 'textarea', placeholder: 'Briefly describe your project idea' },
        { id: 'description', label: 'Description *', type: 'textarea', placeholder: 'Detailed description of your project' },
        { id: 'technologies', label: 'Technologies Used *', type: 'textarea', placeholder: 'List the technologies, frameworks, and tools used' },
        { id: 'problemSolved', label: 'Problem Solved *', type: 'textarea', placeholder: 'What problem does your project solve?' },
        { id: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'Who is your target audience?' },
        { id: 'projectStatus', label: 'Project Status *', type: 'select', options: ['MVP/Prototype', 'Working Beta', 'Production Ready', 'Concept/Design Only'] },
        { id: 'challenges', label: 'Challenges Faced', type: 'textarea', placeholder: 'What challenges did you encounter and how did you overcome them?' },
        { id: 'futurePlans', label: 'Future Plans', type: 'textarea', placeholder: 'What are your plans for this project moving forward?' },
        { id: 'license', label: 'License Type', type: 'select', options: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD', 'Creative Commons', 'Proprietary', 'Other'] }
      ];
    }

    // AI Founder Event specific fields
    if (agentNameLower.includes('founder') || applicationTypeLower.includes('founder')) {
      return [
        { id: 'companyName', label: 'Company/Startup Name *', type: 'text', placeholder: 'Enter your company or startup name' },
        { id: 'position', label: 'Current Position/Role *', type: 'text', placeholder: 'CEO, CTO, Founder, Co-founder, etc.' },
        { id: 'industry', label: 'Industry Focus *', type: 'select', options: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Robotics', 'NLP/LLMs', 'Computer Vision', 'Healthcare AI', 'FinTech AI', 'EdTech AI', 'Enterprise AI', 'Consumer AI', 'Other'] },
        { id: 'companyStage', label: 'Company Stage *', type: 'select', options: ['Idea Stage', 'Pre-Seed', 'Seed', 'Series A', 'Series B+', 'Established Company', 'Solo Founder'] },
        { id: 'teamSize', label: 'Current Team Size *', type: 'select', options: ['Just me', '2-5 people', '6-15 people', '16-50 people', '51-100 people', '100+ people'] },
        { id: 'linkedinUrl', label: 'LinkedIn Profile *', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
        { id: 'companyWebsite', label: 'Company Website/Portfolio', type: 'url', placeholder: 'https://yourcompany.com' },
        { id: 'yearsOfExperience', label: 'Years in AI/Tech *', type: 'select', options: ['Less than 1 year', '1-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years'] },
        { id: 'leadershipExp', label: 'Leadership Experience *', type: 'textarea', placeholder: 'Describe your leadership roles, team management experience, and key achievements' },
        { id: 'aiVision', label: 'AI Vision & Strategy *', type: 'textarea', placeholder: 'What is your vision for AI in your industry? How do you see AI evolving?' },
        { id: 'networkingGoals', label: 'Networking Goals *', type: 'textarea', placeholder: 'Who would you like to connect with? What partnerships are you seeking?' },
        { id: 'challengesFaced', label: 'Current Challenges *', type: 'textarea', placeholder: 'What are the biggest challenges you are facing as an AI founder?' },
        { id: 'whyAttend', label: 'Why do you want to attend? *', type: 'textarea', placeholder: 'What specific value are you hoping to gain from this founder event?' },
        { id: 'contribution', label: 'How will you contribute? *', type: 'textarea', placeholder: 'What expertise, connections, or value can you bring to other attendees?' }
      ];
    }

    // AI Startup Pitch specific fields
    if (agentNameLower.includes('startup') || agentNameLower.includes('pitch') || applicationTypeLower.includes('startup') || applicationTypeLower.includes('pitch')) {
      return [
        { id: 'startupName', label: 'Startup Name *', type: 'text', placeholder: 'Enter your startup name' },
        { id: 'tagline', label: 'Company Tagline *', type: 'text', placeholder: 'One-line description of what you do' },
        { id: 'industry', label: 'Industry Vertical *', type: 'select', options: ['Healthcare AI', 'FinTech AI', 'EdTech AI', 'Enterprise SaaS', 'Consumer AI', 'Robotics & Automation', 'Data & Analytics', 'Computer Vision', 'NLP & LLMs', 'Cybersecurity AI', 'Marketing AI', 'Other'] },
        { id: 'pitchDeckUrl', label: 'Pitch Deck URL *', type: 'url', placeholder: 'Link to your pitch deck (Google Drive, Dropbox, etc.)' },
        { id: 'problemStatement', label: 'Problem Statement *', type: 'textarea', placeholder: 'What specific problem are you solving? Why is it important?' },
        { id: 'solution', label: 'Solution Overview *', type: 'textarea', placeholder: 'How does your solution solve this problem? What makes it unique?' },
        { id: 'businessModel', label: 'Business Model *', type: 'textarea', placeholder: 'How do you make money? Pricing strategy, revenue streams, unit economics' },
        { id: 'teamInfo', label: 'Founding Team *', type: 'textarea', placeholder: 'Introduce founders and key team members, their backgrounds and expertise' },
        { id: 'productStage', label: 'Product Development Stage *', type: 'select', options: ['Concept/Wireframes', 'MVP/Prototype', 'Beta with Select Users', 'Public Beta', 'General Availability', 'Scaling & Growth'] },
        { id: 'traction', label: 'Traction Metrics *', type: 'textarea', placeholder: 'Users, revenue, partnerships, pilot customers, growth metrics - include numbers' },
        { id: 'competitiveAdvantage', label: 'Competitive Advantage *', type: 'textarea', placeholder: 'What makes you different? IP, technology, team, market position, etc.' },
        { id: 'aiInnovation', label: 'AI Technology & Innovation *', type: 'textarea', placeholder: 'Describe your AI technology, models used, data strategy, technical differentiators' },
        { id: 'fundingAsk', label: 'Funding Ask *', type: 'select', options: ['Not seeking funding', '$50K - $250K', '$250K - $500K', '$500K - $1M', '$1M - $2.5M', '$2.5M - $5M', '$5M - $10M', '$10M+'] }
      ];
    }

    // Default generic fields (fallback)
    return [
      { id: 'background', label: 'Background *', type: 'textarea', placeholder: 'Tell us about your background and experience' },
      { id: 'motivation', label: 'Motivation *', type: 'textarea', placeholder: 'Why are you applying for this?' },
      { id: 'experience', label: 'Relevant Experience', type: 'textarea', placeholder: 'Describe your relevant experience' },
      { id: 'goals', label: 'Goals', type: 'textarea', placeholder: 'What do you hope to achieve?' }
    ];
  };

  useEffect(() => {
    if (agentId && typeof agentId === 'string') {
      // Find agent data based on ID
      const template = agentTemplates.find(t => t.id === agentId);
      if (template) {
        setAgentData({
          agentName: template.name,
          applicationType: template.applicationType,
          rubricCriteria: template.rubricCriteria
        });
      }
    }
  }, [agentId]);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name' || field === 'email' || field === 'phone') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        responses: { ...prev.responses, [field]: value }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentData) return;

    // Validate required fields
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }

    // Validate contextual form fields
    const contextualFields = getContextualFormFields(agentData.agentName, agentData.applicationType);
    const requiredFields = contextualFields.filter(field => field.label.includes('*'));
    const missingFields = requiredFields.filter(
      field => !formData.responses[field.id]?.trim()
    );

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label.replace(' *', '')).join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!agentData) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <GradixIcon className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">Loading Application Form...</h2>
          <p className="text-sm text-gray-500">Please wait while we load the form details.</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-sm text-gray-600 mb-4">
              Thank you for your application. We'll review your submission and get back to you soon.
            </p>
            <p className="text-xs text-gray-500">
              You should receive a confirmation email at {formData.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const contextualFields = getContextualFormFields(agentData.agentName, agentData.applicationType);

  return (
    <>
      <Head>
        <title>{agentData.agentName} - Application Form</title>
        <meta name="description" content={`Submit your application for ${agentData.applicationType}`} />
      </Head>

      <div className="min-h-screen bg-[#f9f9f9] py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GradixIcon className="w-8 h-8" />
              <span className="text-xl font-medium text-gray-600">gradix.ai</span>
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              {agentData.agentName}
            </h1>
            <p className="text-sm text-gray-600">
              {agentData.applicationType}
            </p>
          </div>

          {/* Form */}
          <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Applicant Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Contextual Form Fields */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Application Details</h3>
                  
                  {contextualFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                        {field.label}
                      </Label>
                      
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.id}
                          value={formData.responses[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px] text-sm resize-none"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.id}
                          value={formData.responses[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        >
                          <option value="" className="bg-white text-gray-900">Select an option...</option>
                          {field.options?.map((option, optIndex) => (
                            <option key={optIndex} value={option} className="bg-white text-gray-900">
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.id}
                          type={field.type}
                          value={formData.responses[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our terms and privacy policy.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}