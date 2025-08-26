import { useState } from "react";
import { Order, User, OrderFilters } from "@/types/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Filter, Search, ArrowUpDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface OrderTableProps {
  orders: Order[];
  users: User[];
  onOrderClick: (orderId: string) => void;
  userRole: 'content-lead' | 'worker' | 'client' | 'reviewer';
  title?: string;
}

type SortField = 'createdAt' | 'deadline' | 'status' | 'priority' | 'projectName';
type SortDirection = 'asc' | 'desc';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};

const getPriorityColor = (priority: Order['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-destructive text-destructive-foreground';
    case 'high':
      return 'bg-warning text-warning-foreground';
    case 'medium':
      return 'bg-status-awaiting-review text-white';
    case 'low':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const OrderTable = ({ orders, users, onOrderClick, userRole, title = "Orders" }: OrderTableProps) => {
  const [filters, setFilters] = useState<OrderFilters>({});
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const getUserById = (id: string) => users.find(user => user.id === id);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedOrders = orders
    .filter(order => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!order.projectName.toLowerCase().includes(searchLower) &&
            !order.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(order.status)) return false;
      }
      
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(order.priority)) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'deadline') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getColumnsForRole = () => {
    const baseColumns = [
      { key: 'projectName', label: 'Project', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'priority', label: 'Priority', sortable: true },
      { key: 'deadline', label: 'Deadline', sortable: true }
    ];

    switch (userRole) {
      case 'content-lead':
        return [
          ...baseColumns,
          { key: 'client', label: 'Client', sortable: false },
          { key: 'assignedWorkers', label: 'Team', sortable: false },
          { key: 'totalPrice', label: 'Value', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false }
        ];
      
      case 'worker':
        return [
          ...baseColumns,
          { key: 'assignedLead', label: 'Lead', sortable: false },
          { key: 'myRole', label: 'My Role', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false }
        ];
      
      case 'client':
        return [
          ...baseColumns,
          { key: 'assignedLead', label: 'Lead', sortable: false },
          { key: 'totalPrice', label: 'Cost', sortable: false },
          { key: 'isPaid', label: 'Payment', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false }
        ];
      
      case 'reviewer':
        return [
          ...baseColumns,
          { key: 'services', label: 'Services', sortable: false },
          { key: 'assignedLead', label: 'Lead', sortable: false },
          { key: 'actions', label: 'Actions', sortable: false }
        ];
      
      default:
        return baseColumns;
    }
  };

  const columns = getColumnsForRole();

  const renderCellContent = (order: Order, columnKey: string) => {
    switch (columnKey) {
      case 'projectName':
        return (
          <div>
            <p className="font-medium">{order.projectName}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {order.description}
            </p>
          </div>
        );
      
      case 'status':
        return <StatusBadge status={order.status} />;
      
      case 'priority':
        return (
          <Badge className={getPriorityColor(order.priority)}>
            {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
          </Badge>
        );
      
      case 'deadline':
        const isOverdue = new Date(order.deadline) < new Date() && order.status !== 'completed' && order.status !== 'delivered';
        return (
          <div className={isOverdue ? 'text-destructive' : ''}>
            <p className="text-sm">
              {formatDistanceToNow(new Date(order.deadline), { addSuffix: true })}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(order.deadline).toLocaleDateString()}
            </p>
          </div>
        );
      
      case 'client':
        const client = getUserById(order.clientId);
        return client ? (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback className="text-xs">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{client.name}</span>
          </div>
        ) : null;
      
      case 'assignedLead':
        const lead = order.assignedLead ? getUserById(order.assignedLead) : null;
        return lead ? (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={lead.avatar} alt={lead.name} />
              <AvatarFallback className="text-xs">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{lead.name}</span>
          </div>
        ) : <span className="text-muted-foreground text-sm">Unassigned</span>;
      
      case 'assignedWorkers':
        const workerIds = Object.values(order.assignedWorkers);
        return (
          <div className="flex -space-x-1">
            {workerIds.slice(0, 3).map(workerId => {
              const worker = getUserById(workerId);
              return worker ? (
                <Avatar key={workerId} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={worker.avatar} alt={worker.name} />
                  <AvatarFallback className="text-xs">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ) : null;
            })}
            {workerIds.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs">+{workerIds.length - 3}</span>
              </div>
            )}
          </div>
        );
      
      case 'services':
        return (
          <div className="flex flex-wrap gap-1">
            {order.selectedServices.slice(0, 2).map(service => (
              <Badge key={service} variant="outline" className="text-xs">
                {service.replace('-', ' ')}
              </Badge>
            ))}
            {order.selectedServices.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{order.selectedServices.length - 2}
              </Badge>
            )}
          </div>
        );
      
      case 'totalPrice':
        return <span className="font-medium">{formatCurrency(order.totalPrice)}</span>;
      
      case 'isPaid':
        return (
          <Badge variant={order.isPaid ? "secondary" : "destructive"}>
            {order.isPaid ? 'Paid' : 'Pending'}
          </Badge>
        );
      
      case 'actions':
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOrderClick(order.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-9 w-64"
              />
            </div>
            <Select
              value={filters.status?.[0] || 'all'}
              onValueChange={(value) => 
                setFilters({ 
                  ...filters, 
                  status: value === 'all' ? undefined : [value as any]
                })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="awaiting-review">Awaiting Review</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="redo-requested">Redo Requested</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key as SortField)}
                      className="p-0 h-auto font-medium"
                    >
                      {column.label}
                      <ArrowUpDown className="ml-1 w-3 h-3" />
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders.map((order) => (
              <TableRow 
                key={order.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onOrderClick(order.id)}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCellContent(order, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};