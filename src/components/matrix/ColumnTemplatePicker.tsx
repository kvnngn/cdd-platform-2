'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COLUMN_TEMPLATES, searchTemplates, getSuggestedTemplatesForNode } from '@/data/columnTemplates';
import { MatrixColumnTemplate } from '@/types/matrix';
import { Search, DollarSign, TrendingUp, Package, Target, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColumnTemplatePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (templateIds: string[], autoGenerate?: boolean) => void;
  sourceCount: number;
  nodeId?: string;
}

const CATEGORY_ICONS: Record<MatrixColumnTemplate['category'], React.ReactNode> = {
  financial: <DollarSign className="w-4 h-4" />,
  market: <TrendingUp className="w-4 h-4" />,
  product: <Package className="w-4 h-4" />,
  competitive: <Target className="w-4 h-4" />,
  custom: <Plus className="w-4 h-4" />,
};

const CATEGORY_LABELS: Record<MatrixColumnTemplate['category'], string> = {
  financial: 'Financial',
  market: 'Market',
  product: 'Product',
  competitive: 'Competitive',
  custom: 'Custom',
};

export function ColumnTemplatePicker({
  open,
  onClose,
  onSelect,
  sourceCount,
  nodeId,
}: ColumnTemplatePickerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MatrixColumnTemplate['category'] | 'all'>('all');

  // Get suggested templates for this node
  const suggestedTemplateIds = useMemo(() => {
    if (!nodeId) return [];
    return getSuggestedTemplatesForNode(nodeId);
  }, [nodeId]);

  const suggestedTemplates = useMemo(() => {
    return COLUMN_TEMPLATES.filter(t => suggestedTemplateIds.includes(t.id));
  }, [suggestedTemplateIds]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let templates = COLUMN_TEMPLATES;

    // Filter by category
    if (activeCategory !== 'all') {
      templates = templates.filter(t => t.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      templates = searchTemplates(searchQuery);
      if (activeCategory !== 'all') {
        templates = templates.filter(t => t.category === activeCategory);
      }
    }

    return templates;
  }, [activeCategory, searchQuery]);

  // Group by category for "all" view - sort suggested templates first
  const templatesByCategory = useMemo(() => {
    const grouped = new Map<MatrixColumnTemplate['category'], MatrixColumnTemplate[]>();

    // Sort templates so suggested ones come first
    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
      const aIsSuggested = suggestedTemplateIds.includes(a.id);
      const bIsSuggested = suggestedTemplateIds.includes(b.id);
      if (aIsSuggested && !bIsSuggested) return -1;
      if (!aIsSuggested && bIsSuggested) return 1;
      return 0;
    });

    sortedTemplates.forEach(template => {
      const existing = grouped.get(template.category) || [];
      existing.push(template);
      grouped.set(template.category, existing);
    });
    return grouped;
  }, [filteredTemplates, suggestedTemplateIds]);

  const toggleTemplate = (templateId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(templateId)) {
      newSelected.delete(templateId);
    } else {
      newSelected.add(templateId);
    }
    setSelectedIds(newSelected);
  };

  const handleConfirm = (autoGenerate: boolean = false) => {
    onSelect(Array.from(selectedIds), autoGenerate);
    setSelectedIds(new Set());
    setSearchQuery('');
    setActiveCategory('all');
    onClose();
  };

  const totalCellsToGenerate = selectedIds.size * sourceCount;

  const handleCancel = () => {
    setSelectedIds(new Set());
    setSearchQuery('');
    setActiveCategory('all');
    onClose();
  };

  const renderTemplate = (template: MatrixColumnTemplate, isSuggested: boolean = false) => {
    const isSelected = selectedIds.has(template.id);

    return (
      <Card
        key={template.id}
        className={cn(
          'p-3 cursor-pointer transition-all',
          isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'hover:bg-muted'
        )}
        onClick={() => toggleTemplate(template.id)}
      >
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleTemplate(template.id)}
            onClick={e => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm">{template.description}</h3>
              <Badge variant="outline" className="text-xs font-mono shrink-0">
                {template.label}
              </Badge>
              {isSuggested && (
                <Badge variant="secondary" className="text-xs gap-1 shrink-0">
                  <Sparkles className="w-3 h-3" />
                  Suggested
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {template.prompt}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Columns from Templates</DialogTitle>
          <DialogDescription>
            Select one or more column templates to add to your matrix.
            Each template includes a predefined prompt and examples.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="pl-9"
          />
        </div>

        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={v => setActiveCategory(v as typeof activeCategory)}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start flex-shrink-0">
            <TabsTrigger value="all">All ({COLUMN_TEMPLATES.length})</TabsTrigger>
            <TabsTrigger value="financial">
              Financial ({COLUMN_TEMPLATES.filter(t => t.category === 'financial').length})
            </TabsTrigger>
            <TabsTrigger value="market">
              Market ({COLUMN_TEMPLATES.filter(t => t.category === 'market').length})
            </TabsTrigger>
            <TabsTrigger value="product">
              Product ({COLUMN_TEMPLATES.filter(t => t.category === 'product').length})
            </TabsTrigger>
            <TabsTrigger value="competitive">
              Competitive ({COLUMN_TEMPLATES.filter(t => t.category === 'competitive').length})
            </TabsTrigger>
          </TabsList>

          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto mt-4 min-h-0">
            <TabsContent value="all" className="mt-0">
              {templatesByCategory.size === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No templates found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-6">
                  {Array.from(templatesByCategory.entries()).map(([category, templates]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        {CATEGORY_ICONS[category]}
                        <h3 className="font-semibold text-sm">{CATEGORY_LABELS[category]}</h3>
                        <Badge variant="secondary">{templates.length}</Badge>
                      </div>
                      <div className="grid gap-3">
                        {templates.map(t => renderTemplate(t, suggestedTemplateIds.includes(t.id)))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {(['financial', 'market', 'product', 'competitive'] as const).map(category => {
              // Sort templates so suggested ones come first
              const sortedTemplates = [...filteredTemplates].sort((a, b) => {
                const aIsSuggested = suggestedTemplateIds.includes(a.id);
                const bIsSuggested = suggestedTemplateIds.includes(b.id);
                if (aIsSuggested && !bIsSuggested) return -1;
                if (!aIsSuggested && bIsSuggested) return 1;
                return 0;
              });

              return (
                <TabsContent key={category} value={category} className="mt-0">
                  {filteredTemplates.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No templates found
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {sortedTemplates.map(t => renderTemplate(t, suggestedTemplateIds.includes(t.id)))}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>

        {/* Impact Summary */}
        {selectedIds.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-blue-900">
                  {selectedIds.size} column{selectedIds.size > 1 ? 's' : ''} selected
                </p>
                <p className="text-blue-700 text-xs mt-1">
                  {totalCellsToGenerate} cells will be generated ({selectedIds.size} columns × {sourceCount} documents)
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t pt-4 gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm(true)}
            disabled={selectedIds.size === 0}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Add {selectedIds.size > 0 && `${selectedIds.size} `}Column{selectedIds.size !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
