"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, FileText, CheckCircle, Clock, Menu } from "lucide-react"
import Link from "next/link"

export default function CourseReader() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const course = {
    title: "Introduction to Web Development",
    instructor: "John Smith",
    progress: 75,
    totalChapters: 12,
    completedChapters: 9,
  }

  const chapters = [
    { id: 1, title: "Getting Started with HTML", completed: true, duration: "15 min" },
    { id: 2, title: "CSS Fundamentals", completed: true, duration: "20 min" },
    { id: 3, title: "JavaScript Basics", completed: true, duration: "25 min" },
    { id: 4, title: "DOM Manipulation", completed: true, duration: "30 min" },
    { id: 5, title: "Event Handling", completed: true, duration: "20 min" },
    { id: 6, title: "Asynchronous JavaScript", completed: true, duration: "35 min" },
    { id: 7, title: "Working with APIs", completed: true, duration: "40 min" },
    { id: 8, title: "Modern JavaScript (ES6+)", completed: true, duration: "30 min" },
    { id: 9, title: "Introduction to React", completed: true, duration: "45 min" },
    { id: 10, title: "React Components and Props", completed: false, duration: "35 min" },
    { id: 11, title: "State Management", completed: false, duration: "40 min" },
    { id: 12, title: "Building Your First App", completed: false, duration: "60 min" },
  ]

  const currentChapterData = chapters.find((ch) => ch.id === currentChapter)

  const chapterContent = {
    1: {
      title: "Getting Started with HTML",
      content: `
# Getting Started with HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup elements.

## What is HTML?

HTML stands for HyperText Markup Language. It's the foundation of all web pages and provides the basic structure that other technologies like CSS and JavaScript build upon.

### Key Concepts:

1. **Elements**: The building blocks of HTML
2. **Tags**: Keywords surrounded by angle brackets
3. **Attributes**: Additional information about elements
4. **Document Structure**: The hierarchical organization of content

## Basic HTML Structure

Every HTML document follows a basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>
\`\`\`

## Common HTML Elements

### Headings
HTML provides six levels of headings, from h1 (most important) to h6 (least important):

\`\`\`html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
\`\`\`

### Paragraphs and Text
\`\`\`html
<p>This is a paragraph of text.</p>
<strong>Bold text</strong>
<em>Italic text</em>
\`\`\`

### Lists
\`\`\`html
<!-- Unordered List -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
\`\`\`

## Practice Exercise

Try creating a simple HTML page with:
- A main heading
- A paragraph about yourself
- A list of your hobbies
- A link to your favorite website

Remember to save your file with a .html extension and open it in a web browser to see the results!

## Next Steps

In the next chapter, we'll explore CSS and learn how to style our HTML elements to make them look more attractive and professional.
      `,
    },
  }

  const nextChapter = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r`}>
        <div className="p-6">
          <Link href="/student/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">{course.title}</h2>
            <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-gray-600">
                {course.completedChapters}/{course.totalChapters} chapters completed
              </p>
            </div>
          </div>

          <Separator className="mb-4" />

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentChapter === chapter.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentChapter(chapter.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {chapter.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            currentChapter === chapter.id ? "text-blue-700" : "text-gray-900"
                          }`}
                        >
                          {chapter.title}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 ml-6">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{chapter.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="font-semibold">{currentChapterData?.title}</h1>
                <p className="text-sm text-gray-600">
                  Chapter {currentChapter} of {chapters.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {currentChapterData?.duration}
              </Badge>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        chapterContent[currentChapter as keyof typeof chapterContent]?.content
                          .replace(/\n/g, "<br>")
                          .replace(/#{3}\s(.+)/g, "<h3>$1</h3>")
                          .replace(/#{2}\s(.+)/g, "<h2>$1</h2>")
                          .replace(/#{1}\s(.+)/g, "<h1>$1</h1>")
                          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.+?)\*/g, "<em>$1</em>")
                          .replace(
                            /```html\n([\s\S]*?)\n```/g,
                            '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
                          )
                          .replace(
                            /```\n([\s\S]*?)\n```/g,
                            '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
                          )
                          .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>') ||
                        "Content not available",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Footer */}
        <footer className="bg-white border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevChapter} disabled={currentChapter === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {currentChapter} of {chapters.length}
              </span>
              <Progress value={(currentChapter / chapters.length) * 100} className="w-32 h-2" />
            </div>

            <Button onClick={nextChapter} disabled={currentChapter === chapters.length}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
