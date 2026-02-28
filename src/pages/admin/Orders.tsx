import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TablePagination } from '@/components/TablePagination';
import { api } from '@/lib/mock-data';

const PAGE_SIZE = 4;

const statusVariant = {
  completed: 'default' as const,
  pending: 'secondary' as const,
  cancelled: 'destructive' as const,
};

export default function AdminOrders() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({ queryKey: ['admin-orders'], queryFn: api.getOrders });

  const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 1;
  const paginated = data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || [];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">{t('admin.orders')}</h1>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t('admin.customer')}</TableHead>
              <TableHead>{t('admin.amount')}</TableHead>
              <TableHead>{t('admin.status')}</TableHead>
              <TableHead>{t('admin.date')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-20" /></TableCell>
                    ))}
                  </TableRow>
                ))
              : paginated.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status]}>
                        {t(`admin.${order.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
