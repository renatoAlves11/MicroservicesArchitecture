"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Users, DollarSign, TrendingUp, Settings, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Instructor",
      status: "Active",
      courses: 3,
      students: 245,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Student",
      status: "Active",
      courses: 5,
      students: 0,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "Instructor",
      status: "Active",
      courses: 2,
      students: 189,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Student",
      status: "Inactive",
      courses: 2,
      students: 0,
    },
  ])

  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "John Smith",
      students: 245,
      revenue: "$2,450",
      status: "Published",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "John Smith",
      students: 189,
      revenue: "$1,890",
      status: "Published",
    },
    {
      id: 3,
      title: "Digital Marketing",
      instructor: "Mike Wilson",
      students: 156,
      revenue: "$1,560",
      status: "Published",
    },
    { id: 4, title: "React for Beginners", instructor: "John Smith", students: 0, revenue: "$0", status: "Draft" },
  ])

  const [payments] = useState([
    {
      id: 1,
      student: "Sarah Johnson",
      course: "Web Development",
      amount: "$99",
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: 2,
      student: "Emily Davis",
      course: "JavaScript Advanced",
      amount: "$129",
      date: "2024-01-14",
      status: "Completed",
    },
    { id: 3, student: "Mike Chen", course: "Digital Marketing", amount: "$79", date: "2024-01-13", status: "Pending" },
    { id: 4, student: "Lisa Wang", course: "Web Development", amount: "$99", date: "2024-01-12", status: "Completed" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">LearnHub</span>
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, courses, and platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18%</div>
              <p className="text-xs text-muted-foreground">User growth rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Instructor" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{user.courses}</TableCell>
                        <TableCell>{user.students}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Oversee all courses on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell className="text-green-600 font-semibold">{course.revenue}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Reports</CardTitle>
                <CardDescription>Monitor financial transactions and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$45,231</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-gray-600">Total Transactions</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">$36.3</div>
                      <div className="text-sm text-gray-600">Avg. Transaction</div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.student}</TableCell>
                          <TableCell>{payment.course}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Comprehensive platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">User Growth</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">New Users (This Month)</span>
                          <span className="text-sm font-semibold">+156</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Active Users</span>
                          <span className="text-sm font-semibold">1,089</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">User Retention Rate</span>
                          <span className="text-sm font-semibold">87%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Course Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Average Course Rating</span>
                          <span className="text-sm font-semibold">4.7 ⭐</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Course Completion Rate</span>
                          <span className="text-sm font-semibold">73%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Average Study Time</span>
                          <span className="text-sm font-semibold">2.8 hrs/week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Revenue Insights</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">$15,420</div>
                        <div className="text-xs text-gray-600">This Month</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">+23%</div>
                        <div className="text-xs text-gray-600">Growth Rate</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">$362</div>
                        <div className="text-xs text-gray-600">Avg. Revenue/User</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
