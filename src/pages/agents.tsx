import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

const CoinsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RobotIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);



const TemplateIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CustomIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
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

export default function AgentsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('agents');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <Head>
        <title>AI Agents - Gradix</title>
        <meta name="description" content="Manage your AI grading agents" />
      </Head>
      
      <div className="min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-[#efeded] border-r border-gray-400 lg:min-h-screen">
            {/* Header */}
            <div className="p-4 lg:p-8 border-b border-gray-400">
              <div className="flex items-center gap-3 mb-4 lg:mb-8">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#bcbcbc] rounded-md flex items-center justify-center">
                  <RobotIcon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-black">AI Grader</h1>
              </div>
              
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-black text-white py-2 lg:py-3 px-4 rounded-lg hover:bg-gray-800 text-sm lg:text-base" 
                size="lg"
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
                onClick={() => setActiveMenuItem('settings')}
              />
            </nav>

          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-8 border-b border-gray-400 gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-black">All Agents</h2>
              
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

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] lg:min-h-[500px] p-4 lg:p-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <RobotIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
              </div>
              
              <h3 className="text-lg lg:text-xl font-medium text-gray-800 mb-3 text-center">
                No AI Agents Created Yet
              </h3>
              
              <p className="text-gray-600 text-center max-w-sm lg:max-w-md mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                Get started by creating your first AI agent to automate your grading workflow.
              </p>
              
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-black text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg hover:bg-gray-800 text-sm lg:text-base" 
                size="lg"
              >
                <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                Create Agent
              </Button>
            </div>
          </div>
        </div>

        {/* Create New Agent Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="bg-[#f2f2f2] rounded-2xl p-6 pb-12 max-w-[906px] h-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed">
            {/* Custom Close Button */}
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 w-[30px] h-[30px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5"></circle>
                <path d="M15 9l-6 6" strokeWidth="1.5"></path>
                <path d="M9 9l6 6" strokeWidth="1.5"></path>
              </svg>
            </button>
            
            <DialogHeader className="mb-6 pr-8">
              <DialogTitle className="text-2xl font-normal text-black mb-2 text-left">Create New Agent</DialogTitle>
              <DialogDescription className="text-base text-[rgba(0,0,0,0.7)] text-left">
                Choose how you'd like to create your AI grading agent
              </DialogDescription>
            </DialogHeader>

            {/* Modal Content */}
            <div className="grid grid-cols-2 gap-6">
              {/* Start from Scratch */}
              <Card className="bg-white h-[254px] w-full rounded-2xl border-[0.6px] border-[rgba(0,0,0,0.4)] hover:border-gray-400 transition-all cursor-pointer group">
                <CardContent className="flex flex-col items-center text-center p-8 h-full justify-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                    <CustomIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-lg font-normal text-black mb-4">Start from Scratch</CardTitle>
                  <CardDescription className="text-sm text-[rgba(0,0,0,0.7)] mb-6 leading-normal px-4">
                    Build a completely custom agent with your own grading criteria and rules.
                  </CardDescription>
                  <Badge variant="outline" className="h-[18px] rounded-[10px] border-[0.4px] border-[rgba(0,0,0,0.3)] bg-transparent text-[11px] text-[rgba(0,0,0,0.8)] font-light px-4">
                    Full Customization
                  </Badge>
                </CardContent>
              </Card>

              {/* Agent Templates */}
              <Card className="bg-white h-[254px] w-full rounded-2xl border-[0.6px] border-[rgba(0,0,0,0.4)] opacity-60 cursor-not-allowed relative">
                <CardContent className="flex flex-col items-center text-center p-8 h-full justify-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <TemplateIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg font-normal text-gray-600 mb-4">Agent Templates</CardTitle>
                  <CardDescription className="text-sm text-[rgba(0,0,0,0.5)] mb-6 leading-normal px-4">
                    Start with a pre-configured template and customize it to your needs.
                  </CardDescription>
                  <Badge variant="outline" className="h-[18px] rounded-[10px] border-[0.4px] border-[rgba(0,0,0,0.3)] bg-gray-100 text-[11px] text-[rgba(0,0,0,0.6)] font-light px-4">
                    Coming Soon
                  </Badge>
                </CardContent>
                {/* Overlay to prevent clicks */}
                <div className="absolute inset-0 bg-transparent"></div>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}