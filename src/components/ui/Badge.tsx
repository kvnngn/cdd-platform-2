import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80",
        outline: "text-slate-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// HypothesisBadge - Badge for hypothesis status
interface HypothesisBadgeProps {
  status: 'draft' | 'validated' | 'rejected' | 'on_hold';
  className?: string;
}

function HypothesisBadge({ status, className }: HypothesisBadgeProps) {
  const config = {
    draft: {
      label: 'Draft',
      variant: 'secondary' as const,
      className: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    validated: {
      label: 'Validated',
      variant: 'default' as const,
      className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    rejected: {
      label: 'Rejected',
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-700 border-red-200',
    },
    on_hold: {
      label: 'On Hold',
      variant: 'outline' as const,
      className: 'bg-amber-100 text-amber-700 border-amber-200',
    },
  };

  const cfg = config[status];

  return (
    <Badge variant={cfg.variant} className={cn(cfg.className, className)}>
      {cfg.label}
    </Badge>
  );
}

// ConfidenceBadge - Badge for confidence score
interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

function ConfidenceBadge({ score, className }: ConfidenceBadgeProps) {
  const getConfig = (score: number) => {
    if (score >= 80) {
      return {
        label: `${score}% confidence`,
        className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      };
    }
    if (score >= 60) {
      return {
        label: `${score}% confidence`,
        className: 'bg-blue-100 text-blue-700 border-blue-200',
      };
    }
    if (score >= 40) {
      return {
        label: `${score}% confidence`,
        className: 'bg-amber-100 text-amber-700 border-amber-200',
      };
    }
    return {
      label: `${score}% confidence`,
      className: 'bg-red-100 text-red-700 border-red-200',
    };
  };

  const cfg = getConfig(score);

  return (
    <Badge variant="outline" className={cn(cfg.className, className)}>
      {cfg.label}
    </Badge>
  );
}

// RelevanceBadge - Badge for document relevance score
interface RelevanceBadgeProps {
  score: number;
  className?: string;
}

function RelevanceBadge({ score, className }: RelevanceBadgeProps) {
  const getConfig = (score: number) => {
    if (score >= 80) {
      return {
        className: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        title: `Relevance score: ${score}% (Reliability × Semantic relevance)\nHigh: Highly relevant and reliable document for this analysis`
      };
    }
    if (score >= 60) {
      return {
        className: 'bg-amber-100 text-amber-700 border-amber-300',
        title: `Relevance score: ${score}% (Reliability × Semantic relevance)\nMedium: Moderately relevant document for this analysis`
      };
    }
    return {
      className: 'bg-red-100 text-red-700 border-red-300',
      title: `Relevance score: ${score}% (Reliability × Semantic relevance)\nLow: Low relevance or limited reliability`
    };
  };

  const cfg = getConfig(score);

  return (
    <Badge
      variant="outline"
      className={cn(cfg.className, 'text-[10px] px-1.5 py-0.5 whitespace-nowrap gap-0.5', className)}
      title={cfg.title}
    >
      <TrendingUp className="w-3 h-3" />
      {score}%
    </Badge>
  );
}

export { Badge, badgeVariants, HypothesisBadge, ConfidenceBadge, RelevanceBadge }
