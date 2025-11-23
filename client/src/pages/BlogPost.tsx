import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogPostPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const post = posts?.find((p) => p.id.toString() === id);


  if (!post) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <Button variant="ghost" onClick={() => setLocation("/blog")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-4">{post.title}</CardTitle>

            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US")}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-lg whitespace-pre-line leading-relaxed">{post.content}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
