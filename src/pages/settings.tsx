import { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icon components
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

const GradixIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="#6b7280">
    <path d="M80 44.8153H51.4065L70.738 64.1467L64.3507 70.5288L44.6542 50.8322V78.8034H35.6338V51.1665L15.1196 71.6808L8.3209 64.8821L28.3826 44.8153H0V35.183H29.0255L9.4883 15.6458L15.8704 9.26372L35.6338 29.0374V1.19995H44.6542V28.5283L64.8804 8.30203L71.6791 15.1213L51.6174 35.183H80V44.8153Z" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
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

export default function SettingsPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('settings');
  const [activeTab, setActiveTab] = useState('api-settings');
  const [apiEnabled, setApiEnabled] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [testInputMethod, setTestInputMethod] = useState('text');
  const [testInput, setTestInput] = useState('');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [autoGrade, setAutoGrade] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample agents for dropdown
  const sampleAgents = [
    'AI Hackathon Judge Event',
    'AI Founder Event Registration', 
    'AI Startup Pitch Event Registration'
  ];

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('ak_rak7k••••••••••••••••••••••••ip5l');
    alert('API key copied to clipboard!');
  };

  const handleTestAgent = () => {
    if (!selectedAgent) {
      alert('Please select an agent to test');
      return;
    }
    if (testInputMethod === 'text' && !testInput.trim()) {
      alert('Please enter test data');
      return;
    }
    alert('Test started! Results will appear in the console.');
  };

  return (
    <>
      <Head>
        <title>Settings - Gradix</title>
        <meta name="description" content="Manage your Gradix settings" />
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
          <div className="flex-1 bg-[#f9f9f9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center p-4 lg:p-8 gap-4 bg-white">
              <h2 className="text-lg lg:text-xl font-medium text-gray-600">Settings</h2>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
              {/* Tab Navigation */}
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-[#eeeeee] p-1 rounded-2xl border-[0.2px] border-[rgba(0,0,0,0.6)]">
                    <TabsTrigger 
                      value="api-settings" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl relative"
                    >
                      API Settings
                    </TabsTrigger>
                    <TabsTrigger 
                      value="account" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-xl"
                    >
                      Account
                    </TabsTrigger>
                  </TabsList>

                  {/* API Settings Tab */}
                  <TabsContent value="api-settings" className="space-y-6 mt-6">
                    <div className="flex gap-8">
                      {/* API Configuration */}
                      <div className="flex-1">
                        <Card className="bg-white border border-gray-300">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-black mb-2">API Configuration</h3>
                            <p className="text-sm text-gray-700 mb-6">Manage your API key for external integrations with all agents</p>
                            
                            {/* API Access Toggle */}
                            <div className="bg-[#f6f6f6] rounded-lg p-4 mb-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-base font-medium text-black">API Access</h4>
                                  <p className="text-sm text-gray-700">Enable external integrations for all agents</p>
                                </div>
                                <button
                                  onClick={() => setApiEnabled(!apiEnabled)}
                                  className={`w-10 h-5 rounded-full transition-colors ${
                                    apiEnabled ? 'bg-black' : 'bg-gray-400'
                                  }`}
                                >
                                  <div className={`w-4 h-4 bg-gray-200 rounded-full border border-gray-600 transition-transform ${
                                    apiEnabled ? 'translate-x-5' : 'translate-x-0.5'
                                  }`}></div>
                                </button>
                              </div>
                            </div>

                            {/* API Key Section */}
                            <div className="bg-white border border-gray-300 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Label className="text-base text-gray-800">Global API Key</Label>
                                <InfoIcon className="w-4 h-4 text-gray-600" />
                              </div>
                              <p className="text-xs text-gray-600 mb-4">This key provides access to all your agents. Keep it secure.</p>
                              
                              <div className="flex gap-2">
                                <Input
                                  value="ak_rak7k••••••••••••••••••••••••ip5l"
                                  className="flex-1 border border-gray-600"
                                  readOnly
                                />
                                <Button
                                  onClick={handleCopyApiKey}
                                  className="px-3 border border-gray-400 bg-white hover:bg-gray-50"
                                >
                                  <CopyIcon className="w-4 h-4 text-black" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Test Agent Section */}
                        <Card className="bg-white border border-gray-300 mt-6">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-black mb-2">Test Agent</h3>
                            <p className="text-sm text-gray-700 mb-6">Test your agents with sample data. Limited to 10 sample records only.</p>
                            
                            {/* Agent Selection */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Label className="text-base text-gray-800">Select Agent to Test</Label>
                                <InfoIcon className="w-4 h-4 text-gray-600" />
                              </div>
                              <p className="text-sm text-gray-600 mb-4">Choose an agent to test</p>
                              
                              <div className="relative" ref={dropdownRef}>
                                <button
                                  onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                                  className="w-full h-12 px-4 border border-gray-600 rounded-md bg-white text-left flex items-center justify-between"
                                >
                                  <span className="text-gray-600">
                                    {selectedAgent || 'Choose an agent to test'}
                                  </span>
                                  <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                
                                {showAgentDropdown && (
                                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-600 rounded-md shadow-lg z-10">
                                    {sampleAgents.map((agent) => (
                                      <button
                                        key={agent}
                                        onClick={() => {
                                          setSelectedAgent(agent);
                                          setShowAgentDropdown(false);
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm"
                                      >
                                        {agent}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Test Input Method */}
                            <div className="mb-6">
                              <Label className="text-base text-gray-800 mb-4 block">Test Input Method</Label>
                              <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="testMethod"
                                    value="text"
                                    checked={testInputMethod === 'text'}
                                    onChange={(e) => setTestInputMethod(e.target.value)}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-xs text-black">Text Input</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="testMethod"
                                    value="file"
                                    checked={testInputMethod === 'file'}
                                    onChange={(e) => setTestInputMethod(e.target.value)}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-xs text-black">File Upload</span>
                                </label>
                              </div>
                            </div>

                            {/* Test Input Area */}
                            {testInputMethod === 'text' && (
                              <div className="mb-6">
                                <Textarea
                                  value={testInput}
                                  onChange={(e) => setTestInput(e.target.value)}
                                  placeholder="Enter your test data here. You can paste multiple entries separated by line breaks. Maximum 10 entries will be processed."
                                  className="h-28 border border-gray-600 text-sm resize-none"
                                />
                                <p className="text-xs text-gray-600 mt-2">Enter sample data for testing. Each line will be treated as a separate test case.</p>
                              </div>
                            )}

                            <Button
                              onClick={handleTestAgent}
                              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                            >
                              <PlayIcon className="w-4 h-4 mr-2" />
                              Test Agent
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Integration Examples */}
                      <div className="w-96">
                        <Card className="bg-[#f2f2f2] border border-gray-200">
                          <CardContent className="p-4">
                            <h4 className="text-base font-medium text-black mb-4">Integration Examples:</h4>
                            <ul className="space-y-3 text-sm text-black">
                              <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Connect with Zapier to auto-grade uploaded documents.
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Use with n8n for workflow automation
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                                Integrate with your existing systems via API
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Account Tab */}
                  <TabsContent value="account" className="space-y-6 mt-6">
                    <div className="flex gap-8">
                      {/* Account Settings */}
                      <div className="flex-1">
                        <Card className="bg-white border border-gray-300">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-black mb-2">Profile Information</h3>
                            <p className="text-sm text-gray-700 mb-6">Update your personal information and preferences</p>
                            
                            {/* Profile Photo Section */}
                            <div className="flex items-start gap-6 mb-6">
                              <div className="bg-[#f6f6f6] rounded-full w-21 h-21 flex items-center justify-center border border-gray-300">
                                <span className="text-sm font-medium text-black">JD</span>
                              </div>
                              <div>
                                <Button
                                  className="px-4 py-2 text-sm border border-gray-400 bg-white hover:bg-gray-50 text-black mb-2"
                                >
                                  📷 Upload Photo
                                </Button>
                                <p className="text-xs text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
                              </div>
                            </div>

                            {/* Profile Information Form */}
                            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label className="text-sm text-gray-800 font-medium mb-2 block">First Name</Label>
                                  <Input
                                    value="John"
                                    className="border border-gray-400"
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm text-gray-800 font-medium mb-2 block">Last Name</Label>
                                  <Input
                                    value="Doe"
                                    className="border border-gray-400"
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm text-gray-800 font-medium mb-2 block">Email Address</Label>
                                <Input
                                  value="john@example.com"
                                  className="border border-gray-400"
                                  readOnly
                                />
                              </div>
                            </div>

                            {/* Preferences Section */}
                            <div className="border-t border-gray-300 pt-6">
                              <h4 className="text-base font-medium text-gray-800 mb-4">Preferences</h4>
                              
                              <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-6">
                                {/* Email Notifications */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium text-black">Email Notifications</div>
                                    <div className="text-sm text-gray-700">Receive notifications about grading updates</div>
                                  </div>
                                  <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={`w-7 h-3.5 rounded-full transition-colors ${
                                      emailNotifications ? 'bg-gray-400' : 'bg-gray-400'
                                    }`}
                                  >
                                    <div className={`w-3 h-3 bg-gray-200 rounded-full border border-gray-600 transition-transform ${
                                      emailNotifications ? 'translate-x-0.5' : 'translate-x-0.5'
                                    }`}></div>
                                  </button>
                                </div>

                                {/* Auto-Grade Submissions */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium text-black">Auto-Grade Submissions</div>
                                    <div className="text-sm text-gray-700">Automatically grade submissions when uploaded</div>
                                  </div>
                                  <button
                                    onClick={() => setAutoGrade(!autoGrade)}
                                    className={`w-7 h-3.5 rounded-full transition-colors ${
                                      autoGrade ? 'bg-gray-400' : 'bg-gray-400'
                                    }`}
                                  >
                                    <div className={`w-3 h-3 bg-gray-200 rounded-full border border-gray-600 transition-transform ${
                                      autoGrade ? 'translate-x-0.5' : 'translate-x-0.5'
                                    }`}></div>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="mt-6">
                              <Button
                                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
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