import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {PRICING_PLANS} from "@/lib/constants";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";

type Props = {
    planOpen: boolean
    setPlanOpen: (open: boolean) => void
    currentPlan: {
        readonly name: string,
        readonly price: string,
        readonly description: string,
        readonly badge: string,
        readonly features: readonly string[],
    }
}

export default function ProfilePlanDialog({ planOpen, setPlanOpen, currentPlan }: Props) {
    return (
        <Dialog open={planOpen} onOpenChange={setPlanOpen}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Alterar plano</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PRICING_PLANS.map((plan) => {
                        const priceToNumber = (p: string) => parseFloat(p.replace(".", "").replace(",", ".")) || 0
                        const isCurrent = plan.name === currentPlan.name
                        const isUpgrade = priceToNumber(plan.price) > priceToNumber(currentPlan.price)
                        const cta = isCurrent ? "Atual" : isUpgrade ? "Fazer upgrade" : "Fazer downgrade"

                        return (
                            <Card key={plan.name} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                                    <div className="text-2xl font-bold">R$ {plan.price}<span className="text-sm text-muted-foreground font-normal">/mês</span></div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                    <ul className="text-sm space-y-1 mb-4 list-disc pl-5">
                                        {plan.features.slice(0, 4).map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto">
                                        <Button disabled={isCurrent} className="w-full" onClick={() => setPlanOpen(false)}>
                                            {cta}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}