"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BarChart3, Shield } from "lucide-react"
import { useEffect, useState, createContext } from 'react';
import api from "./api";

export const userContext = createContext({ user: null, setUser: () => {} });

const UserContextProvider = userContext.Provider;

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const resp = await api.get('/me', { withCredentials: true });
        if (resp.data && resp.data.authenticated) {
          setUser(resp.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <UserContextProvider value={{ user, setUser }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">LearnHub</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/courses" className="text-gray-600 hover:text-blue-600">
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
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Learn at Your Own Pace</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Access thousands of courses, track your progress, and earn certificates from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="px-8">
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Platform Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Rich Content</CardTitle>
                  <CardDescription>
                    Access comprehensive e-books, reading materials, and interactive content
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Monitor your learning progress with detailed analytics and performance metrics
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle>Expert Instructors</CardTitle>
                  <CardDescription>Learn from industry professionals and experienced educators</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* User Roles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Choose Your Role</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Student</CardTitle>
                  <CardDescription>Enroll in courses, track progress, and access learning materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Browse and enroll in courses</li>
                    <li>• Access reading materials</li>
                    <li>• Track learning progress</li>
                    <li>• Take assessments</li>
                    <li>• View performance analytics</li>
                  </ul>
                  <Link href="/student/dashboard" className="block mt-4">
                    <Button className="w-full">Student Portal</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <CardTitle>Instructor</CardTitle>
                  <CardDescription>Create courses, manage content, and track student progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Create and manage courses</li>
                    <li>• Upload learning materials</li>
                    <li>• Monitor student progress</li>
                    <li>• Create assessments</li>
                    <li>• Generate reports</li>
                  </ul>
                  <Link href="/instructor/dashboard" className="block mt-4">
                    <Button className="w-full bg-transparent" variant="outline">
                      Instructor Portal
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Administrator</CardTitle>
                  <CardDescription>Manage users, oversee platform operations, and generate reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Manage users and roles</li>
                    <li>• Oversee course catalog</li>
                    <li>• Generate payment reports</li>
                    <li>• Platform analytics</li>
                    <li>• System administration</li>
                  </ul>
                  <Link href="/admin/dashboard" className="block mt-4">
                    <Button className="w-full" variant="secondary">
                      Admin Portal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xl font-bold">LearnHub</span>
                </div>
                <p className="text-gray-400">
                  Empowering learners worldwide with quality education and innovative learning experiences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link href="/instructors">Instructors</Link>
                  </li>
                  <li>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/help">Help Center</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 LearnHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </UserContextProvider>
  )
}
