import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Book, Trophy } from "lucide-react";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Design System v1.0</h1>

      <div className="grid gap-8 max-w-4xl mx-auto">
        
        {/* BUTTONS SECTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button>
              <Activity className="mr-2 h-4 w-4" /> With Icon
            </Button>
          </div>
        </section>

        {/* CARDS SECTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-blue-500" />
                  Journal Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  This is how a journal card will look. It has padding, a border, and a clean shadow.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Dark Mode Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  We can easily override styles using Tailwind classes directly on the component.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* INPUTS SECTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Inputs</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" placeholder="dev@example.com" />
              </div>
              
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="••••••••" />
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}