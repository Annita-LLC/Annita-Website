'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart, Calendar, AlertTriangle, CheckCircle, Plus, Search, Filter } from 'lucide-react'

interface Investment {
  id: string
  name: string
  type: 'stocks' | 'bonds' | 'real-estate' | 'private-equity' | 'venture-capital' | 'commodities'
  category: 'growth' | 'income' | 'diversification' | 'speculative'
  amount: number
  currentValue: number
  return: number
  returnPercentage: number
  risk: 'low' | 'medium' | 'high'
  maturity?: string
  lastUpdated: string
  performance: {
    oneMonth: number
    threeMonth: number
    sixMonth: number
    oneYear: number
  }
}

interface InvestmentMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface PortfolioAllocation {
  category: string
  percentage: number
  value: number
  change: number
  color: string
}

export default function InvestmentManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'performance' | 'opportunities'>('overview')
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null)

  const investments: Investment[] = [
    {
      id: '1',
      name: 'Tech Growth Fund',
      type: 'stocks',
      category: 'growth',
      amount: 500000,
      currentValue: 625000,
      return: 125000,
      returnPercentage: 25.0,
      risk: 'high',
      lastUpdated: '2024-02-15',
      performance: {
        oneMonth: 8.5,
        threeMonth: 22.3,
        sixMonth: 18.7,
        oneYear: 35.2
      }
    },
    {
      id: '2',
      name: 'Corporate Bond Portfolio',
      type: 'bonds',
      category: 'income',
      amount: 300000,
      currentValue: 318000,
      return: 18000,
      returnPercentage: 6.0,
      risk: 'low',
      maturity: '2026-03-15',
      lastUpdated: '2024-02-14',
      performance: {
        oneMonth: 1.2,
        threeMonth: 3.8,
        sixMonth: 5.5,
        oneYear: 7.2
      }
    },
    {
      id: '3',
      name: 'Commercial Real Estate Fund',
      type: 'real-estate',
      category: 'income',
      amount: 750000,
      currentValue: 787500,
      return: 37500,
      returnPercentage: 5.0,
      risk: 'medium',
      lastUpdated: '2024-02-13',
      performance: {
        oneMonth: 0.8,
        threeMonth: 2.1,
        sixMonth: 4.2,
        oneYear: 6.8
      }
    },
    {
      id: '4',
      name: 'Venture Capital Fund A',
      type: 'venture-capital',
      category: 'speculative',
      amount: 250000,
      currentValue: 412500,
      return: 162500,
      returnPercentage: 65.0,
      risk: 'high',
      lastUpdated: '2024-02-12',
      performance: {
        oneMonth: 12.5,
        threeMonth: 28.7,
        sixMonth: 45.3,
        oneYear: 78.9
      }
    }
  ]

  const metrics: InvestmentMetric[] = [
    {
      id: '1',
      title: 'Total Portfolio Value',
      value: '$2.14M',
      change: 15.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Total Return',
      value: '$282K',
      change: 18.9,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Portfolio Yield',
      value: '7.8%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Risk Score',
      value: 'Medium',
      change: -5.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <BarChart3 className="w-6 h-6" />
    }
  ]

  const portfolioAllocation: PortfolioAllocation[] = [
    { category: 'Stocks', percentage: 35, value: 750000, change: 12.5, color: 'bg-blue-500' },
    { category: 'Bonds', percentage: 25, value: 535000, change: 3.2, color: 'bg-green-500' },
    { category: 'Real Estate', percentage: 20, value: 428000, change: 8.1, color: 'bg-purple-500' },
    { category: 'Private Equity', percentage: 15, value: 321000, change: 22.3, color: 'bg-yellow-500' },
    { category: 'Cash/Equivalents', percentage: 5, value: 107000, change: 1.2, color: 'bg-gray-500' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Target className="w-4 h-4" /> }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getReturnColor = (returnValue: number) => {
    if (returnValue > 0) return 'text-green-600'
    if (returnValue < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Investment Management</h2>
              <p className="text-sm text-gray-600">Monitor and optimize investment portfolio performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Investment</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4 rotate-180" />
                      )}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.period}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
                <div className="space-y-4">
                  {portfolioAllocation.map((allocation, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${allocation.color}`}></div>
                        <span className="text-sm font-medium text-gray-900">{allocation.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">{allocation.percentage}%</span>
                          <span className={`text-xs ${allocation.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({allocation.change > 0 ? '+' : ''}{allocation.change}%)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">${allocation.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {investments.sort((a, b) => b.returnPercentage - a.returnPercentage).slice(0, 4).map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          investment.risk === 'low' ? 'bg-green-100 text-green-600' :
                          investment.risk === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{investment.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{investment.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getReturnColor(investment.returnPercentage)}`}>
                          +{investment.returnPercentage}%
                        </p>
                        <p className="text-xs text-gray-500">${investment.return.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Investment Portfolio</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search investments..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Stocks</option>
                  <option>Bonds</option>
                  <option>Real Estate</option>
                  <option>Private Equity</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Investment</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        investment.risk === 'low' ? 'bg-green-100 text-green-600' :
                        investment.risk === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{investment.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.risk)}`}>
                            {investment.risk} risk
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                            {investment.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{investment.type.replace('-', ' ')}</span>
                          <span>•</span>
                          <span>Updated: {investment.lastUpdated}</span>
                          {investment.maturity && (
                            <>
                              <span>•</span>
                              <span>Maturity: {investment.maturity}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedInvestment(selectedInvestment === investment.id ? null : investment.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Investment Amount</p>
                      <p className="text-lg font-semibold text-gray-900">${investment.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="text-lg font-semibold text-gray-900">${investment.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Return</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-lg font-semibold ${getReturnColor(investment.return)}`}>
                          ${investment.return.toLocaleString()}
                        </p>
                        <span className={`text-sm ${getReturnColor(investment.returnPercentage)}`}>
                          ({investment.returnPercentage > 0 ? '+' : ''}{investment.returnPercentage}%)
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">1M:</span>
                          <span className={`font-medium ${getReturnColor(investment.performance.oneMonth)}`}>
                            {investment.performance.oneMonth > 0 ? '+' : ''}{investment.performance.oneMonth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">1Y:</span>
                          <span className={`font-medium ${getReturnColor(investment.performance.oneYear)}`}>
                            {investment.performance.oneYear > 0 ? '+' : ''}{investment.performance.oneYear}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedInvestment === investment.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Detailed Performance</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className={`text-lg font-bold ${getReturnColor(investment.performance.oneMonth)}`}>
                            {investment.performance.oneMonth > 0 ? '+' : ''}{investment.performance.oneMonth}%
                          </p>
                          <p className="text-xs text-gray-500">1 Month</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className={`text-lg font-bold ${getReturnColor(investment.performance.threeMonth)}`}>
                            {investment.performance.threeMonth > 0 ? '+' : ''}{investment.performance.threeMonth}%
                          </p>
                          <p className="text-xs text-gray-500">3 Months</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className={`text-lg font-bold ${getReturnColor(investment.performance.sixMonth)}`}>
                            {investment.performance.sixMonth > 0 ? '+' : ''}{investment.performance.sixMonth}%
                          </p>
                          <p className="text-xs text-gray-500">6 Months</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className={`text-lg font-bold ${getReturnColor(investment.performance.oneYear)}`}>
                            {investment.performance.oneYear > 0 ? '+' : ''}{investment.performance.oneYear}%
                          </p>
                          <p className="text-xs text-gray-500">1 Year</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Analytics</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Performance History</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Target className="w-4 h-4" />
                        <span>Rebalance</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Review</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Risk Assessment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance Summary</h3>
                <div className="space-y-4">
                  {[
                    { period: 'Last 30 Days', return: 8.7, benchmark: 6.2, status: 'outperforming' },
                    { period: 'Last 90 Days', return: 22.3, benchmark: 18.9, status: 'outperforming' },
                    { period: 'Last 6 Months', return: 34.5, benchmark: 28.7, status: 'outperforming' },
                    { period: 'Last 12 Months', return: 45.8, benchmark: 32.1, status: 'outperforming' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.period}</p>
                        <p className="text-xs text-gray-500">vs benchmark: {item.benchmark}%</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getReturnColor(item.return)}`}>
                          +{item.return}%
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'outperforming' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk-Return Analysis</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Low Risk Investments', count: 2, avgReturn: 6.5, volatility: 'Low' },
                    { category: 'Medium Risk Investments', count: 3, avgReturn: 12.3, volatility: 'Medium' },
                    { category: 'High Risk Investments', count: 4, avgReturn: 28.7, volatility: 'High' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{item.category}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.volatility === 'Low' ? 'bg-green-100 text-green-700' :
                          item.volatility === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.volatility}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.count} investments</span>
                        <span>Avg return: {item.avgReturn}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Investment Opportunities</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Research Opportunity</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Green Energy Fund</h4>
                <p className="text-sm text-gray-600 mb-4">Sustainable energy investments with strong growth potential</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">High Growth</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">$2M Target</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">AI Technology ETF</h4>
                <p className="text-sm text-gray-600 mb-4">Diversified exposure to artificial intelligence companies</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Medium Risk</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">$500K Target</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Real Estate REIT</h4>
                <p className="text-sm text-gray-600 mb-4">Commercial real estate investment trust with stable income</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Income Focus</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">$1M Target</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Bullish Signals</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Strong Q4 earnings from tech sector</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Federal Reserve signals potential rate cuts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Emerging markets showing recovery signs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Risk Factors</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Geopolitical tensions in key trading regions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Inflation concerns impacting bond yields</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm text-gray-700">Supply chain disruptions in manufacturing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
