'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { SynthesisStrategy, SelectionGeometry } from '@/types/matrix';
import { CheckCircle2, TrendingUp, FileText, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SynthesisStrategyModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (strategy: SynthesisStrategy) => void;
  geometry: SelectionGeometry;
  recommendedStrategy: SynthesisStrategy;
}

const STRATEGY_INFO: Record<
  SynthesisStrategy,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    when: string;
    badge?: string;
  }
> = {
  reliable_source: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: 'Reliable Source',
    description: 'Select the most authoritative and reliable source from your selection.',
    when: 'When you want a single, trusted data point',
    badge: 'User Choice',
  },
  intelligent_average: {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Intelligent Average',
    description: 'Create a weighted consensus across all selected sources.',
    when: 'When you want to aggregate multiple perspectives',
    badge: 'User Choice',
  },
  row_synthesis: {
    icon: <FileText className="w-5 h-5" />,
    title: 'Row Synthesis',
    description: 'Synthesize insights from different analysis angles for the same document.',
    when: 'Automatically applied for same-row selections',
    badge: 'Auto',
  },
  global_synthesis: {
    icon: <Globe className="w-5 h-5" />,
    title: 'Global Synthesis',
    description: 'Comprehensive synthesis across multiple documents and analysis dimensions.',
    when: 'Automatically applied for mixed selections',
    badge: 'Auto',
  },
};

export function SynthesisStrategyModal({
  open,
  onClose,
  onSelect,
  geometry,
  recommendedStrategy,
}: SynthesisStrategyModalProps) {
  // Determine available strategies based on geometry
  const availableStrategies: SynthesisStrategy[] =
    geometry.type === 'same_column'
      ? ['reliable_source', 'intelligent_average']
      : geometry.type === 'same_row'
      ? ['row_synthesis']
      : ['global_synthesis'];

  const handleSelect = (strategy: SynthesisStrategy) => {
    onSelect(strategy);
    onClose();
  };

  // If only one strategy available, show info modal instead of choice
  const isAutoStrategy = availableStrategies.length === 1;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isAutoStrategy ? 'Synthesis Strategy' : 'Choose Synthesis Strategy'}
          </DialogTitle>
          <DialogDescription>
            {geometry.type === 'same_column' && (
              <>
                You&apos;ve selected <strong>{geometry.cellCount} cells</strong> from the same column
                across <strong>{geometry.sourceIds.length} different documents</strong>.
                Choose how to synthesize them:
              </>
            )}
            {geometry.type === 'same_row' && (
              <>
                You&apos;ve selected <strong>{geometry.cellCount} cells</strong> from the same document
                across <strong>{geometry.columnIds.length} different columns</strong>.
                The system will automatically synthesize insights across these analysis dimensions.
              </>
            )}
            {geometry.type === 'mixed' && (
              <>
                You&apos;ve selected <strong>{geometry.cellCount} cells</strong> across{' '}
                <strong>{geometry.columnIds.length} columns</strong> and{' '}
                <strong>{geometry.sourceIds.length} documents</strong>.
                The system will create a comprehensive global synthesis.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {availableStrategies.map(strategy => {
            const info = STRATEGY_INFO[strategy];
            const isRecommended = strategy === recommendedStrategy;

            return (
              <Card
                key={strategy}
                className={cn(
                  'p-4 cursor-pointer transition-all hover:shadow-md',
                  isRecommended ? 'border-primary bg-primary/5' : 'hover:bg-muted',
                  isAutoStrategy && 'cursor-default'
                )}
                onClick={() => !isAutoStrategy && handleSelect(strategy)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    isRecommended ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  )}>
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{info.title}</h3>
                      {info.badge && (
                        <Badge
                          variant={isRecommended ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {info.badge}
                        </Badge>
                      )}
                      {isRecommended && !isAutoStrategy && (
                        <Badge variant="outline" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {info.description}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {info.when}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <DialogFooter>
          {isAutoStrategy ? (
            <Button onClick={() => handleSelect(availableStrategies[0])}>
              Continue with {STRATEGY_INFO[availableStrategies[0]].title}
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
