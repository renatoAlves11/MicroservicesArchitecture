"use client"

import { useEffect, useState } from "react"
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
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");

  useEffect(() => {
    // Usando o database service diretamente
    fetch("http://localhost:8004/cursos")
      .then(res => res.json())
      .then(data => {
        // Transformar dados para o formato esperado pelo frontend
        const transformedCourses = data.map((course: any) => ({
          id: course.id,
          title: course.titulo,
          description: course.descricao,
          price: course.preco,
          instructor: "Instructor", // Placeholder
          students: Math.floor(Math.random() * 1000), // Placeholder
          rating: 4.5, // Placeholder
          reviews: Math.floor(Math.random() * 100), // Placeholder
          duration: "2h 30m", // Placeholder
          chapters: course.conteudos ? course.conteudos.length : 0,
          level: "Beginner", // Placeholder
          category: "web-development", // Placeholder
          tags: ["JavaScript", "Web Development"], // Placeholder
          image: "/placeholder.svg",
          bestseller: Math.random() > 0.7,
          featured: Math.random() > 0.8,
          originalPrice: course.preco * 1.2
        }));
        setCourses(transformedCourses);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar cursos. Tente novamente mais tarde.");
        setLoading(false);
      });
  }, [])

  const categories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "web-development", name: "Web Development", count: 8 },
    { id: "data-science", name: "Data Science", count: 6 },
    { id: "design", name: "Design", count: 4 },
    { id: "business", name: "Business", count: 3 },
    { id: "marketing", name: "Marketing", count: 3 },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

  if (loading) return <div>Carregando cursos...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (courses.length === 0) return <div>Nenhum curso encontrado.</div>;

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
                      {course.tags.slice(0, 3).map((tag: string) => (
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
                      <Link href={`/courses/${course.id}`}>
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
