"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Star, Users, Clock, Play, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export default function CoursesLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "web-development", name: "Web Development", count: 8 },
    { id: "data-science", name: "Data Science", count: 6 },
    { id: "design", name: "Design", count: 4 },
    { id: "business", name: "Business", count: 3 },
    { id: "marketing", name: "Marketing", count: 3 },
  ]

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      category: "web-development",
      level: "Beginner",
      duration: "12 weeks",
      chapters: 15,
      students: 2450,
      rating: 4.8,
      reviews: 324,
      price: 99,
      originalPrice: 149,
      description: "Learn HTML, CSS, JavaScript, React, Node.js and build real-world projects",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      featured: true,
      bestseller: true,
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Dr. Sarah Johnson",
      category: "data-science",
      level: "Intermediate",
      duration: "10 weeks",
      chapters: 12,
      students: 1890,
      rating: 4.9,
      reviews: 267,
      price: 129,
      originalPrice: 179,
      description: "Master data analysis, visualization, and machine learning with Python",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
      featured: true,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Rodriguez",
      category: "design",
      level: "Beginner",
      duration: "8 weeks",
      chapters: 10,
      students: 1560,
      rating: 4.7,
      reviews: 198,
      price: 79,
      originalPrice: 119,
      description: "Learn design principles, user research, prototyping, and design tools",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      instructor: "Mike Wilson",
      category: "marketing",
      level: "Intermediate",
      duration: "6 weeks",
      chapters: 8,
      students: 1234,
      rating: 4.6,
      reviews: 156,
      price: 89,
      originalPrice: 129,
      description: "Complete guide to SEO, social media marketing, and paid advertising",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["SEO", "Social Media", "Google Ads", "Analytics"],
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Emily Chen",
      category: "data-science",
      level: "Advanced",
      duration: "14 weeks",
      chapters: 18,
      students: 987,
      rating: 4.9,
      reviews: 143,
      price: 149,
      originalPrice: 199,
      description: "Deep dive into ML algorithms, neural networks, and AI applications",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Machine Learning", "TensorFlow", "Neural Networks", "AI"],
    },
    {
      id: 6,
      title: "Business Strategy & Leadership",
      instructor: "Robert Brown",
      category: "business",
      level: "Intermediate",
      duration: "8 weeks",
      chapters: 12,
      students: 756,
      rating: 4.5,
      reviews: 89,
      price: 109,
      originalPrice: 159,
      description: "Develop strategic thinking and leadership skills for modern business",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Strategy", "Leadership", "Management", "Business"],
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">LearnHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-blue-600 font-medium">
              Courses
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Course Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of courses from expert instructors and advance your skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Courses ({sortedCourses.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
            <TabsTrigger value="free">Free Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {sortedCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {course.bestseller && <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>}
                      {course.featured && <Badge className="bg-purple-500 hover:bg-purple-600">Featured</Badge>}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="mb-2">
                        {categories.find((c) => c.id === course.category)?.name}
                      </Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span>by {course.instructor}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{course.rating}</span>
                          <span className="text-gray-500 ml-1">({course.reviews})</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">${course.price}</span>
                        {course.originalPrice > course.price && (
                          <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{course.chapters} chapters</div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/course/${course.id}`} className="flex-1">
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Enroll Now
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all courses</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedLevel("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {sortedCourses
                .filter((course) => course.featured)
                .map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-purple-500 hover:bg-purple-600">Featured</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{course.rating}</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">${course.price}</span>
                      </div>
                      <Button className="w-full">Enroll Now</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="bestsellers" className="space-y-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {sortedCourses
                .filter((course) => course.bestseller)
                .map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{course.rating}</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">${course.price}</span>
                      </div>
                      <Button className="w-full">Enroll Now</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="free" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Free courses coming soon!</h3>
              <p className="text-gray-600">We're working on adding free courses to our platform</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
