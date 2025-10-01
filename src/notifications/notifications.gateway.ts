import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationsGateway');
  private connectedUsers = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Remove from connected users
    for (const [userId, socket] of this.connectedUsers.entries()) {
      if (socket.id === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(data.userId, client);
    client.join(`user_${data.userId}`);
    this.logger.log(`User ${data.userId} joined notifications`);
    return { status: 'joined', userId: data.userId };
  }

  @SubscribeMessage('leave')
  handleLeave(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.delete(data.userId);
    client.leave(`user_${data.userId}`);
    this.logger.log(`User ${data.userId} left notifications`);
    return { status: 'left', userId: data.userId };
  }

  // Method to send notifications to specific users
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit('notification', notification);
  }

  // Method to send notifications to all connected users
  sendNotificationToAll(notification: any) {
    this.server.emit('notification', notification);
  }

  // Method to send notifications to users with specific roles
  sendNotificationToRoles(roles: string[], notification: any) {
    // This would require storing user roles in connection metadata
    this.server.emit('roleNotification', { roles, notification });
  }
}
