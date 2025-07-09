"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, TrendingUp, Play, FileText, CheckCircle, Star, Users } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "John Smith",
      progress: 75,
      totalChapters: 12,
      completedChapters: 9,
      lastAccessed: "2 hours ago",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      instructor: "Sarah Johnson",
      progress: 45,
      totalChapters: 15,
      completedChapters: 7,
      lastAccessed: "1 day ago",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      instructor: "Mike Wilson",
      progress: 100,
      totalChapters: 8,
      completedChapters: 8,
      lastAccessed: "3 days ago",
      status: "Completed",
    },
  ])

  const [availableCourses] = useState([
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Dr. Emily Chen",
      duration: "6 weeks",
      chapters: 10,
      price: "$99",
      rating: 4.8,
      students: 1250,
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      instructor: "Alex Rodriguez",
      duration: "4 weeks",
      chapters: 8,
      price: "$79",
      rating: 4.9,
      students: 890,
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
            <span className="text-gray-600">Student Dashboard</span>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">+1 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="my-courses" className="space-y-6">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>by {course.instructor}</CardDescription>
                      </div>
                      <Badge variant={course.status === "Completed" ? "default" : "secondary"}>{course.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {course.completedChapters}/{course.totalChapters} chapters completed
                        </span>
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/student/course/${course.id}`}>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Reading
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Materials
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Discover New Courses</h3>
              <Link href="/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {availableCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>{course.duration}</span>
                        <span>{course.chapters} chapters</span>
                        <span className="font-semibold text-green-600">{course.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Enroll Now</Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  Browse All {availableCourses.length + 50}+ Courses
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Learning Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Overall Progress</h4>
                    <Progress value={73} className="h-3" />
                    <p className="text-sm text-gray-600 mt-1">73% of enrolled courses completed</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">This Week</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 24 hours studied</li>
                        <li>• 5 chapters completed</li>
                        <li>• 2 assessments taken</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Achievements</h4>
                      <ul className="space-y-1 text-sm">
                        <li>🏆 First Course Completed</li>
                        <li>📚 Bookworm (10 hours reading)</li>
                        <li>⚡ Quick Learner</li>
                      </ul>
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
