'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Download,
  Activity,
  User,
  MessageSquare,
  Folder,
  Settings,
  Calendar,
  Clock
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activityLogs = [
  {
    id: 1,
    type: 'campaign_started',
    user: 'John Marketing',
    action: 'Started campaign',
    target: 'Q4 Product Launch Campaign',
    timestamp: '2024-01-15T14:30:00Z',
    details: 'Campaign activated with 50 target leads',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: 2,
    type: 'message_sent',
    user: 'Sarah Sales',
    action: 'Sent message to lead',
    target: 'Sarah Johnson - Innovate Solutions',
    timestamp: '2024-01-15T13:45:00Z',
    details: 'Follow-up message sent via LinkedIn',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: 3,
    type: 'lead_responded',
    user: 'System',
    action: 'Lead responded',
    target: 'Michael Chen - StartupX',
    timestamp: '2024-01-15T12:20:00Z',
    details: 'Positive response received, interested in demo',
    avatar: null,
  },
  {
    id: 4,
    type: 'settings_updated',
    user: 'Admin User',
    action: 'Updated account settings',
    target: 'LinkedIn Account: john@company.com',
    timestamp: '2024-01-15T11:15:00Z',
    details: 'Daily message limit changed from 40 to 50',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: 5,
    type: 'campaign_paused',
    user: 'Emily Growth',
    action: 'Paused campaign',
    target: 'Holiday Marketing Blast',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Campaign paused due to high response volume',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: 6,
    type: 'lead_added',
    user: 'Michael Business',
    action: 'Added new lead',
    target: 'David Wilson - Enterprise Solutions',
    timestamp: '2024-01-15T09:45:00Z',
    details: 'Manual lead import from conference contacts',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: 7,
    type: 'message_bounced',
    user: 'System',
    action: 'Message bounced',
    target: 'invalid@example.com',
    timestamp: '2024-01-15T09:00:00Z',
    details: 'Email address not found, marked as invalid',
    avatar: null,
  },
  {
    id: 8,
    type: 'user_login',
    user: 'Sarah Sales',
    action: 'User logged in',
    target: 'Dashboard access',
    timestamp: '2024-01-15T08:30:00Z',
    details: 'Login from IP: 192.168.1.100',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face',
  },
];

export default function ActivityLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'campaign_started':
      case 'campaign_paused':
        return <Folder className="h-4 w-4" />;
      case 'message_sent':
      case 'message_bounced':
        return <MessageSquare className="h-4 w-4" />;
      case 'lead_responded':
      case 'lead_added':
        return <User className="h-4 w-4" />;
      case 'settings_updated':
        return <Settings className="h-4 w-4" />;
      case 'user_login':
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'campaign_started':
        return 'text-green-600 bg-green-50';
      case 'campaign_paused':
        return 'text-yellow-600 bg-yellow-50';
      case 'message_sent':
        return 'text-blue-600 bg-blue-50';
      case 'message_bounced':
        return 'text-red-600 bg-red-50';
      case 'lead_responded':
        return 'text-purple-600 bg-purple-50';
      case 'lead_added':
        return 'text-green-600 bg-green-50';
      case 'settings_updated':
        return 'text-orange-600 bg-orange-50';
      case 'user_login':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
      }
    }
  };

  const activityTypes = [
    { value: 'all', label: 'All Activities' },
    { value: 'campaign_started', label: 'Campaign Started' },
    { value: 'campaign_paused', label: 'Campaign Paused' },
    { value: 'message_sent', label: 'Message Sent' },
    { value: 'message_bounced', label: 'Message Bounced' },
    { value: 'lead_responded', label: 'Lead Responded' },
    { value: 'lead_added', label: 'Lead Added' },
    { value: 'settings_updated', label: 'Settings Updated' },
    { value: 'user_login', label: 'User Login' },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
              <p className="text-gray-600">
                Monitor all system activities and user actions
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Activity Type Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'campaign_started', label: 'Campaigns Started', count: activityLogs.filter(log => log.type === 'campaign_started').length },
              { type: 'message_sent', label: 'Messages Sent', count: activityLogs.filter(log => log.type === 'message_sent').length },
              { type: 'lead_responded', label: 'Leads Responded', count: activityLogs.filter(log => log.type === 'lead_responded').length },
              { type: 'settings_updated', label: 'Settings Updated', count: activityLogs.filter(log => log.type === 'settings_updated').length },
            ].map((stat) => (
              <Card key={stat.type}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex p-2 rounded-lg mb-2 ${getActivityColor(stat.type)}`}>
                    {getActivityIcon(stat.type)}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {activityTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline ({filteredLogs.length})</CardTitle>
              <CardDescription>
                Recent system activities and user actions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 p-2 rounded-lg ${getActivityColor(log.type)}`}>
                            {getActivityIcon(log.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{log.action}</p>
                            <p className="text-sm text-gray-500">{log.details}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            {log.avatar ? (
                              <AvatarImage src={log.avatar} alt={log.user} />
                            ) : (
                              <AvatarFallback className="text-xs">
                                {log.user === 'System' ? 'SYS' : log.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-sm font-medium text-gray-900">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{log.target}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatRelativeTime(log.timestamp)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredLogs.length === 0 && (
                <div className="p-12 text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No activities found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || typeFilter !== 'all' ? 'Try adjusting your filters.' : 'Activities will appear here as they happen.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}