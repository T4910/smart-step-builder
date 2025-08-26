import { DashboardStats as StatsType } from "@/types/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, DollarSign, Package } from "lucide-react";

interface DashboardStatsProps {
  stats: StatsType;
  userRole: 'content-lead' | 'worker' | 'client' | 'reviewer';
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};

export const DashboardStats = ({ stats, userRole }: DashboardStatsProps) => {
  const getStatsForRole = () => {
    switch (userRole) {
      case 'content-lead':
        return [
          {
            title: "Total Orders",
            value: stats.totalOrders.toString(),
            icon: Package,
            description: "All time orders",
            trend: "+12% from last month"
          },
          {
            title: "Active Orders",
            value: stats.activeOrders.toString(),
            icon: Clock,
            description: "Currently in progress",
            trend: "3 due this week"
          },
          {
            title: "Completed This Month",
            value: stats.completedThisMonth.toString(),
            icon: TrendingUp,
            description: "Successfully delivered",
            trend: "+8% vs last month"
          },
          {
            title: "Revenue This Month",
            value: formatCurrency(stats.revenueThisMonth),
            icon: DollarSign,
            description: "Total earnings",
            trend: "+15% vs last month"
          }
        ];
      
      case 'worker':
        return [
          {
            title: "My Active Tasks",
            value: "5",
            icon: Clock,
            description: "Assigned to me",
            trend: "2 due today"
          },
          {
            title: "Completed This Month",
            value: "18",
            icon: TrendingUp,
            description: "Tasks finished",
            trend: "+22% vs last month"
          },
          {
            title: "Average Rating",
            value: "4.8",
            icon: TrendingUp,
            description: "Client satisfaction",
            trend: "Excellent performance"
          },
          {
            title: "Team Collaboration",
            value: "92%",
            icon: Package,
            description: "On-time delivery rate",
            trend: "Above team average"
          }
        ];
      
      case 'client':
        return [
          {
            title: "My Orders",
            value: "12",
            icon: Package,
            description: "Total orders placed",
            trend: "3 active campaigns"
          },
          {
            title: "In Progress",
            value: "4",
            icon: Clock,
            description: "Currently being worked on",
            trend: "2 due this week"
          },
          {
            title: "Completed This Month",
            value: "8",
            icon: TrendingUp,
            description: "Successfully delivered",
            trend: "100% satisfaction rate"
          },
          {
            title: "Total Spent",
            value: formatCurrency(185000),
            icon: DollarSign,
            description: "Lifetime value",
            trend: "Premium client"
          }
        ];
      
      case 'reviewer':
        return [
          {
            title: "Pending Reviews",
            value: "7",
            icon: Clock,
            description: "Awaiting my review",
            trend: "2 high priority"
          },
          {
            title: "Reviewed This Month",
            value: "34",
            icon: TrendingUp,
            description: "Reviews completed",
            trend: "+18% vs last month"
          },
          {
            title: "Average Review Time",
            value: "2.4 hrs",
            icon: Clock,
            description: "Per review session",
            trend: "15% faster than target"
          },
          {
            title: "Pass Rate",
            value: "76%",
            icon: TrendingUp,
            description: "First-time approvals",
            trend: "Above department average"
          }
        ];
      
      default:
        return [];
    }
  };

  const roleStats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {roleStats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stat.description}
            </p>
            <Badge variant="secondary" className="text-xs">
              {stat.trend}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};