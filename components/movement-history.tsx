import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const movements = [
  { date: "28.05.2024", sold: 42, received: 0, stock: 12, type: "sale" },
  { date: "27.05.2024", sold: 38, received: 0, stock: 54, type: "sale" },
  { date: "26.05.2024", sold: 45, received: 120, stock: 92, type: "receipt" },
  { date: "25.05.2024", sold: 41, received: 0, stock: 17, type: "sale" },
  { date: "24.05.2024", sold: 39, received: 0, stock: 58, type: "sale" },
  { date: "23.05.2024", sold: 43, received: 0, stock: 97, type: "sale" },
  { date: "22.05.2024", sold: 47, received: 0, stock: 140, type: "sale" },
  { date: "21.05.2024", sold: 44, received: 150, stock: 187, type: "receipt" },
]

export function MovementHistory() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">История движения</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Продажи и поступления за последние 7 дней</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 text-xs font-semibold">Дата</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Продано (шт)</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Поступление (шт)</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-right">Остаток на конец дня</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="py-3 text-xs font-medium text-foreground">{movement.date}</TableCell>
                <TableCell className="py-3 text-xs text-center text-muted-foreground">{movement.sold}</TableCell>
                <TableCell className="py-3 text-center">
                  {movement.received > 0 ? (
                    <Badge variant="secondary" className="text-xs font-semibold bg-emerald-100 text-emerald-700">
                      +{movement.received}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="py-3 text-xs text-right font-medium text-foreground">{movement.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
