"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import ProfilePlanDialog from "@/features/profiles/components/profile-plans-dialog";
import {PRICING_PLANS} from "@/lib/constants";
import {useSession} from "next-auth/react";

export default function ProfilePlanDetails() {
    const { data: session } = useSession()

    const [planOpen, setPlanOpen] = React.useState(false)

    const currentPlan = PRICING_PLANS[0]
    const rawAddons = (session?.user as any)?.addons as any[] | undefined
    const addons: { name: string; description?: string }[] = Array.isArray(rawAddons)
        ? rawAddons
            .map((a) => (typeof a === "string" ? { name: a } : a))
            .filter((a): a is { name: string; description?: string } => !!a && typeof a.name === "string" && a.name.length > 0)
        : []
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Seu plano</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xl font-semibold">{currentPlan.name}</div>
                            <div className="text-sm text-muted-foreground">Ideal para começar e testar</div>
                        </div>
                        <Badge className="bg-blue-600 text-white hover:bg-blue-700">Ativo</Badge>
                    </div>
                    <div className="text-3xl font-bold">
                        R$ {currentPlan.price}
                        <span className="text-sm text-muted-foreground font-normal">/mês</span>
                    </div>
                    <ul className="text-sm space-y-2 list-disc pl-5">
                        {currentPlan.features.slice(0, 4).map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                    {addons.length > 0 && (
                        <div className="pt-3 border-t">
                            <div className="text-sm font-medium mb-2">Add-ons</div>
                            <ul className="space-y-1">
                                {addons.map((a, i) => (
                                    <li key={`${a.name}-${i}`} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                        <span>
                                <span className="font-medium">{a.name}</span>
                                            {a.description ? <span className="text-muted-foreground"> — {a.description}</span> : null}
                              </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Button type="button" onClick={() => setPlanOpen(true)}>Ver planos</Button>
                    </div>
                </CardContent>
            </Card>

            <ProfilePlanDialog planOpen={planOpen} setPlanOpen={setPlanOpen} currentPlan={currentPlan} />
        </>
    )
}