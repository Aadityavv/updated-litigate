// components/DocumentAnalysis.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, FileText, TrendingUp, AlertTriangle } from "lucide-react"
import { PieChart, BarChart } from "@/components/ui/chart"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DocumentAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisType, setAnalysisType] = useState("predictive")
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalysis = async () => {
    if (!file) return
    setIsLoading(true)
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setAnalysisResult(`Analysis complete for ${file.name}.`)
  }

  const renderAnalysisResult = () => {
    if (analysisType === "predictive") {
      return (
        <BarChart
          data={[
            { outcome: "Favorable", probability: 0.7 },
            { outcome: "Unfavorable", probability: 0.2 },
            { outcome: "Neutral", probability: 0.1 },
          ]}
          config={{
            probability: {
              label: "Probability",
              color: "#3b82f6",
            },
          }}
          className="h-[300px]"
        />
      )
    } else if (analysisType === "risk") {
      return (
        <PieChart
          data={[
            { name: "High Risk", value: 20 },
            { name: "Medium Risk", value: 30 },
            { name: "Low Risk", value: 50 },
          ]}
          config={{
            "High Risk": {
              label: "High Risk",
              color: "#f87171",
            },
            "Medium Risk": {
              label: "Medium Risk",
              color: "#facc15",
            },
            "Low Risk": {
              label: "Low Risk",
              color: "#4ade80",
            },
          }}
          className="h-[300px]"
        />
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Upload a document for analysis</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="document">Upload Document</Label>
            <Input id="document" type="file" onChange={handleFileChange} />
          </div>
          <div>
            <Label>Analysis Type</Label>
            <RadioGroup
              value={analysisType}
              onValueChange={(value) => setAnalysisType(value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="predictive" id="predictive" />
                <Label htmlFor="predictive">Predictive Analysis</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="risk" id="risk" />
                <Label htmlFor="risk">Risk Assessment</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalysis} disabled={!file || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              {analysisType === "predictive" ? (
                <TrendingUp className="mr-2 h-4 w-4" />
              ) : (
                <AlertTriangle className="mr-2 h-4 w-4" />
              )}
              Start Analysis
            </>
          )}
        </Button>
      </CardFooter>
      {analysisResult && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{analysisResult}</p>
          <div className="mt-4">{renderAnalysisResult()}</div>
        </CardContent>
      )}
    </Card>
  )
}
