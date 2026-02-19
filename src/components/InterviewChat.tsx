"use client";

import { useChat } from "ai/react"; // In v3.4.0, everything we need is here
import { Message } from "ai";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, StopCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewChatProps {
  resumeId: string;
}

export function InterviewChat({ resumeId }: InterviewChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/api/chat",
    body: { data: { resumeId } }, 
    initialMessages: [
      {
        id: "intro",
        role: "assistant",
        content: "Hello! I've reviewed your resume. I'm ready to start the interview. Shall we begin with your recent project experience?",
      },
    ],
  });

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-full text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI Hiring Manager</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        {isLoading && (
          <Button variant="ghost" size="sm" onClick={() => stop()} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <StopCircle className="w-4 h-4 mr-2" /> Stop
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.map((m: Message) => (
          <div
            key={m.id}
            className={cn(
              "flex w-full",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex max-w-[80%] gap-3",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                m.role === "user" ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-600"
              )}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                m.role === "user" 
                  ? "bg-slate-900 text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
              )}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex items-center gap-2 text-xs text-slate-400 ml-12">
              <Loader2 className="w-3 h-3 animate-spin" />
              AI is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your answer..."
            className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}