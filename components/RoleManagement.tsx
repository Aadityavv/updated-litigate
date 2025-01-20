// components/RoleManagement.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"

export default function RoleManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>Manage user roles and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] mb-4">
          {[
            {
              id: 1,
              name: "John Doe",
              role: "Lawyer",
              permissions: ["view_cases", "edit_cases"],
            },
            {
              id: 2,
              name: "Jane Smith",
              role: "Paralegal",
              permissions: ["view_cases"],
            },
          ].map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                <p className="text-sm text-muted-foreground">
                  Permissions: {user.permissions.join(", ")}
                </p>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
          ))}
        </ScrollArea>
        <div className="space-y-4">
          <div>
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" placeholder="Enter user name" />
          </div>
          <div>
            <Label htmlFor="user-role">Role</Label>
            <Select>
              <SelectTrigger id="user-role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="paralegal">Paralegal</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="mt-2 space-y-2">
              {["view_cases", "edit_cases", "delete_cases", "manage_users"].map(
                (permission) => (
                  <div key={permission} className="flex items-center">
                    <Checkbox id={permission} />
                    <Label htmlFor={permission} className="ml-2">
                      {permission
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardFooter>
      <CardContent>
        <BarChart
          data={[
            { role: "Lawyer", count: 5 },
            { role: "Paralegal", count: 3 },
            { role: "Admin", count: 2 },
          ]}
          config={{
            count: {
              label: "Users",
              color: "#3b82f6",
            },
          }}
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  )
}
