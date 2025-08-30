import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function CreateAgentPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('agents');
  const [formData, setFormData] = useState({
    agentName: '',
    applicationType: '',
    rubricCriteria: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (template: any) => {
    setFormData({
      agentName: template.name,
      applicationType: template.applicationType,
      rubricCriteria: template.rubricCriteria
    });
  };

  const handleCreateAgent = () => {
    // Validate required fields
    if (!formData.agentName.trim()) {
      alert('Please enter an agent name');
      return;
    }
    if (!formData.applicationType.trim()) {
      alert('Please enter an application type');
      return;
    }
    if (!formData.rubricCriteria.trim()) {
      alert('Please enter rubric/grading instructions');
      return;
    }

    // Navigate to upload step (form data will be managed in-memory)
    router.push('/upload-data');
  };

  const handleCancel = () => {
    router.push('/agents');
  };

  return (
    <>
      <Head>
        <title>Create New Agent - Gradix</title>
        <meta name="description" content="Create a new AI grading agent" />
      </Head>
      
      <div className="min-h-screen bg-white">
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
                onClick={() => router.push('/settings')}
              />
            </nav>

          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[#f9f9f9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center p-4 lg:p-8 gap-4 bg-white">
              <h2 className="text-lg lg:text-xl font-medium text-gray-600">Create New Agent</h2>
            </div>

            {/* Form Content */}
            <div className="p-4 lg:p-6">
              <div className="flex gap-6">
                {/* Left Column - Agent Creation Form */}
                <div className="flex-1">
                  <div className="bg-[#f8f9fa] rounded-xl p-6 space-y-4">
                    {/* Agent Name */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
                      <CardContent className="p-4">
                        <Label htmlFor="agentName" className="text-sm text-gray-700 font-medium">
                          Agent Name*
                        </Label>
                        <Input
                          id="agentName"
                          value={formData.agentName}
                          onChange={(e) => handleInputChange('agentName', e.target.value)}
                          placeholder="e.g., AI Hackathon Judge Agent"
                          className="mt-2 h-10 border-[0.4px] border-gray-300 text-sm placeholder:text-gray-400"
                        />
                      </CardContent>
                    </Card>

                    {/* Application Type */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
                      <CardContent className="p-4">
                        <Label htmlFor="applicationType" className="text-sm text-gray-700 font-medium">
                          Application Type*
                        </Label>
                        <p className="text-xs text-gray-600 mt-1 mb-2">
                          What type of applications are you grading?
                        </p>
                        <Input
                          id="applicationType"
                          value={formData.applicationType}
                          onChange={(e) => handleInputChange('applicationType', e.target.value)}
                          placeholder="e.g., AI/ML Hackathon Projects"
                          className="h-10 border-[0.4px] border-gray-300 text-sm placeholder:text-gray-400"
                        />
                      </CardContent>
                    </Card>

                    {/* Rubric Criteria */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] shadow-sm">
                      <CardContent className="p-4">
                        <Label htmlFor="rubricCriteria" className="text-sm text-gray-700 font-medium">
                          Rubric / Grading Instructions*
                        </Label>
                        <p className="text-xs text-gray-600 mt-1 mb-2">
                          Define your grading criteria and instructions
                        </p>
                        
                        <Textarea
                          id="rubricCriteria"
                          value={formData.rubricCriteria}
                          onChange={(e) => handleInputChange('rubricCriteria', e.target.value)}
                          placeholder="e.g., Evaluate AI hackathon projects based on:&#10;– Innovation and creativity in AI/ML implementation&#10;– Technical execution and code quality&#10;– Real-world impact and practical applications&#10;– Presentation clarity and demo effectiveness&#10;– Use of cutting-edge AI technologies"
                          className="h-24 border-[0.4px] border-gray-300 text-sm placeholder:text-gray-400 resize-none"
                        />
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-3">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        onClick={handleCreateAgent}
                        className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800"
                      >
                        Create Agent
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Templates */}
                <div className="w-80 flex-shrink-0">
                  <div className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)] rounded-xl p-4 shadow-sm">
                    <h3 className="text-base font-medium text-black mb-2">Sample Templates</h3>
                    <p className="text-xs text-gray-600 mb-4">
                      Get started quickly by using one of our pre-built templates
                    </p>
                    
                    <div className="space-y-3">
                      {agentTemplates.map((template) => (
                        <Card 
                          key={template.id} 
                          className="bg-gray-50 border-[0.4px] border-gray-200 cursor-pointer hover:shadow-sm transition-shadow"
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-xs font-medium text-black line-clamp-2">{template.name}</h4>
                              <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded ml-2">
                                Template
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">
                              {template.description}
                            </p>
                            <div className="space-y-0.5 mb-2">
                              <div className="text-[10px] text-gray-500">
                                <span className="font-medium">Type:</span> {template.applicationType}
                              </div>
                              <div className="text-[10px] text-gray-500">
                                <span className="font-medium">Rubrics:</span> {template.rubrics.length} criteria
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="w-full text-[10px] py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTemplateSelect(template);
                              }}
                            >
                              Use Template
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}