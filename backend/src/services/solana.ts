import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import config from '@/config/environment'

export class SolanaService {
  private connection: Connection

  constructor() {
    this.connection = new Connection(config.solana.rpcUrl, 'confirmed')
  }

  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address)
      const balance = await this.connection.getBalance(publicKey)
      return balance / 1e9 // Convert from lamports to SOL
    } catch (error) {
      console.error('Get balance error:', error)
      throw error
    }
  }

  async getTokenBalance(walletAddress: string, tokenMintAddress: string): Promise<number> {
    try {
      const walletPublicKey = new PublicKey(walletAddress)
      const tokenMintPublicKey = new PublicKey(tokenMintAddress)

      const associatedTokenAddress = await getAssociatedTokenAddress(
        tokenMintPublicKey,
        walletPublicKey
      )

      const tokenAccount = await this.connection.getParsedAccountInfo(associatedTokenAddress)

      if (!tokenAccount.value) {
        return 0
      }

      const accountData = tokenAccount.value.data
      if ('parsed' in accountData) {
        return parseFloat(accountData.parsed.info.tokenAmount.amount)
      }

      return 0
    } catch (error) {
      console.error('Get token balance error:', error)
      return 0
    }
  }

  async getTokenInfo(mintAddress: string): Promise<any> {
    try {
      const mint = new PublicKey(mintAddress)
      const accountInfo = await this.connection.getParsedAccountInfo(mint)

      if (!accountInfo.value) {
        return null
      }

      const accountData = accountInfo.value.data
      if ('parsed' in accountData) {
        return accountData.parsed.info
      }

      return null
    } catch (error) {
      console.error('Get token info error:', error)
      return null
    }
  }

  async getRecentTransactions(address: string, limit = 10): Promise<any[]> {
    try {
      const publicKey = new PublicKey(address)
      const signatures = await this.connection.getSignaturesForAddress(publicKey, {
        limit,
      })

      const transactions = await Promise.all(
        signatures.map(sig => this.connection.getTransaction(sig.signature))
      )

      return transactions.filter(tx => tx !== null)
    } catch (error) {
      console.error('Get transactions error:', error)
      return []
    }
  }

  async getTokenPrice(tokenMintAddress: string): Promise<number> {
    // This would integrate with a price oracle like Jupiter, Magic Eden, or Coingecko
    // For MVP, return mock price
    return Math.random() * 1000
  }
}

export const solanaService = new SolanaService()
