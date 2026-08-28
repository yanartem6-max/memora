import axios, { AxiosInstance } from 'axios'
import { ApiResponse, PaginatedResponse } from '@/types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add token to requests
    this.client.interceptors.request.use(
      config => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Handle responses
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            window.location.href = '/'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async authenticateTelegram(initData: string) {
    return this.client.post<ApiResponse<{ user: any; token: string }>>('/auth/telegram', {
      initData
    })
  }

  // User endpoints
  async getUser() {
    return this.client.get<ApiResponse<any>>('/user')
  }

  async updateUser(data: any) {
    return this.client.put<ApiResponse<any>>('/user', data)
  }

  // Wallet endpoints
  async getWallet() {
    return this.client.get<ApiResponse<any>>('/wallet')
  }

  async getWalletBalance() {
    return this.client.get<ApiResponse<{ balance: string; usdValue: number }>>('/wallet/balance')
  }

  async getWalletAddress() {
    return this.client.get<ApiResponse<{ address: string }>>('/wallet/address')
  }

  // Assets endpoints
  async getAssets() {
    return this.client.get<ApiResponse<any[]>>('/assets')
  }

  // Transaction endpoints
  async getTransactions(page = 1, pageSize = 20) {
    return this.client.get<PaginatedResponse<any>>('/transactions', {
      params: { page, pageSize }
    })
  }

  async sendTransaction(data: { recipientAddress: string; amount: string; symbol: string }) {
    return this.client.post<ApiResponse<any>>('/transactions/send', data)
  }

  async getTransactionStatus(txHash: string) {
    return this.client.get<ApiResponse<any>>(`/transactions/${txHash}`)
  }

  // Token endpoints
  async getTrendingTokens() {
    return this.client.get<ApiResponse<any[]>>('/tokens/trending')
  }

  async getNewTokens() {
    return this.client.get<ApiResponse<any[]>>('/tokens/new')
  }

  async getTokens(page = 1, pageSize = 20) {
    return this.client.get<PaginatedResponse<any>>('/tokens', {
      params: { page, pageSize }
    })
  }

  async searchTokens(query: string) {
    return this.client.get<ApiResponse<any[]>>('/tokens/search', {
      params: { q: query }
    })
  }

  async getToken(id: string) {
    return this.client.get<ApiResponse<any>>(`/tokens/${id}`)
  }

  async getTokenHolders(id: string) {
    return this.client.get<ApiResponse<any[]>>(`/tokens/${id}/holders`)
  }

  async getTokenTrades(id: string) {
    return this.client.get<ApiResponse<any[]>>(`/tokens/${id}/trades`)
  }

  // Trading endpoints
  async buyToken(data: { tokenId: string; amount: string; slippage?: number }) {
    return this.client.post<ApiResponse<any>>('/trade/buy', data)
  }

  async sellToken(data: { tokenId: string; amount: string; slippage?: number }) {
    return this.client.post<ApiResponse<any>>('/trade/sell', data)
  }

  async swapTokens(data: { fromTokenId: string; toTokenId: string; amount: string; slippage?: number }) {
    return this.client.post<ApiResponse<any>>('/trade/swap', data)
  }

  // Social endpoints
  async getFeed(page = 1, pageSize = 20) {
    return this.client.get<PaginatedResponse<any>>('/feed', {
      params: { page, pageSize }
    })
  }

  async getLeaderboard(period: '24h' | '7d' | '30d' | 'all' = '24h') {
    return this.client.get<ApiResponse<any[]>>('/leaderboard', {
      params: { period }
    })
  }

  async getTrader(username: string) {
    return this.client.get<ApiResponse<any>>(`/traders/${username}`)
  }

  async followTrader(traderId: string) {
    return this.client.post<ApiResponse<any>>(`/traders/${traderId}/follow`)
  }

  async unfollowTrader(traderId: string) {
    return this.client.post<ApiResponse<any>>(`/traders/${traderId}/unfollow`)
  }

  // Watchlist endpoints
  async getWatchlist() {
    return this.client.get<ApiResponse<any[]>>('/watchlist')
  }

  async addToWatchlist(tokenId: string) {
    return this.client.post<ApiResponse<any>>('/watchlist', { tokenId })
  }

  async removeFromWatchlist(tokenId: string) {
    return this.client.delete<ApiResponse<any>>(`/watchlist/${tokenId}`)
  }

  // Price alerts endpoints
  async getPriceAlerts() {
    return this.client.get<ApiResponse<any[]>>('/price-alerts')
  }

  async createPriceAlert(data: { tokenId: string; price?: number; change?: number }) {
    return this.client.post<ApiResponse<any>>('/price-alerts', data)
  }

  async deletePriceAlert(alertId: string) {
    return this.client.delete<ApiResponse<any>>(`/price-alerts/${alertId}`)
  }
}

export const apiClient = new ApiClient()
