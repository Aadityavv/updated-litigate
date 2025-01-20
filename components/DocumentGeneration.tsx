// components/DocumentGeneration.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Eye } from "lucide-react"

export default function DocumentGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [formData, setFormData] = useState({
    clientName: "",
    caseNumber: "",
    content: "",
  })

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template)
    // Adjust form fields based on template
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePreview = () => {
    // Implement preview logic
    alert("Previewing document...")
  }

  const handleDownload = (format: string) => {
    // Implement download logic
    alert(`Downloading document as ${format}`)
  }

  const handleSaveTemplate = () => {
    // Implement save template logic
    alert("Template saved!")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Document Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Template Selection */}
            <div>
              <h3 className="font-semibold mb-2">Template Selection</h3>
              <ScrollArea className="h-[300px] border rounded-md p-4">
                {[
                  { name: "General Contract", type: "Contract" },
                  { name: "Non-Disclosure Agreement", type: "Agreement" },
                  { name: "Complaint", type: "Pleading" },
                  { name: "Motion to Dismiss", type: "Motion" },
                  { name: "Settlement Agreement", type: "Agreement" },
                ].map((template, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between mb-2 p-2 hover:bg-accent rounded-md cursor-pointer ${
                      selectedTemplate === template.name ? "bg-accent" : ""
                    }`}
                    onClick={() => handleTemplateSelect(template.name)}
                  >
                    <span>{template.name}</span>
                    <Badge>{template.type}</Badge>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Form Area */}
            <div>
              <h3 className="font-semibold mb-2">Form</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="caseNumber">Case Number</Label>
                  <Input
                    id="caseNumber"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select>
                    <SelectTrigger id="documentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="pleading">Pleading</SelectItem>
                      <SelectItem value="motion">Motion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <div className="flex space-x-2">
              <Button onClick={() => handleDownload("PDF")}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={() => handleDownload("DOCX")}>
                <Download className="mr-2 h-4 w-4" />
                Download DOCX
              </Button>
            </div>
            <Button onClick={handleSaveTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
