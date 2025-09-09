'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useQuery } from '@tanstack/react-query'
import { formatRelativeTime } from '@/lib/utils'
import { ChevronDown, Users } from 'lucide-react'

// Mock data - replace with actual API calls
const mockCampaigns = [
  { id: '1', name: 'Just Herbs', status: 'active' },
  { id: '2', name: 'Juicy chemistry', status: 'active' },
  { id: '3', name: 'Hygalife 2', status: 'active' },
  { id: '4', name: 'Honeyveda', status: 'active' },
  { id: '5', name: 'HempStreet', status: 'active' },
  { id: '6', name: 'HealthyHey 2', status: 'active' },
]

const mockLinkedinAccounts = [
  {
    id: '1',
    name: 'Pulkit Garg',
    email: 'rgavinilqx@gmail.com',
    status: 'connected',
    progress: 57,
    total: 30
  },
  {
    id: '2',
    name: 'Jivesh Lakhani',
    email: 'jivesh@gmail.com',
    status: 'connected',
    progress: 63,
    total: 30
  },
  {
    id: '3',
    name: 'Indrajit Sahani',
    email: 'indrajit38mig@gmail.com',
    status: 'connected',
    progress: 60,
    total: 30
  },
  {
    id: '4',
    name: 'Bhavya Arora',
    email: 'bhavyaarora99.ba@gmail.com',
    status: 'connected',
    progress: 18,
    total: 100
  },
]

const mockRecentActivity = [
  {
    id: '1',
    name: 'Om Satyarthy',
    role: 'Regional Head',
    campaign: 'Gynoveda',
    status: 'Pending Approval',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Bhuvaneswari',
    role: 'Fertility & Women\'s Health + A...',
    campaign: 'Gynoveda',
    status: 'Sent 7 mins ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Surdeep Singh',
    role: 'Building Product-led SEO Growt...',
    campaign: 'Gynoveda',
    status: 'Sent 7 mins ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Dilbag Singh',
    role: 'Manager Marketing & Communicat...',
    campaign: 'Gynoveda',
    status: 'Sent 7 mins ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Vanshy Jain',
    role: 'Ayurveda||primary infertility|...',
    campaign: 'Gynoveda',
    status: 'Sent 7 mins ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Sunil Pal',
    role: 'Helping Fashion & Lifestyle Br...',
    campaign: 'Digi Sidekick',
    status: 'Pending Approval',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Utkarsh K.',
    role: 'Airbnb Host | Ex-The Skin Stor...',
    campaign: 'The skin story',
    status: 'Do Not Contact',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Shreya Ramakrishna',
    role: 'Deputy Manager - Founder\'s Off...',
    campaign: 'Pokonut',
    status: 'Followup 10 mins ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'Deepak Kumar',
    role: 'Deputy manager Advertising and...',
    campaign: 'Re\'equil',
    status: 'Followup 10 mins ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
]

function getStatusVariant(status: string) {
  if (status.includes('Pending')) return 'secondary'
  if (status.includes('Sent')) return 'outline'
  if (status.includes('Do Not Contact')) return 'destructive'
  if (status.includes('Followup')) return 'default'
  return 'outline'
}

export default function DashboardPage() {
  return (
    <MainLayout 
      title="Dashboard"
      description="Welcome back! Here's what's happening with your campaigns."
    >
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaigns */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Campaigns</CardTitle>
              <Button variant="outline" size="sm">
                All Campaigns
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between py-2">
                  <span className="font-medium">{campaign.name}</span>
                  <Badge variant="success" className="text-green-700">
                    {campaign.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <Button variant="outline" size="sm">
                Most Recent
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
                <div>Lead</div>
                <div>Campaign</div>
                <div>Status</div>
              </div>
              {mockRecentActivity.slice(0, 8).map((activity) => (
                <div key={activity.id} className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>
                        <Users className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {activity.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900">
                    {activity.campaign}
                  </div>
                  <div>
                    <Badge variant={getStatusVariant(activity.status)} className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* LinkedIn Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">LinkedIn Accounts</CardTitle>
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 mt-4">
              <div>Account</div>
              <div>Status</div>
              <div>Requests</div>
              <div></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockLinkedinAccounts.map((account) => (
              <div key={account.id} className="grid grid-cols-4 gap-4 items-center py-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-orange-100 text-orange-700">
                      {account.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {account.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {account.email}
                    </p>
                  </div>
                </div>
                <div>
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{account.progress}/{account.total}</span>
                  </div>
                  <Progress 
                    value={(account.progress / account.total) * 100} 
                    className="h-2"
                  />
                </div>
                <div></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}