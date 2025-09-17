"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import {useSession} from "next-auth/react";

export default function ProfilePaymentHistory() {
    const { data: session } = useSession()

    const rawPayments = (session?.user as any)?.payments as any[] | undefined
    const payments: { id?: string; date?: string; amount?: number; status?: string; invoiceUrl?: string }[] = Array.isArray(rawPayments)
        ? rawPayments.map((p) => (typeof p === "object" ? p : {}))
        : []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
                {payments.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Nenhum pagamento encontrado.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Recibo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((p, i) => {
                                    const dateStr = p.date ? new Date(p.date).toLocaleDateString() : "—"
                                    const amountStr = typeof p.amount === "number" ? `R$ ${p.amount.toFixed(2)}` : "—"
                                    const status = (p.status ?? "").toLowerCase()

                                    return (
                                        <TableRow key={p.id ?? i}>
                                            <TableCell>{dateStr}</TableCell>
                                            <TableCell>{amountStr}</TableCell>
                                            <TableCell>
                                                {status === "paid" ? (
                                                    <Badge variant="success" className="bg-green-600 hover:bg-green-600">Pago</Badge>
                                                ) : status === "pending" ? (
                                                    <Badge variant="secondary">Pendente</Badge>
                                                ) : status === "failed" ? (
                                                    <Badge variant="destructive">Falhou</Badge>
                                                ) : (
                                                    <Badge variant="secondary">—</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {p.invoiceUrl ? (
                                                    <Button asChild size="sm" variant="outline">
                                                        <Link href={p.invoiceUrl} target="_blank" rel="noreferrer">Ver</Link>
                                                    </Button>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">—</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}