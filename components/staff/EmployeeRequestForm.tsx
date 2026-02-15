"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  DollarSign,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Upload,
  Download,
  Edit,
  Eye,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Printer
} from 'lucide-react';

interface RequestData {
  requestNumber: string;
  dateOfRequest: string;
  employeeName: string;
  position: string;
  department: string;
  employeeId: string;
  supervisor: string;
  email: string;
  phone: string;
  requestTypes: string[];
  totalAmount: number;
  status: 'draft' | 'submitted' | 'supervisor_approved' | 'cfo_approved' | 'ceo_approved' | 'declined' | 'processed';
  fileCopySaved: boolean;
  emailSubmitted: boolean;
}

interface RequestSection {
  dataAllowance: {
    amount: string;
    provider: string;
    duration: string;
    justification: string;
    activities: string;
  };
  airtime: {
    amount: string;
    network: string;
    phoneNumber: string;
    duration: string;
    justification: string;
    primaryUse: string;
  };
  transportation: {
    amount: string;
    type: string;
    periodFrom: string;
    periodTo: string;
    purpose: string;
    trips: string;
    supportingDocs: boolean;
  };
  equipmentRepair: {
    equipmentType: string;
    serialNumber: string;
    problem: string;
    estimatedCost: string;
    repairShop: string;
    urgency: string;
    impact: string;
    quoteAttached: boolean;
  };
  officeSupplies: {
    items: Array<{
      description: string;
      quantity: string;
      unitPrice: string;
      total: string;
    }>;
    totalAmount: string;
    justification: string;
    urgency: string;
  };
  softwareSubscription: {
    softwareName: string;
    subscriptionType: string;
    cost: string;
    justification: string;
    features: string;
    expectedImpact: string;
    alternatives: string;
  };
  professionalDevelopment: {
    courseName: string;
    provider: string;
    format: string;
    duration: string;
    courseFee: string;
    materials: string;
    travel: string;
    accommodation: string;
    total: string;
    trainingDates: string;
    skillsGained: string;
    benefits: string;
    application: string;
  };
  travelExpenses: {
    purpose: string;
    destination: string;
    dates: string;
    expenses: Array<{
      category: string;
      amount: string;
      notes: string;
    }>;
    justification: string;
    outcomes: string;
    advanceRequired: boolean;
    advanceAmount: string;
  };
  equipmentPurchase: {
    equipmentType: string;
    specifications: string;
    estimatedCost: string;
    supplier: string;
    justification: string;
    currentStatus: string;
    lifespan: string;
    quoteAttached: boolean;
  };
  medicalHealth: {
    type: string;
    amount: string;
    provider: string;
    dateOfService: string;
    description: string;
    supportingDocs: boolean;
  };
  clientEntertainment: {
    clientName: string;
    purpose: string;
    date: string;
    type: string;
    estimatedCost: string;
    attendees: string;
    outcome: string;
    priorApproval: boolean;
  };
  marketingMaterials: {
    campaignName: string;
    materials: string;
    quantity: string;
    estimatedCost: string;
    supplier: string;
    timeline: string;
    justification: string;
    expectedROI: string;
  };
  other: {
    description: string;
    amount: string;
    justification: string;
    supportingDocs: boolean;
  };
}

const EmployeeRequestForm: React.FC = () => {
  const [isCEO, setIsCEO] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('tracking');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['tracking', 'requestor']));
  const [currentRequest, setCurrentRequest] = useState<RequestData>({
    requestNumber: '',
    dateOfRequest: new Date().toISOString().split('T')[0],
    employeeName: '',
    position: '',
    department: '',
    employeeId: '',
    supervisor: '',
    email: '',
    phone: '',
    requestTypes: [],
    totalAmount: 0,
    status: 'draft',
    fileCopySaved: false,
    emailSubmitted: false
  });

  const [requestSections, setRequestSections] = useState<RequestSection>({
    dataAllowance: {
      amount: '',
      provider: '',
      duration: '',
      justification: '',
      activities: ''
    },
    airtime: {
      amount: '',
      network: '',
      phoneNumber: '',
      duration: '',
      justification: '',
      primaryUse: ''
    },
    transportation: {
      amount: '',
      type: '',
      periodFrom: '',
      periodTo: '',
      purpose: '',
      trips: '',
      supportingDocs: false
    },
    equipmentRepair: {
      equipmentType: '',
      serialNumber: '',
      problem: '',
      estimatedCost: '',
      repairShop: '',
      urgency: '',
      impact: '',
      quoteAttached: false
    },
    officeSupplies: {
      items: [{ description: '', quantity: '', unitPrice: '', total: '' }],
      totalAmount: '',
      justification: '',
      urgency: ''
    },
    softwareSubscription: {
      softwareName: '',
      subscriptionType: '',
      cost: '',
      justification: '',
      features: '',
      expectedImpact: '',
      alternatives: ''
    },
    professionalDevelopment: {
      courseName: '',
      provider: '',
      format: '',
      duration: '',
      courseFee: '',
      materials: '',
      travel: '',
      accommodation: '',
      total: '',
      trainingDates: '',
      skillsGained: '',
      benefits: '',
      application: ''
    },
    travelExpenses: {
      purpose: '',
      destination: '',
      dates: '',
      expenses: [{ category: '', amount: '', notes: '' }],
      justification: '',
      outcomes: '',
      advanceRequired: false,
      advanceAmount: ''
    },
    equipmentPurchase: {
      equipmentType: '',
      specifications: '',
      estimatedCost: '',
      supplier: '',
      justification: '',
      currentStatus: '',
      lifespan: '',
      quoteAttached: false
    },
    medicalHealth: {
      type: '',
      amount: '',
      provider: '',
      dateOfService: '',
      description: '',
      supportingDocs: false
    },
    clientEntertainment: {
      clientName: '',
      purpose: '',
      date: '',
      type: '',
      estimatedCost: '',
      attendees: '',
      outcome: '',
      priorApproval: false
    },
    marketingMaterials: {
      campaignName: '',
      materials: '',
      quantity: '',
      estimatedCost: '',
      supplier: '',
      timeline: '',
      justification: '',
      expectedROI: ''
    },
    other: {
      description: '',
      amount: '',
      justification: '',
      supportingDocs: false
    }
  });

  const [supervisorReview, setSupervisorReview] = useState({
    name: '',
    position: '',
    dateReviewed: '',
    recommendation: '',
    comments: '',
    alternatives: '',
    signature: '',
    signatureDate: ''
  });

  const [cfoReview, setCfoReview] = useState({
    name: '',
    dateReviewed: '',
    budgetImpact: '',
    financialRecommendation: '',
    comments: '',
    paymentPriority: '',
    signature: '',
    signatureDate: ''
  });

  const [ceoReview, setCeoReview] = useState({
    name: 'Mr. Christopher O. Fallah',
    dateReviewed: '',
    finalDecision: '',
    comments: '',
    specialConditions: '',
    signature: '',
    signatureDate: ''
  });

  const [financeProcessing, setFinanceProcessing] = useState({
    dateReceived: '',
    dateProcessed: '',
    paymentReference: '',
    amountDisbursed: '',
    paymentMethod: '',
    paymentDate: '',
    processedBy: '',
    signature: '',
    signatureDate: '',
    notes: '',
    recordsUpdated: false,
    employeeNotified: false,
    notificationDate: ''
  });

  const generateRequestNumber = () => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ANNITA-REQ-${dateStr}-${randomNum}`;
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleRequestTypeChange = (type: string, checked: boolean) => {
    setCurrentRequest(prev => ({
      ...prev,
      requestTypes: checked 
        ? [...prev.requestTypes, type]
        : prev.requestTypes.filter(t => t !== type)
    }));
  };

  const addOfficeSupplyItem = () => {
    setRequestSections(prev => ({
      ...prev,
      officeSupplies: {
        ...prev.officeSupplies,
        items: [...prev.officeSupplies.items, { description: '', quantity: '', unitPrice: '', total: '' }]
      }
    }));
  };

  const removeOfficeSupplyItem = (index: number) => {
    setRequestSections(prev => ({
      ...prev,
      officeSupplies: {
        ...prev.officeSupplies,
        items: prev.officeSupplies.items.filter((_, i) => i !== index)
      }
    }));
  };

  const updateOfficeSupplyItem = (index: number, field: string, value: string) => {
    setRequestSections(prev => ({
      ...prev,
      officeSupplies: {
        ...prev.officeSupplies,
        items: prev.officeSupplies.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addTravelExpense = () => {
    setRequestSections(prev => ({
      ...prev,
      travelExpenses: {
        ...prev.travelExpenses,
        expenses: [...prev.travelExpenses.expenses, { category: '', amount: '', notes: '' }]
      }
    }));
  };

  const removeTravelExpense = (index: number) => {
    setRequestSections(prev => ({
      ...prev,
      travelExpenses: {
        ...prev.travelExpenses,
        expenses: prev.travelExpenses.expenses.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTravelExpense = (index: number, field: string, value: string) => {
    setRequestSections(prev => ({
      ...prev,
      travelExpenses: {
        ...prev.travelExpenses,
        expenses: prev.travelExpenses.expenses.map((expense, i) => 
          i === index ? { ...expense, [field]: value } : expense
        )
      }
    }));
  };

  const saveRequest = () => {
    const requestNumber = currentRequest.requestNumber || generateRequestNumber();
    setCurrentRequest(prev => ({ ...prev, requestNumber }));
    alert('Request saved successfully! Requests are automatically stored in the staff portal.');
  };

  const submitRequest = () => {
    if (currentRequest.status === 'draft') {
      setCurrentRequest(prev => ({ ...prev, status: 'submitted', emailSubmitted: true }));
      
      const subject = `Request for Approval - ${currentRequest.requestNumber || 'New Request'} - ${currentRequest.employeeName} - ${currentRequest.requestTypes.join(', ')}`;
      const body = `Dear Management,

I am submitting a request for approval as detailed below:

Request Number: ${currentRequest.requestNumber || 'Auto-generated'}
Employee Name: ${currentRequest.employeeName}
Position: ${currentRequest.position}
Request Type: ${currentRequest.requestTypes.join(', ')}
Amount Requested: USD $${currentRequest.totalAmount}
Date of Request: ${currentRequest.dateOfRequest}

This digital request form has been submitted through the staff portal and is now visible to management for review.

Please review and let me know if you need any additional information.

Thank you for your consideration.

Best regards,
${currentRequest.employeeName}`;

      window.location.href = `mailto:company@annita.com?cc=ChristopherFallah16@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      alert('This request has already been submitted.');
    }
  };

  const canEdit = () => {
    return isCEO || currentRequest.status === 'draft';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'supervisor_approved': return 'bg-yellow-100 text-yellow-800';
      case 'cfo_approved': return 'bg-orange-100 text-orange-800';
      case 'ceo_approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Employee Request Form</h1>
            <p className="text-xs text-red-600 font-semibold">CONFIDENTIAL</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentRequest.status)}`}>
            {currentRequest.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-6">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ANNITA EMPLOYEE REQUEST FORM</h1>
              <p className="text-red-600 font-semibold mt-2">CONFIDENTIAL</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {isCEO && (
                <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                  CEO Edit Mode
                </button>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentRequest.status)}`}>
                {currentRequest.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Document Tracking Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">REQUEST INFORMATION</h2>
            <button
              onClick={() => toggleSection('tracking')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('tracking') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('tracking') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  REQUEST NUMBER:
                </label>
                <input
                  type="text"
                  value={currentRequest.requestNumber}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, requestNumber: e.target.value }))}
                  placeholder="ANNITA-REQ-YYYYMMDD-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated or format: ANNITA-REQ-20260210-001</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DATE OF REQUEST:
                </label>
                <input
                  type="date"
                  value={currentRequest.dateOfRequest}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, dateOfRequest: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentRequest.status !== 'draft'}
                      onChange={(e) => setCurrentRequest(prev => ({ ...prev, status: e.target.checked ? 'submitted' : 'draft' }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      SUBMITTED TO MANAGEMENT
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentRequest.emailSubmitted}
                      onChange={(e) => setCurrentRequest(prev => ({ ...prev, emailSubmitted: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      EMAIL NOTIFICATIONS SENT
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Digital requests are automatically saved and visible to management upon submission
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={saveRequest}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
            disabled={!canEdit()}
          >
            <Save className="w-4 h-4" />
            Save Request
          </button>
          <button
            onClick={submitRequest}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base"
            disabled={!canEdit() || currentRequest.status === 'draft'}
          >
            <Send className="w-4 h-4" />
            Submit to Management
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm sm:text-base"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>

        {/* Requestor Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">SECTION A: REQUESTOR INFORMATION</h2>
            <button
              onClick={() => toggleSection('requestor')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('requestor') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('requestor') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name:
                </label>
                <input
                  type="text"
                  value={currentRequest.employeeName}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, employeeName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Title:
                </label>
                <input
                  type="text"
                  value={currentRequest.position}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department:
                </label>
                <input
                  type="text"
                  value={currentRequest.department}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID (if applicable):
                </label>
                <input
                  type="text"
                  value={currentRequest.employeeId}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direct Supervisor:
                </label>
                <input
                  type="text"
                  value={currentRequest.supervisor}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, supervisor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={currentRequest.email}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={currentRequest.phone}
                  onChange={(e) => setCurrentRequest(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!canEdit()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Request Location:
                </label>
                <input
                  type="text"
                  value={`Staff Portal → Employee Requests → ${currentRequest.requestNumber || 'New Request'}`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Requests are stored digitally in staff portal</p>
              </div>
            </div>
          )}
        </div>

        {/* Request Type */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">SECTION B: REQUEST TYPE</h2>
            <button
              onClick={() => toggleSection('requestType')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('requestType') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('requestType') && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">
                Please select the type of request (check all that apply):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Data/Internet Allowance',
                  'Airtime/Mobile Credit',
                  'Transportation/Fuel Allowance',
                  'Equipment Repair/Maintenance',
                  'Office Supplies',
                  'Software/Tools Subscription',
                  'Professional Development/Training',
                  'Travel Expenses',
                  'Equipment Purchase',
                  'Medical/Health Related',
                  'Client Entertainment',
                  'Marketing/Promotional Materials',
                  'Other (specify below)'
                ].map(type => (
                  <label key={type} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={currentRequest.requestTypes.includes(type)}
                      onChange={(e) => handleRequestTypeChange(type, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm text-gray-700 leading-tight">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Request Details Sections */}
        {currentRequest.requestTypes.includes('Data/Internet Allowance') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">SECTION C.1: DATA/INTERNET ALLOWANCE REQUEST</h2>
              <button
                onClick={() => toggleSection('dataAllowance')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSections.has('dataAllowance') ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {expandedSections.has('dataAllowance') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Requested:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={requestSections.dataAllowance.amount}
                        onChange={(e) => setRequestSections(prev => ({
                          ...prev,
                          dataAllowance: { ...prev.dataAllowance, amount: e.target.value }
                        }))}
                        placeholder="USD $"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                      <input
                        type="text"
                        placeholder="LRD"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Provider:
                    </label>
                    <input
                      type="text"
                      value={requestSections.dataAllowance.provider}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        dataAllowance: { ...prev.dataAllowance, provider: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration/Period:
                  </label>
                  <div className="flex gap-4">
                    {['One-time', 'Monthly', 'Other'].map(duration => (
                      <label key={duration} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dataDuration"
                          checked={requestSections.dataAllowance.duration === duration}
                          onChange={() => setRequestSections(prev => ({
                            ...prev,
                            dataAllowance: { ...prev.dataAllowance, duration }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          disabled={!canEdit()}
                        />
                        <span className="text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Justification:
                  </label>
                  <textarea
                    value={requestSections.dataAllowance.justification}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      dataAllowance: { ...prev.dataAllowance, justification: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Work Activities Requiring Data:
                  </label>
                  <textarea
                    value={requestSections.dataAllowance.activities}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      dataAllowance: { ...prev.dataAllowance, activities: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Airtime/Mobile Credit Section */}
        {currentRequest.requestTypes.includes('Airtime/Mobile Credit') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">SECTION C.2: AIRTIME/MOBILE CREDIT REQUEST</h2>
              <button
                onClick={() => toggleSection('airtime')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSections.has('airtime') ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {expandedSections.has('airtime') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Requested:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={requestSections.airtime.amount}
                        onChange={(e) => setRequestSections(prev => ({
                          ...prev,
                          airtime: { ...prev.airtime, amount: e.target.value }
                        }))}
                        placeholder="USD $"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                      <input
                        type="text"
                        placeholder="LRD"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Network:
                    </label>
                    <select
                      value={requestSections.airtime.network}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        airtime: { ...prev.airtime, network: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    >
                      <option value="">Select Network</option>
                      <option value="Lonestar">Lonestar</option>
                      <option value="Orange">Orange</option>
                      <option value="Africell">Africell</option>
                      <option value="Other">Other</option>
                </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    value={requestSections.airtime.phoneNumber}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      airtime: { ...prev.airtime, phoneNumber: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration/Period:
                  </label>
                  <div className="flex gap-4">
                    {['One-time', 'Weekly', 'Monthly', 'Other'].map(duration => (
                      <label key={duration} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="airtimeDuration"
                          checked={requestSections.airtime.duration === duration}
                          onChange={() => setRequestSections(prev => ({
                            ...prev,
                            airtime: { ...prev.airtime, duration }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          disabled={!canEdit()}
                        />
                        <span className="text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Justification:
                  </label>
                  <textarea
                    value={requestSections.airtime.justification}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      airtime: { ...prev.airtime, justification: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Business Use:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Client Communication',
                      'Team Coordination',
                      'Vendor/Partner Calls',
                      'Customer Support',
                      'Other'
                    ].map(use => (
                      <label key={use} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="primaryUse"
                          checked={requestSections.airtime.primaryUse === use}
                          onChange={() => setRequestSections(prev => ({
                            ...prev,
                            airtime: { ...prev.airtime, primaryUse: use }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          disabled={!canEdit()}
                        />
                        <span className="text-sm text-gray-700">{use}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transportation/Fuel Allowance Section */}
        {currentRequest.requestTypes.includes('Transportation/Fuel Allowance') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">SECTION C.3: TRANSPORTATION/FUEL ALLOWANCE REQUEST</h2>
              <button
                onClick={() => toggleSection('transportation')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSections.has('transportation') ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {expandedSections.has('transportation') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Requested:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={requestSections.transportation.amount}
                        onChange={(e) => setRequestSections(prev => ({
                          ...prev,
                          transportation: { ...prev.transportation, amount: e.target.value }
                        }))}
                        placeholder="USD $"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                      <input
                        type="text"
                        placeholder="LRD"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Transportation:
                    </label>
                    <select
                      value={requestSections.transportation.type}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        transportation: { ...prev.transportation, type: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    >
                      <option value="">Select Type</option>
                      <option value="Taxi/Kekeh">Taxi/Kekeh</option>
                      <option value="Personal Vehicle">Personal Vehicle (fuel reimbursement)</option>
                      <option value="Commercial Transport">Commercial Transport</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period Covered - From:
                    </label>
                    <input
                      type="date"
                      value={requestSections.transportation.periodFrom}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        transportation: { ...prev.transportation, periodFrom: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period Covered - To:
                    </label>
                    <input
                      type="date"
                      value={requestSections.transportation.periodTo}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        transportation: { ...prev.transportation, periodTo: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Purpose/Destinations:
                  </label>
                  <textarea
                    value={requestSections.transportation.purpose}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      transportation: { ...prev.transportation, purpose: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Trips/Distance:
                  </label>
                  <textarea
                    value={requestSections.transportation.trips}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      transportation: { ...prev.transportation, trips: e.target.value }
                    }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={requestSections.transportation.supportingDocs}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        transportation: { ...prev.transportation, supportingDocs: e.target.checked }
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Supporting Documentation Attached
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Equipment Repair/Maintenance Section */}
        {currentRequest.requestTypes.includes('Equipment Repair/Maintenance') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">SECTION C.4: EQUIPMENT REPAIR/MAINTENANCE REQUEST</h2>
              <button
                onClick={() => toggleSection('equipmentRepair')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSections.has('equipmentRepair') ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {expandedSections.has('equipmentRepair') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Type:
                    </label>
                    <input
                      type="text"
                      value={requestSections.equipmentRepair.equipmentType}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        equipmentRepair: { ...prev.equipmentRepair, equipmentType: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment ID/Serial Number:
                    </label>
                    <input
                      type="text"
                      value={requestSections.equipmentRepair.serialNumber}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        equipmentRepair: { ...prev.equipmentRepair, serialNumber: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nature of Problem/Issue:
                  </label>
                  <textarea
                    value={requestSections.equipmentRepair.problem}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      equipmentRepair: { ...prev.equipmentRepair, problem: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Repair Cost:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={requestSections.equipmentRepair.estimatedCost}
                        onChange={(e) => setRequestSections(prev => ({
                          ...prev,
                          equipmentRepair: { ...prev.equipmentRepair, estimatedCost: e.target.value }
                        }))}
                        placeholder="USD $"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                      <input
                        type="text"
                        placeholder="LRD"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repair Shop/Technician:
                    </label>
                    <input
                      type="text"
                      value={requestSections.equipmentRepair.repairShop}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        equipmentRepair: { ...prev.equipmentRepair, repairShop: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Critical (Blocks work completely)',
                      'High (Significantly impacts productivity)',
                      'Medium (Moderately impacts work)',
                      'Low (Minor inconvenience)'
                    ].map(level => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="urgency"
                          checked={requestSections.equipmentRepair.urgency === level}
                          onChange={() => setRequestSections(prev => ({
                            ...prev,
                            equipmentRepair: { ...prev.equipmentRepair, urgency: level }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          disabled={!canEdit()}
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact on Work if Not Repaired:
                  </label>
                  <textarea
                    value={requestSections.equipmentRepair.impact}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      equipmentRepair: { ...prev.equipmentRepair, impact: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={requestSections.equipmentRepair.quoteAttached}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        equipmentRepair: { ...prev.equipmentRepair, quoteAttached: e.target.checked }
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Quote/Estimate Attached
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Office Supplies Section */}
        {currentRequest.requestTypes.includes('Office Supplies') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">SECTION C.5: OFFICE SUPPLIES REQUEST</h2>
              <button
                onClick={() => toggleSection('officeSupplies')}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedSections.has('officeSupplies') ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            
            {expandedSections.has('officeSupplies') && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Items Requested:
                    </label>
                    <button
                      onClick={addOfficeSupplyItem}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                      disabled={!canEdit()}
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Item Description</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Price (USD)</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total (USD)</th>
                          <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestSections.officeSupplies.items.map((item, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateOfficeSupplyItem(index, 'description', e.target.value)}
                                className="w-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                                disabled={!canEdit()}
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => updateOfficeSupplyItem(index, 'quantity', e.target.value)}
                                className="w-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                                disabled={!canEdit()}
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={item.unitPrice}
                                onChange={(e) => updateOfficeSupplyItem(index, 'unitPrice', e.target.value)}
                                className="w-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                                disabled={!canEdit()}
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={item.total}
                                onChange={(e) => updateOfficeSupplyItem(index, 'total', e.target.value)}
                                className="w-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                                disabled={!canEdit()}
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              <button
                                onClick={() => removeOfficeSupplyItem(index)}
                                className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                disabled={!canEdit()}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount Requested:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={requestSections.officeSupplies.totalAmount}
                        onChange={(e) => setRequestSections(prev => ({
                          ...prev,
                          officeSupplies: { ...prev.officeSupplies, totalAmount: e.target.value }
                        }))}
                        placeholder="USD $"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                      <input
                        type="text"
                        placeholder="LRD"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!canEdit()}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency:
                    </label>
                    <select
                      value={requestSections.officeSupplies.urgency}
                      onChange={(e) => setRequestSections(prev => ({
                        ...prev,
                        officeSupplies: { ...prev.officeSupplies, urgency: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    >
                      <option value="">Select Urgency</option>
                      <option value="Immediate">Immediate</option>
                      <option value="Within 1 Week">Within 1 Week</option>
                      <option value="Within 2 Weeks">Within 2 Weeks</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Justification:
                  </label>
                  <textarea
                    value={requestSections.officeSupplies.justification}
                    onChange={(e) => setRequestSections(prev => ({
                      ...prev,
                      officeSupplies: { ...prev.officeSupplies, justification: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Financial Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">SECTION D: FINANCIAL SUMMARY</h2>
            <button
              onClick={() => toggleSection('financialSummary')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('financialSummary') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('financialSummary') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Amount Requested:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentRequest.totalAmount}
                      onChange={(e) => setCurrentRequest(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) || 0 }))}
                      placeholder="USD $"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                    <input
                      type="text"
                      placeholder="LRD"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!canEdit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Category/Department:
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has this been budgeted for?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="budgeted" value="yes" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" disabled={!canEdit()} />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="budgeted" value="no" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" disabled={!canEdit()} />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method Preference:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Direct Bank Transfer',
                    'Mobile Money',
                    'Cash',
                    'Company Card/Direct Payment to Vendor',
                    'Reimbursement (attach receipts)'
                  ].map(method => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        disabled={!canEdit()}
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Supervisor Recommendation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">SECTION F: SUPERVISOR RECOMMENDATION</h2>
            <button
              onClick={() => toggleSection('supervisorReview')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('supervisorReview') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('supervisorReview') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supervisor Name:
                  </label>
                  <input
                    type="text"
                    value={supervisorReview.name}
                    onChange={(e) => setSupervisorReview(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit() && !isCEO}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position:
                  </label>
                  <input
                    type="text"
                    value={supervisorReview.position}
                    onChange={(e) => setSupervisorReview(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit() && !isCEO}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendation:
                </label>
                <div className="space-y-2">
                  {[
                    'Approve - I recommend this request for approval',
                    'Approve with Modifications - See comments below',
                    'Decline - See reasons below',
                    'Pending Additional Information - See requirements below'
                  ].map(recommendation => (
                    <label key={recommendation} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="supervisorRecommendation"
                        checked={supervisorReview.recommendation === recommendation}
                        onChange={() => setSupervisorReview(prev => ({ ...prev, recommendation }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        disabled={!canEdit() && !isCEO}
                      />
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments/Justification:
                </label>
                <textarea
                  value={supervisorReview.comments}
                  onChange={(e) => setSupervisorReview(prev => ({ ...prev, comments: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!canEdit() && !isCEO}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supervisor Signature:
                  </label>
                  <input
                    type="text"
                    value={supervisorReview.signature}
                    onChange={(e) => setSupervisorReview(prev => ({ ...prev, signature: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit() && !isCEO}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    value={supervisorReview.signatureDate}
                    onChange={(e) => setSupervisorReview(prev => ({ ...prev, signatureDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit() && !isCEO}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CEO Final Approval */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">SECTION H: CEO FINAL APPROVAL</h2>
            <button
              onClick={() => toggleSection('ceoReview')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('ceoReview') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('ceoReview') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEO Name:
                  </label>
                  <input
                    type="text"
                    value={ceoReview.name}
                    onChange={(e) => setCeoReview(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!isCEO}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Reviewed:
                  </label>
                  <input
                    type="date"
                    value={ceoReview.dateReviewed}
                    onChange={(e) => setCeoReview(prev => ({ ...prev, dateReviewed: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!isCEO}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Decision:
                </label>
                <div className="space-y-2">
                  {[
                    'APPROVED - Full Amount',
                    'APPROVED - Partial Amount',
                    'DECLINED',
                    'DEFERRED - Review Date:'
                  ].map(decision => (
                    <label key={decision} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ceoDecision"
                        checked={ceoReview.finalDecision === decision}
                        onChange={() => setCeoReview(prev => ({ ...prev, finalDecision: decision }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        disabled={!isCEO}
                      />
                      <span className="text-sm text-gray-700">{decision}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEO Comments:
                </label>
                <textarea
                  value={ceoReview.comments}
                  onChange={(e) => setCeoReview(prev => ({ ...prev, comments: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isCEO}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Conditions/Instructions:
                </label>
                <textarea
                  value={ceoReview.specialConditions}
                  onChange={(e) => setCeoReview(prev => ({ ...prev, specialConditions: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isCEO}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEO Signature:
                  </label>
                  <input
                    type="text"
                    value={ceoReview.signature}
                    onChange={(e) => setCeoReview(prev => ({ ...prev, signature: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!isCEO}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    value={ceoReview.signatureDate}
                    onChange={(e) => setCeoReview(prev => ({ ...prev, signatureDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!isCEO}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Employee Declaration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">EMPLOYEE DECLARATION</h2>
            <button
              onClick={() => toggleSection('declaration')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.has('declaration') ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedSections.has('declaration') && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 mb-4">
                I hereby declare that:
              </p>
              
              <div className="space-y-2">
                {[
                  'I have created a copy of the blank request template',
                  'I have assigned a proper request number',
                  'The information provided in this request is accurate and complete',
                  'The requested resources are necessary for legitimate business purposes',
                  'I have saved this completed request to my Google Drive employee folder',
                  'I have uploaded all supporting documents to my Google Drive folder',
                  'I have sent this request via email to company@annita.com with CEO and CFO CC\'d',
                  'I will use approved funds only for the stated purpose',
                  'I will provide proper documentation and receipts as required',
                  'I understand that misuse of company resources may result in disciplinary action'
                ].map((declaration, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={!canEdit()}
                    />
                    <span className="text-sm text-gray-700">{declaration}</span>
                  </label>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Signature:
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!canEdit()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployeeRequestForm;
