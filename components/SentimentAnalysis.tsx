// components/SentimentAnalysis.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, FileText } from "lucide-react"
import { LineChart } from "@/components/ui/chart"

export default function SentimentAnalysis() {
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
    setAnalysisResult(`Sentiment analysis complete for ${file.name}.`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Analyze the sentiment of legal documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sentiment-document">Upload Document</Label>
            <Input id="sentiment-document" type="file" onChange={handleFileChange} />
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
              <FileText className="mr-2 h-4 w-4" />
              Start Analysis
            </>
          )}
        </Button>
      </CardFooter>
      {analysisResult && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{analysisResult}</p>
          <div className="mt-4">
            <LineChart
              data={[
                { date: "2023-01", sentiment: 0.2 },
                { date: "2023-02", sentiment: 0.5 },
                { date: "2023-03", sentiment: 0.8 },
                { date: "2023-04", sentiment: 0.3 },
                { date: "2023-05", sentiment: 0.6 },
              ]}
              config={{
                sentiment: {
                  label: "Sentiment Score",
                  color: "#3b82f6",
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
