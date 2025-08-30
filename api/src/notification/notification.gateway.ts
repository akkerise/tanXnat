import { Identity } from '@/common/decorator/auth.decorator';
import { LoggerService } from '@/logger/logger.service';
import { JWT_SECRET } from '@Constant/jwt.constant';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private loggerService: LoggerService,
  ) {}

  handleDisconnect(client: Socket) {
    console.log(`handleDisconnect => client: ${JSON.stringify(client?.data)}`);
    this.handleLogout(client.id);
  }

  @SubscribeMessage('auth')
  async auth(@ConnectedSocket() client: Socket, @MessageBody() token: string) {
    if (!token || token === '') {
      return;
    }
    try {
      const u = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      }) as Identity;
      const clientString: string = await this.cacheManager.get(`rt_${u.id}`);
      let tokens = new Set();
      if (clientString && clientString !== '') {
        try {
          const clients = new Set(JSON.parse(clientString));
          tokens = clients;
        } catch (er) {}
      }
      tokens.add(client.id);
      await this.cacheManager.set(`sa_${u.id}`, JSON.stringify([...tokens]), 0);
      await this.cacheManager.set(`sa_client_${client.id}`, u.id, 0);
    } catch (e) {}
  }

  @SubscribeMessage('logout')
  async logout(@ConnectedSocket() client: Socket) {
    console.error('socket logout', client?.id);
    this.handleLogout(client.id);
  }

  @SubscribeMessage('logoutAll')
  async logoutAll(@ConnectedSocket() client: Socket) {
    const clientUser = `sa_client_${client.id}`;
    const userId = await this.cacheManager.get(clientUser);
    if (userId && userId !== '') {
      const userSessionKey = `sa_${userId}`;
      try {
        const clientString: string =
          await this.cacheManager.get(userSessionKey);
        if (clientString && clientString !== '') {
          const clients: string[] = JSON.parse(clientString);
          await this.cacheManager.del(userSessionKey);
          if (clients.length > 0) {
            for (const clientId of clients) {
              await this.cacheManager.del(`sa_client_${clientId}`);
            }
          }
        }
      } catch (e) {}
    }
  }

  async handleLogout(clientId: string) {
    const clientUser = `sa_client_${clientId}`;
    const userId = await this.cacheManager.get(clientUser);
    await this.cacheManager.del(clientUser);
    if (userId && userId !== '') {
      const userSessionKey = `sa_${userId}`;
      const clientString: string = await this.cacheManager.get(userSessionKey);
      if (clientString && clientString !== '') {
        try {
          const clients = new Set(JSON.parse(clientString));
          clients.delete(clientId);
          if (clients.size <= 0) {
            await this.cacheManager.del(userSessionKey);
          } else {
            await this.cacheManager.set(
              userSessionKey,
              JSON.stringify([...clients]),
              0,
            );
          }
        } catch (e) {}
      }
    }
  }

  async sendTo(userId: string, topic: string, data: any): Promise<boolean> {
    const userSessionKey = `sa_${userId}`;
    const clientString: string = await this.cacheManager.get(userSessionKey);
    try {
      const clients: string[] = JSON.parse(clientString);
      if (clients.length <= 0) {
        return false;
      }
      this.server.to(clients).emit(topic, data);
      return true;
    } catch (e) {}
    return false;
  }
}
