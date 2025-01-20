'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

export default function SettingsComponent() {
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);


  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid gap-6">
        {/* Account Settings */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Account Settings</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Manage your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger id="language" className="border-gray-300">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-photo">Profile Photo</Label>
              <div className="flex items-center space-x-4">
                {profilePhoto && (
                  <Image
                    src={profilePhoto}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                )}
                <Input
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  className="border-gray-300"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Notification Settings</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Customize how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-gray-600">
                Email Notifications
              </Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="text-gray-600">
                Push Notifications
              </Label>
              <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="text-gray-600">
                SMS Notifications
              </Label>
              <Switch id="sms-notifications" />
            </div>
          </CardContent>
        </Card>

        {/* User Feedback */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">User Feedback</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Help us improve by sharing your thoughts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedbackSubmitted ? (
              <div className="text-center py-8">
                <p className="text-xl font-semibold text-green-600">
                  Thank you for your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <Label className="text-gray-600">Overall Experience</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant={rating >= star ? "default" : "outline"}
                        size="icon"
                        className={`transition-colors duration-200 ${
                          rating >= star ? "bg-yellow-400" : "border-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                        type="button"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            rating >= star ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="comments" className="text-gray-600">
                    Comments
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share your thoughts..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="suggestions" className="text-gray-600">
                    Suggestions for Improvement
                  </Label>
                  <Textarea
                    id="suggestions"
                    placeholder="How can we make this better?"
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit Feedback
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Security Settings</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-gray-600">
                Current Password
              </Label>
              <Input id="current-password" type="password" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-600">
                New Password
              </Label>
              <Input id="new-password" type="password" className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-600">
                Confirm New Password
              </Label>
              <Input id="confirm-password" type="password" className="border-gray-300" />
            </div>
            <Button className="bg-red-600 text-white hover:bg-red-700">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Accessibility Settings</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Customize your experience for better accessibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-gray-600">
                High Contrast Mode
              </Label>
              <Switch id="high-contrast" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="large-text" className="text-gray-600">
                Large Text
              </Label>
              <Switch id="large-text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-to-speech" className="text-gray-600">
                Text-to-Speech Speed
              </Label>
              <Select>
                <SelectTrigger id="text-to-speech" className="border-gray-300">
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
