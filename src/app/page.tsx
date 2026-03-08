'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, FileText, Mail, PenSquare, BookText as BookTextIcon, UserCircle, Newspaper } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <PenSquare className="h-6 w-6 text-primary" />,
    title: 'Poem Generator',
    description: 'Craft beautiful poems in various styles. Provide a theme, choose a style, and add keywords to inspire the muse.',
    href: '/poem'
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: 'Essay Composer',
    description: 'Create well-structured essays. Specify a topic, tone, and structure to generate compelling arguments or narratives.',
    href: '/essay'
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Blog Post Smith',
    description: 'Generate blog posts tailored to your needs. Define the industry, topic, and audience to create engaging content.',
    href: '/blog'
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: 'Email Generator',
    description: 'Create emails for any occasion. From formal cover letters to friendly marketing messages, let AI handle the draft.',
    href: '/email'
  },
  {
    icon: <BookTextIcon className="h-6 w-6 text-primary" />,
    title: 'Story Generator',
    description: 'Bring your ideas to life. Define the genre, characters, and plot to create a unique story, chapter by chapter.',
    href: '/story'
  },
  {
    icon: <UserCircle className="h-6 w-6 text-primary" />,
    title: 'Biography Generator',
    description: 'Detail the lives of fascinating individuals. Provide key facts and a desired tone to generate a compelling biography.',
    href: '/biography'
  },
];


export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-secondary font-body">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold font-headline text-foreground">Bardly</h1>
          </Link>
          <Button asChild variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow">
        <section className="text-center py-20 md:py-32 lg:py-40 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-foreground">Unleash Your Inner Wordsmith</h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Bardly is your AI-powered partner for creative writing. Generate poems, essays, blog posts, emails, and even multi-chapter stories with ease.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Creating Now</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Features for Every Writer</h3>
              <p className="text-lg text-muted-foreground mt-2">Everything you need to fight writer's block.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="block hover:no-underline">
                    <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {feature.icon}
                        <h4 className="font-headline text-xl font-semibold text-foreground">{feature.title}</h4>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </Card>
                </Link>
              ))}
               <Link href="/article" className="block hover:no-underline md:col-start-2 lg:col-start-auto">
                    <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Newspaper className="h-6 w-6 text-primary" />
                        <h4 className="font-headline text-xl font-semibold text-foreground">Article Writer</h4>
                      </div>
                      <p className="text-muted-foreground">Produce well-researched articles on any topic, optimized for your target outlet and audience.</p>
                    </Card>
                </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bardly. Made with creativity.</p>
        </div>
      </footer>
    </div>
  );
}
