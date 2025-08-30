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
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AgentsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const RobotIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

const GradixIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="#6b7280">
    <path d="M80 44.8153H51.4065L70.738 64.1467L64.3507 70.5288L44.6542 50.8322V78.8034H35.6338V51.1665L15.1196 71.6808L8.3209 64.8821L28.3826 44.8153H0V35.183H29.0255L9.4883 15.6458L15.8704 9.26372L35.6338 29.0374V1.19995H44.6542V28.5283L64.8804 8.30203L71.6791 15.1213L51.6174 35.183H80V44.8153Z" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const HistoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, isActive = false, onClick }: SidebarItemProps) => (
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
  const [isEditing, setIsEditing] = useState(false);
  const [editableFormData, setEditableFormData] = useState<FormData>({
    agentName: '',
    applicationType: '',
    rubricCriteria: '',
    rubrics: []
  });
  const [selectedResult, setSelectedResult] = useState<DetailedResult | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [selectedCandidateFilter, setSelectedCandidateFilter] = useState('All Candidates');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All Grades');
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
        rubricCriteria: 'Evaluate AI hackathon projects with comprehensive rubrics focusing on innovation, technical execution, and business viability',
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
      if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target as Node)) {
        setShowCandidateDropdown(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target as Node)) {
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
    const validFile = files.find(file => 
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

  const handleCompleteSetup = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    
    if (!formData) {
      alert('Form data is missing');
      return;
    }
    
    // Create agent object
    const newAgent = {
      id: Date.now().toString(),
      name: formData.agentName,
      description: formData.rubricCriteria.substring(0, 100) + '...',
      applicationType: formData.applicationType,
      rubricCriteria: formData.rubricCriteria,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      gradedFiles: Math.floor(Math.random() * 5) + 1, // Random for demo
      averageScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
    };

    // Add to in-memory store
    addAgent(newAgent);
    
    // Redirect to agents page
    router.push('/agents');
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
      const totalPercentage = editableFormData.rubrics.reduce((sum, rubric) => sum + rubric.percentage, 0);
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
    setEditableFormData(formData || {
      agentName: '',
      applicationType: '',
      rubricCriteria: '',
      rubrics: []
    });
    setIsEditing(false);
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditableFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRubricChange = (index: number, field: 'name' | 'percentage', value: string | number) => {
    setEditableFormData(prev => ({
      ...prev,
      rubrics: prev.rubrics?.map((rubric, i) => 
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
          description: 'Demonstrates creative and advanced use of technology to solve compliance challenges in SaaS',
          points: '18/20'
        },
        {
          name: 'Compliance Alignment',
          description: 'Strong understanding of healthcare compliance. Solution addresses relevant frameworks and regulatory gaps effectively.',
          points: '14/15'
        },
        {
          name: 'Feasibility',
          description: 'Implementation plan is realistic, with well-scoped timelines and practical resource requirements.',
          points: '18/20'
        },
        {
          name: 'Communication',
          description: 'Clearly structured proposal with excellent articulation of goals, approach, and impact.',
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

  // Debug logging
  console.log('Current modal state:', { showDetailModal, selectedResult: selectedResult?.name });

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
                <h1 className="text-xl lg:text-2xl font-medium text-gray-500">gradix.ai</h1>
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
                icon={<AnalyticsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Analytics"
                isActive={activeMenuItem === 'analytics'}
                onClick={() => setActiveMenuItem('analytics')}
              />
              <SidebarItem
                icon={<SettingsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Settings"
                isActive={activeMenuItem === 'settings'}
                onClick={() => setActiveMenuItem('settings')}
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
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-lg lg:text-xl font-medium text-gray-600">{formData?.agentName || 'Create New Agent'}</h2>
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
                        <div className="text-xs text-gray-600 mb-1">Agent Name</div>
                        {isEditing ? (
                          <Input
                            value={editableFormData.agentName}
                            onChange={(e) => handleEditInputChange('agentName', e.target.value)}
                            className="text-xs w-48 h-8"
                          />
                        ) : (
                          <div className="text-xs text-black font-medium">{formData.agentName}</div>
                        )}
                      </div>

                      {/* Application Type */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Application Type</div>
                        {isEditing ? (
                          <Input
                            value={editableFormData.applicationType}
                            onChange={(e) => handleEditInputChange('applicationType', e.target.value)}
                            className="text-xs w-48 h-8"
                          />
                        ) : (
                          <div className="text-xs text-black font-medium">{formData.applicationType}</div>
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
                      <div className="max-h-32 overflow-y-auto">
                        {isEditing ? (
                          <div className="space-y-2">
                            {editableFormData.rubrics?.map((rubric, index) => (
                              <div key={index} className="bg-[#f2f2f2] rounded-md p-3">
                                <div className="flex items-center gap-3">
                                  <Input
                                    value={rubric.name}
                                    onChange={(e) => handleRubricChange(index, 'name', e.target.value)}
                                    placeholder="Rubric name"
                                    className="text-sm flex-1"
                                  />
                                  <Input
                                    type="number"
                                    value={rubric.percentage}
                                    onChange={(e) => handleRubricChange(index, 'percentage', parseInt(e.target.value) || 0)}
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
                              { name: 'Innovation & Creativity', percentage: 30 },
                              { name: 'Technical Execution', percentage: 25 },
                              { name: 'Real-world Impact', percentage: 25 },
                              { name: 'Presentation Quality', percentage: 20 }
                            ];
                            
                            return (
                              <div className="grid grid-cols-2 gap-2">
                                {rubrics.map((rubric, index) => (
                                  <div key={index} className="bg-[#f2f2f2] rounded-md p-3 flex justify-between">
                                    <span className="text-sm">{rubric.name}</span>
                                    <span className="text-sm font-medium">{rubric.percentage}%</span>
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
                      <div className="text-sm text-[rgba(0,0,0,0.8)] font-light mb-3">Grading Instructions</div>
                      {isEditing ? (
                        <Textarea
                          value={editableFormData.rubricCriteria}
                          onChange={(e) => handleEditInputChange('rubricCriteria', e.target.value)}
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
                                <button className="bg-white px-3 py-1.5 rounded-md shadow-sm text-xs font-medium">
                                  Upload File
                                </button>
                                <button className="px-3 py-1.5 rounded-md text-xs text-gray-600">
                                  API Key
                                </button>
                              </div>
                            </div>

                            {/* Upload Area */}
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
                                {selectedFile ? selectedFile.name : 'Click or drag and drop to upload'}
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
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-between pt-3">
                          <Button
                            variant="outline"
                            onClick={handleBack}
                            className="px-4 py-2 text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                          >
                            Back
                          </Button>
                          
                          <Button
                            onClick={handleCompleteSetup}
                            className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800"
                          >
                            Start Grading
                          </Button>
                        </div>

                        {/* What happens next section */}
                        <Card className="bg-gray-50 border border-gray-200">
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-black mb-3">What happens next?</h3>
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
                                Grading will be performed based on agent instructions
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
                                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                  </div>
                                  <span className="text-sm text-[rgba(0,0,0,0.7)]">Total Applications</span>
                                </div>
                                <div className="text-3xl font-light text-black">20</div>
                              </CardContent>
                            </Card>

                            <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z"/>
                                    </svg>
                                  </div>
                                  <span className="text-sm text-[rgba(0,0,0,0.7)]">Highest Score</span>
                                </div>
                                <div className="text-3xl font-light text-black">92</div>
                              </CardContent>
                            </Card>

                            <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                    </svg>
                                  </div>
                                  <span className="text-sm text-[rgba(0,0,0,0.7)]">Lowest Score</span>
                                </div>
                                <div className="text-3xl font-light text-black">48</div>
                              </CardContent>
                            </Card>

                            <Card className="bg-white border-[0.6px] border-[rgba(0,0,0,0.4)]">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    </svg>
                                  </div>
                                  <span className="text-sm text-[rgba(0,0,0,0.7)]">Average Score</span>
                                </div>
                                <div className="text-3xl font-light text-black">78.5%</div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Results Section */}
                          <div className="bg-white rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.2)] overflow-hidden">
                            {/* Results Header */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-6">
                                  <div className="bg-[#eeeeee] p-1 rounded-2xl flex border-[0.6px] border-[rgba(0,0,0,0.8)]">
                                    <button 
                                      onClick={() => setActiveTab('logs')}
                                      className={`px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                                        activeTab === 'logs' 
                                          ? 'bg-white text-black shadow-[0px_0px_10px_1px_rgba(0,0,0,0.15)] border border-[rgba(0,0,0,0.1)]'
                                          : 'text-[rgba(0,0,0,0.7)] hover:bg-gray-100'
                                      }`}
                                    >
                                      All Evaluation Results
                                    </button>
                                    <button 
                                      onClick={() => setActiveTab('analytics')}
                                      className={`px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                                        activeTab === 'analytics' 
                                          ? 'bg-white text-black shadow-[0px_0px_10px_1px_rgba(0,0,0,0.15)] border border-[rgba(0,0,0,0.1)]'
                                          : 'text-[rgba(0,0,0,0.7)] hover:bg-gray-100'
                                      }`}
                                    >
                                      Analytics
                                    </button>
                                  </div>
                                </div>
                                <button className="flex items-center gap-2 border-[0.8px] border-[rgba(0,0,0,0.8)] bg-white hover:bg-gray-50 text-black font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
                                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Export Results
                                </button>
                              </div>

                              {/* Search and Filters */}
                              <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.2)]">
                                <div className="flex-1 max-w-[620px]">
                                  <div className="relative">
                                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgba(0,0,0,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <Input
                                      placeholder="Select by name or email"
                                      className="pl-12 h-10 border-[0.8px] border-[rgba(0,0,0,0.8)] text-sm placeholder:text-[rgba(0,0,0,0.6)] bg-white text-black"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-3 ml-4">
                                  {/* Candidate Filter Dropdown */}
                                  <div className="relative" ref={candidateDropdownRef}>
                                    <button 
                                      onClick={() => setShowCandidateDropdown(!showCandidateDropdown)}
                                      className="flex items-center gap-2 border-[0.8px] border-[rgba(0,0,0,0.8)] bg-white hover:bg-gray-50 text-sm text-black font-medium px-4 py-2 rounded-md shadow-sm transition-colors"
                                    >
                                      {selectedCandidateFilter}
                                      <svg className={`w-3.5 h-3.5 text-black transition-transform ${showCandidateDropdown ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {showCandidateDropdown && (
                                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border-[0.8px] border-[rgba(0,0,0,0.8)] rounded-md shadow-lg z-10">
                                        {candidateFilterOptions.map((option) => (
                                          <button
                                            key={option}
                                            onClick={() => handleCandidateFilterSelect(option)}
                                            className={`w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors ${
                                              selectedCandidateFilter === option ? 'bg-gray-100 font-medium text-black' : 'text-black'
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
                                  <div className="relative" ref={gradeDropdownRef}>
                                    <button 
                                      onClick={() => setShowGradeDropdown(!showGradeDropdown)}
                                      className="flex items-center gap-2 border-[0.8px] border-[rgba(0,0,0,0.8)] bg-white hover:bg-gray-50 text-sm text-black font-medium px-4 py-2 rounded-md shadow-sm transition-colors"
                                    >
                                      {selectedGradeFilter}
                                      <svg className={`w-3.5 h-3.5 text-black transition-transform ${showGradeDropdown ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {showGradeDropdown && (
                                      <div className="absolute top-full right-0 mt-2 w-48 bg-white border-[0.8px] border-[rgba(0,0,0,0.8)] rounded-md shadow-lg z-10">
                                        {gradeFilterOptions.map((option) => (
                                          <button
                                            key={option}
                                            onClick={() => handleGradeFilterSelect(option)}
                                            className={`w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors ${
                                              selectedGradeFilter === option ? 'bg-gray-100 font-medium text-black' : 'text-black'
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

                              {activeTab === 'logs' && <h3 className="text-xl font-normal text-black mb-4">Results (20)</h3>}
                            </div>

                            {/* Analytics Content */}
                            {activeTab === 'analytics' && (
                              <div className="px-6 pb-6">
                                {/* Charts Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                  {/* Score Distribution Chart */}
                                  <div className="bg-white border-[0.8px] border-[rgba(0,0,0,0.2)] rounded-[10px] p-6">
                                    <h3 className="text-xl font-medium text-black mb-6">Score Distribution</h3>
                                    
                                    {/* Chart Container */}
                                    <div className="relative">
                                      {/* Y-axis labels */}
                                      <div className="absolute left-0 h-64 flex flex-col justify-between text-sm text-[rgba(0,0,0,0.8)] py-2">
                                        <span>60</span>
                                        <span>45</span>
                                        <span>30</span>
                                        <span>15</span>
                                        <span>0</span>
                                      </div>
                                      
                                      {/* Chart area */}
                                      <div className="ml-8 relative">
                                        {/* Grid lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between">
                                          {[...Array(5)].map((_, i) => (
                                            <div key={i} className="border-t border-gray-200"></div>
                                          ))}
                                        </div>
                                        
                                        {/* Bars */}
                                        <div className="flex items-end justify-between h-64 px-4">
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '53px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">90-100</span>
                                          </div>
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '86px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">80-89</span>
                                          </div>
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '229px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">70-79</span>
                                          </div>
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '32px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">60-69</span>
                                          </div>
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '16px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">50-59</span>
                                          </div>
                                          <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 w-12 rounded-t-lg mb-2" style={{ height: '8px' }}></div>
                                            <span className="text-sm text-[rgba(0,0,0,0.8)] transform -rotate-0">40-49</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Average Performance by Criteria */}
                                  <div className="bg-white border-[0.8px] border-[rgba(0,0,0,0.2)] rounded-[10px] p-6">
                                    <h3 className="text-xl font-medium text-black mb-6">Average Performance by Criteria</h3>
                                    
                                    <div className="space-y-4">
                                      {/* Technical Skills */}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-black font-medium w-32">Technical Skills</span>
                                        <div className="flex-1 mx-4">
                                          <div className="bg-gray-200 h-3 rounded">
                                            <div className="bg-blue-500 h-3 rounded" style={{ width: '84.3%' }}></div>
                                          </div>
                                        </div>
                                        <span className="text-sm text-black w-16 text-right">84.3% avg</span>
                                      </div>
                                      
                                      {/* Communication */}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-black font-medium w-32">Communication</span>
                                        <div className="flex-1 mx-4">
                                          <div className="bg-gray-200 h-3 rounded">
                                            <div className="bg-blue-500 h-3 rounded" style={{ width: '86.2%' }}></div>
                                          </div>
                                        </div>
                                        <span className="text-sm text-black w-16 text-right">86.2% avg</span>
                                      </div>
                                      
                                      {/* Academic Performance */}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-black font-medium w-32">Academic Performance</span>
                                        <div className="flex-1 mx-4">
                                          <div className="bg-gray-200 h-3 rounded">
                                            <div className="bg-blue-500 h-3 rounded" style={{ width: '83.1%' }}></div>
                                          </div>
                                        </div>
                                        <span className="text-sm text-black w-16 text-right">83.1% avg</span>
                                      </div>
                                      
                                      {/* Work Experience */}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-black font-medium w-32">Work Experience</span>
                                        <div className="flex-1 mx-4">
                                          <div className="bg-gray-200 h-3 rounded">
                                            <div className="bg-blue-500 h-3 rounded" style={{ width: '84.4%' }}></div>
                                          </div>
                                        </div>
                                        <span className="text-sm text-black w-16 text-right">84.4% avg</span>
                                      </div>
                                      
                                      {/* Cultural Fit */}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-black font-medium w-32">Cultural Fit</span>
                                        <div className="flex-1 mx-4">
                                          <div className="bg-gray-200 h-3 rounded">
                                            <div className="bg-blue-500 h-3 rounded" style={{ width: '85.0%' }}></div>
                                          </div>
                                        </div>
                                        <span className="text-sm text-black w-16 text-right">85.0% avg</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Results List */}
                            {activeTab === 'logs' && (
                              <div className="px-6 pb-6 space-y-3">
                                {/* Result Entry 1 - Sanjana Mehta */}
                              <div 
                                className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => handleResultClick('Sanjana Mehta')}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">1</div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">Sanjana Mehta</div>
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
                                    <div className="text-xl font-semibold text-black">92%</div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">Excellent</div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 2 - Rohan Varma */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">2</div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">Rohan Varma</div>
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
                                    <div className="text-xl font-semibold text-black">87%</div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">Good</div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 3 - Alina Das */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">3</div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">Alina Das</div>
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
                                    <div className="text-xl font-semibold text-black">86%</div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">Good</div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 4 - Amit Rajan */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">4</div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">Amit Rajan</div>
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
                                    <div className="text-xl font-semibold text-black">82%</div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">Good</div>
                                  </div>
                                </div>
                              </div>

                              {/* Result Entry 5 - Priya Sinha */}
                              <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.4)] rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-black font-medium">5</div>
                                    <div>
                                      <div className="font-medium text-sm text-black mb-2">Priya Sinha</div>
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
                                    <div className="text-xl font-semibold text-black">70%</div>
                                    <div className="text-xs text-[rgba(0,0,0,0.6)] mt-1">Good</div>
                                  </div>
                                </div>
                              </div>
                              </div>
                            )}
                            </div>
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
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl font-medium text-black">{selectedResult.name}</h2>
                  <p className="text-sm text-[rgba(0,0,0,0.6)]">{selectedResult.email}</p>
                </div>
              </div>
              <button 
                onClick={handleCloseDetail}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Evaluation Results</h3>
                
                {/* Criteria Table */}
                <div className="bg-[#f9f9f9] rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#eeeeee]">
                        <th className="text-left p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">Criteria</th>
                        <th className="text-left p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">Description</th>
                        <th className="text-right p-4 text-sm font-medium text-[rgba(0,0,0,0.8)]">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResult.criteria.map((criterion, index) => (
                        <tr key={index} className="border-t border-[rgba(0,0,0,0.1)]">
                          <td className="p-4 text-sm text-black font-medium">{criterion.name}</td>
                          <td className="p-4 text-sm text-black">{criterion.description}</td>
                          <td className="p-4 text-sm text-black font-medium text-right">{criterion.points}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[rgba(0,0,0,0.2)] bg-[#f2f2f2]">
                        <td className="p-4 text-sm font-medium text-black">TOTAL</td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm font-medium text-black text-right">{selectedResult.totalScore}/100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Score and Grade */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-light text-black mb-2">{selectedResult.totalScore}%</div>
                    <div className="text-sm text-[rgba(0,0,0,0.6)]">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-medium text-black mb-2">{selectedResult.grade}</div>
                    <div className="text-sm text-[rgba(0,0,0,0.6)]">Grade</div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div>
                  <h4 className="text-base font-medium text-black mb-3">Key Strengths</h4>
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
    </>
  );
}