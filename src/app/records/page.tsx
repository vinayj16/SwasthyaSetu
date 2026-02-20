'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Activity,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Eye,
  Trash2,
  Share2,
  Star,
  Image,
  Video,
  Stethoscope,
  TestTube,
  Pill,
  ActivitySquare,
  CalendarDays,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Grid3x3,
  List,
  Tag,
  ShieldCheck,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Mock medical records data
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 1,
      type: 'prescription',
      title: 'Antibiotics Course - Upper Respiratory Infection',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Apollo Hospital',
      date: '2026-01-15',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'prescription_001.pdf',
      category: 'prescriptions',
      size: '245 KB',
      tags: ['urgent', 'antibiotics'],
      description: 'Complete 7-day course of Amoxicillin for bacterial infection'
    },
    {
      id: 2,
      type: 'lab-report',
      title: 'Complete Blood Count (CBC)',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Fortis Hospital',
      date: '2026-01-10',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'cbc_report_001.pdf',
      category: 'lab-results',
      size: '1.2 MB',
      tags: ['routine', 'blood-test'],
      description: 'Complete blood count with differential analysis'
    },
    {
      id: 3,
      type: 'imaging',
      title: 'Chest X-Ray',
      doctor: 'Dr. Michael Chen',
      hospital: 'Max Healthcare',
      date: '2026-01-05',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'chest_xray_001.jpg',
      category: 'imaging',
      size: '856 KB',
      tags: ['chest', 'lungs', 'radiology'],
      description: 'PA and lateral view chest X-ray showing clear lungs'
    },
    {
      id: 4,
      type: 'prescription',
      title: 'Diabetes Management Plan',
      doctor: 'Dr. Priya Sharma',
      hospital: 'Medanta Hospital',
      date: '2025-12-20',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'diabetes_plan_001.pdf',
      category: 'prescriptions',
      size: '180 KB',
      tags: ['chronic', 'diabetes'],
      description: 'Comprehensive diabetes management with medication schedule'
    },
    {
      id: 5,
      type: 'vaccination',
      title: 'COVID-19 Vaccination Certificate',
      doctor: 'Dr. Ahmed Khan',
      hospital: 'Sir Ganga Ram Hospital',
      date: '2025-11-15',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'covid_vaccine_001.pdf',
      category: 'vaccinations',
      size: '95 KB',
      tags: ['covid', 'vaccine'],
      description: 'First dose of COVID-19 vaccination certificate'
    },
    {
      id: 6,
      type: 'imaging',
      title: 'ECG Report',
      doctor: 'Dr. Lisa Anderson',
      hospital: 'BLK Hospital',
      date: '2025-11-10',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'ecg_report_001.pdf',
      category: 'imaging',
      size: '425 KB',
      tags: ['heart', 'cardiology'],
      description: '12-lead ECG showing normal sinus rhythm'
    },
    {
      id: 7,
      type: 'lab-report',
      title: 'Thyroid Function Test',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Apollo Hospital',
      date: '2025-10-25',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'thyroid_test_001.pdf',
      category: 'lab-results',
      size: '680 KB',
      tags: ['endocrine', 'thyroid'],
      description: 'TSH, T3, T4 levels and thyroid antibodies panel'
    },
    {
      id: 8,
      type: 'discharge-summary',
      title: 'Hospital Discharge Summary',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Fortis Hospital',
      date: '2025-09-30',
      fileUrl: '/api/placeholder/200/200',
      fileName: 'discharge_summary_001.pdf',
      category: 'hospital-records',
      size: '1.5 MB',
      tags: ['hospitalization', 'recovery'],
      description: 'Complete discharge summary after 3-day hospital stay'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Records', icon: FolderOpen },
    { value: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { value: 'lab-results', label: 'Lab Results', icon: TestTube },
    { value: 'imaging', label: 'Imaging', icon: Image },
    { value: 'vaccinations', label: ' vaccinations', icon: ShieldCheck },
    { value: 'hospital-records', label: 'Hospital Records', icon: ActivitySquare }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'lab-report':
        return <TestTube className="w-5 h-5 text-purple-600" />;
      case 'imaging':
        return <Image className="w-5 h-5 text-green-600" />;
      case 'vaccination':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 'hospital-records':
        return <ActivitySquare className="w-5 h-5 text-slate-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prescriptions':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'lab-results':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'imaging':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'vaccinations':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'hospital-records':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  useEffect(() => {
    // Filter records based on search and filters
    let filtered = medicalRecords;

    if (searchQuery) {
      filtered = filtered.filter(record =>
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(record => record.category === selectedCategory);
    }

    setMedicalRecords(filtered);
  }, [searchQuery, selectedCategory]);

  const handleFileUpload = (files: FileList) => {
    const newRecords = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      type: 'upload',
      title: file.name,
      doctor: 'Self Upload',
      hospital: 'Personal',
      date: new Date().toISOString().split('T')[0],
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      category: 'uploads',
      size: `${(file.size / 1024).toFixed(1)} KB`,
      tags: ['upload'],
      description: `Uploaded on ${new Date().toLocaleDateString()}`
    }));

    setMedicalRecords([...newRecords, ...medicalRecords]);
    setShowUploadModal(false);
  };

  const handleDeleteRecord = (recordId: number) => {
    setMedicalRecords(medicalRecords.filter(record => record.id !== recordId));
  };

  const handleShareRecord = (record: any) => {
    setSelectedRecord(record);
    setShowShareModal(true);
  };

  const handleDownloadRecord = (record: any) => {
    // Create download link
    const link = document.createElement('a');
    link.href = record.fileUrl;
    link.download = record.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderRecordCard = (record: any) => (
    <div key={record.id} className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-400">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getFileIcon(record.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">{record.title}</h3>
              <p className="text-xs text-slate-500">{record.doctor} • {record.hospital}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(record.category)}`}>
                {record.category}
              </span>
              <span className="text-xs text-slate-500">{record.date}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{record.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{record.size}</span>
              </span>
              <span className="flex items-center space-x-1">
                <CalendarDays className="w-4 h-4" />
                <span>{record.date}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDownloadRecord(record)}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShareRecord(record)}
                className="p-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowRecordModal(true)}
                className="p-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteRecord(record.id)}
                className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecordListItem = (record: any) => (
    <div key={record.id} className="bg-white border-2 border-slate-300 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-blue-400">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getFileIcon(record.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-slate-800">{record.title}</h3>
              <p className="text-sm text-slate-500">{record.doctor} • {record.hospital}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(record.category)}`}>
                {record.category}
              </span>
              <span className="text-xs text-slate-500">{record.date}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">{record.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button
            onClick={() => handleDownloadRecord(record)}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShareRecord(record)}
            className="p-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowRecordModal(true)}
            className="p-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteRecord(record.id)}
            className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex lg:items-center lg:justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-800">Medical Records</h1>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records, doctors, hospitals..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Upload Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Medical Record</span>
          </button>
        </div>

        {/* Records Count */}
        <div className="bg-white border-2 border-slate-300 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold text-slate-800">
                {medicalRecords.length} Medical Records
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {selectedCategory !== 'all' && `Showing ${medicalRecords.length} ${selectedCategory}`}
            </div>
          </div>
        </div>

        {/* Records List */}
        {medicalRecords.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {medicalRecords.map(renderRecordCard)}
          </div>
        ) : (
          <div className="bg-white border-2 border-slate-300 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Medical Records Found</h3>
            <p className="text-slate-600 mb-4">
              {searchQuery || selectedCategory !== 'all' || selectedDateRange !== 'all'
                ? 'Try adjusting your filters'
                : 'Upload your first medical record to get started'
              }
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Upload First Record
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Upload Medical Record</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">
                Drag and drop your medical files here
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
              <button
                onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select Files
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-600 mb-2">
                Supported formats: PDF, JPG, PNG, DOC, DOCX, TXT
              </p>
              <p className="text-xs text-slate-500">
                Maximum file size: 10MB per file
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getFileIcon(selectedRecord.type)}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{selectedRecord.title}</h3>
                    <p className="text-sm text-slate-600">
                      {selectedRecord.doctor} • {selectedRecord.hospital}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRecordModal(false)}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Record Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Date</p>
                  <p className="text-slate-800">{selectedRecord.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Doctor</p>
                  <p className="text-slate-800">{selectedRecord.doctor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Hospital</p>
                  <p className="text-slate-800">{selectedRecord.hospital}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">File Size</p>
                  <p className="text-slate-800">{selectedRecord.size}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
                <p className="text-slate-800">{selectedRecord.description}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadRecord(selectedRecord)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </button>
              <button
                onClick={() => handleShareRecord(selectedRecord)}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Share Medical Record</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-slate-600 mb-4">
                Share "{selectedRecord.title}" with your healthcare provider or family members.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <input
                  type="text"
                  placeholder="Add message (optional)"
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In real app, this would send the sharing request
                  alert('Medical record shared successfully!');
                  setShowShareModal(false);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
