import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  <svg className={className} viewBox="0 0 80 80" fill="#131313">
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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
    className={`flex items-center gap-2 lg:gap-3 w-full px-3 lg:px-6 py-2 lg:py-3 rounded-lg text-left transition-colors ${
      isActive 
        ? 'bg-[rgba(179,173,173,0.4)] text-gray-700' 
        : 'text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon}
    <span className="font-medium text-sm lg:text-base">{label}</span>
  </button>
);

interface FormData {
  agentName: string;
  applicationType: string;
  rubricCriteria: string;
}

interface GradingLog {
  id: string;
  fileName: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed';
  score?: number;
  results?: string;
}

export default function CreateAgentUnifiedPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('agents');
  const [activeTab, setActiveTab] = useState('agent-info');
  const [formData, setFormData] = useState<FormData>({
    agentName: '',
    applicationType: '',
    rubricCriteria: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gradingLogs, setGradingLogs] = useState<GradingLog[]>([]);
  const [isAgentCreated, setIsAgentCreated] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  const validateAgentForm = () => {
    if (!formData.agentName.trim()) {
      alert('Please enter an agent name');
      return false;
    }
    if (!formData.applicationType.trim()) {
      alert('Please enter an application type');
      return false;
    }
    if (!formData.rubricCriteria.trim()) {
      alert('Please enter rubric/grading instructions');
      return false;
    }
    return true;
  };

  const handleCreateAgent = () => {
    if (!validateAgentForm()) return;
    
    setIsAgentCreated(true);
    setActiveTab('setup');
  };

  const handleProcessFile = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    
    // Create new grading log
    const newLog: GradingLog = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      uploadedAt: new Date().toISOString(),
      status: 'processing'
    };
    
    setGradingLogs(prev => [newLog, ...prev]);
    setActiveTab('grading-logs');
    
    // Simulate processing
    setTimeout(() => {
      setGradingLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? { ...log, status: 'completed', score: Math.floor(Math.random() * 20) + 80, results: 'File processed successfully with detailed feedback.' }
          : log
      ));
    }, 3000);
  };

  const handleSaveAgent = () => {
    if (!validateAgentForm()) return;
    
    // Create agent object
    const newAgent = {
      id: Date.now().toString(),
      name: formData.agentName,
      description: formData.rubricCriteria.substring(0, 100) + '...',
      applicationType: formData.applicationType,
      rubricCriteria: formData.rubricCriteria,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      gradedFiles: gradingLogs.filter(log => log.status === 'completed').length,
      averageScore: gradingLogs.length > 0 
        ? Math.round(gradingLogs.filter(log => log.score).reduce((acc, log) => acc + (log.score || 0), 0) / gradingLogs.filter(log => log.score).length)
        : Math.floor(Math.random() * 20) + 80,
    };

    // Save to localStorage
    const existingAgents = JSON.parse(localStorage.getItem('agents') || '[]');
    existingAgents.push(newAgent);
    localStorage.setItem('agents', JSON.stringify(existingAgents));
    
    // Redirect to agents page
    router.push('/agents');
  };

  const handleCancel = () => {
    router.push('/agents');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Head>
        <title>Create New Agent - Gradix</title>
        <meta name="description" content="Create and manage your AI grading agent" />
      </Head>
      
      <div className="min-h-screen bg-[#f9f9f9]">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-[#efeded] border-r border-gray-400 lg:min-h-screen">
            {/* Header */}
            <div className="p-4 lg:p-8 border-b border-gray-400">
              <div className="flex items-center gap-1 mb-4 lg:mb-8">
                <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center">
                  <GradixIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-black">gradix.ai</h1>
              </div>
              
              <Button 
                className="w-full bg-black text-white py-2 lg:py-3 px-4 rounded-lg hover:bg-gray-800 text-sm lg:text-base" 
                size="lg"
                onClick={() => router.push('/create-agent-unified')}
              >
                <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                Create Agent
              </Button>
            </div>

            {/* Navigation */}
            <nav className="p-3 lg:p-6 space-y-2">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-8 border-b border-gray-400 gap-4 bg-white">
              <div className="flex items-center gap-4">
                <h2 className="text-xl lg:text-2xl font-bold text-black">Create New Agent</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-[rgba(0,0,0,0.4)]"
                  >
                    <HistoryIcon className="w-4 h-4" />
                    Version History
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#bfbfbf] rounded-lg flex items-center justify-center">
                  <UserIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-black text-sm lg:text-base">John Doe</div>
                  <div className="text-xs lg:text-sm text-gray-600">john@company.com</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
              {/* Tab Navigation */}
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-[#eeeeee] p-1 rounded-2xl border-[0.2px] border-[rgba(0,0,0,0.6)]">
                    <TabsTrigger 
                      value="agent-info" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl relative"
                    >
                      Agent Info
                      {isAgentCreated && (
                        <CheckIcon className="w-4 h-4 text-green-600 absolute -top-1 -right-1" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="setup" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl"
                      disabled={!isAgentCreated}
                    >
                      Setup
                    </TabsTrigger>
                    <TabsTrigger 
                      value="grading-logs" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl"
                      disabled={!isAgentCreated}
                    >
                      Grading Logs
                    </TabsTrigger>
                  </TabsList>

                  {/* Agent Information Tab */}
                  <TabsContent value="agent-info" className="space-y-6 mt-6">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-[#f2f2f2] rounded-2xl p-8 space-y-6">
                        {/* Agent Name */}
                        <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] shadow-[0px_0px_6px_1px_rgba(0,0,0,0.06)]">
                          <CardContent className="p-6">
                            <Label htmlFor="agentName" className="text-base text-[rgba(0,0,0,0.8)] font-medium">
                              Agent Name*
                            </Label>
                            <Input
                              id="agentName"
                              value={formData.agentName}
                              onChange={(e) => handleInputChange('agentName', e.target.value)}
                              placeholder="e.g., AI Hackathon Judge Agent"
                              className="mt-4 h-12 border-[0.4px] border-[rgba(0,0,0,0.5)] text-base placeholder:text-[rgba(0,0,0,0.4)]"
                            />
                          </CardContent>
                        </Card>

                        {/* Application Type */}
                        <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] shadow-[0px_0px_6px_1px_rgba(0,0,0,0.06)]">
                          <CardContent className="p-6">
                            <Label htmlFor="applicationType" className="text-base text-[rgba(0,0,0,0.8)] font-medium">
                              Application Type*
                            </Label>
                            <p className="text-xs text-[rgba(0,0,0,0.8)] mt-2 mb-4">
                              What type of applications are you grading?
                            </p>
                            <Input
                              id="applicationType"
                              value={formData.applicationType}
                              onChange={(e) => handleInputChange('applicationType', e.target.value)}
                              placeholder="e.g., AI/ML Hackathon Projects"
                              className="h-12 border-[0.4px] border-[rgba(0,0,0,0.6)] text-base placeholder:text-[rgba(0,0,0,0.4)]"
                            />
                          </CardContent>
                        </Card>

                        {/* Rubric Criteria */}
                        <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] shadow-[0px_0px_6px_1px_rgba(0,0,0,0.06)]">
                          <CardContent className="p-6">
                            <Label htmlFor="rubricCriteria" className="text-base text-[rgba(0,0,0,0.8)] font-medium">
                              Rubric / Grading Instructions*
                            </Label>
                            <p className="text-xs text-[rgba(0,0,0,0.8)] mt-2 mb-4">
                              Define your grading criteria and instructions
                            </p>
                            
                            <Textarea
                              id="rubricCriteria"
                              value={formData.rubricCriteria}
                              onChange={(e) => handleInputChange('rubricCriteria', e.target.value)}
                              placeholder="e.g., Evaluate AI hackathon projects based on:&#10;– Innovation and creativity in AI/ML implementation&#10;– Technical execution and code quality&#10;– Real-world impact and practical applications&#10;– Presentation clarity and demo effectiveness&#10;– Use of cutting-edge AI technologies"
                              className="h-32 border-[0.4px] border-[rgba(0,0,0,0.6)] text-sm placeholder:text-[rgba(0,0,0,0.4)] resize-none"
                            />
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-between pt-4">
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="px-6 py-2 border-[0.6px] border-[rgba(0,0,0,0.4)] bg-transparent text-black hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          
                          <Button
                            onClick={handleCreateAgent}
                            className="px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 border-[0.6px] border-[rgba(0,0,0,0.4)]"
                          >
                            Create Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Setup Tab */}
                  <TabsContent value="setup" className="space-y-6 mt-6">
                    <div className="flex gap-8">
                      {/* Agent Information Sidebar */}
                      <Card className="w-[378px] bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] flex-shrink-0">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-black">Agent Information</h3>
                            <button onClick={() => setActiveTab('agent-info')}>
                              <EditIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-[rgba(0,0,0,0.8)] font-light">Agent Name</div>
                              <div className="text-sm text-black font-medium">{formData.agentName}</div>
                            </div>

                            <div>
                              <div className="text-sm text-[rgba(0,0,0,0.8)] font-light">Application Type</div>
                              <div className="text-sm text-black font-medium">{formData.applicationType}</div>
                            </div>

                            <div>
                              <div className="text-sm text-[rgba(0,0,0,0.8)] font-light mb-2">Rubrics</div>
                              <div className="space-y-2">
                                <div className="bg-[#f2f2f2] rounded-md p-3 flex justify-between">
                                  <span className="text-sm">Innovation & Creativity</span>
                                  <span className="text-sm font-medium">30%</span>
                                </div>
                                <div className="bg-[#f2f2f2] rounded-md p-3 flex justify-between">
                                  <span className="text-sm">Technical Execution</span>
                                  <span className="text-sm font-medium">25%</span>
                                </div>
                                <div className="bg-[#f2f2f2] rounded-md p-3 flex justify-between">
                                  <span className="text-sm">Real-world Impact</span>
                                  <span className="text-sm font-medium">25%</span>
                                </div>
                                <div className="bg-[#f2f2f2] rounded-md p-3 flex justify-between">
                                  <span className="text-sm">Presentation Quality</span>
                                  <span className="text-sm font-medium">20%</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-[rgba(0,0,0,0.8)] font-light mb-2">Grading Instructions</div>
                              <div className="bg-[#f2f2f2] rounded-md p-3">
                                <p className="text-sm text-black leading-relaxed">
                                  {formData.rubricCriteria}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Upload Section */}
                      <div className="flex-1">
                        {/* Upload File Section */}
                        <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] shadow-[0px_0px_6px_1px_rgba(0,0,0,0.06)] mb-6">
                          <CardContent className="p-6">
                            {/* Upload Tabs */}
                            <div className="mb-6">
                              <div className="flex gap-2 bg-[#eeeeee] p-1 rounded-2xl w-fit">
                                <button className="bg-white px-4 py-2 rounded-xl shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] text-sm font-medium">
                                  Upload File
                                </button>
                                <button className="px-4 py-2 rounded-xl text-sm text-[rgba(0,0,0,0.7)]">
                                  API Key
                                </button>
                              </div>
                            </div>

                            {/* Upload Area */}
                            <div
                              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                                isDragging 
                                  ? 'border-blue-400 bg-blue-50' 
                                  : 'border-[rgba(0,0,0,0.6)] bg-[#f9f9f9]'
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
                              
                              <div className="mb-4">
                                <div className="w-14 h-14 bg-[#bcbcbc] rounded-full flex items-center justify-center mx-auto">
                                  <UploadIcon className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-medium text-black mb-2">
                                {selectedFile ? selectedFile.name : 'Click or drag and drop to upload'}
                              </h3>
                              <p className="text-sm text-[rgba(0,0,0,0.6)] mb-4">
                                Upload from CSV, XLSV, Google Sheets
                              </p>
                              
                              <div className="flex gap-4 justify-center">
                                <Button 
                                  variant="outline" 
                                  onClick={handleUploadClick}
                                  className="border-[rgba(0,0,0,0.4)]"
                                >
                                  Choose File
                                </Button>
                                {selectedFile && (
                                  <Button 
                                    onClick={handleProcessFile}
                                    className="bg-neutral-900 text-white hover:bg-neutral-800"
                                  >
                                    Process File
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* What happens next section */}
                        <Card className="bg-[#f2f2f2] border-[0.6px] border-[rgba(0,0,0,0.2)]">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-black mb-4">What happens next?</h3>
                            <ul className="space-y-3 text-sm text-black">
                              <li className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Your file will be securely uploaded and analyzed
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                AI will generate application type and rubrics
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Grading will be performed based on agent instructions
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Results will appear in your grading logs
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-between pt-6">
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="px-6 py-2 border-[0.6px] border-[rgba(0,0,0,0.4)] bg-transparent text-black hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          
                          <Button
                            onClick={handleSaveAgent}
                            className="px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 border-[0.6px] border-[rgba(0,0,0,0.4)]"
                          >
                            Save Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Grading Logs Tab */}
                  <TabsContent value="grading-logs" className="mt-6">
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)]">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-black mb-4">Grading History</h3>
                        
                        {gradingLogs.length === 0 ? (
                          <div className="text-center py-12">
                            <RobotIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No files processed yet. Upload a file in the Setup tab to begin grading.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {gradingLogs.map((log) => (
                              <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-black">{log.fileName}</h4>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    log.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    log.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <span>Uploaded: {formatDateTime(log.uploadedAt)}</span>
                                  {log.score && <span>Score: {log.score}/100</span>}
                                </div>
                                {log.results && (
                                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                    {log.results}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}