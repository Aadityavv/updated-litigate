// components/CommunicationModule.tsx
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, FileText, CalendarDays, ImageIcon, VideoIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CommunicationModule() {
  const [activeTab, setActiveTab] = useState("personal")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", content: "Hello, how's the case going?", timestamp: "10:00 AM" },
    { id: 2, sender: "You", content: "We're making good progress.", timestamp: "10:05 AM" },
  ])
  const [groupMessages, setGroupMessages] = useState([
    { id: 1, sender: "Jane Smith", content: "Don't forget the meeting tomorrow.", timestamp: "9:00 AM" },
    { id: 2, sender: "Bob Johnson", content: "Got it! See you all at 10 AM.", timestamp: "9:15 AM" },
  ])
  const [tasks, setTasks] = useState([
    { id: 1, task: "Review case documents", assignedTo: "Jane Smith", dueDate: "2024-10-25" },
    { id: 2, task: "Prepare for deposition", assignedTo: "Bob Johnson", dueDate: "2024-10-30" },
  ])
  const [files, setFiles] = useState([
    { id: 1, name: "Contract_A.pdf", uploadedBy: "John Doe" },
    { id: 2, name: "Legal_Document.docx", uploadedBy: "Jane Smith" },
  ])
  const [notes, setNotes] = useState([
    { id: 1, content: "Meeting with client scheduled for next week.", author: "John Doe" },
    { id: 2, content: "Need to review new documents before the hearing.", author: "Jane Smith" },
  ])
  const [newTask, setNewTask] = useState("")
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newNote, setNewNote] = useState("")
  const [mediaFiles, setMediaFiles] = useState<File[]>([])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    if (activeTab === "personal") {
      setMessages([...messages, { id: messages.length + 1, sender: "You", content: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    } else {
      setGroupMessages([...groupMessages, { id: groupMessages.length + 1, sender: "You", content: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }
    setNewMessage("")
  }

  const handleAddTask = () => {
    if (newTask.trim() === "") return
    setTasks([...tasks, { id: tasks.length + 1, task: newTask, assignedTo: "Unassigned", dueDate: "TBD" }])
    setNewTask("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0]
      setFiles([...files, { id: files.length + 1, name: uploadedFile.name, uploadedBy: "You" }])
      setNewFile(null)
    }
  }

  const handleAddNote = () => {
    if (newNote.trim() === "") return
    setNotes([...notes, { id: notes.length + 1, content: newNote, author: "You" }])
    setNewNote("")
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedMedia = Array.from(e.target.files)
      setMediaFiles([...mediaFiles, ...uploadedMedia])
    }
  }

  return (
      <div className="space-y-6 p-4 sm:p-6 bg-gray-50">
        {/* Communication Module */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-blue-500" />
              <span>Chats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Personal DMs</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Group Chats</span>
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Media</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal DMs */}
              <TabsContent value="personal">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  {/* Conversations List */}
                  <ScrollArea className="w-full md:w-1/3 h-64 border rounded-md p-2">
                    {["John Doe", "Jane Smith", "Bob Johnson"].map((contact, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3 mb-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200"
                            onClick={() => setActiveTab("personal")}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/${index + 1}.png`} alt={contact} />
                            <AvatarFallback>{contact.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact}</p>
                            <p className="text-sm text-gray-500">Last message...</p>
                          </div>
                        </div>
                    ))}
                  </ScrollArea>

                  {/* Chat Window */}
                  <div className="w-full md:w-2/3 flex flex-col">
                    <ScrollArea className="flex-1 h-64 border rounded-md p-4 mb-4">
                      {messages.map((msg) => (
                          <div key={msg.id} className={`mb-4 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs p-2 rounded-md ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                              <p className="text-sm">{msg.content}</p>
                              <span className="text-xs block text-right">{msg.timestamp}</span>
                            </div>
                          </div>
                      ))}
                    </ScrollArea>
                    <div className="flex items-center space-x-2">
                      <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 resize-none"
                      />
                      <Button onClick={handleSendMessage} className="whitespace-nowrap">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Group Chats */}
              <TabsContent value="groups">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  {/* Groups List */}
                  <ScrollArea className="w-full md:w-1/3 h-64 border rounded-md p-2">
                    {["Team A", "Project X", "Legal Department"].map((group, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3 mb-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200"
                            onClick={() => setActiveTab("groups")}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{group.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{group}</p>
                            <p className="text-sm text-gray-500">Last message...</p>
                          </div>
                        </div>
                    ))}
                  </ScrollArea>

                  {/* Group Chat Window */}
                  <div className="w-full md:w-2/3 flex flex-col">
                    <ScrollArea className="flex-1 h-64 border rounded-md p-4 mb-4">
                      {groupMessages.map((msg) => (
                          <div key={msg.id} className={`mb-4 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs p-2 rounded-md ${msg.sender === "You" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                              <p className="text-sm">{msg.content}</p>
                              <span className="text-xs block text-right">{msg.timestamp}</span>
                            </div>
                          </div>
                      ))}
                    </ScrollArea>
                    <div className="flex items-center space-x-2">
                      <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 resize-none"
                      />
                      <Button onClick={handleSendMessage} className="whitespace-nowrap">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Media Sharing */}
              <TabsContent value="media">
                <div className="flex flex-col space-y-4">
                  {/* Media Upload */}
                  <div className="flex items-center space-x-2">
                    <Input
                        type="file"
                        multiple
                        onChange={handleMediaUpload}
                        className="flex-1"
                    />
                    <Button onClick={() => { /* Handle media upload */ }}>
                      Upload
                    </Button>
                  </div>

                  {/* Media List */}
                  <ScrollArea className="h-64 border rounded-md p-4">
                    {mediaFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-3 mb-3">
                          {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-6 w-6 text-green-500" />
                          ) : file.type.startsWith('video/') ? (
                              <VideoIcon className="h-6 w-6 text-red-500" />
                          ) : (
                              <FileText className="h-6 w-6 text-gray-500" />
                          )}
                          <span>{file.name}</span>
                        </div>
                    ))}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Task Assignment Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <CalendarDays className="h-6 w-6 text-purple-500" />
              <span>Task Assignment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-64 border rounded-md p-4">
                {tasks.map((task) => (
                    <div key={task.id} className="mb-4 p-2 border-b">
                      <p className="font-semibold">{task.task}</p>
                      <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                ))}
              </ScrollArea>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Input
                    placeholder="Add new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleAddTask} className="whitespace-nowrap">
                  Add Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Sharing Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <FileText className="h-6 w-6 text-orange-500" />
              <span>File Sharing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-64 border rounded-md p-4">
                {files.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 mb-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span>{file.name}</span>
                      <span className="text-sm text-gray-500 ml-auto">Uploaded by {file.uploadedBy}</span>
                    </div>
                ))}
              </ScrollArea>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Input type="file" onChange={handleFileUpload} className="flex-1" />
                <Button onClick={() => { /* Handle file upload */ }} className="whitespace-nowrap">
                  Upload File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaborative Notes Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <FileText className="h-6 w-6 text-teal-500" />
              <span>Collaborative Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-64 border rounded-md p-4">
                {notes.map((note) => (
                    <div key={note.id} className="mb-4 p-2 border-b">
                      <p>{note.content}</p>
                      <p className="text-sm text-gray-500">- {note.author}</p>
                    </div>
                ))}
              </ScrollArea>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Textarea
                    placeholder="Add a new note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 resize-none"
                />
                <Button onClick={handleAddNote} className="whitespace-nowrap">
                  Add Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
