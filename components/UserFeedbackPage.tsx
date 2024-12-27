// components/UserFeedbackPage.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function UserFeedbackPage() {
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement feedback submission logic
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardContent>
          <p className="text-center text-xl">Thank you for your feedback!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Overall Experience</Label>
            <div className="flex items-center space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={rating >= star ? "default" : "outline"}
                  size="icon"
                  onClick={() => setRating(star)}
                >
                  <Star className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Share your thoughts..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="suggestions">Suggestions for Improvement</Label>
            <Textarea
              id="suggestions"
              placeholder="How can we make this better?"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
            />
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  )
}
