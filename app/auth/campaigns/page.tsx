'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge, StatusType } from '@/components/StatusBadge';
import { ThemeProvider } from "@/components/providers/theme-provider"
import {
  Plus,
  Search,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  UserPlus,
  Wifi,
  MoreVertical,
  Edit,
  Pause,
  Play,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Campaign = {
  id: number;
  name: string;
  status: StatusType;
  totalLeads: number;
  requestAccepted: number;
  requestPending: number;
  requestRejected: number;
  connectionConnected: number;
  connectionPending: number;
};

const campaignsData: Campaign[] = [
  {
    id: 1,
    name: 'Four Seasons Ayurveda',
    status: 'active',
    totalLeads: 7,
    requestAccepted: 0,
    requestPending: 7,
    requestRejected: 0,
    connectionConnected: 0,
    connectionPending: 0,
  },
  {
    id: 2,
    name: 'Flychem',
    status: 'active',
    totalLeads: 3,
    requestAccepted: 0,
    requestPending: 3,
    requestRejected: 0,
    connectionConnected: 0,
    connectionPending: 0,
  },
  {
    id: 3,
    name: 'Social Beat',
    status: 'active',
    totalLeads: 79,
    requestAccepted: 35,
    requestPending: 44,
    requestRejected: 0,
    connectionConnected: 5,
    connectionPending: 0,
  },
];

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All Campaigns' | 'Active' | 'Inactive'>('All Campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignsData);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === 'All Campaigns' ||
        campaign.status === filter.toLowerCase())
  );

  const handleCreateCampaign = () => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: `New Campaign ${campaigns.length + 1}`,
      status: 'active',
      totalLeads: 0,
      requestAccepted: 0,
      requestPending: 0,
      requestRejected: 0,
      connectionConnected: 0,
      connectionPending: 0,
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DashboardLayout>
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Campaigns</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your campaigns and track their performance.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleCreateCampaign}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Button>
          </div>

          {/* Tabs + Search */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              {['All Campaigns', 'Active', 'Inactive'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as 'All Campaigns' | 'Active' | 'Inactive')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr_1fr] gap-4 text-sm font-medium text-gray-500 dark:text-gray-300 items-center">
                <div>Campaign Name</div>
                <div>Status</div>
                <div>Total Leads</div>
                <div>Request Status</div>
                <div>Connection Status</div>
                <div className="text-right">Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr_1fr] gap-4 items-center text-sm text-gray-900 dark:text-gray-100">
                    {/* Name */}
                    <div className="font-medium truncate">{campaign.name}</div>

                    {/* Status */}
                    <div>
                      <StatusBadge status={campaign.status}>
                        {campaign.status}
                      </StatusBadge>
                    </div>

                    {/* Total Leads */}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{campaign.totalLeads}</span>
                    </div>

                    {/* Request Status */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{campaign.requestAccepted}</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.requestPending}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-4 h-4" />
                        <span>{campaign.requestRejected}</span>
                      </div>
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-blue-600">
                        <UserPlus className="w-4 h-4" />
                        <span>{campaign.connectionConnected}</span>
                      </div>
                      <div className="flex items-center gap-1 text-purple-600">
                        <Wifi className="w-4 h-4" />
                        <span>{campaign.connectionPending}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {campaign.status === 'active' ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCampaigns.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No campaigns found.
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
