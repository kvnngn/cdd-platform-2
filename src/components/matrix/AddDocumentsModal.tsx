'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { SOURCES, ALL_SOURCES, CONNECTORS } from '@/data/mockData';
import { FileText, Search, Check, Plus, AlertCircle, Sparkles, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SourceLogo } from '@/components/ui/SourceLogo';
import { RelevanceBadge } from '@/components/ui/Badge';
import { calculateCombinedScore } from '@/services/semanticSearch';
import { ConnectorProvider } from '@/types';

interface AddDocumentsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[], autoGenerate?: boolean) => void;
  currentSourceIds: string[];
  columnCount: number;
  scopePrompt: string;
}

export function AddDocumentsModal({
  open,
  onClose,
  onConfirm,
  currentSourceIds,
  columnCount,
  scopePrompt,
}: AddDocumentsModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnectors, setSelectedConnectors] = useState<ConnectorProvider[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Helper function to check if source has a real logo
  const hasRealLogo = (source: typeof SOURCES[0]): boolean => {
    // Has connector (real logo)
    if (source.connectorId) return true;

    // Data room (Datasite logo)
    if (source.category === 'data_room') return true;

    // API sources (Bloomberg, Capital IQ, etc.)
    if (source.category === 'api') return true;

    // Web sources
    if (source.category === 'web') return true;

    // Premium reports with known logos
    if (source.category === 'premium_report' && source.author) {
      const authorLower = source.author.toLowerCase();
      return authorLower.includes('gartner') ||
             authorLower.includes('euromonitor') ||
             authorLower.includes('mergermarket');
    }

    return false;
  };

  // Filter out already added sources AND keep only sources with real logos
  const availableSources = useMemo(
    () => ALL_SOURCES.filter(s => !currentSourceIds.includes(s.id) && hasRealLogo(s)),
    [currentSourceIds]
  );

  // Calculate total available sources with real logos (constant)
  const totalAvailableCount = useMemo(
    () => ALL_SOURCES.filter(s => hasRealLogo(s)).length,
    []
  );

  // Get unique connectors from available sources
  const availableConnectors = useMemo(() => {
    const connectorIds = new Set<ConnectorProvider>();
    availableSources.forEach(source => {
      if (source.connectorId) {
        connectorIds.add(source.connectorId as ConnectorProvider);
      } else if (source.category === 'data_room') {
        connectorIds.add('datasite' as ConnectorProvider);
      } else if (source.category === 'api') {
        // Map API sources to Bloomberg connector
        connectorIds.add('bloomberg' as ConnectorProvider);
      } else if (source.category === 'web') {
        // Map Web sources to Capital IQ connector (or create a "Web" connector)
        connectorIds.add('capitaliq' as ConnectorProvider);
      }
    });
    return CONNECTORS.filter(c => connectorIds.has(c.id));
  }, [availableSources]);

  // Toggle connector filter
  const toggleConnector = (connectorId: ConnectorProvider) => {
    setSelectedConnectors(prev =>
      prev.includes(connectorId)
        ? prev.filter(id => id !== connectorId)
        : [...prev, connectorId]
    );
  };

  // Filter by search query, connector, and sort by relevance score
  const filteredSources = useMemo(() => {
    let filtered = availableSources;

    // Filter by connectors
    if (selectedConnectors.length > 0) {
      filtered = filtered.filter(s => {
        if (s.connectorId) {
          return selectedConnectors.includes(s.connectorId as ConnectorProvider);
        }
        if (s.category === 'data_room') {
          return selectedConnectors.includes('datasite' as ConnectorProvider);
        }
        if (s.category === 'api') {
          return selectedConnectors.includes('bloomberg' as ConnectorProvider);
        }
        if (s.category === 'web') {
          return selectedConnectors.includes('capitaliq' as ConnectorProvider);
        }
        return false;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title.toLowerCase().includes(query) ||
          s.fileName?.toLowerCase().includes(query) ||
          s.author?.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      );
    }

    // Sort by combined relevance score (descending - highest first)
    return filtered
      .map(source => ({
        source,
        score: calculateCombinedScore(source.id, scopePrompt)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.source);
  }, [availableSources, searchQuery, scopePrompt, selectedConnectors]);

  // Cache scores for performance
  const sourceScores = useMemo(() => {
    const scores = new Map<string, number>();
    filteredSources.forEach(source => {
      scores.set(source.id, calculateCombinedScore(source.id, scopePrompt));
    });
    return scores;
  }, [filteredSources, scopePrompt]);

  const toggleSelection = (sourceId: string) => {
    setSelectedIds(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  // Select all / deselect all
  const handleSelectAll = () => {
    if (selectedIds.length === filteredSources.length) {
      // All selected, deselect all
      setSelectedIds([]);
    } else {
      // Select all filtered sources
      setSelectedIds(filteredSources.map(s => s.id));
    }
  };

  const allSelected = filteredSources.length > 0 && selectedIds.length === filteredSources.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < filteredSources.length;

  const handleConfirm = (autoGenerate: boolean = false) => {
    if (selectedIds.length === 0) return;
    onConfirm(selectedIds, autoGenerate);
    setSelectedIds([]);
    setSearchQuery('');
    setSelectedConnectors([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedIds([]);
    setSearchQuery('');
    setSelectedConnectors([]);
    onClose();
  };

  const totalCellsToGenerate = selectedIds.length * columnCount;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownOpen &&
        filterDropdownRef.current &&
        filterButtonRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterDropdownOpen]);

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Documents to Knowledge Base</DialogTitle>
          <DialogDescription>
            Select documents to add to your matrix. Cells will be automatically generated for each new document.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search documents by title, filename, author, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Impact Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1 text-sm">
              <p className="font-medium text-blue-900">
                {selectedIds.length > 0 ? (
                  <>
                    {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''} selected
                    {searchQuery.trim() ? (
                      <>
                        {' · '}<span className="text-blue-700 font-normal">{filteredSources.length} shown of {totalAvailableCount} available</span>
                      </>
                    ) : (
                      <>
                        {' '}<span className="text-blue-700 font-normal">of {totalAvailableCount} available</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {searchQuery.trim() ? (
                      <>
                        {filteredSources.length} document{filteredSources.length !== 1 ? 's' : ''} shown
                        {' '}<span className="text-blue-700 font-normal">of {totalAvailableCount} available</span>
                      </>
                    ) : (
                      <>
                        {totalAvailableCount} document{totalAvailableCount !== 1 ? 's' : ''} available
                        {' '}<span className="text-blue-700 font-normal">(sorted by relevance)</span>
                      </>
                    )}
                  </>
                )}
              </p>
              {selectedIds.length > 0 && (
                <p className="text-blue-700 text-xs mt-1">
                  {totalCellsToGenerate} cells will be generated ({selectedIds.length} documents × {columnCount} columns)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-hidden border rounded-lg flex flex-col">
          {/* Column Header with Filter */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={someSelected && !allSelected ? 'indeterminate' : allSelected}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Documents
              </span>
              {availableConnectors.length > 0 && (
                <div className="relative">
                  <button
                    ref={filterButtonRef}
                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                    className={cn(
                      "p-1 rounded hover:bg-slate-200 transition-colors",
                      selectedConnectors.length > 0 && "bg-blue-100 hover:bg-blue-200"
                    )}
                    title="Filter by source"
                  >
                    <ChevronDown className={cn(
                      "w-4 h-4",
                      selectedConnectors.length > 0 ? "text-blue-600" : "text-slate-500"
                    )} />
                  </button>

                  {/* Filter Dropdown */}
                  {filterDropdownOpen && (
                    <div
                      ref={filterDropdownRef}
                      className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[200px] py-1"
                    >
                      <div className="px-3 py-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-600">Filter by source</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {availableConnectors.map(connector => {
                          const isSelected = selectedConnectors.includes(connector.id);
                          return (
                            <button
                              key={connector.id}
                              onClick={() => toggleConnector(connector.id)}
                              className="w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                              <div className={cn(
                                "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0",
                                isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                              )}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                <img src={connector.logoUrl} alt={connector.name} className="w-full h-full object-contain" />
                              </div>
                              <span className="text-sm text-slate-700">{connector.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {selectedConnectors.length > 0 && (
                        <>
                          <div className="border-t border-slate-100" />
                          <button
                            onClick={() => {
                              setSelectedConnectors([]);
                              setFilterDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                          >
                            Clear filters
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {selectedConnectors.length > 0 && (
              <span className="text-xs text-slate-500">
                {selectedConnectors.length} filter{selectedConnectors.length > 1 ? 's' : ''} active
              </span>
            )}
          </div>

          {/* Documents List Content */}
          <div className="flex-1 overflow-y-auto">
          {filteredSources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-600">
                {availableSources.length === 0
                  ? 'All documents are already added'
                  : 'No documents match your search'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-600 hover:text-blue-700 mt-2"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredSources.map(source => {
                const isSelected = selectedIds.includes(source.id);

                return (
                  <button
                    key={source.id}
                    onClick={() => toggleSelection(source.id)}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors hover:bg-slate-50',
                      isSelected && 'bg-blue-50 hover:bg-blue-100'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div className={cn(
                        'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0',
                        isSelected
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-slate-300 bg-white'
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>

                      {/* Document info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 bg-white border border-slate-200">
                            <SourceLogo source={source} size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-slate-900 truncate flex-1">
                                {source.fileName || source.title}
                              </p>
                              <RelevanceBadge
                                score={sourceScores.get(source.id) || 0}
                                className="shrink-0"
                              />
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {source.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {source.fileType && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                                  {source.fileType.toUpperCase()}
                                </span>
                              )}
                              {source.publishedAt && (
                                <span className="text-xs text-slate-400">
                                  {new Date(source.publishedAt).getFullYear()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConfirm(false)}
            disabled={selectedIds.length === 0}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {selectedIds.length > 0 && `${selectedIds.length} `}Document{selectedIds.length !== 1 ? 's' : ''}
          </Button>
          <Button
            onClick={() => handleConfirm(true)}
            disabled={selectedIds.length === 0}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Add and apply columns
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
