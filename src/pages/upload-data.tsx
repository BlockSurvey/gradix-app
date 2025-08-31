import { useState, useEffect, useRef } from 'react';
import { addAgent } from './agents';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Start Grading');
  
  // Application Form State
  const [applicationFormData, setApplicationFormData] = useState({
    name: '',
    email: '',
    phone: '',
    responses: {} as { [key: string]: string }
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

  const handleCompleteSetup = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!formData) {
      alert('Form data is missing');
      return;
    }

    setIsUploading(true);
    setUploadButtonText('Uploading...');

    try {
      // Create FormData object
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      // Show grading progress modal
      setShowGradingProgress(true);
      setGradingProgress({
        progress: 5,
        filesProcessed: 0,
        totalFiles: 500,
        timeRemaining: 'Calculating...',
        stage: '📤 Uploading Dataset',
        description: 'Securely transferring your application data to our AI grading system...'
      });

      // Make API call to upload the dataset
      const response = await fetch('http://127.0.0.1:8000/api/v1/datasets/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Extract dataset_id from the response
      const datasetId = data.dataset_id || data.id;
      if (!datasetId) {
        throw new Error('No dataset ID received from upload');
      }

      // Hold upload complete for 2 seconds
      setTimeout(() => {
        setGradingProgress({
          progress: 15,
          filesProcessed: 0,
          totalFiles: 500,
          timeRemaining: 'Processing...',
          stage: '✅ Upload Complete',
          description: 'Your dataset has been successfully uploaded. Preparing for analysis...'
        });
        setUploadButtonText('Processing Upload...');
      }, 1500);

      // Wait before starting summary
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update progress to show summarizing
      setGradingProgress({
        progress: 20,
        filesProcessed: 0,
        totalFiles: 500,
        timeRemaining: 'Analyzing...',
        stage: '📊 Analyzing Dataset',
        description: 'Our AI is reading through your applications and understanding the data structure...'
      });
      setUploadButtonText('Analyzing Data...');

      // Call summary API
      const summaryResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/datasets/${datasetId}/summary`,
        {
          method: 'GET',
        }
      );

      if (!summaryResponse.ok) {
        throw new Error(`Summary generation failed: ${summaryResponse.statusText}`);
      }

      const summaryData = await summaryResponse.json();
      console.log('Summary generated:', summaryData);

      // Show summary complete
      setGradingProgress({
        progress: 35,
        filesProcessed: 50,
        totalFiles: 500,
        timeRemaining: 'Preparing evaluation...',
        stage: '✨ Dataset Analysis Complete',
        description: `Found ${summaryData.total_records || 500} applications ready for AI evaluation. Preparing rubric-based grading...`
      });
      setUploadButtonText('Preparing Evaluation...');

      // Hold for user to see
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Update progress for evaluation
      setGradingProgress({
        progress: 40,
        filesProcessed: 100,
        totalFiles: 500,
        timeRemaining: 'Initializing...',
        stage: '🤖 Configuring AI Evaluator',
        description: 'Setting up your custom rubrics and grading criteria for personalized evaluation...'
      });
      setUploadButtonText('Configuring AI...');

      // Call evaluation API
      const evaluationPayload = {
        grading_id: "DgoAISSxEQy2siWOI3dD",
        dataset_id: datasetId,
        name: "Gradix AI application evaluation"
      };

      const evaluationResponse = await fetch(
        'http://127.0.0.1:8000/api/v1/evaluations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(evaluationPayload),
        }
      );

      if (!evaluationResponse.ok) {
        throw new Error(`Evaluation failed: ${evaluationResponse.statusText}`);
      }

      const evaluationData = await evaluationResponse.json();
      console.log('Evaluation created:', evaluationData);

      // Extract evaluation_id from the response
      const evaluationId = evaluationData.evaluation_id || evaluationData.id;
      if (!evaluationId) {
        throw new Error('No evaluation ID received from evaluation creation');
      }

      // Hold to show evaluation created
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update progress for starting evaluation
      setGradingProgress({
        progress: 50,
        filesProcessed: 150,
        totalFiles: 500,
        timeRemaining: 'Starting evaluation...',
        stage: '🚀 Launching AI Evaluation',
        description: 'Initializing advanced AI models to evaluate each application against your rubrics...'
      });
      setUploadButtonText('Starting Evaluation...');

      // Start the evaluation process
      const startEvaluationResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/evaluations/${evaluationId}/start`,
        {
          method: 'POST',
        }
      );

      if (!startEvaluationResponse.ok) {
        throw new Error(`Failed to start evaluation: ${startEvaluationResponse.statusText}`);
      }

      const startEvaluationData = await startEvaluationResponse.json();
      console.log('Evaluation process started:', startEvaluationData);

      // Show evaluation started
      setGradingProgress({
        progress: 60,
        filesProcessed: 200,
        totalFiles: 500,
        timeRemaining: 'Processing applications...',
        stage: '⚡ AI Evaluation in Progress',
        description: 'Our AI is now carefully reviewing each application. This ensures fair and consistent grading...'
      });
      setUploadButtonText('Evaluating Applications...');

      // Hold for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update progress after successful evaluation start
      setGradingProgress({
        progress: 75,
        filesProcessed: 350,
        totalFiles: 500,
        timeRemaining: 'Almost done...',
        stage: '📝 Grading Applications',
        description: 'Scoring each application based on your rubrics: Innovation, Technical Skills, Impact, and more...'
      });
      setUploadButtonText('Grading in Progress...');

      // Continue with more engaging progress updates
      setTimeout(() => {
        setGradingProgress({
          progress: 85,
          filesProcessed: 425,
          totalFiles: 500,
          timeRemaining: 'Finalizing...',
          stage: '🎯 Generating Insights',
          description: 'Creating detailed feedback and identifying top performers based on evaluation scores...'
        });
        setUploadButtonText('Generating Insights...');
      }, 6000);

      setTimeout(() => {
        setGradingProgress({
          progress: 95,
          filesProcessed: 480,
          totalFiles: 500,
          timeRemaining: 'Almost complete...',
          stage: '📊 Preparing Results',
          description: 'Organizing results, calculating final scores, and preparing detailed analytics dashboard...'
        });
        setUploadButtonText('Finalizing Results...');
      }, 10000);

      setTimeout(() => {
        setGradingProgress({
          progress: 100,
          filesProcessed: 500,
          totalFiles: 500,
          timeRemaining: 'Complete!',
          stage: '🎉 Evaluation Complete!',
          description: 'All applications have been successfully evaluated! Redirecting to results...'
        });
        setUploadButtonText('Complete! View Results');
        setIsUploading(false);
        
        // Switch to Grading Logs tab after a short delay
        setTimeout(() => {
          setActiveTab('logs');
          setShowGradingProgress(false);
        }, 2000);
      }, 14000);

    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowGradingProgress(false);
      setIsUploading(false);
      setUploadButtonText('Start Grading');
    }
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

  // Application form handlers
  const handleApplicationFormChange = (field: string, value: string) => {
    setApplicationFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRubricResponse = (rubricName: string, value: string) => {
    setApplicationFormData(prev => ({
      ...prev,
      responses: { ...prev.responses, [rubricName]: value }
    }));
  };

  // Get contextual form fields based on agent type
  const getContextualFormFields = () => {
    const agentName = formData?.agentName?.toLowerCase() || '';
    const applicationType = formData?.applicationType?.toLowerCase() || '';

    // AI Hackathon specific fields
    if (agentName.includes('hackathon') || applicationType.includes('hackathon')) {
      return [
        { id: 'teamName', label: 'Team Name *', type: 'text', placeholder: 'Enter your team name' },
        { id: 'githubUrl', label: 'GitHub Repository URL *', type: 'url', placeholder: 'https://github.com/username/project' },
        { id: 'demoUrl', label: 'Project Demo/Link', type: 'url', placeholder: 'https://your-demo-link.com' },
        { id: 'idea', label: 'Idea *', type: 'textarea', placeholder: 'Briefly describe your project idea' },
        { id: 'description', label: 'Description *', type: 'textarea', placeholder: 'Detailed description of your project' },
        { id: 'technologies', label: 'Technologies Used *', type: 'textarea', placeholder: 'List the technologies, frameworks, and tools used' },
        { id: 'problemSolved', label: 'Problem Solved *', type: 'textarea', placeholder: 'What problem does your project solve?' },
        { id: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'Who is your target audience?' },
        { id: 'projectStatus', label: 'Project Status *', type: 'select', placeholder: 'Select project status', options: ['MVP/Prototype', 'Working Beta', 'Production Ready', 'Concept/Design Only'] },
        { id: 'challenges', label: 'Challenges Faced', type: 'textarea', placeholder: 'What challenges did you encounter and how did you overcome them?' },
        { id: 'futurePlans', label: 'Future Plans', type: 'textarea', placeholder: 'What are your plans for this project moving forward?' },
        { id: 'license', label: 'License Type', type: 'select', placeholder: 'Select license type', options: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD', 'Creative Commons', 'Proprietary', 'Other'] }
      ];
    }

    // AI Founder Event specific fields
    if (agentName.includes('founder') || applicationType.includes('founder')) {
      return [
        { id: 'companyName', label: 'Company/Startup Name *', type: 'text', placeholder: 'Enter your company or startup name' },
        { id: 'position', label: 'Current Position/Role *', type: 'text', placeholder: 'CEO, CTO, Founder, Co-founder, etc.' },
        { id: 'industry', label: 'Industry Focus *', type: 'select', placeholder: 'Select industry focus', options: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Robotics', 'NLP/LLMs', 'Computer Vision', 'Healthcare AI', 'FinTech AI', 'EdTech AI', 'Enterprise AI', 'Consumer AI', 'Other'] },
        { id: 'companyStage', label: 'Company Stage *', type: 'select', placeholder: 'Select company stage', options: ['Idea Stage', 'Pre-Seed', 'Seed', 'Series A', 'Series B+', 'Established Company', 'Solo Founder'] },
        { id: 'teamSize', label: 'Current Team Size *', type: 'select', placeholder: 'Select team size', options: ['Just me', '2-5 people', '6-15 people', '16-50 people', '51-100 people', '100+ people'] },
        { id: 'linkedinUrl', label: 'LinkedIn Profile *', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
        { id: 'companyWebsite', label: 'Company Website/Portfolio', type: 'url', placeholder: 'https://yourcompany.com' },
        { id: 'yearsOfExperience', label: 'Years in AI/Tech *', type: 'select', placeholder: 'Select years of experience', options: ['Less than 1 year', '1-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years'] },
        { id: 'previousExits', label: 'Previous Exits/Acquisitions', type: 'textarea', placeholder: 'Describe any previous successful exits, acquisitions, or notable achievements' },
        { id: 'leadershipExp', label: 'Leadership Experience *', type: 'textarea', placeholder: 'Describe your leadership roles, team management experience, and key achievements' },
        { id: 'aiVision', label: 'AI Vision & Strategy *', type: 'textarea', placeholder: 'What is your vision for AI in your industry? How do you see AI evolving?' },
        { id: 'networkingGoals', label: 'Networking Goals *', type: 'textarea', placeholder: 'Who would you like to connect with? What partnerships are you seeking?' },
        { id: 'challengesFaced', label: 'Current Challenges *', type: 'textarea', placeholder: 'What are the biggest challenges you are facing as an AI founder?' },
        { id: 'mentorshipNeeds', label: 'Mentorship/Advisory Needs', type: 'textarea', placeholder: 'What areas would you like mentorship or advisory support in?' },
        { id: 'thoughtLeadership', label: 'Thought Leadership Activities', type: 'textarea', placeholder: 'Speaking engagements, publications, podcasts, community involvement, etc.' },
        { id: 'whyAttend', label: 'Why do you want to attend? *', type: 'textarea', placeholder: 'What specific value are you hoping to gain from this founder event?' },
        { id: 'contribution', label: 'How will you contribute? *', type: 'textarea', placeholder: 'What expertise, connections, or value can you bring to other attendees?' },
        { id: 'fundingStatus', label: 'Current Funding Status', type: 'select', placeholder: 'Select funding status', options: ['Bootstrapped', 'Looking for Pre-Seed', 'Looking for Seed', 'Looking for Series A', 'Recently Funded', 'Not seeking funding'] }
      ];
    }

    // AI Startup Pitch specific fields
    if (agentName.includes('startup') || agentName.includes('pitch') || applicationType.includes('startup') || applicationType.includes('pitch')) {
      return [
        { id: 'startupName', label: 'Startup Name *', type: 'text', placeholder: 'Enter your startup name' },
        { id: 'tagline', label: 'Company Tagline *', type: 'text', placeholder: 'One-line description of what you do' },
        { id: 'industry', label: 'Industry Vertical *', type: 'select', placeholder: 'Select industry vertical', options: ['Healthcare AI', 'FinTech AI', 'EdTech AI', 'Enterprise SaaS', 'Consumer AI', 'Robotics & Automation', 'Data & Analytics', 'Computer Vision', 'NLP & LLMs', 'Cybersecurity AI', 'Marketing AI', 'Other'] },
        { id: 'website', label: 'Company Website', type: 'url', placeholder: 'https://yourstartup.com' },
        { id: 'pitchDeckUrl', label: 'Pitch Deck URL *', type: 'url', placeholder: 'Link to your pitch deck (Google Drive, Dropbox, etc.)' },
        { id: 'problemStatement', label: 'Problem Statement *', type: 'textarea', placeholder: 'What specific problem are you solving? Why is it important?' },
        { id: 'solution', label: 'Solution Overview *', type: 'textarea', placeholder: 'How does your solution solve this problem? What makes it unique?' },
        { id: 'marketSize', label: 'Market Size & Opportunity *', type: 'textarea', placeholder: 'TAM, SAM, SOM - describe the market opportunity with numbers if available' },
        { id: 'businessModel', label: 'Business Model *', type: 'textarea', placeholder: 'How do you make money? Pricing strategy, revenue streams, unit economics' },
        { id: 'customerSegment', label: 'Target Customer Segment *', type: 'textarea', placeholder: 'Who are your ideal customers? B2B/B2C? Company size, demographics, etc.' },
        { id: 'teamInfo', label: 'Founding Team *', type: 'textarea', placeholder: 'Introduce founders and key team members, their backgrounds and expertise' },
        { id: 'advisors', label: 'Key Advisors/Investors', type: 'textarea', placeholder: 'Notable advisors, investors, or board members' },
        { id: 'productStage', label: 'Product Development Stage *', type: 'select', placeholder: 'Select product stage', options: ['Concept/Wireframes', 'MVP/Prototype', 'Beta with Select Users', 'Public Beta', 'General Availability', 'Scaling & Growth'] },
        { id: 'traction', label: 'Traction Metrics *', type: 'textarea', placeholder: 'Users, revenue, partnerships, pilot customers, growth metrics - include numbers' },
        { id: 'revenueMetrics', label: 'Revenue & Financial Metrics', type: 'textarea', placeholder: 'MRR, ARR, customer acquisition cost, lifetime value, burn rate, runway' },
        { id: 'competitiveAdvantage', label: 'Competitive Advantage *', type: 'textarea', placeholder: 'What makes you different? IP, technology, team, market position, etc.' },
        { id: 'competitors', label: 'Key Competitors', type: 'textarea', placeholder: 'Who are your main competitors and how do you differentiate?' },
        { id: 'aiInnovation', label: 'AI Technology & Innovation *', type: 'textarea', placeholder: 'Describe your AI technology, models used, data strategy, technical differentiators' },
        { id: 'scalability', label: 'Scalability Strategy', type: 'textarea', placeholder: 'How will you scale the business and technology?' },
        { id: 'fundingAsk', label: 'Funding Ask *', type: 'select', placeholder: 'Select funding range', options: ['Not seeking funding', '$50K - $250K', '$250K - $500K', '$500K - $1M', '$1M - $2.5M', '$2.5M - $5M', '$5M - $10M', '$10M+'] },
        { id: 'useOfFunds', label: 'Use of Funds', type: 'textarea', placeholder: 'How will you use the funding? Hiring, product development, marketing, etc.' },
        { id: 'milestones', label: 'Key Milestones & Timeline', type: 'textarea', placeholder: 'What are your key milestones for the next 12-18 months?' },
        { id: 'risks', label: 'Key Risks & Mitigation', type: 'textarea', placeholder: 'What are the main risks to your business and how are you addressing them?' }
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

  const handleApplicationSubmit = () => {
    if (!formData) {
      alert('Agent data is missing');
      return;
    }

    // Validate required fields
    if (!applicationFormData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!applicationFormData.email.trim()) {
      alert('Please enter your email');
      return;
    }

    // Validate contextual form fields
    const contextualFields = getContextualFormFields();
    const requiredFields = contextualFields.filter(field => field.label.includes('*'));
    const missingFields = requiredFields.filter(
      field => !applicationFormData.responses[field.id]?.trim()
    );

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label.replace(' *', '')).join(', ')}`);
      return;
    }

    // Show success and simulate processing
    alert('Application submitted successfully! Processing...');
    
    // Reset form
    setApplicationFormData({
      name: '',
      email: '',
      phone: '',
      responses: {}
    });
  };
  // Generate shareable form URL
  const generateShareableUrl = () => {
    if (!formData) return '';
    
    // Find matching template for shareable form
    let agentId = '';
    const agentName = formData.agentName.toLowerCase();
    const applicationType = formData.applicationType.toLowerCase();
    
    if (agentName.includes('hackathon') || applicationType.includes('hackathon')) {
      agentId = 'ai-hackathon-judge';
    } else if (agentName.includes('founder') || applicationType.includes('founder')) {
      agentId = 'ai-founder-registration';
    } else if (agentName.includes('startup') || agentName.includes('pitch') || applicationType.includes('startup') || applicationType.includes('pitch')) {
      agentId = 'ai-startup-pitch';
    } else {
      agentId = 'ai-hackathon-judge'; // fallback
    }
    
    return `${window.location.origin}/form/${agentId}`;
  };
  
  const handleCopyShareUrl = () => {
    const shareUrl = generateShareableUrl();
    navigator.clipboard.writeText(shareUrl);
    alert('Form URL copied to clipboard!');
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
    navigator.clipboard.writeText('ak_rak7k••••••••••••••••••••••••••ip5l');
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
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Application Form tab clicked');
                                  setActiveSetupTab('form');
                                }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                  activeSetupTab === 'form'
                                    ? 'bg-white shadow-sm text-black'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                Application Form
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
                                      value="ak_rak7k••••••••••••••••••••••••••ip5l"
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

                          {/* Application Form Content */}
                          {activeSetupTab === 'form' && (
                            <div className="space-y-6">
                              <div className="bg-white border border-gray-300 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-black mb-6">
                                  Individual Application Form
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                  Submit individual applications for evaluation by this agent.
                                </p>

                                {/* Applicant Information */}
                                <div className="space-y-4 mb-6">
                                  <h4 className="text-base font-medium text-black">
                                    Applicant Information
                                  </h4>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="applicant-name" className="text-sm font-medium text-gray-700">
                                        Full Name *
                                      </Label>
                                      <Input
                                        id="applicant-name"
                                        value={applicationFormData.name}
                                        onChange={(e) => handleApplicationFormChange('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="applicant-email" className="text-sm font-medium text-gray-700">
                                        Email Address *
                                      </Label>
                                      <Input
                                        id="applicant-email"
                                        type="email"
                                        value={applicationFormData.email}
                                        onChange={(e) => handleApplicationFormChange('email', e.target.value)}
                                        placeholder="Enter your email address"
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div className="md:col-span-1">
                                      <Label htmlFor="applicant-phone" className="text-sm font-medium text-gray-700">
                                        Phone Number (Optional)
                                      </Label>
                                      <Input
                                        id="applicant-phone"
                                        value={applicationFormData.phone}
                                        onChange={(e) => handleApplicationFormChange('phone', e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="mt-1"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Contextual Form Fields */}
                                <div className="space-y-6">
                                  <h4 className="text-base font-medium text-black">
                                    Application Details
                                  </h4>
                                  
                                  {getContextualFormFields().map((field, index) => (
                                    <div key={field.id} className="space-y-2">
                                      <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                                        {field.label}
                                      </Label>
                                      
                                      {field.type === 'textarea' ? (
                                        <Textarea
                                          id={field.id}
                                          value={applicationFormData.responses[field.id] || ''}
                                          onChange={(e) => handleRubricResponse(field.id, e.target.value)}
                                          placeholder={field.placeholder}
                                          className="min-h-[100px] text-sm resize-none"
                                        />
                                      ) : field.type === 'select' ? (
                                        <select
                                          id={field.id}
                                          value={applicationFormData.responses[field.id] || ''}
                                          onChange={(e) => handleRubricResponse(field.id, e.target.value)}
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
                                          value={applicationFormData.responses[field.id] || ''}
                                          onChange={(e) => handleRubricResponse(field.id, e.target.value)}
                                          placeholder={field.placeholder}
                                          className="text-sm"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-6">
                                  <Button
                                    onClick={handleApplicationSubmit}
                                    className="bg-black text-white hover:bg-gray-800 px-8 py-2"
                                  >
                                    Submit Application
                                  </Button>
                                </div>
                              </div>

                              {/* Share Form Section */}
                              <div className="bg-white border border-gray-300 rounded-lg p-6 mt-6">
                                <h3 className="text-lg font-medium text-black mb-4">
                                  Share Application Form
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  Generate a shareable link for external applicants to submit applications directly.
                                </p>

                                <div className="space-y-4">
                                  {/* Shareable URL Display */}
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                      Shareable Form URL
                                    </Label>
                                    <div className="flex gap-2">
                                      <Input
                                        value={generateShareableUrl()}
                                        readOnly
                                        className="flex-1 bg-gray-50 text-sm font-mono"
                                        placeholder="Form URL will appear here..."
                                      />
                                      <Button
                                        onClick={handleCopyShareUrl}
                                        variant="outline"
                                        className="px-3 border border-gray-300 bg-white hover:bg-gray-50"
                                      >
                                        <CopyIcon className="w-4 h-4 text-gray-500" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Instructions */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                      <InfoIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <div className="text-sm">
                                        <p className="text-blue-800 font-medium mb-1">How to use:</p>
                                        <ul className="text-blue-700 space-y-1 text-xs">
                                          <li>• Copy the URL above and share it with applicants</li>
                                          <li>• Applications submitted through this link will appear in your Grading Logs</li>
                                          <li>• The form includes all contextual fields based on your agent type</li>
                                          <li>• Each submission will be automatically processed by your AI agent</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Preview Button */}
                                  <div className="flex justify-center pt-2">
                                    <Button
                                      onClick={() => window.open(generateShareableUrl(), '_blank')}
                                      variant="outline"
                                      className="text-sm px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50"
                                    >
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                      Preview Form
                                    </Button>
                                  </div>
                                </div>
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
                              disabled={isUploading || !selectedFile}
                              className={`px-4 py-2 text-sm ${
                                isUploading || !selectedFile
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-black hover:bg-gray-800'
                              } text-white transition-colors`}
                            >
                              {isUploading ? (
                                <span className="flex items-center gap-2">
                                  <svg 
                                    className="animate-spin h-4 w-4 text-white" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                  >
                                    <circle 
                                      className="opacity-25" 
                                      cx="12" 
                                      cy="12" 
                                      r="10" 
                                      stroke="currentColor" 
                                      strokeWidth="4"
                                    />
                                    <path 
                                      className="opacity-75" 
                                      fill="currentColor" 
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  {uploadButtonText}
                                </span>
                              ) : (
                                uploadButtonText
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
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

                        {/* Evaluation Results Table */}
                        <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Evaluation Results</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left p-3 text-sm font-medium text-gray-700">Criterion</th>
                                    <th className="text-center p-3 text-sm font-medium text-gray-700">Weight</th>
                                    <th className="text-center p-3 text-sm font-medium text-gray-700">Score</th>
                                    <th className="text-left p-3 text-sm font-medium text-gray-700">Grade</th>
                                    <th className="text-left p-3 text-sm font-medium text-gray-700">Feedback</th>
                                    <th className="text-center p-3 text-sm font-medium text-gray-700">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">Problem Relevance</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">20%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        5/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Exceptional</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      The Gradix platform provides an exceptionally clear and significant solution...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">Innovation & Creativity</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">20%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        5/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Exceptional</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      Gradix AI demonstrates exceptional innovation and creativity by automating...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">Technical Execution</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">25%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                        3/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Satisfactory</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      The Gradix AI platform demonstrates satisfactory technical execution...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">UX/UI</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">15%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        4/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Good</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      The Gradix AI application demonstrates strong UX/UI design with a focus...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">Business Viability</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">10%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        5/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Exemplary</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      Gradix AI demonstrates exemplary business viability with outstanding...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800 font-medium">Presentation</td>
                                    <td className="p-3 text-sm text-gray-600 text-center">10%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        4/5
                                      </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">Strong</td>
                                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                                      The presentation of the Gradix AI platform is strong, with a high-quality...
                                    </td>
                                    <td className="p-3 text-center">
                                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr className="bg-gray-50">
                                    <td className="p-3 text-sm font-medium text-gray-800">Total Score</td>
                                    <td className="p-3 text-sm font-medium text-gray-800 text-center">100%</td>
                                    <td className="p-3 text-center">
                                      <span className="inline-block px-4 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                                        88/100
                                      </span>
                                    </td>
                                    <td colSpan={3} className="p-3 text-sm font-medium text-gray-800">
                                      Overall: Excellent Performance
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
