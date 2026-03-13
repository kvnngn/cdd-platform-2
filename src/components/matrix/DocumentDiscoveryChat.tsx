'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChatMessage } from '@/types/matrix';
import { searchWithAgent } from '@/services/semanticSearch';
import { SOURCES } from '@/data/mockData';
import { Loader2, ChevronDown, ChevronUp, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentDiscoveryChatProps {
  nodeId: string;
  onValidate: (selectedSourceIds: string[], searchPrompt: string) => void;
  initialPrompt?: string;
}

export function DocumentDiscoveryChat({
  nodeId,
  onValidate,
  initialPrompt = '',
}: DocumentDiscoveryChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialPrompt);
  const [lastSearchPrompt, setLastSearchPrompt] = useState(initialPrompt);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestedSourceIds, setSuggestedSourceIds] = useState<string[]>([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState<Set<string>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    const searchPrompt = input.trim();
    setIsSearching(true);
    setSuggestedSourceIds([]);
    setSelectedSourceIds(new Set());

    try {
      const result = await searchWithAgent(searchPrompt, nodeId);

      setMessages(result.conversation);
      setSuggestedSourceIds(result.suggestedSources);
      setLastSearchPrompt(searchPrompt);

      // Auto-select all suggestions by default
      setSelectedSourceIds(new Set(result.suggestedSources));
    } catch (error) {
      console.error('Search failed:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'agent',
          content: 'Sorry, something went wrong with the search. Please try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSearching(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleSource = (sourceId: string) => {
    const newSelected = new Set(selectedSourceIds);
    if (newSelected.has(sourceId)) {
      newSelected.delete(sourceId);
    } else {
      newSelected.add(sourceId);
    }
    setSelectedSourceIds(newSelected);
  };

  const toggleSteps = (messageId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const handleValidate = () => {
    onValidate(Array.from(selectedSourceIds), lastSearchPrompt);
  };

  const examplePrompts = [
    'Documents about European market TAM',
    'Competitor pricing and unit economics',
    'Customer satisfaction and NPS benchmarks',
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isSearching && (
          <div className="text-center text-muted-foreground py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Discover Documents with AI</p>
            <p className="text-sm mb-4">
              Describe what you&apos;re looking for and I&apos;ll help you find relevant documents.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium">Try asking:</p>
              {examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="block mx-auto text-xs text-primary hover:underline"
                >
                  &quot;{prompt}&quot;
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <Card
              className={cn(
                'max-w-[80%] p-3',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {message.content}
              </div>

              {/* Agent thinking steps */}
              {message.role === 'agent' && message.metadata?.searchSteps && (
                <div className="mt-3 pt-3 border-t border-border">
                  <button
                    onClick={() => toggleSteps(message.id)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {expandedSteps[message.id] ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {message.metadata.searchSteps.length} steps completed
                  </button>

                  {expandedSteps[message.id] && (
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {message.metadata.searchSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Card>
          </div>
        ))}

        {isSearching && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-3 bg-muted">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching documents...
              </div>
            </Card>
          </div>
        )}

        {/* Document suggestions */}
        {suggestedSourceIds.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-medium">
                Suggested Documents ({selectedSourceIds.size}/{suggestedSourceIds.length} selected)
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedSourceIds(new Set(suggestedSourceIds))}
                >
                  Select All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedSourceIds(new Set())}
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {suggestedSourceIds.map(sourceId => {
                const source = SOURCES.find(s => s.id === sourceId);
                if (!source) return null;

                const isSelected = selectedSourceIds.has(sourceId);

                return (
                  <Card
                    key={sourceId}
                    className={cn(
                      'p-3 cursor-pointer transition-colors',
                      isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    )}
                    onClick={() => toggleSource(sourceId)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSource(sourceId)}
                        onClick={e => e.stopPropagation()}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{source.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {source.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {source.fileType || source.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(source.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 space-y-3">
        {selectedSourceIds.size > 0 && (
          <Button
            onClick={handleValidate}
            className="w-full"
            size="lg"
          >
            Validate Selection ({selectedSourceIds.size} documents)
          </Button>
        )}

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe what documents you're looking for..."
            disabled={isSearching}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={!input.trim() || isSearching}
            size="icon"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
