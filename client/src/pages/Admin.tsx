import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

// ---------------------------------------------------------
// 🔐 AUTH CHECK – added safely without touching the rest
// ---------------------------------------------------------
export default function Admin() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      setLocation("/admin-login");
    }
  }, []);

  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Cap's FITNESS Team");
  const [category, setCategory] = useState("Fitness Tips");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const createPostMutation = useMutation({
    mutationFn: async (post: { title: string; content: string; author: string; category: string }) => {
      const res = await apiRequest("POST", "/api/blog-posts", post);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setTitle("");
      setContent("");
      setAuthor("Anto (Cap)");
      setCategory("Fitness Tips");
      toast({
        title: "Success!",
        description: "Blog post created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/blog-posts/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success!",
        description: "Blog post deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate({ title, content, author, category });
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <Button
          variant="ghost"
          onClick={() => setLocation("/blog")}
          className="mb-8"
          data-testid="button-back-blog"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <div className="flex justify-end mb-4">
          {/* 🔐 LOGOUT BUTTON */}
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              setLocation("/admin-login");
            }}
          >
            Logout
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage fitness blog posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Post
              </CardTitle>
              <CardDescription>
                Share fitness tips, workouts, and nutrition advice with your community
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      placeholder="Author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fitness Tips">Fitness Tips</SelectItem>
                        <SelectItem value="Nutrition">Nutrition</SelectItem>
                        <SelectItem value="Strength Training">Strength Training</SelectItem>
                        <SelectItem value="Recovery">Recovery</SelectItem>
                        <SelectItem value="Motivation">Motivation</SelectItem>
                        <SelectItem value="Workouts">Workouts</SelectItem>
                        <SelectItem value="Fat Loss">Fat loss</SelectItem>
                        <SelectItem value="Fitness Education">Fitness Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">
                    Content <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={createPostMutation.isPending}>
                  {createPostMutation.isPending ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Published Posts</CardTitle>
                <CardDescription>Manage your existing blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-5 bg-muted rounded mb-2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {posts.map((post) => (
                      <Card key={post.id} className="hover-elevate">
                        <CardHeader className="space-y-3 pb-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <CardTitle className="text-base leading-tight">
                                {post.title}
                              </CardTitle>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePostMutation.mutate(post.id)}
                              disabled={deletePostMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.createdAt)}</span>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No posts yet. Create your first post above!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
