'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, FileText, Mail, PenSquare, BookText as BookTextIcon, UserCircle, Newspaper, LogOut, User, ArrowRight, Lightbulb, Star, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/context/user-context';


const features = [
  {
    icon: <PenSquare className="h-8 w-8 text-primary" />,
    title: 'Poem Generator',
    description: 'Craft beautiful poems in various styles. Provide a theme, choose a style, and add keywords to inspire the muse.',
    href: '/poem'
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Essay Composer',
    description: 'Create well-structured essays. Specify a topic, tone, and structure to generate compelling arguments or narratives.',
    href: '/essay'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Blog Post Smith',
    description: 'Generate blog posts tailored to your needs. Define the industry, topic, and audience to create engaging content.',
    href: '/blog'
  },
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: 'Email Generator',
    description: 'Create emails for any occasion. From formal cover letters to friendly marketing messages, let AI handle the draft.',
    href: '/email'
  },
  {
    icon: <BookTextIcon className="h-8 w-8 text-primary" />,
    title: 'Story Generator',
    description: 'Bring your ideas to life. Define the genre, characters, and plot to create a unique story, chapter by chapter.',
    href: '/story'
  },
  {
    icon: <UserCircle className="h-8 w-8 text-primary" />,
    title: 'Biography Generator',
    description: 'Detail the lives of fascinating individuals. Provide key facts and a desired tone to generate a compelling biography.',
    href: '/biography'
  },
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: 'Article Writer',
    description: 'Produce well-researched articles on any topic, optimized for your target outlet and audience.',
    href: '/article'
  },
];

const recentCreations = [
  {
    type: 'Story',
    title: 'The Clockwork Detective',
    href: '/story',
  },
  {
    type: 'Poem',
    title: 'Ode to a Forgotten Star',
    href: '/poem',
  },
  {
    type: 'Blog Post',
    title: '5 Ways AI is Changing Art',
    href: '/blog',
  }
];

const writingPrompts = [
    {
        prompt: "A chef discovers they can cook emotions into their food. What happens when they serve a meal at a tense diplomatic dinner?",
        generator: "Story",
        href: "/story"
    },
    {
        prompt: "Write a formal complaint email to a company that sells faulty time machines.",
        generator: "Email",
        href: "/email"
    },
    {
        prompt: "Craft a poem about the silence between lightning and thunder.",
        generator: "Poem",
        href: "/poem"
    }
];


export default function HomePage() {
  const { user, logout } = useUser();
  const { theme, setTheme } = useTheme();
  const avatarFallback = user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/home">
            <h1 className="text-3xl font-bold font-headline text-primary">Bardly</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 flex items-center gap-2 rounded-full px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block font-medium">{user.name || 'Guest'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="text-center py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">Unleash Your Inner Wordsmith</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Bardly is your AI-powered partner for creative writing. Generate poems, essays, blog posts, emails, and even multi-chapter stories with ease.
            </p>
            <Button size="lg" asChild className="rounded-full px-8 shadow-md">
              <Link href="/poem">Start Creating Now</Link>
            </Button>
          </div>
        </section>

        <section id="recent-creations" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold font-headline">My Recent Creations</h3>
                <p className="text-lg text-muted-foreground mt-2">Jump back into your latest work.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentCreations.map((creation) => (
                        <Link href={creation.href} key={creation.title}>
                            <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <CardHeader>
                                    <CardDescription>{creation.type}</CardDescription>
                                    <CardTitle className="font-headline text-xl">{creation.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow"></CardContent>
                                <div className="p-6 pt-0 text-primary font-semibold flex items-center">
                                    Continue Writing <ArrowRight className="ml-2 h-4 w-4"/>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold font-headline">Features for Every Writer</h3>
              <p className="text-lg text-muted-foreground mt-2">Everything you need to fight writer's block.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="block hover:no-underline">
                    <Card className="h-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {feature.icon}
                        </div>
                        <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="inspiration-corner" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold font-headline flex items-center justify-center gap-3"><Lightbulb className="h-8 w-8 text-primary"/>Inspiration Corner</h3>
                    <p className="text-lg text-muted-foreground mt-2">Stuck? Try one of these creative prompts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {writingPrompts.map((prompt) => (
                        <Link href={prompt.href} key={prompt.prompt}>
                           <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                                <CardContent className="pt-6">
                                    <p className="italic text-lg">"{prompt.prompt}"</p>
                                </CardContent>
                                <div className="p-6 pt-0 text-primary font-semibold flex items-center">
                                    Use {prompt.generator} Generator <ArrowRight className="ml-2 h-4 w-4"/>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        <section id="featured-generator" className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 rounded-2xl shadow-xl">
                    <div className="md:w-1/2">
                        <h3 className="text-3xl md:text-4xl font-bold font-headline mb-4 flex items-center gap-3"><Star className="h-8 w-8 text-primary" /> Featured: Story Generator</h3>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Got a big idea? Our Story Generator helps you bring it to life, one chapter at a time. Define your world, create memorable characters, and outline your plot. Bardly will write the chapters, providing the perfect tool to build your next novel.
                        </p>
                        <Button size="lg" asChild className="rounded-full shadow-md">
                           <Link href="/story">Start Your Epic</Link>
                        </Button>
                    </div>
                     <div className="md:w-1/2">
                        <Image src="https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=800&h=600&auto=format&fit=crop" data-ai-hint="books library" alt="A collection of old books" width={800} height={600} className="rounded-xl shadow-lg w-full" />
                    </div>
                </Card>
            </div>
        </section>

      </main>
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="font-medium">&copy; {new Date().getFullYear()} Bardly. Crafted for creators.</p>
        </div>
      </footer>
    </div>
  );
}
