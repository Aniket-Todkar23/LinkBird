'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeProvider } from "@/components/providers/theme-provider";

import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Star,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const leads = [
  { id: 1, name: 'John Smith', email: 'john.smith@techcorp.com', phone: '+1 (555) 123-4567', company: 'TechCorp Inc.', position: 'Software Engineer', location: 'San Francisco, CA', status: 'active', score: 85, campaign: 'Q4 Product Launch', lastContact: '2024-01-15', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@innovate.io', phone: '+1 (555) 987-6543', company: 'Innovate Solutions', position: 'Product Manager', location: 'New York, NY', status: 'pending', score: 92, campaign: 'Holiday Marketing', lastContact: '2024-01-12', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face' },
  { id: 3, name: 'Michael Chen', email: 'mchen@startupx.com', phone: '+1 (555) 456-7890', company: 'StartupX', position: 'CTO', location: 'Austin, TX', status: 'completed', score: 78, campaign: 'Industry Conference', lastContact: '2024-01-10', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@growth.com', phone: '+1 (555) 321-0987', company: 'Growth Digital', position: 'Marketing Director', location: 'Los Angeles, CA', status: 'active', score: 67, campaign: 'New Year Networking', lastContact: '2024-01-14', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
  { id: 5, name: 'David Wilson', email: 'dwilson@enterprise.biz', phone: '+1 (555) 654-3210', company: 'Enterprise Solutions', position: 'VP of Sales', location: 'Chicago, IL', status: 'inactive', score: 41, campaign: 'Q4 Product Launch', lastContact: '2024-01-08', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // Filter by status

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? lead.status === statusFilter : true)
  );

  const toggleLeadSelection = (leadId: number) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 dark:bg-green-900';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900';
    return 'text-red-600 bg-red-50 dark:bg-red-900';
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-navy-100">Leads</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage and track your sales leads</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          {/* Search + Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setStatusFilter(prev =>
                      prev === 'active' ? null : 'active'
                    )
                  }
                >
                  <Filter className="h-4 w-4 mr-2" /> {statusFilter ? 'Clear Filter' : 'Active Leads'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">All Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-gray-900 dark:text-white"></TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Lead</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Company</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Campaign</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Score</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Last Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleLeadSelection(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.avatar} alt={lead.name} />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{lead.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">{lead.company}</TableCell>
                      <TableCell><Badge variant="outline">{lead.campaign}</Badge></TableCell>
                      <TableCell><StatusBadge status={lead.status as any}>{lead.status}</StatusBadge></TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                          <Star className="h-3 w-3 mr-1" /> {lead.score}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <Calendar className="h-3 w-3 mr-1 inline" />
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/30"
              onClick={() => setSelectedLead(null)}
            />

            <div className="w-[400px] bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lead Profile</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedLead.avatar} />
                  <AvatarFallback>{selectedLead.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedLead.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{selectedLead.position} at {selectedLead.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2" /> {selectedLead.email}
                </p>
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Phone className="h-4 w-4 mr-2" /> {selectedLead.phone}
                </p>
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" /> {selectedLead.location}
                </p>
                <p className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" /> Last Contact: {selectedLead.lastContact}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Campaign</h3>
                <Badge>{selectedLead.campaign}</Badge>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ThemeProvider>
  );
}
