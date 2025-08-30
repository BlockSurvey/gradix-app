import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Icon components
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

const GradixIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="#6b7280">
    <path d="M80 44.8153H51.4065L70.738 64.1467L64.3507 70.5288L44.6542 50.8322V78.8034H35.6338V51.1665L15.1196 71.6808L8.3209 64.8821L28.3826 44.8153H0V35.183H29.0255L9.4883 15.6458L15.8704 9.26372L35.6338 29.0374V1.19995H44.6542V28.5283L64.8804 8.30203L71.6791 15.1213L51.6174 35.183H80V44.8153Z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
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
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
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

export default function AnalyticsPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('analytics');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Head>
        <title>Analytics - Gradix</title>
        <meta
          name="description"
          content="Analytics dashboard for Gradix AI agents"
        />
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
          <div className="flex-1 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-8 gap-4 bg-white">
              <h2 className="text-lg lg:text-xl font-medium text-gray-600">
                Analytics
              </h2>

              {/* Date Range Selector */}
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-600" />
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm">
                  <span className="text-black">Last 30 days</span>
                  <ChevronDownIcon className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-4 lg:px-8 pb-4">
              <div className="bg-gray-100 p-0.5 rounded-lg flex border border-gray-300 inline-flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'usage'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Usage
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Agents */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <AgentsIcon className="w-6 h-6 text-gray-700" />
                          <span className="text-base text-gray-700">
                            Total Agents
                          </span>
                        </div>
                        <div className="text-4xl font-light text-black">5</div>
                      </CardContent>
                    </Card>

                    {/* Total Gradings */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <FileTextIcon className="w-5 h-5 text-gray-700" />
                          <span className="text-base text-gray-700">
                            Total Gradings
                          </span>
                        </div>
                        <div className="text-4xl font-light text-black">
                          216
                        </div>
                      </CardContent>
                    </Card>

                    {/* Average Score */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUpIcon className="w-5 h-5 text-gray-700" />
                          <span className="text-base text-gray-700">
                            Average Score
                          </span>
                        </div>
                        <div className="text-4xl font-light text-black">
                          80%
                        </div>
                      </CardContent>
                    </Card>

                    {/* Average Processing Time */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <ClockIcon className="w-5 h-5 text-gray-700" />
                          <span className="text-base text-gray-700">
                            Avg Processing Time
                          </span>
                        </div>
                        <div className="text-4xl font-light text-black">
                          102 hrs
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Grading Method Status */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium text-black mb-6">
                          Grading Method Status
                        </h3>

                        {/* Pie Chart Placeholder */}
                        <div className="flex items-center justify-center h-64 mb-6">
                          <div className="relative">
                            {/* Pie chart representation */}
                            <div className="w-48 h-48 rounded-full border-[40px] border-gray-800 border-r-gray-400 border-b-gray-400"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                              Manual
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">API</span>
                          </div>
                        </div>

                        {/* Values */}
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-800">
                              Manual Grading
                            </span>
                            <span className="text-xs text-gray-600">127</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-800">API</span>
                            <span className="text-xs text-gray-600">89</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Score Distribution */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium text-black mb-6">
                          Score Distribution
                        </h3>

                        {/* Bar Chart */}
                        <div className="h-64 flex items-end justify-center gap-4 mb-4">
                          {/* Bars */}
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-16 bg-gray-800 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              90-100
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-32 bg-gray-700 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              80-89
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-24 bg-gray-600 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              70-79
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-8 bg-gray-500 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              60-69
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-4 bg-gray-400 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              50-59
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-2 bg-gray-300 rounded-t-lg"></div>
                            <span className="text-xs text-gray-800 mt-2">
                              40-49
                            </span>
                          </div>
                        </div>

                        {/* Y-axis labels */}
                        <div className="flex justify-between text-xs text-gray-800">
                          <span>0</span>
                          <span>60</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Agent Performance Summary Table */}
                  <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium text-black mb-6">
                        Agent Performance Summary
                      </h3>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 text-base text-gray-600 font-medium">
                                Agent Name
                              </th>
                              <th className="text-left py-3 px-2 text-base text-gray-600 font-medium">
                                Total Gradings
                              </th>
                              <th className="text-left py-3 px-2 text-base text-gray-600 font-medium">
                                Manual
                              </th>
                              <th className="text-left py-3 px-2 text-base text-gray-600 font-medium">
                                API
                              </th>
                              <th className="text-left py-3 px-2 text-base text-gray-600 font-medium">
                                Average Score
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="py-4 px-2 text-sm text-black">
                                Applications Grader Pro
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                89
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                52
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                37
                              </td>
                              <td className="py-4 px-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl text-sm text-black border-[0.4px] border-[rgba(0,0,0,0.4)]">
                                  87.5%
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-4 px-2 text-sm text-black">
                                Code Review Assistant
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                76
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                43
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                33
                              </td>
                              <td className="py-4 px-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl text-sm text-black border-[0.4px] border-[rgba(0,0,0,0.4)]">
                                  82.3%
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-4 px-2 text-sm text-black">
                                Tech Grader
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                51
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                32
                              </td>
                              <td className="py-4 px-2 text-sm text-black">
                                19
                              </td>
                              <td className="py-4 px-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-xl text-sm text-black border-[0.4px] border-[rgba(0,0,0,0.4)]">
                                  91.2%
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grading Metrics Over Time */}
                  <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium text-black mb-6">
                        Grading metrics over time
                      </h3>

                      {/* Chart Placeholder */}
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                        <div className="text-center text-gray-500">
                          <svg
                            className="w-16 h-16 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <p className="text-sm">
                            Time series chart placeholder
                          </p>
                          <p className="text-xs mt-1">May 2025 - June 2025</p>
                        </div>
                      </div>

                      {/* Chart Legend */}
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-800 rounded-full"></div>
                          <span className="text-sm text-black">
                            Agents Created
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                          <span className="text-sm text-black">
                            Manual Grading
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-black">
                            API Grading
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === 'usage' && (
                <>
                  {/* Daily Usage Chart */}
                  <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium text-black mb-6">
                        Daily usage (Credits)
                      </h3>

                      {/* Chart Placeholder */}
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-gray-500">
                          <svg
                            className="w-16 h-16 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <p className="text-sm">Daily usage line chart</p>
                          <p className="text-xs mt-1">May 04 - June 01</p>
                        </div>
                      </div>

                      {/* Chart Tooltip Example */}
                      <div className="absolute left-80 top-40 bg-white rounded-lg shadow-lg border p-3 text-sm hidden">
                        <p className="text-xs text-black mb-1">10 May</p>
                        <p className="text-xs text-gray-700">
                          Credits used:{' '}
                          <span className="font-medium">0.5 credits</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Usage This Month & Current Plan */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Usage This Month */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium text-black mb-6">
                          Usage this month
                        </h3>

                        {/* Circular Progress */}
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative w-48 h-48">
                            {/* Background Circle */}
                            <svg
                              className="w-full h-full transform -rotate-90"
                              viewBox="0 0 100 100"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#374151"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset="98"
                                className="transition-all duration-300"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-xl font-medium text-black">
                                  610 / 1000
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Current Plan */}
                    <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium text-black mb-6">
                          Current Plan
                        </h3>

                        {/* Plan Details */}
                        <div className="bg-[#e9e9e9] rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-medium text-black">
                              Professional
                            </h4>
                            <Button className="px-4 py-2 text-sm bg-gray-100 text-black border border-gray-300 hover:bg-gray-200 rounded-md">
                              Buy More Credits
                            </Button>
                          </div>
                          <p className="text-base font-light text-black">
                            $29/monthly
                          </p>
                        </div>

                        {/* Plan Features */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-black">
                              Up to 1,000 gradings/month
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-black">
                              5 AI agents
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-black">
                              Advanced analytics
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-black">
                              API access
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-black">
                              Priority support
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Usage Breakdown */}
                  <Card className="bg-white border-[0.4px] border-[rgba(0,0,0,0.2)]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium text-black mb-6">
                        Usage breakdown
                      </h3>

                      <div className="space-y-4">
                        {/* Agent Creation */}
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-base text-gray-800">
                                Agent Creation (3)
                              </span>
                            </div>
                            <span className="text-base text-gray-700">
                              15.0 credits
                            </span>
                          </div>

                          {/* Expanded Details */}
                          <div className="ml-6 space-y-2">
                            <div className="flex items-center justify-between border-l-2 border-gray-200 pl-4">
                              <span className="text-sm text-gray-700">
                                10:30 AM Created 'Application Grader Pro'
                              </span>
                              <span className="text-sm text-gray-700">
                                5.0 credits
                              </span>
                            </div>
                            <div className="flex items-center justify-between border-l-2 border-gray-200 pl-4">
                              <span className="text-sm text-gray-700">
                                02:15 PM Created 'Code Review Assistant'
                              </span>
                              <span className="text-sm text-gray-700">
                                5.0 credits
                              </span>
                            </div>
                            <div className="flex items-center justify-between border-l-2 border-gray-200 pl-4">
                              <span className="text-sm text-gray-700">
                                04:45 PM Created 'Tech Grader'
                              </span>
                              <span className="text-sm text-gray-700">
                                5.0 credits
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Manual Grading */}
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-base text-gray-800">
                                Manual Grading (127)
                              </span>
                            </div>
                            <span className="text-base text-gray-700">
                              254.0 credits
                            </span>
                          </div>
                        </div>

                        {/* API Grading */}
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-base text-gray-800">
                                API Grading (89)
                              </span>
                            </div>
                            <span className="text-base text-gray-700">
                              267.0 credits
                            </span>
                          </div>
                        </div>

                        {/* File Upload */}
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-base text-gray-800">
                                File Upload (216)
                              </span>
                            </div>
                            <span className="text-base text-gray-700">
                              43.2 credits
                            </span>
                          </div>
                        </div>

                        {/* API Key Usage */}
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                              <span className="text-base text-gray-800">
                                API Key Usage (156)
                              </span>
                            </div>
                            <span className="text-base text-gray-700">
                              31.2 credits
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
