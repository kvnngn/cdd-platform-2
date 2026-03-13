import { useState } from 'react';
import { X, Upload, FileText, Building2, Calendar, Users, Briefcase, Sparkles, ChevronRight } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { ProjectTemplate, Project } from '@/types';
import { useAppStore } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';

const TEMPLATES: { id: ProjectTemplate; label: string; description: string; icon: typeof Briefcase }[] = [
  {
    id: 'saas_b2b',
    label: 'SaaS B2B',
    description: 'Retention, ARR, Go-to-market, API Integrations',
    icon: Sparkles,
  },
  {
    id: 'industrial',
    label: 'Industriel',
    description: 'Value chain, Regulations, Capex, Supply chain',
    icon: Building2,
  },
  {
    id: 'retail',
    label: 'Retail / Consumer',
    description: 'Distribution, Saisonnalité, Marque, E-commerce',
    icon: Briefcase,
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Custom structure defined manually',
    icon: FileText,
  },
];

// Pre-filled DataSense example data
const DATASENSE_EXAMPLE = {
  name: 'DataSense — Nordic Capital Acquisition',
  client: 'DataSense SAS',
  acquirer: 'Nordic Capital Partners',
  sector: 'SaaS B2B / Retail Analytics',
  dealSize: '€120M',
  deadline: '2026-03-28',
  description: 'Commercial due diligence on DataSense, B2B SaaS retail analytics platform. Nordic Capital considering acquisition at 8x ARR.',
};

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const navigate = useNavigate();
  const { createProject, currentUser } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate>('saas_b2b');
  const [isLoading, setIsLoading] = useState(false);
  const [useExample, setUseExample] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    acquirer: '',
    sector: '',
    dealSize: '',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 days
    description: '',
  });

  // Apply DataSense example data
  const applyExampleData = () => {
    setFormData(DATASENSE_EXAMPLE);
    setUseExample(true);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (useExample) setUseExample(false);
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.client) return;

    setIsLoading(true);

    // Simulate brief processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newProject = createProject({
      ...formData,
      status: 'in_progress',
      template: selectedTemplate,
      members: currentUser ? [currentUser.id, 'u2', 'u3'] : ['u1', 'u2', 'u3'],
      managerId: currentUser?.id || 'u1',
    });

    setIsLoading(false);
    onClose();
    navigate(`/projects/${newProject.id}/scoping`);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">New CDD Project</h2>
            <p className="text-sm text-slate-400">
              {step === 1 ? 'Choose a template to start' : 'Fill in project information'}
            </p>
          </div>
          {!isLoading && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="px-6 py-3 bg-slate-50 flex items-center gap-2">
          <div
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
            )}
          >
            1
          </div>
          <div className={cn('h-px flex-1', step >= 2 ? 'bg-blue-600' : 'bg-slate-200')} />
          <div
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
            )}
          >
            2
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-4">
              {/* Quick start with example */}
              <div
                onClick={applyExampleData}
                className={cn(
                  'p-4 rounded-xl border-2 cursor-pointer transition-all',
                  useExample
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">Start with DataSense example</h3>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Pre-filled with Nordic Capital — DataSense Acquisition case. Perfect for demo.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span>€120M</span>
                      <span>·</span>
                      <span>SaaS B2B</span>
                      <span>·</span>
                      <span>8 hypotheses</span>
                      <span>·</span>
                      <span>12 sources</span>
                    </div>
                  </div>
                  <ChevronRight className={cn('w-5 h-5', useExample ? 'text-blue-500' : 'text-slate-300')} />
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 py-2">— or choose an empty template —</div>

              {/* Template grid */}
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setUseExample(false);
                      }}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        selectedTemplate === template.id && !useExample
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                            selectedTemplate === template.id && !useExample
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-500'
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900 text-sm">{template.label}</h3>
                          <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Form fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="CDD [Target] — [Deal Type] [Acquirer]"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client (Target)</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      placeholder="Nom de la société"
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Acquirer</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.acquirer}
                      onChange={(e) => handleInputChange('acquirer', e.target.value)}
                      placeholder="Investment Fund / Industrial"
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Sector</label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => handleInputChange('sector', e.target.value)}
                    placeholder="ex: SaaS B2B / Retail Analytics"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Deal size</label>
                  <input
                    type="text"
                    value={formData.dealSize}
                    onChange={(e) => handleInputChange('dealSize', e.target.value)}
                    placeholder="ex: €120M"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Deadline</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description / Brief</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Mission context, objectives, key points of attention..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* File upload area (mock) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Data Room (optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Drag and drop your files here</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, Excel, Word — Maximum 50MB</p>
                  <p className="text-xs text-blue-600 mt-2">or click to browse</p>
                </div>
                {useExample && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    12 pre-loaded sources (Financial Model, Gartner, Interviews...)
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!formData.name || !formData.client || isLoading}
                className={cn(
                  'px-5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
                  !formData.name || !formData.client || isLoading
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    Create Project
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
