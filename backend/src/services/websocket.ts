import WebSocket from 'ws'
import { Server } from 'http'

export class WebSocketService {
  private wss: WebSocket.Server
  private clients: Map<string, WebSocket> = new Map()

  constructor(server: Server) {
    this.wss = new WebSocket.Server({ server })
    this.setupConnections()
  }

  private setupConnections() {
    this.wss.on('connection', (ws: WebSocket) => {
      let userId: string | null = null

      ws.on('message', (data: string) => {
        try {
          const message = JSON.parse(data)

          if (message.type === 'auth') {
            userId = message.userId
            this.clients.set(userId, ws)
          } else if (message.type === 'subscribe_price' && userId) {
            this.subscribePriceUpdate(userId, message.tokenId)
          } else if (message.type === 'unsubscribe_price' && userId) {
            this.unsubscribePriceUpdate(userId, message.tokenId)
          }
        } catch (error) {
          console.error('WebSocket message error:', error)
        }
      })

      ws.on('close', () => {
        if (userId) {
          this.clients.delete(userId)
        }
      })

      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
      })
    })
  }

  private subscribePriceUpdate(userId: string, tokenId: string) {
    // Send price updates every 5 seconds for demo
    const interval = setInterval(() => {
      const ws = this.clients.get(userId)
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'price_update',
          tokenId,
          price: Math.random() * 1000,
          timestamp: Date.now(),
        }))
      } else {
        clearInterval(interval)
      }
    }, 5000)
  }

  private unsubscribePriceUpdate(_userId: string, _tokenId: string) {
    // Implementation for unsubscribe
  }

  public broadcast(message: any) {
    this.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message))
      }
    })
  }

  public sendToUser(userId: string, message: any) {
    const ws = this.clients.get(userId)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  }
}
