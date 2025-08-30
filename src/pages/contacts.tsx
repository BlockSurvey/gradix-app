import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Icon components
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

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

// Contact interface
interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  evaluations: Evaluation[];
  averageScore: number;
  totalEvaluations: number;
  lastEvaluated: string;
  status: 'qualified' | 'disqualified' | 'pending';
  notes?: string;
  tags?: string[];
}

interface Evaluation {
  id: string;
  agentName: string;
  agentType: string;
  score: number;
  grade: string;
  date: string;
  criteria: {
    name: string;
    score: number;
    feedback: string;
  }[];
  qualified: boolean;
}

export default function ContactsPage() {
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'qualified' | 'disqualified' | 'pending'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced filter states
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [evaluationCountRange, setEvaluationCountRange] = useState<[number, number]>([1, 10]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'evaluations' | 'lastEvaluated'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Bulk operations states
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Notes and tags states
  const [editingNotes, setEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');
  const [newTag, setNewTag] = useState('');
  
  // Timeline view state
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  // Mock contacts data - this would come from a global state or API
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Sanjana Mehta',
      email: 'sanjana.mehta@tech.com',
      phone: '+91 98765 43210',
      totalEvaluations: 3,
      averageScore: 89.3,
      lastEvaluated: '2024-01-15',
      status: 'qualified',
      notes: 'Outstanding technical skills. Strong candidate for senior roles. Very impressive presentation skills and innovative solutions.',
      tags: ['Top Performer', 'Technical Leader', 'Interview Ready'],
      evaluations: [
        {
          id: 'eval-1',
          agentName: 'AI Hackathon Judge Agent',
          agentType: 'AI/ML Hackathon Projects',
          score: 92,
          grade: 'Excellent',
          date: '2024-01-15',
          qualified: true,
          criteria: [
            { name: 'Technical Skills', score: 95, feedback: 'Exceptional implementation of ML algorithms' },
            { name: 'Innovation', score: 88, feedback: 'Creative approach to problem solving' },
            { name: 'Presentation', score: 90, feedback: 'Clear and engaging demonstration' }
          ]
        },
        {
          id: 'eval-2',
          agentName: 'Software Engineering Evaluator',
          agentType: 'Software Development',
          score: 87,
          grade: 'Good',
          date: '2024-01-10',
          qualified: true,
          criteria: [
            { name: 'Code Quality', score: 85, feedback: 'Clean, well-structured code' },
            { name: 'Problem Solving', score: 90, feedback: 'Efficient algorithmic solutions' },
            { name: 'Documentation', score: 85, feedback: 'Comprehensive documentation' }
          ]
        },
        {
          id: 'eval-3',
          agentName: 'Technical Interview Agent',
          agentType: 'Technical Assessment',
          score: 89,
          grade: 'Good',
          date: '2024-01-05',
          qualified: true,
          criteria: [
            { name: 'Technical Knowledge', score: 92, feedback: 'Strong understanding of core concepts' },
            { name: 'Communication', score: 86, feedback: 'Clear technical explanations' },
            { name: 'Problem Solving', score: 89, feedback: 'Logical approach to complex problems' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Rohan Varma',
      email: 'rohan.varma@dev.com',
      phone: '+91 98765 43211',
      totalEvaluations: 2,
      averageScore: 82.5,
      lastEvaluated: '2024-01-14',
      status: 'qualified',
      notes: 'Solid performer with good technical foundation. Shows consistency across evaluations.',
      tags: ['Consistent', 'Reliable'],
      evaluations: [
        {
          id: 'eval-4',
          agentName: 'AI Hackathon Judge Agent',
          agentType: 'AI/ML Hackathon Projects',
          score: 87,
          grade: 'Good',
          date: '2024-01-14',
          qualified: true,
          criteria: [
            { name: 'Technical Skills', score: 85, feedback: 'Solid implementation skills' },
            { name: 'Innovation', score: 88, feedback: 'Interesting use of AI technologies' },
            { name: 'Presentation', score: 88, feedback: 'Well-organized presentation' }
          ]
        },
        {
          id: 'eval-5',
          agentName: 'Data Science Evaluator',
          agentType: 'Data Science Projects',
          score: 78,
          grade: 'Average',
          date: '2024-01-08',
          qualified: false,
          criteria: [
            { name: 'Data Analysis', score: 75, feedback: 'Basic analysis techniques used' },
            { name: 'Visualization', score: 82, feedback: 'Good data visualization skills' },
            { name: 'Statistical Methods', score: 77, feedback: 'Limited use of advanced statistics' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Alina Das',
      email: 'alina.das@code.com',
      totalEvaluations: 1,
      averageScore: 86,
      lastEvaluated: '2024-01-13',
      status: 'qualified',
      notes: 'Strong technical foundation with creative problem-solving approach. Good potential for growth.',
      tags: ['Creative', 'High Potential'],
      evaluations: [
        {
          id: 'eval-6',
          agentName: 'AI Hackathon Judge Agent',
          agentType: 'AI/ML Hackathon Projects',
          score: 86,
          grade: 'Good',
          date: '2024-01-13',
          qualified: true,
          criteria: [
            { name: 'Technical Skills', score: 88, feedback: 'Strong technical foundation' },
            { name: 'Innovation', score: 84, feedback: 'Creative problem-solving approach' },
            { name: 'Presentation', score: 86, feedback: 'Clear and concise presentation' }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Priya Sinha',
      email: 'priya.sinha@dev.com',
      totalEvaluations: 2,
      averageScore: 68,
      lastEvaluated: '2024-01-12',
      status: 'disqualified',
      notes: 'Shows basic understanding but needs improvement in technical skills. Consider for junior roles with mentoring.',
      tags: ['Needs Development', 'Junior Level'],
      evaluations: [
        {
          id: 'eval-7',
          agentName: 'AI Hackathon Judge Agent',
          agentType: 'AI/ML Hackathon Projects',
          score: 70,
          grade: 'Average',
          date: '2024-01-12',
          qualified: false,
          criteria: [
            { name: 'Technical Skills', score: 72, feedback: 'Basic understanding of concepts' },
            { name: 'Innovation', score: 68, feedback: 'Limited innovative approach' },
            { name: 'Presentation', score: 70, feedback: 'Adequate presentation skills' }
          ]
        },
        {
          id: 'eval-8',
          agentName: 'Software Engineering Evaluator',
          agentType: 'Software Development',
          score: 66,
          grade: 'Below Average',
          date: '2024-01-06',
          qualified: false,
          criteria: [
            { name: 'Code Quality', score: 65, feedback: 'Code needs improvement in structure' },
            { name: 'Problem Solving', score: 68, feedback: 'Basic problem-solving skills' },
            { name: 'Documentation', score: 65, feedback: 'Insufficient documentation' }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@code.com',
      totalEvaluations: 1,
      averageScore: 65,
      lastEvaluated: '2024-01-11',
      status: 'disqualified',
      notes: 'Limited technical skills but shows some creative potential. May benefit from additional training.',
      tags: ['Entry Level', 'Needs Training'],
      evaluations: [
        {
          id: 'eval-9',
          agentName: 'AI Hackathon Judge Agent',
          agentType: 'AI/ML Hackathon Projects',
          score: 65,
          grade: 'Average',
          date: '2024-01-11',
          qualified: false,
          criteria: [
            { name: 'Technical Skills', score: 60, feedback: 'Needs improvement in technical skills' },
            { name: 'Innovation', score: 70, feedback: 'Some creative ideas present' },
            { name: 'Presentation', score: 65, feedback: 'Average presentation quality' }
          ]
        }
      ]
    }
  ];

  const filteredAndSortedContacts = mockContacts
    .filter(contact => {
      // Basic search filter
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
      
      // Score range filter
      const matchesScore = contact.averageScore >= scoreRange[0] && contact.averageScore <= scoreRange[1];
      
      // Evaluation count filter
      const matchesEvaluationCount = contact.totalEvaluations >= evaluationCountRange[0] && 
                                    contact.totalEvaluations <= evaluationCountRange[1];
      
      // Date range filter
      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const contactDate = new Date(contact.lastEvaluated);
        if (dateRange.start) {
          matchesDate = matchesDate && contactDate >= new Date(dateRange.start);
        }
        if (dateRange.end) {
          matchesDate = matchesDate && contactDate <= new Date(dateRange.end);
        }
      }
      
      return matchesSearch && matchesStatus && matchesScore && matchesEvaluationCount && matchesDate;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'score':
          comparison = a.averageScore - b.averageScore;
          break;
        case 'evaluations':
          comparison = a.totalEvaluations - b.totalEvaluations;
          break;
        case 'lastEvaluated':
          comparison = new Date(a.lastEvaluated).getTime() - new Date(b.lastEvaluated).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified': return 'bg-gray-100 text-gray-800';
      case 'disqualified': return 'bg-gray-200 text-gray-700';
      case 'pending': return 'bg-gray-50 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setSelectedContact(null);
    setShowContactModal(false);
  };

  // Bulk operations functions
  const toggleContactSelection = (contactId: string) => {
    const newSelection = new Set(selectedContacts);
    if (newSelection.has(contactId)) {
      newSelection.delete(contactId);
    } else {
      newSelection.add(contactId);
    }
    setSelectedContacts(newSelection);
    setShowBulkActions(newSelection.size > 0);
  };

  const toggleAllContacts = () => {
    if (selectedContacts.size === filteredAndSortedContacts.length) {
      setSelectedContacts(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedContacts(new Set(filteredAndSortedContacts.map(c => c.id)));
      setShowBulkActions(true);
    }
  };

  const clearSelection = () => {
    setSelectedContacts(new Set());
    setShowBulkActions(false);
  };

  const handleBulkExport = () => {
    const selectedContactsData = filteredAndSortedContacts.filter(c => selectedContacts.has(c.id));
    console.log('Exporting contacts:', selectedContactsData);
    // Here you would implement the actual export functionality
    alert(`Exporting ${selectedContactsData.length} contacts...`);
  };

  const handleBulkStatusUpdate = (status: 'qualified' | 'disqualified' | 'pending') => {
    console.log(`Updating ${selectedContacts.size} contacts to status: ${status}`);
    // Here you would implement the actual status update
    alert(`Updated ${selectedContacts.size} contacts to ${status} status`);
    clearSelection();
  };

  // Notes and tags functions
  const startEditingNotes = () => {
    if (selectedContact) {
      setTempNotes(selectedContact.notes || '');
      setEditingNotes(true);
    }
  };

  const saveNotes = () => {
    if (selectedContact) {
      // Here you would update the contact in your state/API
      console.log(`Saving notes for ${selectedContact.name}: ${tempNotes}`);
      setEditingNotes(false);
      // Update the contact's notes in the mock data (in real app, this would be an API call)
    }
  };

  const cancelEditingNotes = () => {
    setEditingNotes(false);
    setTempNotes('');
  };

  const addTag = () => {
    if (newTag.trim() && selectedContact) {
      console.log(`Adding tag "${newTag}" to ${selectedContact.name}`);
      // Here you would update the contact's tags in your state/API
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (selectedContact) {
      console.log(`Removing tag "${tagToRemove}" from ${selectedContact.name}`);
      // Here you would update the contact's tags in your state/API
    }
  };

  return (
    <>
      <Head>
        <title>Contacts - Gradix</title>
        <meta name="description" content="Global contact list of all evaluated candidates" />
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
                icon={<ContactsIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                label="Contacts"
                isActive={activeMenuItem === 'contacts'}
                onClick={() => setActiveMenuItem('contacts')}
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
          <div className="flex-1 bg-[#f9f9f9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center p-4 lg:p-8 gap-4 bg-white">
              <div className="flex items-center gap-4 flex-1">
                <h2 className="text-lg lg:text-xl font-medium text-gray-600">Global Contacts</h2>
                
                <div className="relative flex-1 max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgba(0,0,0,0.4)]" />
                  <Input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-[0.4px] border-[rgba(0,0,0,0.6)] text-sm placeholder:text-[rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('qualified')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === 'qualified'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Qualified
                  </button>
                  <button
                    onClick={() => setFilterStatus('disqualified')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === 'disqualified'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Disqualified
                  </button>
                </div>

                {/* Advanced Filters Toggle */}
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    showAdvancedFilters
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FilterIcon className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort Options */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field as typeof sortBy);
                    setSortOrder(order as typeof sortOrder);
                  }}
                  className="px-3 py-1.5 rounded-md text-sm border border-gray-300 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="score-desc">Score (High-Low)</option>
                  <option value="score-asc">Score (Low-High)</option>
                  <option value="evaluations-desc">Most Evaluations</option>
                  <option value="evaluations-asc">Least Evaluations</option>
                  <option value="lastEvaluated-desc">Recently Evaluated</option>
                  <option value="lastEvaluated-asc">Oldest Evaluated</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Score Range Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Average Score Range</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 w-8">{scoreRange[0]}%</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scoreRange[0]}
                          onChange={(e) => setScoreRange([parseInt(e.target.value), scoreRange[1]])}
                          className="flex-1"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scoreRange[1]}
                          onChange={(e) => setScoreRange([scoreRange[0], parseInt(e.target.value)])}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-8">{scoreRange[1]}%</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {scoreRange[0]}%</span>
                        <span>Max: {scoreRange[1]}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Evaluation Count Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Evaluation Count</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 w-6">{evaluationCountRange[0]}</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={evaluationCountRange[0]}
                          onChange={(e) => setEvaluationCountRange([parseInt(e.target.value), evaluationCountRange[1]])}
                          className="flex-1"
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={evaluationCountRange[1]}
                          onChange={(e) => setEvaluationCountRange([evaluationCountRange[0], parseInt(e.target.value)])}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-6">{evaluationCountRange[1]}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {evaluationCountRange[0]}</span>
                        <span>Max: {evaluationCountRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Evaluated Date Range</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="text-xs"
                          placeholder="Start date"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="text-xs"
                          placeholder="End date"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {filteredAndSortedContacts.length} of {mockContacts.length} contacts
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setScoreRange([0, 100]);
                        setEvaluationCountRange([1, 10]);
                        setDateRange({ start: '', end: '' });
                        setFilterStatus('all');
                        setSearchTerm('');
                      }}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      Clear All
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                      className="bg-gray-600 text-white hover:bg-gray-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Actions Bar */}
            {showBulkActions && (
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedContacts.size} contact{selectedContacts.size !== 1 ? 's' : ''} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSelection}
                      className="text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      Clear Selection
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkStatusUpdate('qualified')}
                      className="text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      Mark Qualified
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkStatusUpdate('disqualified')}
                      className="text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      Mark Disqualified
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkStatusUpdate('pending')}
                      className="text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      Mark Pending
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleBulkExport}
                      className="bg-gray-600 text-white hover:bg-gray-700"
                    >
                      Export Selected
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts List */}
            <div className="p-4 lg:p-8">
              {filteredAndSortedContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <ContactsIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-medium text-gray-800 mb-3 text-center">
                    No Contacts Found
                  </h3>
                  
                  <p className="text-gray-600 text-center max-w-sm lg:max-w-md mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                    {searchTerm ? 'Try adjusting your search terms or filters.' : 'Contacts will appear here after candidates are evaluated by agents.'}
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedContacts.size === filteredAndSortedContacts.length && filteredAndSortedContacts.length > 0}
                              onChange={toggleAllContacts}
                              className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Evaluations</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Avg Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Recent Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Evaluated</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredAndSortedContacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedContacts.has(contact.id)}
                                onChange={() => toggleContactSelection(contact.id)}
                                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                  <UserIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-black">{contact.name}</div>
                                  {contact.phone && (
                                    <div className="text-xs text-gray-500">{contact.phone}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {contact.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {contact.totalEvaluations}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                              {contact.averageScore.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded capitalize ${getStatusColor(contact.status)}`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {formatDate(contact.lastEvaluated)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openContactModal(contact)}
                                className="text-gray-600 border-gray-300 hover:bg-gray-50"
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Detail Modal */}
        {showContactModal && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-black">{selectedContact.name}</h2>
                    <p className="text-sm text-gray-600">{selectedContact.email}</p>
                  </div>
                </div>
                <button
                  onClick={closeContactModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Contact Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-light text-black mb-1">
                        {selectedContact.totalEvaluations}
                      </div>
                      <div className="text-xs text-gray-600">Total Evaluations</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-light text-black mb-1">
                        {selectedContact.averageScore.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">Average Score</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className={`inline-flex px-3 py-1 text-sm font-medium rounded capitalize ${getStatusColor(selectedContact.status)}`}>
                        {selectedContact.status}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Current Status</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Evaluation History */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-black">Evaluation History</h3>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                          viewMode === 'list'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        List View
                      </button>
                      <button
                        onClick={() => setViewMode('timeline')}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                          viewMode === 'timeline'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Timeline View
                      </button>
                    </div>
                  </div>
                  
                  {viewMode === 'list' ? (
                    <div className="space-y-4">
                      {selectedContact.evaluations.map((evaluation) => (
                        <Card key={evaluation.id} className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-sm font-medium text-black mb-1">
                                  {evaluation.agentName}
                                </h4>
                                <p className="text-xs text-gray-600">{evaluation.agentType}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-medium text-black">
                                  {evaluation.score}%
                                </div>
                                <div className="text-xs text-gray-600">
                                  {formatDate(evaluation.date)}
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(evaluation.qualified ? 'qualified' : 'disqualified')}`}>
                                {evaluation.qualified ? 'Qualified' : 'Disqualified'}
                              </span>
                              <span className="ml-2 text-sm text-gray-600">
                                Grade: {evaluation.grade}
                              </span>
                            </div>

                            {/* Criteria Breakdown */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700">Criteria Breakdown:</h5>
                              {evaluation.criteria.map((criterion, index) => (
                                <div key={index} className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="text-xs font-medium text-black">
                                      {criterion.name}: {criterion.score}%
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                      {criterion.feedback}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    /* Timeline View */
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                      
                      <div className="space-y-8">
                        {selectedContact.evaluations
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((evaluation, index) => (
                          <div key={evaluation.id} className="relative flex items-start">
                            {/* Timeline Dot */}
                            <div className={`flex-shrink-0 w-4 h-4 rounded-full border-2 ${
                              evaluation.qualified 
                                ? 'bg-green-100 border-green-500' 
                                : 'bg-red-100 border-red-500'
                            } relative z-10`}>
                            </div>
                            
                            {/* Timeline Content */}
                            <div className="flex-1 ml-6 pb-8">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                {/* Header with Date and Score */}
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">
                                      {formatDate(evaluation.date)} - {new Date(evaluation.date).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </div>
                                    <h4 className="text-sm font-medium text-black mb-1">
                                      {evaluation.agentName}
                                    </h4>
                                    <p className="text-xs text-gray-600">{evaluation.agentType}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-black">
                                      {evaluation.score}%
                                    </div>
                                    <div className="text-xs text-gray-500">Grade: {evaluation.grade}</div>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div className="mb-4">
                                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                    evaluation.qualified 
                                      ? 'bg-green-100 text-green-800 border border-green-200' 
                                      : 'bg-red-100 text-red-800 border border-red-200'
                                  }`}>
                                    {evaluation.qualified ? 'Qualified' : 'Disqualified'}
                                  </span>
                                </div>

                                {/* Mini Criteria Summary */}
                                <div className="bg-gray-50 rounded p-3">
                                  <h5 className="text-xs font-medium text-gray-700 mb-2">Performance Summary:</h5>
                                  <div className="grid grid-cols-1 gap-2">
                                    {evaluation.criteria.slice(0, 3).map((criterion, criterionIndex) => (
                                      <div key={criterionIndex} className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 truncate">
                                          {criterion.name}
                                        </span>
                                        <span className="text-xs font-medium text-black">
                                          {criterion.score}%
                                        </span>
                                      </div>
                                    ))}
                                    {evaluation.criteria.length > 3 && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        +{evaluation.criteria.length - 3} more criteria
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Progress Trend Indicator */}
                                {index < selectedContact.evaluations.length - 1 && (
                                  <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">Trend:</span>
                                      {(() => {
                                        const prevEvaluation = selectedContact.evaluations
                                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[index + 1];
                                        const scoreDiff = evaluation.score - prevEvaluation.score;
                                        return (
                                          <span className={`inline-flex items-center text-xs font-medium ${
                                            scoreDiff > 0 
                                              ? 'text-green-600' 
                                              : scoreDiff < 0 
                                                ? 'text-red-600' 
                                                : 'text-gray-600'
                                          }`}>
                                            {scoreDiff > 0 ? '↗' : scoreDiff < 0 ? '↘' : '→'}
                                            {scoreDiff > 0 ? '+' : ''}{scoreDiff.toFixed(1)}%
                                          </span>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Performance Trends Charts */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-black mb-4">Performance Trends</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Score Trend Chart */}
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-black mb-4">Score Trend Over Time</h4>
                        <div className="h-48 relative">
                          {selectedContact.evaluations.length > 1 ? (
                            <div className="h-full flex items-end justify-between space-x-2">
                              {selectedContact.evaluations
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .map((evaluation, index) => {
                                  const height = (evaluation.score / 100) * 100; // Convert to percentage of container
                                  return (
                                    <div key={evaluation.id} className="flex-1 flex flex-col items-center">
                                      {/* Bar */}
                                      <div 
                                        className={`w-full rounded-t transition-all duration-300 ${
                                          evaluation.qualified ? 'bg-green-400' : 'bg-red-400'
                                        }`} 
                                        style={{ height: `${height}%` }}
                                        title={`${evaluation.score}% - ${formatDate(evaluation.date)}`}
                                      ></div>
                                      
                                      {/* Score Label */}
                                      <div className="text-xs font-medium text-black mt-2">
                                        {evaluation.score}%
                                      </div>
                                      
                                      {/* Date Label */}
                                      <div className="text-xs text-gray-500 mt-1">
                                        {formatDate(evaluation.date).split('/').slice(0, 2).join('/')}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <div className="text-center">
                                <div className="text-sm">Not enough data</div>
                                <div className="text-xs mt-1">Need 2+ evaluations for trends</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Criteria Performance Breakdown */}
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-black mb-4">Latest Criteria Breakdown</h4>
                        <div className="space-y-3">
                          {selectedContact.evaluations.length > 0 && 
                            selectedContact.evaluations
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                              .criteria.map((criterion, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-700">
                                      {criterion.name}
                                    </span>
                                    <span className="text-xs font-medium text-black">
                                      {criterion.score}%
                                    </span>
                                  </div>
                                  
                                  {/* Progress Bar */}
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-300 ${
                                        criterion.score >= 80 ? 'bg-green-500' :
                                        criterion.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${criterion.score}%` }}
                                    ></div>
                                  </div>
                                  
                                  {/* Feedback */}
                                  <div className="text-xs text-gray-600">
                                    {criterion.feedback}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Summary Stats */}
                  {selectedContact.evaluations.length > 1 && (
                    <Card className="border-gray-200 mt-4">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-black mb-4">Performance Insights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Trend Direction */}
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Overall Trend</div>
                            {(() => {
                              const sorted = selectedContact.evaluations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                              const first = sorted[0].score;
                              const last = sorted[sorted.length - 1].score;
                              const trend = last - first;
                              
                              return (
                                <div className={`text-lg font-medium ${
                                  trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                  {trend > 0 ? '↗ Improving' : trend < 0 ? '↘ Declining' : '→ Stable'}
                                </div>
                              );
                            })()}
                          </div>

                          {/* Best Performance */}
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Best Score</div>
                            <div className="text-lg font-medium text-black">
                              {Math.max(...selectedContact.evaluations.map(e => e.score))}%
                            </div>
                          </div>

                          {/* Consistency */}
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Consistency</div>
                            {(() => {
                              const scores = selectedContact.evaluations.map(e => e.score);
                              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                              const variance = scores.reduce((acc, score) => acc + Math.pow(score - avg, 2), 0) / scores.length;
                              const stdDev = Math.sqrt(variance);
                              
                              return (
                                <div className={`text-lg font-medium ${
                                  stdDev < 10 ? 'text-green-600' : stdDev < 20 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {stdDev < 10 ? 'Very Stable' : stdDev < 20 ? 'Moderate' : 'Variable'}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Notes Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-black">Notes</h3>
                    {!editingNotes && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startEditingNotes}
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                      >
                        {selectedContact.notes ? 'Edit Notes' : 'Add Notes'}
                      </Button>
                    )}
                  </div>
                  
                  {editingNotes ? (
                    <div className="space-y-3">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add your notes about this contact..."
                        className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveNotes}
                          className="bg-gray-600 text-white hover:bg-gray-700"
                        >
                          Save Notes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelEditingNotes}
                          className="text-gray-600 border-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      {selectedContact.notes ? (
                        <p className="text-sm text-gray-700">{selectedContact.notes}</p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No notes added yet</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-black mb-4">Tags</h3>
                  
                  <div className="space-y-3">
                    {/* Existing Tags */}
                    {selectedContact.tags && selectedContact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedContact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Add New Tag */}
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag..."
                        className="text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button
                        size="sm"
                        onClick={addTag}
                        disabled={!newTag.trim()}
                        className="bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300"
                      >
                        Add Tag
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}