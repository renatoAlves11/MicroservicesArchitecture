"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, BarChart3, Plus, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export default function InstructorDashboard() {
  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      students: 245,
      chapters: 12,
      status: "Published",
      revenue: "$2,450",
      rating: 4.8,
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      students: 189,
      chapters: 15,
      status: "Published",
      revenue: "$1,890",
      rating: 4.9,
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "React for Beginners",
      students: 0,
      chapters: 8,
      status: "Draft",
      revenue: "$0",
      rating: 0,
      lastUpdated: "3 days ago",
    },
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
            <span className="text-gray-600">Instructor Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
            <p className="text-gray-600">Manage your courses and track student progress</p>
          </div>
          <Link href="/instructor/course/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">434</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 published, 1 draft</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,340</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">⭐⭐⭐⭐⭐</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          {course.students} students • {course.chapters} chapters
                        </CardDescription>
                      </div>
                      <Badge variant={course.status === "Published" ? "default" : "secondary"}>{course.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Revenue:</span>
                          <span className="font-semibold ml-2 text-green-600">{course.revenue}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-semibold ml-2">
                            {course.rating > 0 ? `⭐ ${course.rating}` : "No ratings yet"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last updated:</span>
                          <span className="ml-2">{course.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Overview of your courses' performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Top Performing Courses</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Advanced JavaScript Concepts</span>
                          <span className="text-sm font-semibold">⭐ 4.9</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Introduction to Web Development</span>
                          <span className="text-sm font-semibold">⭐ 4.8</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Student Engagement</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average completion rate:</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average study time:</span>
                          <span className="font-semibold">2.5 hours/week</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Student satisfaction:</span>
                          <span className="font-semibold">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Monitor and interact with your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">434</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">89%</div>
                      <div className="text-sm text-gray-600">Active Students</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <div className="text-sm text-gray-600">Certificates Issued</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Recent Student Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">Sarah Johnson</span>
                          <span className="text-sm text-gray-600 ml-2">
                            completed "Introduction to Web Development"
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">Mike Chen</span>
                          <span className="text-sm text-gray-600 ml-2">enrolled in "Advanced JavaScript Concepts"</span>
                        </div>
                        <span className="text-xs text-gray-500">5 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">Emily Davis</span>
                          <span className="text-sm text-gray-600 ml-2">submitted assessment for Chapter 5</span>
                        </div>
                        <span className="text-xs text-gray-500">1 day ago</span>
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
