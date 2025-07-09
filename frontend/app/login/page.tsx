"use client"

import type React from "react"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import api from "../api"
import { userContext } from "../page"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const userCtx = useContext(userContext)

  const handleSendForm = async () => {
    try{
      const response = await api.post('/user', {email, password})
      userCtx
    }catch(e){
      
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); setSuccess("");
    try {
      const response = await api.post('/login', { email, password }, { withCredentials: true })
      setSuccess("Login realizado com sucesso!")
      // Atualiza contexto global
      const meResp = await api.get('/me', { withCredentials: true })
      if (meResp.data && meResp.data.authenticated) {
        userCtx.setUser(meResp.data.user)
      }
      // Redirecionar se necessário
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao fazer login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LearnHub</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="mt-4">
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Access your courses and track your progress</CardDescription>
              </TabsContent>

              <TabsContent value="instructor" className="mt-4">
                <CardTitle>Instructor Login</CardTitle>
                <CardDescription>Manage your courses and students</CardDescription>
              </TabsContent>

              <TabsContent value="admin" className="mt-4">
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Platform administration and management</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
