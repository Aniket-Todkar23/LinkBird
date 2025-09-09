'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Users,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const campaigns = [
  {
    id: 1,
    name: 'Q4 Product Launch Campaign',
    description: 'Targeting tech professionals for our new SaaS product',
    status: 'active',
    leads: 324,
    messages: 1240,
    conversion: 18.2,
    created: '2024-01-15',
    budget: 5000,
  },
  {
    id: 2,
    name: 'Holiday Marketing Blast',
    description: 'End-of-year promotional campaign',
    status: 'completed',
    leads: 156,
    messages: 890,
    conversion: 12.5,
    created: '2024-01-08',
    budget: 3000,
  },
  {
    id: 3,
    name: 'New Year Networking',
    description: 'Professional networking for Q1 preparation',
    status: 'pending',
    leads: 89,
    messages: 0,
    conversion: 0,
    created: '2024-01-12',
    budget: 2500,
  },
  {
    id: 4,
    name: 'Industry Conference Outreach',
    description: 'Connecting with conference attendees',
    status: 'inactive',
    leads: 67,
    messages: 234,
    conversion: 8.9,
    created: '2024-01-05',
    budget: 1500,
  },
];

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
              <p className="text-gray-600">
                Manage and monitor your marketing campaigns
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{campaign.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {campaign.description}
                      </CardDescription>
                    </div>
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
                  <div className="flex items-center justify-between mt-3">
                    <StatusBadge status={campaign.status as any}>
                      {campaign.status}
                    </StatusBadge>
                    <Badge variant="outline">${campaign.budget}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-lg font-semibold">{campaign.leads}</span>
                      </div>
                      <p className="text-xs text-gray-500">Leads</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <MessageSquare className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-lg font-semibold">{campaign.messages}</span>
                      </div>
                      <p className="text-xs text-gray-500">Messages</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                        <span className="text-lg font-semibold">{campaign.conversion}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Conv. Rate</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Created: {new Date(campaign.created).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Create your first campaign to get started.'}
                </p>
                {!searchTerm && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
  );
}