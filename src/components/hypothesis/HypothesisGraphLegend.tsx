export function HypothesisGraphLegend() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3 text-xs">
      <h4 className="font-semibold text-slate-700 mb-2">Legend</h4>

      {/* Node Status */}
      <div className="mb-3">
        <p className="text-slate-500 mb-1 text-[10px] uppercase tracking-wide">Status</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-slate-600">Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-600">Validated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-600">Rejected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600">On Hold</span>
          </div>
        </div>
      </div>

      {/* Edge Types */}
      <div>
        <p className="text-slate-500 mb-1 text-[10px] uppercase tracking-wide">Relations</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-green-500" />
            <span className="text-slate-600">Supports</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="32" height="2" className="shrink-0">
              <line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>
            <span className="text-slate-600">Contradicts</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="32" height="2" className="shrink-0">
              <line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
            </svg>
            <span className="text-slate-600">Nuances</span>
          </div>
        </div>
      </div>
    </div>
  );
}
