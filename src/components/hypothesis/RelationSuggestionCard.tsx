import { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Hypothesis } from '@/types';
import { RelationSuggestion } from '@/services/hypothesisRelationDetector';

interface RelationSuggestionCardProps {
  suggestion: RelationSuggestion;
  hypothesis: Hypothesis;
  onAccept: () => void;
  onReject: () => void;
  onChangeType: (newType: 'supports' | 'contradicts' | 'nuances') => void;
}

const TYPE_CONFIG = {
  supports: {
    icon: '✓',
    label: 'Supports',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    hoverBg: 'hover:bg-emerald-200',
  },
  contradicts: {
    icon: '✗',
    label: 'Contradicts',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    borderColor: 'border-red-300',
    hoverBg: 'hover:bg-red-200',
  },
  nuances: {
    icon: '≈',
    label: 'Nuances',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-300',
    hoverBg: 'hover:bg-amber-200',
  },
};

export function RelationSuggestionCard({
  suggestion,
  hypothesis,
  onAccept,
  onReject,
  onChangeType,
}: RelationSuggestionCardProps) {
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const config = TYPE_CONFIG[suggestion.type];

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      onAccept();
    }, 200);
  };

  const handleReject = () => {
    setIsRejecting(true);
    setTimeout(() => {
      onReject();
    }, 300);
  };

  const handleChangeType = (newType: 'supports' | 'contradicts' | 'nuances') => {
    onChangeType(newType);
    setShowTypeMenu(false);
  };

  // Truncate hypothesis title if too long
  const truncatedTitle = hypothesis.title.length > 80
    ? hypothesis.title.substring(0, 80) + '...'
    : hypothesis.title;

  return (
    <div
      className={cn(
        'border rounded-lg overflow-hidden transition-all duration-300',
        isAccepting && 'opacity-0 scale-95',
        isRejecting && 'opacity-0 -translate-x-4',
        !isAccepting && !isRejecting && 'opacity-100',
        config.borderColor,
        'bg-white shadow-sm hover:shadow-md'
      )}
    >
      <div className="px-3 py-3">
        {/* Hypothesis Title */}
        <div className="mb-2">
          <p className="text-sm text-slate-700 leading-snug">
            {truncatedTitle}
          </p>
        </div>

        {/* Relation Type Badge & Confidence */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold',
              config.bgColor,
              config.textColor
            )}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>
          <span className="text-xs font-medium text-slate-500">
            {suggestion.confidence}%
          </span>
        </div>

        {/* Explanation */}
        <div className="flex items-start gap-1.5 mb-3 px-2 py-1.5 bg-slate-50 rounded">
          <span className="text-xs shrink-0 mt-0.5">💡</span>
          <p className="text-xs text-slate-600 leading-relaxed">
            {suggestion.explanation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Accept Button */}
          <button
            onClick={handleAccept}
            disabled={isAccepting || isRejecting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            title="Accept this suggestion"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept</span>
          </button>

          {/* Change Type Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTypeMenu(!showTypeMenu)}
              disabled={isAccepting || isRejecting}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded hover:bg-slate-200 transition-colors disabled:opacity-50"
              title="Change relationship type"
            >
              <span>⚡</span>
              <span>Change Type</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Type Menu */}
            {showTypeMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-10 min-w-[140px]">
                {(Object.keys(TYPE_CONFIG) as Array<'supports' | 'contradicts' | 'nuances'>).map(type => {
                  const typeConfig = TYPE_CONFIG[type];
                  const isCurrentType = type === suggestion.type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleChangeType(type)}
                      disabled={isCurrentType}
                      className={cn(
                        'w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2',
                        isCurrentType
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'hover:bg-slate-50 text-slate-700'
                      )}
                    >
                      <span className={cn(
                        'w-5 h-5 rounded flex items-center justify-center text-xs font-bold',
                        isCurrentType ? 'bg-slate-200 text-slate-400' : typeConfig.bgColor + ' ' + typeConfig.textColor
                      )}>
                        {typeConfig.icon}
                      </span>
                      <span>{typeConfig.label}</span>
                      {isCurrentType && <span className="ml-auto text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            disabled={isAccepting || isRejecting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Reject this suggestion"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>
        </div>

        {/* Key Factors (Optional - for debugging) */}
        {suggestion.keyFactors.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">
              Key Factors
            </p>
            <div className="flex flex-wrap gap-1">
              {suggestion.keyFactors.map((factor, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
