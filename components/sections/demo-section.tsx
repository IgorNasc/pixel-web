"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardDemo from "@/components/demo/dashboard-demo"
import ComparisonDemo from "@/components/demo/comparison-demo"
import AudienceDemo from "@/components/demo/audience-demo"

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState("dashboard")

  return (
    <section id="demo" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Veja o Ad Tracker em Ação</h2>
          <p className="text-xl text-gray-600">Dashboard interativo - prévia do que você terá em mãos</p>
        </div>

        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100">
            <TabsTrigger value="dashboard" className="text-sm md:text-base">
              Dashboard Principal
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-sm md:text-base">
              Comparativo
            </TabsTrigger>
            <TabsTrigger value="audience" className="text-sm md:text-base">
              Audiência
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardDemo />
          </TabsContent>

          <TabsContent value="comparison">
            <ComparisonDemo />
          </TabsContent>

          <TabsContent value="audience">
            <AudienceDemo />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
