import { useState, useEffect, useRef } from 'react';
import { addAgent } from './agents';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { agentTemplates } from '@/data/templates';

// Icon components
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const AgentsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const ContactsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const RobotIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
    />
  </svg>
);

const GradixIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="#6b7280">
    <path d="M80 44.8153H51.4065L70.738 64.1467L64.3507 70.5288L44.6542 50.8322V78.8034H35.6338V51.1665L15.1196 71.6808L8.3209 64.8821L28.3826 44.8153H0V35.183H29.0255L9.4883 15.6458L15.8704 9.26372L35.6338 29.0374V1.19995H44.6542V28.5283L64.8804 8.30203L71.6791 15.1213L51.6174 35.183H80V44.8153Z" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const HistoryIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  isActive = false,
  onClick
}: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 lg:gap-3 w-full px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-left transition-colors ${
      isActive
        ? 'bg-[rgba(179,173,173,0.4)] text-gray-700'
        : 'text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon}
    <span className="font-medium text-sm lg:text-sm">{label}</span>
  </button>
);

interface FormData {
  agentName: string;
  applicationType: string;
  rubricCriteria: string;
  rubrics?: Array<{
    name: string;
    percentage: number;
  }>;
}

interface DetailedResult {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  grade: string;
  criteria: Array<{
    name: string;
    description: string;
    points: string;
  }>;
  keyStrengths: string[];
}

export default function UploadDataPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('agents');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('setup');
  const [activeSetupTab, setActiveSetupTab] = useState('upload');
  const [apiEnabled, setApiEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableFormData, setEditableFormData] = useState<FormData>({
    agentName: '',
    applicationType: '',
    rubricCriteria: '',
    rubrics: []
  });
  const [selectedResult, setSelectedResult] = useState<DetailedResult | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [selectedCandidateFilter, setSelectedCandidateFilter] =
    useState('All Candidates');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All Grades');
  const [logsView, setLogsView] = useState<'results' | 'analytics' | 'email-analytics'>('results');
  const [showEmailCampaign, setShowEmailCampaign] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [emailType, setEmailType] = useState<'acceptance' | 'rejection' | ''>('');
  const [candidateFilter, setCandidateFilter] = useState<'all' | 'qualified' | 'disqualified'>('all');
  const [showGradingProgress, setShowGradingProgress] = useState(false);
  const [gradingProgress, setGradingProgress] = useState({
    progress: 14,
    filesProcessed: 22,
    totalFiles: 500,
    timeRemaining: '2 hours',
    stage: 'Initializing AI Grader',
    description: 'Setting up AI models and processing environment...'
  });
  const candidateDropdownRef = useRef<HTMLDivElement>(null);
  const gradeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're coming from a template or existing agent
    const { template, agent } = router.query;

    if (template) {
      // Load template data
      const templateData = agentTemplates.find(t => t.id === template);
      if (templateData) {
        const templateFormData = {
          agentName: templateData.name,
          applicationType: templateData.applicationType,
          rubricCriteria: templateData.rubricCriteria,
          rubrics: templateData.rubrics
        };
        setFormData(templateFormData);
        setEditableFormData(templateFormData);
      }
    } else if (agent) {
      // Load existing agent data (if needed for future functionality)
      // For now, we'll use template as fallback
      const templateFormData = {
        agentName: 'AI Hackathon Judge Event',
        applicationType: 'AI/ML Hackathon Projects',
        rubricCriteria:
          'Evaluate AI hackathon projects with comprehensive rubrics focusing on innovation, technical execution, and business viability',
        rubrics: [
          { name: 'Problem Relevance', percentage: 20 },
          { name: 'Innovation & Creativity', percentage: 20 },
          { name: 'Technical Execution', percentage: 25 },
          { name: 'UX/UI', percentage: 15 },
          { name: 'Business Viability', percentage: 10 },
          { name: 'Presentation', percentage: 10 }
        ]
      };
      setFormData(templateFormData);
      setEditableFormData(templateFormData);
    }

    // For demo purposes, we allow access without form data
    // In a real app, you'd manage this through proper state management
  }, [router.query]);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        candidateDropdownRef.current &&
        !candidateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCandidateDropdown(false);
      }
      if (
        gradeDropdownRef.current &&
        !gradeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGradeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(
      file =>
        file.type === 'text/csv' ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.xls')
    );

    if (validFile) {
      setSelectedFile(validFile);
    } else {
      alert('Please upload a CSV or Excel file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-input')?.click();
  };

  const handleTestWithSampleData = () => {
    if (!formData) {
      alert('Form data is missing');
      return;
    }

    // Determine which sample file to use based on agent type
    let sampleFileName = '';
    const agentName = formData.agentName.toLowerCase();

    if (agentName.includes('hackathon') || agentName.includes('ai/ml')) {
      sampleFileName = 'ai-hackathon-projects.csv';
    } else if (
      agentName.includes('founder') ||
      agentName.includes('registration')
    ) {
      sampleFileName = 'ai-founder-registration.csv';
    } else if (agentName.includes('startup') || agentName.includes('pitch')) {
      sampleFileName = 'ai-startup-pitch.csv';
    } else {
      // Default to hackathon sample
      sampleFileName = 'ai-hackathon-projects.csv';
    }

    // Create a mock file object to simulate file selection
    const sampleFile = new File(['sample data'], sampleFileName, {
      type: 'text/csv'
    });
    setSelectedFile(sampleFile);

    // Show success message
    alert(`Sample data loaded: ${sampleFileName}`);
  };

  const handleCompleteSetup = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!formData) {
      alert('Form data is missing');
      return;
    }

    // Show grading progress modal
    setShowGradingProgress(true);

    // Simulate progress updates
    setTimeout(() => {
      setGradingProgress({
        progress: 8,
        filesProcessed: 22,
        totalFiles: 500,
        timeRemaining: '1 hr',
        stage: 'Processing Applications',
        description: 'Analyzing and grading submitted applications...'
      });
    }, 3000);
  };

  const handleBack = () => {
    router.push('/create-agent');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Validate required fields
    if (!editableFormData.agentName.trim()) {
      alert('Please enter an agent name');
      return;
    }
    if (!editableFormData.applicationType.trim()) {
      alert('Please enter an application type');
      return;
    }
    if (!editableFormData.rubricCriteria.trim()) {
      alert('Please enter grading instructions');
      return;
    }

    // Validate rubrics
    if (editableFormData.rubrics) {
      const totalPercentage = editableFormData.rubrics.reduce(
        (sum, rubric) => sum + rubric.percentage,
        0
      );
      if (Math.abs(totalPercentage - 100) > 0.1) {
        alert('Rubric percentages must add up to 100%');
        return;
      }

      for (const rubric of editableFormData.rubrics) {
        if (!rubric.name.trim()) {
          alert('All rubric names must be filled');
          return;
        }
        if (rubric.percentage <= 0) {
          alert('All rubric percentages must be greater than 0');
          return;
        }
      }
    }

    setFormData(editableFormData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditableFormData(
      formData || {
        agentName: '',
        applicationType: '',
        rubricCriteria: '',
        rubrics: []
      }
    );
    setIsEditing(false);
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditableFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRubricChange = (
    index: number,
    field: 'name' | 'percentage',
    value: string | number
  ) => {
    setEditableFormData(prev => ({
      ...prev,
      rubrics:
        prev.rubrics?.map((rubric, i) =>
          i === index ? { ...rubric, [field]: value } : rubric
        ) || []
    }));
  };

  const addRubric = () => {
    setEditableFormData(prev => ({
      ...prev,
      rubrics: [...(prev.rubrics || []), { name: '', percentage: 0 }]
    }));
  };

  const removeRubric = (index: number) => {
    setEditableFormData(prev => ({
      ...prev,
      rubrics: prev.rubrics?.filter((_, i) => i !== index) || []
    }));
  };

  // Sample detailed results data
  const detailedResults: DetailedResult[] = [
    {
      id: '1',
      name: 'Sanjana Mehta',
      email: 'sanjana.mehta@tech.com',
      totalScore: 92,
      grade: 'Excellent',
      criteria: [
        {
          name: 'Technical Innovation',
          description:
            'Demonstrates creative and advanced use of technology to solve compliance challenges in SaaS',
          points: '18/20'
        },
        {
          name: 'Compliance Alignment',
          description:
            'Strong understanding of healthcare compliance. Solution addresses relevant frameworks and regulatory gaps effectively.',
          points: '14/15'
        },
        {
          name: 'Feasibility',
          description:
            'Implementation plan is realistic, with well-scoped timelines and practical resource requirements.',
          points: '18/20'
        },
        {
          name: 'Communication',
          description:
            'Clearly structured proposal with excellent articulation of goals, approach, and impact.',
          points: '26/30'
        }
      ],
      keyStrengths: [
        'Exceptional problem-solving abilities',
        'Strong technical foundation',
        'Innovative thinking and creativity',
        'Clear communication skills'
      ]
    }
  ];

  const handleResultClick = (resultName: string) => {
    console.log('Clicked on:', resultName);
    console.log('Available results:', detailedResults);
    const result = detailedResults.find(r => r.name === resultName);
    console.log('Found result:', result);
    if (result) {
      setSelectedResult(result);
      setShowDetailModal(true);
      console.log('Modal should open');
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedResult(null);
  };

  // Filter options
  const candidateFilterOptions = [
    'All Candidates',
    'Accepted Candidates',
    'Rejected Candidates',
    'Under Review',
    'Pending Decision',
    'Waitlisted'
  ];

  const gradeFilterOptions = [
    'All Grades',
    'Excellent (90-100)',
    'Good (80-89)',
    'Average (70-79)',
    'Below Average (60-69)',
    'Poor (Below 60)'
  ];

  const handleCandidateFilterSelect = (option: string) => {
    setSelectedCandidateFilter(option);
    setShowCandidateDropdown(false);
  };

  const handleGradeFilterSelect = (option: string) => {
    setSelectedGradeFilter(option);
    setShowGradeDropdown(false);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('ak_rak7k••••••••••••••••••••••••ip5l');
    alert('API key copied to clipboard!');
  };

  const handleCandidateSelect = (candidateName: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateName) 
        ? prev.filter(name => name !== candidateName)
        : [...prev, candidateName]
    );
  };

  // Candidate data with scores and qualification status
  const allCandidatesData = [
    { name: 'Sanjana Mehta', score: 92, grade: 'Excellent', qualified: true, email: 'sanjana.mehta@tech.com' },
    { name: 'Rohan Varma', score: 87, grade: 'Good', qualified: true, email: 'rohan.varma@dev.com' },
    { name: 'Alina Das', score: 86, grade: 'Good', qualified: true, email: 'alina.das@code.com' },
    { name: 'Amit Rajan', score: 82, grade: 'Good', qualified: true, email: 'amit.rajan@tech.com' },
    { name: 'Priya Sinha', score: 70, grade: 'Average', qualified: false, email: 'priya.sinha@dev.com' },
    { name: 'Rahul Kumar', score: 65, grade: 'Average', qualified: false, email: 'rahul.kumar@code.com' },
    { name: 'Neha Sharma', score: 58, grade: 'Below Average', qualified: false, email: 'neha.sharma@tech.com' },
    { name: 'Vikash Gupta', score: 52, grade: 'Poor', qualified: false, email: 'vikash.gupta@dev.com' },
  ];

  const getFilteredCandidates = () => {
    if (candidateFilter === 'qualified') {
      return allCandidatesData.filter(c => c.qualified);
    } else if (candidateFilter === 'disqualified') {
      return allCandidatesData.filter(c => !c.qualified);
    }
    return allCandidatesData;
  };

  const handleSelectAll = () => {
    const filteredCandidates = getFilteredCandidates();
    setSelectedCandidates(filteredCandidates.map(c => c.name));
  };

  const handleSelectQualified = () => {
    const qualifiedCandidates = allCandidatesData.filter(c => c.qualified);
    setSelectedCandidates(qualifiedCandidates.map(c => c.name));
  };

  const handleSelectDisqualified = () => {
    const disqualifiedCandidates = allCandidatesData.filter(c => !c.qualified);
    setSelectedCandidates(disqualifiedCandidates.map(c => c.name));
  };

  const handleDeselectAll = () => {
    setSelectedCandidates([]);
  };

  const handleSendEmails = () => {
    if (selectedCandidates.length === 0) {
      alert('Please select at least one candidate');
      return;
    }
    if (emailType === '') {
      alert('Please select an email type');
      return;
    }
    alert(`${emailType === 'acceptance' ? 'Acceptance' : 'Rejection'} emails sent to ${selectedCandidates.length} candidates`);
    setShowEmailCampaign(false);
    setSelectedCandidates([]);
    setEmailType('');
  };

  // Debug logging
  console.log('Current modal state:', {
    showDetailModal,
    selectedResult: selectedResult?.name
  });

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Upload Data - Gradix</title>
        <meta name="description" content="Upload data for your AI agent" />
      </Head>

      <div className="min-h-screen bg-[#f9f9f9]">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-56 bg-[#efeded] border-r border-gray-400 lg:min-h-screen">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center">
                  <GradixIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h1 className="text-xl lg:text-2xl font-medium text-gray-500">
                  gradix.ai
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-3 lg:p-4 space-y-2">
              <SidebarItem
                icon={<AgentsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="All Agents"
                isActive={activeMenuItem === 'agents'}
                onClick={() => router.push('/agents')}
              />
              <SidebarItem
                icon={<ContactsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Contacts"
                isActive={activeMenuItem === 'contacts'}
                onClick={() => router.push('/contacts')}
              />
              <SidebarItem
                icon={<AnalyticsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Analytics"
                isActive={activeMenuItem === 'analytics'}
                onClick={() => router.push('/analytics')}
              />
              <SidebarItem
                icon={<SettingsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Settings"
                isActive={activeMenuItem === 'settings'}
                onClick={() => router.push('/settings')}
              />
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center p-4 lg:p-8 gap-4 bg-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/agents')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-lg lg:text-xl font-medium text-gray-600">
                  {formData?.agentName || 'Create New Agent'}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-6 h-[calc(100vh-120px)] overflow-y-auto">
              {/* Agent Information - Horizontal Panel */}
              <Card className="mb-4 bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
                <CardContent className="p-4">
                  {/* Top Row - Agent Name and Application Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-6">
                      {/* Agent Name */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">
                          Agent Name
                        </div>
                        {isEditing ? (
                          <Input
                            value={editableFormData.agentName}
                            onChange={e =>
                              handleEditInputChange('agentName', e.target.value)
                            }
                            className="text-xs w-48 h-8"
                          />
                        ) : (
                          <div className="text-xs text-black font-medium">
                            {formData.agentName}
                          </div>
                        )}
                      </div>

                      {/* Application Type */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">
                          Application Type
                        </div>
                        {isEditing ? (
                          <Input
                            value={editableFormData.applicationType}
                            onChange={e =>
                              handleEditInputChange(
                                'applicationType',
                                e.target.value
                              )
                            }
                            className="text-xs w-48 h-8"
                          />
                        ) : (
                          <div className="text-xs text-black font-medium">
                            {formData.applicationType}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Edit Controls */}
                    {!isEditing ? (
                      <button onClick={handleEditClick}>
                        <EditIcon className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500" />
                      </button>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={handleSaveEdit}
                          className="text-[10px] bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-[10px] bg-gray-100 text-black px-2 py-1 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row - Rubrics and Grading Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Rubrics */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-gray-600">Rubrics</div>
                        {isEditing && (
                          <button
                            onClick={addRubric}
                            className="text-[10px] bg-gray-100 text-black px-1.5 py-0.5 rounded border border-gray-300 hover:bg-gray-200"
                          >
                            Add Rubric
                          </button>
                        )}
                      </div>
                      <div>
                        {isEditing ? (
                          <div className="space-y-2">
                            {editableFormData.rubrics?.map((rubric, index) => (
                              <div
                                key={index}
                                className="bg-[#f2f2f2] rounded-md p-3"
                              >
                                <div className="flex items-center gap-3">
                                  <Input
                                    value={rubric.name}
                                    onChange={e =>
                                      handleRubricChange(
                                        index,
                                        'name',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Rubric name"
                                    className="text-sm flex-1"
                                  />
                                  <Input
                                    type="number"
                                    value={rubric.percentage}
                                    onChange={e =>
                                      handleRubricChange(
                                        index,
                                        'percentage',
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    placeholder="%"
                                    className="text-sm w-16"
                                    min="0"
                                    max="100"
                                  />
                                  <button
                                    onClick={() => removeRubric(index)}
                                    className="text-xs bg-gray-100 text-black px-2 py-1 rounded border border-gray-300 hover:bg-gray-200"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          (() => {
                            const rubrics = formData.rubrics || [
                              {
                                name: 'Innovation & Creativity',
                                percentage: 30
                              },
                              { name: 'Technical Execution', percentage: 25 },
                              { name: 'Real-world Impact', percentage: 25 },
                              { name: 'Presentation Quality', percentage: 20 }
                            ];

                            return (
                              <div className="grid grid-cols-2 gap-2">
                                {rubrics.map((rubric, index) => (
                                  <div
                                    key={index}
                                    className="bg-[#f2f2f2] rounded-md p-3 flex justify-between"
                                  >
                                    <span className="text-sm">
                                      {rubric.name}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {rubric.percentage}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            );
                          })()
                        )}
                      </div>
                    </div>

                    {/* Grading Instructions */}
                    <div>
                      <div className="text-sm text-[rgba(0,0,0,0.8)] font-light mb-3">
                        Grading Instructions
                      </div>
                      {isEditing ? (
                        <Textarea
                          value={editableFormData.rubricCriteria}
                          onChange={e =>
                            handleEditInputChange(
                              'rubricCriteria',
                              e.target.value
                            )
                          }
                          className="text-sm resize-none h-32"
                          rows={6}
                        />
                      ) : (
                        <div className="bg-[#f2f2f2] rounded-md p-3 max-h-32 overflow-y-auto">
                          <p className="text-sm text-black leading-relaxed">
                            {formData.rubricCriteria}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content Area */}
              <div className="w-full">
                {/* Tab Navigation */}
                <div className="mb-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-[#eeeeee] p-1 rounded-2xl border-[0.4px] border-[rgba(0,0,0,0.6)]">
                      <TabsTrigger
                        value="setup"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl text-black font-medium"
                      >
                        Setup
                      </TabsTrigger>
                      <TabsTrigger
                        value="logs"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl text-black font-medium"
                      >
                        Grading Logs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup" className="space-y-4 mt-4">
                      {/* Upload File Section */}
                      <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
                        <CardContent className="p-4">
                          {/* Upload Tabs */}
                          <div className="mb-4">
                            <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg w-fit">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Upload tab clicked');
                                  setActiveSetupTab('upload');
                                }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                  activeSetupTab === 'upload'
                                    ? 'bg-white shadow-sm text-black'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                Upload File
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('API Key tab clicked');
                                  setActiveSetupTab('api');
                                }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                  activeSetupTab === 'api'
                                    ? 'bg-white shadow-sm text-black'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                API Key
                              </button>
                            </div>
                          </div>

                          {/* Upload File Content */}
                          {activeSetupTab === 'upload' && (
                            <div
                              className={`border border-dashed rounded-lg p-6 text-center transition-colors ${
                                isDragging
                                  ? 'border-blue-400 bg-blue-50'
                                  : 'border-gray-300 bg-gray-50'
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <input
                                id="file-input"
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileSelect}
                                className="hidden"
                              />

                              <div className="mb-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                                  <UploadIcon className="w-4 h-4 text-white" />
                                </div>
                              </div>

                              <h3 className="text-sm font-medium text-black mb-1">
                                {selectedFile
                                  ? selectedFile.name
                                  : 'Click or drag and drop to upload'}
                              </h3>
                              <p className="text-xs text-gray-600 mb-3">
                                Upload from CSV, XLSV, Google Sheets
                              </p>

                              <Button
                                variant="outline"
                                onClick={handleUploadClick}
                                className="text-xs py-1 px-3 border-gray-300"
                              >
                                Choose File
                              </Button>
                            </div>
                          )}

                          {/* API Key Content */}
                          {activeSetupTab === 'api' && (
                            <div className="space-y-6">
                              {/* API Configuration Section */}
                              <div className="bg-white border border-gray-300 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-black mb-6">
                                  API Configuration
                                </h3>

                                {/* API Access Toggle */}
                                <div className="flex items-center justify-between mb-6">
                                  <div>
                                    <h4 className="text-base font-medium text-black mb-1">
                                      API Access
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      Enable external integrations for all agents
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => setApiEnabled(!apiEnabled)}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                      apiEnabled ? 'bg-black' : 'bg-gray-300'
                                    }`}
                                  >
                                    <div
                                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                        apiEnabled
                                          ? 'translate-x-6'
                                          : 'translate-x-0.5'
                                      }`}
                                    ></div>
                                  </button>
                                </div>

                                {/* API Key Section */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <label className="text-base font-medium text-black">
                                      API Key
                                    </label>
                                    <InfoIcon className="w-4 h-4 text-gray-500" />
                                  </div>
                                  
                                  <div className="flex gap-2 mb-2">
                                    <Input
                                      value="ak_rak7k••••••••••••••••••••••••ip5l"
                                      className="flex-1 border border-gray-300 bg-white"
                                      readOnly
                                    />
                                    <Button
                                      onClick={handleCopyApiKey}
                                      className="px-3 border border-gray-300 bg-white hover:bg-gray-50"
                                    >
                                      <CopyIcon className="w-4 h-4 text-gray-500" />
                                    </Button>
                                  </div>
                                  
                                  <p className="text-xs text-gray-500">
                                    This key provides access to all your agents. Keep it secure.
                                  </p>
                                </div>
                              </div>

                              {/* Test Agent Section */}
                              <div className="bg-white border border-gray-300 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-black mb-4">
                                  Test Agent
                                </h3>

                                {/* Input Type Selection */}
                                <div className="flex gap-4 mb-4">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="testInputType"
                                      value="text"
                                      defaultChecked
                                      className="w-4 h-4 text-black"
                                    />
                                    <span className="text-sm text-black">Text Input</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="testInputType"
                                      value="file"
                                      className="w-4 h-4 text-black"
                                    />
                                    <span className="text-sm text-black">File Upload</span>
                                  </label>
                                </div>

                                {/* Text Area */}
                                <div className="mb-4">
                                  <Textarea
                                    placeholder="Enter your test data here. You can paste multiple entries separated by line breaks. Maximum 10 entries will be processed."
                                    className="min-h-[120px] border border-gray-300 text-sm resize-none"
                                  />
                                </div>

                                {/* Help Text */}
                                <p className="text-xs text-gray-500 mb-4">
                                  Enter sample data for testing. Each line will be treated as a separate test case.
                                </p>

                                {/* Test Button */}
                                <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md">
                                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                  Test Agent
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Action Buttons - Only show when Upload File tab is active */}
                      {activeSetupTab === 'upload' && (
                        <div className="flex justify-between items-center pt-3">
                          <Button
                            variant="outline"
                            onClick={handleBack}
                            className="px-4 py-2 text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                          >
                            Back
                          </Button>

                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={handleTestWithSampleData}
                              className="px-4 py-2 text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                            >
                              Test with Sample Data
                            </Button>

                            <Button
                              onClick={handleCompleteSetup}
                              className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800"
                            >
                              Start Grading
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* What happens next section */}
                      <Card className="bg-gray-50 border border-gray-200">
                        <CardContent className="p-4">
                          <h3 className="text-sm font-medium text-black mb-3">
                            What happens next?
                          </h3>
                          <ul className="space-y-2 text-xs text-black">
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                              Your file will be securely uploaded and analyzed
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                              AI will generate application type and rubrics
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                              Grading will be performed based on agent
                              instructions
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                              Results will appear in your grading logs
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-6">
                      <div className="space-y-6">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-[rgba(0,0,0,0.7)]">
                                  Total Applications
                                </span>
                              </div>
                              <div className="text-3xl font-light text-black">
                                20
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-[rgba(0,0,0,0.7)]">
                                  Highest Score
                                </span>
                              </div>
                              <div className="text-3xl font-light text-black">
                                92
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-[rgba(0,0,0,0.7)]">
                                  Lowest Score
                                </span>
                              </div>
                              <div className="text-3xl font-light text-black">
                                48
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-[rgba(0,0,0,0.7)]">
                                  Average Score
                                </span>
                              </div>
                              <div className="text-3xl font-light text-black">
                                78.5%
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Results Section */}
                        <div className="bg-white rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.2)] overflow-hidden">
                          {/* Results Header */}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="bg-gray-100 p-0.5 rounded-lg flex border border-gray-300">
                                  <button
                                    onClick={() => setLogsView('results')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                      logsView === 'results'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                  >
                                    All Evaluation Results ({allCandidatesData.length})
                                  </button>
                                  <button
                                    onClick={() => setLogsView('analytics')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                      logsView === 'analytics'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                  >
                                    Result Analytics
                                  </button>
                                  <button
                                    onClick={() => setLogsView('email-analytics')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                      logsView === 'email-analytics'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                  >
                                    Email Analytics
                                  </button>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setShowEmailCampaign(true)}
                                  className="flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-md transition-colors"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  Email Campaign
                                </button>
                                <button className="flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-md transition-colors">
                                  <svg
                                    className="w-3.5 h-3.5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  Export Results
                                </button>
                              </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.2)]">
                              <div className="flex-1 max-w-[620px]">
                                <div className="relative">
                                  <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgba(0,0,0,0.4)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                  </svg>
                                  <Input
                                    placeholder="Select by name or email"
                                    className="pl-12 h-10 border-[0.8px] border-[rgba(0,0,0,0.8)] text-sm placeholder:text-[rgba(0,0,0,0.6)] bg-white text-black"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-3 ml-4">
                                {/* Candidate Filter Dropdown */}
                                <div
                                  className="relative"
                                  ref={candidateDropdownRef}
                                >
                                  <button
                                    onClick={() =>
                                      setShowCandidateDropdown(
                                        !showCandidateDropdown
                                      )
                                    }
                                    className="flex items-center gap-2 border-[0.8px] border-[rgba(0,0,0,0.8)] bg-white hover:bg-gray-50 text-sm text-black font-medium px-4 py-2 rounded-md shadow-sm transition-colors"
                                  >
                                    {selectedCandidateFilter}
                                    <svg
                                      className={`w-3.5 h-3.5 text-black transition-transform ${
                                        showCandidateDropdown
                                          ? 'rotate-0'
                                          : 'rotate-180'
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                  {showCandidateDropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border-[0.8px] border-[rgba(0,0,0,0.8)] rounded-md shadow-lg z-10">
                                      {candidateFilterOptions.map(option => (
                                        <button
                                          key={option}
                                          onClick={() =>
                                            handleCandidateFilterSelect(option)
                                          }
                                          className={`w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors ${
                                            selectedCandidateFilter === option
                                              ? 'bg-gray-100 font-medium text-black'
                                              : 'text-black'
                                          }`}
                                          style={{ color: '#000000' }}
                                        >
                                          {option}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Grade Filter Dropdown */}
                                <div
                                  className="relative"
                                  ref={gradeDropdownRef}
                                >
                                  <button
                                    onClick={() =>
                                      setShowGradeDropdown(!showGradeDropdown)
                                    }
                                    className="flex items-center gap-2 border-[0.8px] border-[rgba(0,0,0,0.8)] bg-white hover:bg-gray-50 text-sm text-black font-medium px-4 py-2 rounded-md shadow-sm transition-colors"
                                  >
                                    {selectedGradeFilter}
                                    <svg
                                      className={`w-3.5 h-3.5 text-black transition-transform ${
                                        showGradeDropdown
                                          ? 'rotate-0'
                                          : 'rotate-180'
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                  {showGradeDropdown && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border-[0.8px] border-[rgba(0,0,0,0.8)] rounded-md shadow-lg z-10">
                                      {gradeFilterOptions.map(option => (
                                        <button
                                          key={option}
                                          onClick={() =>
                                            handleGradeFilterSelect(option)
                                          }
                                          className={`w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors ${
                                            selectedGradeFilter === option
                                              ? 'bg-gray-100 font-medium text-black'
                                              : 'text-black'
                                          }`}
                                          style={{ color: '#000000' }}
                                        >
                                          {option}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Analytics Content */}
                          {logsView === 'analytics' && (
                            <div className="px-4 pb-4">
                              {/* Charts Section */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Score Distribution Chart */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-sm font-medium text-black mb-3">
                                    Score Distribution
                                  </h3>

                                  {/* Chart Container */}
                                  <div className="relative">
                                    {/* Y-axis labels */}
                                    <div className="absolute left-0 h-40 flex flex-col justify-between text-xs text-gray-500 py-1">
                                      <span>60</span>
                                      <span>45</span>
                                      <span>30</span>
                                      <span>15</span>
                                      <span>0</span>
                                    </div>

                                    {/* Chart area */}
                                    <div className="ml-6 relative">
                                      {/* Grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between">
                                        {[...Array(5)].map((_, i) => (
                                          <div
                                            key={i}
                                            className="border-t border-gray-100"
                                          ></div>
                                        ))}
                                      </div>

                                      {/* Bars */}
                                      <div className="flex items-end justify-between h-40 px-2">
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '33px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            90-100
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '54px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            80-89
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '143px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            70-79
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '20px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            60-69
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '10px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            50-59
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <div
                                            className="bg-gray-600 w-8 rounded-t mb-1"
                                            style={{ height: '5px' }}
                                          ></div>
                                          <span className="text-[10px] text-gray-600">
                                            40-49
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Average Performance by Criteria */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-sm font-medium text-black mb-3">
                                    Average Performance by Criteria
                                  </h3>

                                  <div className="space-y-2">
                                    {/* Technical Skills */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-black w-24">
                                        Technical Skills
                                      </span>
                                      <div className="flex-1 mx-3">
                                        <div className="bg-gray-100 h-2 rounded">
                                          <div
                                            className="bg-gray-500 h-2 rounded"
                                            style={{ width: '84.3%' }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500 w-12 text-right">
                                        84.3%
                                      </span>
                                    </div>

                                    {/* Communication */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-black w-24">
                                        Communication
                                      </span>
                                      <div className="flex-1 mx-3">
                                        <div className="bg-gray-100 h-2 rounded">
                                          <div
                                            className="bg-gray-500 h-2 rounded"
                                            style={{ width: '86.2%' }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500 w-12 text-right">
                                        86.2%
                                      </span>
                                    </div>

                                    {/* Academic Performance */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-black w-24">
                                        Academic
                                      </span>
                                      <div className="flex-1 mx-3">
                                        <div className="bg-gray-100 h-2 rounded">
                                          <div
                                            className="bg-gray-500 h-2 rounded"
                                            style={{ width: '83.1%' }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500 w-12 text-right">
                                        83.1%
                                      </span>
                                    </div>

                                    {/* Work Experience */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-black w-24">
                                        Work Experience
                                      </span>
                                      <div className="flex-1 mx-3">
                                        <div className="bg-gray-100 h-2 rounded">
                                          <div
                                            className="bg-gray-500 h-2 rounded"
                                            style={{ width: '84.4%' }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500 w-12 text-right">
                                        84.4%
                                      </span>
                                    </div>

                                    {/* Cultural Fit */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-black w-24">
                                        Cultural Fit
                                      </span>
                                      <div className="flex-1 mx-3">
                                        <div className="bg-gray-100 h-2 rounded">
                                          <div
                                            className="bg-gray-500 h-2 rounded"
                                            style={{ width: '85.0%' }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500 w-12 text-right">
                                        85.0%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Email Analytics Content */}
                          {logsView === 'email-analytics' && (
                            <div className="px-6 pb-6">
                              {/* Campaign Overview Cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-xs text-gray-600 mb-2">Total Emails Sent</h3>
                                  <div className="text-2xl font-light text-black">248</div>
                                  <div className="text-xs text-gray-500 mt-1">+15% from last campaign</div>
                                </div>
                                
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-xs text-gray-600 mb-2">Delivered</h3>
                                  <div className="text-2xl font-light text-black">242</div>
                                  <div className="text-xs text-gray-500 mt-1">97.6% delivery rate</div>
                                </div>
                                
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-xs text-gray-600 mb-2">Opened</h3>
                                  <div className="text-2xl font-light text-black">186</div>
                                  <div className="text-xs text-gray-500 mt-1">76.9% open rate</div>
                                </div>
                                
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-xs text-gray-600 mb-2">Clicked</h3>
                                  <div className="text-2xl font-light text-black">94</div>
                                  <div className="text-xs text-gray-500 mt-1">50.5% click rate</div>
                                </div>
                              </div>

                              {/* Charts Section */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* Email Performance Chart */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-sm font-medium text-black mb-4">Email Performance Over Time</h3>
                                  <div className="relative">
                                    {/* Y-axis labels */}
                                    <div className="absolute left-0 h-48 flex flex-col justify-between text-xs text-gray-500 py-1">
                                      <span>100</span>
                                      <span>75</span>
                                      <span>50</span>
                                      <span>25</span>
                                      <span>0</span>
                                    </div>

                                    {/* Chart area */}
                                    <div className="ml-8 relative">
                                      {/* Grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between">
                                        {[...Array(5)].map((_, i) => (
                                          <div key={i} className="border-t border-gray-100"></div>
                                        ))}
                                      </div>

                                      {/* Line Chart */}
                                      <div className="h-48 relative">
                                        <svg className="w-full h-full" viewBox="0 0 300 190">
                                          {/* Sent line */}
                                          <polyline
                                            fill="none"
                                            stroke="#4B5563"
                                            strokeWidth="2"
                                            points="10,30 60,25 110,35 160,28 210,20 260,15"
                                          />
                                          {/* Opened line */}
                                          <polyline
                                            fill="none"
                                            stroke="#6B7280"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            points="10,80 60,70 110,85 160,75 210,65 260,60"
                                          />
                                          {/* Clicked line */}
                                          <polyline
                                            fill="none"
                                            stroke="#9CA3AF"
                                            strokeWidth="2"
                                            strokeDasharray="2,3"
                                            points="10,130 60,125 110,140 160,135 210,125 260,120"
                                          />
                                        </svg>
                                      </div>

                                      {/* X-axis labels */}
                                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>Day 1</span>
                                        <span>Day 2</span>
                                        <span>Day 3</span>
                                        <span>Day 4</span>
                                        <span>Day 5</span>
                                        <span>Day 6</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Legend */}
                                  <div className="flex gap-4 mt-4 text-xs">
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-0.5 bg-gray-600"></div>
                                      <span className="text-gray-600">Sent</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-0.5 bg-gray-500 border-dashed border-t"></div>
                                      <span className="text-gray-600">Opened</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-0.5 bg-gray-400"></div>
                                      <span className="text-gray-600">Clicked</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Email Types Breakdown */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                  <h3 className="text-sm font-medium text-black mb-4">Campaign Breakdown</h3>
                                  
                                  <div className="space-y-4">
                                    {/* Acceptance Emails */}
                                    <div>
                                      <div className="flex justify-between text-sm mb-2">
                                        <span className="text-black">Acceptance Emails</span>
                                        <span className="text-gray-500">102 sent</span>
                                      </div>
                                      <div className="bg-gray-100 h-2 rounded">
                                        <div className="bg-gray-600 h-2 rounded" style={{ width: '85.2%' }}></div>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">85.2% open rate</div>
                                    </div>

                                    {/* Rejection Emails */}
                                    <div>
                                      <div className="flex justify-between text-sm mb-2">
                                        <span className="text-black">Rejection Emails</span>
                                        <span className="text-gray-500">146 sent</span>
                                      </div>
                                      <div className="bg-gray-100 h-2 rounded">
                                        <div className="bg-gray-500 h-2 rounded" style={{ width: '71.4%' }}></div>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">71.4% open rate</div>
                                    </div>

                                    {/* Delivery Status */}
                                    <div className="pt-2 border-t border-gray-100">
                                      <h4 className="text-sm font-medium text-black mb-2">Delivery Status</h4>
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-600">Delivered</span>
                                          <span className="text-black">242 (97.6%)</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-600">Bounced</span>
                                          <span className="text-black">4 (1.6%)</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-600">Failed</span>
                                          <span className="text-black">2 (0.8%)</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Email Logs Table */}
                              <div className="bg-white border border-gray-200 rounded-lg">
                                <div className="p-4 border-b border-gray-200">
                                  <h3 className="text-sm font-medium text-black">Recent Email Activity</h3>
                                </div>
                                
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Recipient</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Email Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Sent</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Opened</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Clicked</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-black">Sanjana Mehta</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Acceptance</td>
                                        <td className="px-4 py-3">
                                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                            Delivered
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">2 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">45 min ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">42 min ago</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-black">Rohan Varma</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Acceptance</td>
                                        <td className="px-4 py-3">
                                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                            Delivered
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">2 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">1 hour ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">-</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-black">Priya Sinha</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Rejection</td>
                                        <td className="px-4 py-3">
                                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                            Delivered
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">3 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">2 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">-</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-black">Neha Sharma</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Rejection</td>
                                        <td className="px-4 py-3">
                                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded">
                                            Bounced
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">3 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">-</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">-</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm text-black">Alina Das</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Acceptance</td>
                                        <td className="px-4 py-3">
                                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                            Delivered
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">4 hours ago</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">Not opened</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">-</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Results List */}
                          {logsView === 'results' && (
                            <div className="px-6 pb-6 space-y-3">
                              {/* Result Entry 1 - Sanjana Mehta */}
                              <div 
                                className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => handleResultClick('Sanjana Mehta')}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">
                                      1
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">
                                        Sanjana Mehta
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Technical Skills: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Communication: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Academic Performance: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Work Experience: Good
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-semibold text-black">
                                      92%
                                    </div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">
                                      Excellent
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 2 - Rohan Varma */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">
                                      2
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">
                                        Rohan Varma
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Technical Skills: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Communication: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Academic Performance: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Work Experience: Good
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-semibold text-black">
                                      87%
                                    </div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">
                                      Good
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 3 - Alina Das */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">
                                      3
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">
                                        Alina Das
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Technical Skills: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Communication: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Academic Performance: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Work Experience: Good
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-semibold text-black">
                                      86%
                                    </div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">
                                      Good
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 4 - Amit Rajan */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">
                                      4
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">
                                        Amit Rajan
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Technical Skills: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Communication: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Academic Performance: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Work Experience: Good
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-semibold text-black">
                                      82%
                                    </div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">
                                      Good
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 5 - Priya Sinha */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">
                                      5
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">
                                        Priya Sinha
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Technical Skills: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Communication: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Academic Performance: Excellent
                                        </span>
                                        <span className="bg-[#e5e7eb] px-2 py-1 rounded text-xs text-[rgba(0,0,0,0.8)]">
                                          Work Experience: Good
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-semibold text-black">
                                      70%
                                    </div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">
                                      Good
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Result Modal */}
      {showDetailModal && selectedResult ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.2)] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCloseDetail}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl font-medium text-black">
                    {selectedResult.name}
                  </h2>
                  <p className="text-sm text-[rgba(0,0,0,0.6)]">
                    {selectedResult.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseDetail}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">
                  Evaluation Results
                </h3>

                {/* Criteria Table */}
                <div className="bg-[#f9f9f9] rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#eeeeee]">
                        <th className="text-left p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">
                          Criteria
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">
                          Description
                        </th>
                        <th className="text-right p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResult.criteria.map((criterion, index) => (
                        <tr
                          key={index}
                          className="border-t border-[rgba(0,0,0,0.1)]"
                        >
                          <td className="p-4 text-sm text-black font-medium">
                            {criterion.name}
                          </td>
                          <td className="p-4 text-sm text-black">
                            {criterion.description}
                          </td>
                          <td className="p-4 text-sm text-black font-medium text-right">
                            {criterion.points}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[rgba(0,0,0,0.2)] bg-[#f2f2f2]">
                        <td className="p-4 text-sm font-medium text-black">
                          TOTAL
                        </td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm font-medium text-black text-right">
                          {selectedResult.totalScore}/100
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Score and Grade */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-light text-black mb-2">
                      {selectedResult.totalScore}%
                    </div>
                    <div className="text-sm text-[rgba(0,0,0,0.6)]">
                      Overall Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-medium text-black mb-2">
                      {selectedResult.grade}
                    </div>
                    <div className="text-sm text-[rgba(0,0,0,0.6)]">Grade</div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div>
                  <h4 className="text-base font-medium text-black mb-3">
                    Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {selectedResult.keyStrengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm text-black">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Email Campaign Modal */}
      {showEmailCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-medium text-black">Email Campaign</h2>
              <button
                onClick={() => setShowEmailCampaign(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Email Type Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-black mb-3 block">Email Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="emailType"
                      value="acceptance"
                      checked={emailType === 'acceptance'}
                      onChange={(e) => setEmailType(e.target.value as 'acceptance' | 'rejection')}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400 focus:ring-2"
                    />
                    <span className="text-sm text-black">Acceptance Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="emailType"
                      value="rejection"
                      checked={emailType === 'rejection'}
                      onChange={(e) => setEmailType(e.target.value as 'acceptance' | 'rejection')}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400 focus:ring-2"
                    />
                    <span className="text-sm text-black">Rejection Email</span>
                  </label>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="mb-6">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                  <button
                    onClick={() => setCandidateFilter('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      candidateFilter === 'all'
                        ? 'bg-white shadow-sm text-black'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All Candidates ({allCandidatesData.length})
                  </button>
                  <button
                    onClick={() => setCandidateFilter('qualified')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      candidateFilter === 'qualified'
                        ? 'bg-white shadow-sm text-black'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Qualified ({allCandidatesData.filter(c => c.qualified).length})
                  </button>
                  <button
                    onClick={() => setCandidateFilter('disqualified')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      candidateFilter === 'disqualified'
                        ? 'bg-white shadow-sm text-black'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Disqualified ({allCandidatesData.filter(c => !c.qualified).length})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Candidate Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-black">
                      Select Candidates ({selectedCandidates.length} selected)
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSelectQualified}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        All Qualified
                      </button>
                      <button
                        onClick={handleSelectDisqualified}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        All Disqualified
                      </button>
                      <button
                        onClick={handleSelectAll}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Select All
                      </button>
                      <button
                        onClick={handleDeselectAll}
                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 max-h-80 overflow-y-auto">
                    {getFilteredCandidates().map((candidate, index) => (
                      <label key={candidate.name} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.name)}
                          onChange={() => handleCandidateSelect(candidate.name)}
                          className="w-4 h-4 border-gray-300 text-black focus:ring-gray-400 focus:ring-2 rounded"
                        />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          candidate.qualified ? 'bg-gray-200 text-gray-800' : 'bg-gray-300 text-gray-700'
                        }`}>
                          {candidateFilter === 'all' ? 
                            allCandidatesData.findIndex(c => c.name === candidate.name) + 1 : 
                            index + 1
                          }
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-black font-medium">{candidate.name}</div>
                          <div className="text-xs text-gray-500">{candidate.email}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-black">
                            {candidate.score}%
                          </div>
                          <div className="text-xs text-gray-500">{candidate.grade}</div>
                          <div className={`text-xs font-medium ${
                            candidate.qualified ? 'text-gray-700' : 'text-gray-600'
                          }`}>
                            {candidate.qualified ? 'QUALIFIED' : 'DISQUALIFIED'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email Preview */}
                <div>
                  <label className="text-sm font-medium text-black mb-3 block">Email Preview</label>
                  <div className="bg-gray-50 rounded-lg p-4 border h-80 overflow-y-auto">
                    {emailType === '' ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                          <p className="text-sm">Select an email type to preview the template</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm mb-4">
                          <strong>Subject:</strong> {emailType === 'acceptance' ? 'Congratulations! Application Accepted' : 'Application Status Update'}
                        </div>
                        <div className="text-sm text-gray-700 space-y-3">
                          {emailType === 'acceptance' ? (
                        <>
                          <p>Dear [Candidate Name],</p>
                          <p>We are pleased to inform you that your application has been <strong>accepted</strong>. Your exceptional performance in our evaluation process has impressed our team.</p>
                          <p><strong>Your Results:</strong></p>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Overall Score: [Score]%</li>
                            <li>Grade: [Grade]</li>
                            <li>Status: QUALIFIED</li>
                          </ul>
                          <p>We look forward to working with you and will be in touch soon with next steps.</p>
                          <p>Congratulations once again!</p>
                          <p>Best regards,<br/>The Evaluation Team</p>
                        </>
                      ) : (
                        <>
                          <p>Dear [Candidate Name],</p>
                          <p>Thank you for your interest in our program and for taking the time to submit your application.</p>
                          <p>After careful consideration, we have decided not to move forward with your application at this time.</p>
                          <p><strong>Your Results:</strong></p>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Overall Score: [Score]%</li>
                            <li>Grade: [Grade]</li>
                            <li>Status: NOT QUALIFIED</li>
                          </ul>
                          <p><strong>Areas for Improvement:</strong></p>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Technical skills development</li>
                            <li>Communication and presentation</li>
                            <li>Experience in relevant domains</li>
                          </ul>
                          <p>We encourage you to continue developing your skills and consider reapplying in the future.</p>
                          <p>Best regards,<br/>The Evaluation Team</p>
                        </>
                      )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailCampaign(false)}
                  className="px-4 py-2 text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendEmails}
                  className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedCandidates.length === 0 || emailType === ''}
                >
                  Send {emailType === 'acceptance' ? 'Acceptance' : emailType === 'rejection' ? 'Rejection' : ''} Emails ({selectedCandidates.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading Progress Modal */}
      {showGradingProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f9f9f9] rounded-[24px] max-w-[607px] w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowGradingProgress(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="p-6 pb-0">
              <h2 className="text-2xl font-semibold text-black mb-6">
                Grading Progress
              </h2>

              {/* Progress Section */}
              <div className="bg-[#f2f2f2] rounded-2xl p-6 mb-6 border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                        <div
                          className="w-4 h-4 bg-black rounded-full"
                          style={{
                            background: `conic-gradient(black ${
                              gradingProgress.progress * 3.6
                            }deg, #f2f2f2 0deg)`
                          }}
                        ></div>
                      </div>
                      <h3 className="text-base font-medium text-black">
                        {gradingProgress.stage}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-800 mb-4">
                      {gradingProgress.description}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1">
                    <span className="text-sm text-gray-800">
                      {gradingProgress.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="bg-white h-3 rounded border border-gray-400">
                    <div
                      className="bg-black h-full rounded transition-all duration-300"
                      style={{ width: `${gradingProgress.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="flex justify-between text-sm text-gray-800">
                  <span>
                    <span className="text-gray-600">
                      Applications Processed:{' '}
                    </span>
                    <span className="text-black">
                      {gradingProgress.filesProcessed} /{' '}
                      {gradingProgress.totalFiles}
                    </span>
                  </span>
                  <span>
                    <span className="text-gray-600">Remaining time: </span>
                    <span className="text-black">
                      {gradingProgress.timeRemaining}
                    </span>
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="text-2xl font-normal text-black mb-1">
                    {gradingProgress.filesProcessed}
                  </div>
                  <div className="text-sm text-gray-700">Files Processed</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="text-2xl font-normal text-black mb-1">
                    {gradingProgress.progress}%
                  </div>
                  <div className="text-sm text-gray-700">Progress</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="text-2xl font-normal text-black mb-1">
                    1 hr
                  </div>
                  <div className="text-sm text-gray-700">Time left</div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-300">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM11 17H6l5 5v-5zM12 3v12"
                    />
                  </svg>
                  <span className="text-base text-gray-700">
                    Notification Preferences
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">
                      Email Notifications
                    </span>
                    <div className="w-6 h-3 bg-gray-400 rounded-full relative">
                      <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-600"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">
                      In-App Notification
                    </span>
                    <div className="w-6 h-3 bg-gray-400 rounded-full relative">
                      <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-600"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">
                      Push Notifications
                    </span>
                    <div className="w-6 h-3 bg-gray-400 rounded-full relative">
                      <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-400 text-gray-600 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Processing
              </button>
              <button
                onClick={() => {
                  setShowGradingProgress(false);
                  setActiveTab('logs');
                }}
                className="flex-1 bg-white border border-gray-400 text-black py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
              >
                Run in Background
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
