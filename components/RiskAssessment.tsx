// components/RiskAssessment.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle } from "lucide-react"
import { PieChart } from "@/components/ui/chart"

export default function RiskAssessment() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalysis = async () => {
    if (!file) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setAnalysisResult(`Risk assessment complete for ${file.name}.`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
        <CardDescription>Assess risks in legal documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="risk-document">Upload Contract</Label>
            <Input id="risk-document" type="file" onChange={handleFileChange} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalysis} disabled={!file || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assessing...
            </>
          ) : (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Start Assessment
            </>
          )}
        </Button>
      </CardFooter>
      {analysisResult && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{analysisResult}</p>
          <div className="mt-4">
            <PieChart
              data={[
                { name: "High Risk", value: 20 },
                { name: "Medium Risk", value: 30 },
                { name: "Low Risk", value: 50 },
              ]}
              config={{
                "High Risk": {
                  label: "High Risk",
                  color: "#f87171", // Red
                },
                "Medium Risk": {
                  label: "Medium Risk",
                  color: "#facc15", // Yellow
                },
                "Low Risk": {
                  label: "Low Risk",
                  color: "#4ade80", // Green
                },
              }}
              className="h-[300px]"
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
