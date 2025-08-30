import { useState, useEffect } from 'react';
import { agentTemplates } from '@/data/templates';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Temporary icons as React components to replace localhost URLs
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

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DotsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
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

interface Agent {
  id: string;
  name: string;
  description: string;
  applicationType: string;
  rubricCriteria: string;
  createdAt: string;
  lastUsed: string;
  gradedFiles: number;
  averageScore: number;
  isTemplate?: boolean;
}

// In-memory storage for agents
let agentsStore: Agent[] = [];

// Function to add agent to store
export const addAgent = (agent: Agent) => {
  agentsStore.push(agent);
};

// Function to get all agents
export const getAllAgents = () => [...agentsStore];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  });
}

function formatLastUsed(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export default function AgentsPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('agents');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Add template agents to the store if not already present
    const templateAgents: Agent[] = agentTemplates.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      applicationType: template.applicationType,
      rubricCriteria: template.rubricCriteria,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      gradedFiles: 0,
      averageScore: 0,
      isTemplate: true
    }));
    
    // Add templates to store if not already present
    templateAgents.forEach(templateAgent => {
      if (!agentsStore.find(agent => agent.id === templateAgent.id)) {
        agentsStore.push(templateAgent);
      }
    });
    
    setAgents([...agentsStore]);
  }, []);

  const handleCreateAgent = () => {
    router.push('/create-agent');
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgentClick = (agent: Agent) => {
    if (agent.isTemplate) {
      // For templates, go directly to upload page with pre-filled data
      router.push(`/upload-data?template=${agent.id}`);
    } else {
      // For user-created agents, could open details or go to upload
      router.push(`/upload-data?agent=${agent.id}`);
    }
  };

  return (
    <>
      <Head>
        <title>AI Agents - Gradix</title>
        <meta name="description" content="Manage your AI grading agents" />
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
                onClick={() => setActiveMenuItem('agents')}
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
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgba(0,0,0,0.4)]" />
                  <Input
                    type="text"
                    placeholder="Search agents"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-[0.4px] border-[rgba(0,0,0,0.6)] text-sm placeholder:text-[rgba(0,0,0,0.4)]"
                  />
                </div>
                <Button
                  onClick={handleCreateAgent}
                  className="bg-gray-100 text-gray-600 px-6 py-2 rounded-md hover:bg-gray-200 text-sm font-medium h-11 border border-gray-300"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Agent
                </Button>
              </div>
            </div>

            {/* Agents Grid */}
            <div className="p-4 lg:p-8">
              {filteredAgents.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px]">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <RobotIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-medium text-gray-800 mb-3 text-center">
                    No AI Agents Found
                  </h3>
                  
                  <p className="text-gray-600 text-center max-w-sm lg:max-w-md mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first AI agent to automate your grading workflow.'}
                  </p>
                  
                  {!searchTerm && (
                    <Button 
                      onClick={handleCreateAgent}
                      className="bg-black text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg hover:bg-gray-800 text-sm lg:text-base" 
                      size="lg"
                    >
                      <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                      Create Agent
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start justify-items-start">
                  {filteredAgents.map((agent) => (
                    <Card 
                      key={agent.id} 
                      className="bg-white border-[0.4px] border-[rgba(0,0,0,0.3)] h-[180px] w-full relative cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleAgentClick(agent)}
                    >
                      <CardContent className="p-4 h-full flex flex-col">
                        {/* Header with icon and menu */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                              <RobotIcon className="w-2.5 h-2.5 text-gray-500" />
                            </div>
                            {agent.isTemplate && (
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                                Template
                              </span>
                            )}
                          </div>
                          <button 
                            className="text-gray-300 hover:text-gray-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DotsIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Agent name */}
                        <div className="mb-3 flex-1 min-h-0">
                          <h3 className="text-sm font-medium text-black leading-tight">{agent.name}</h3>
                        </div>

                        {/* Stats grid */}
                        <div className="space-y-1 text-xs mt-auto">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Created:</span>
                            <span className="text-black font-medium">{formatDate(agent.createdAt)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Last used:</span>
                            <span className="text-black font-medium">{formatLastUsed(agent.lastUsed)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Files:</span>
                            <span className="text-black font-medium">{agent.gradedFiles}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Score:</span>
                            <span className="text-black font-medium">{agent.averageScore}/100</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}