import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore) {}

  sendMessage(senderId: string, recipientId: string, message: string) {
    let date = new Date()
    const chatDocId = this.getChatDocumentId(senderId, recipientId);
    return this.firestore.collection('chats').doc(chatDocId).collection('messages').add({
      senderId,
      recipientId,
      message,
      timestamp: date
    });
  }

  getMessages(senderId: string, recipientId: string): Observable<any[]> {
    const chatDocId = this.getChatDocumentId(senderId, recipientId);
    return this.firestore
      .collection('chats')
      .doc(chatDocId)
      .collection('messages', ref => ref.orderBy('timestamp'))
      .snapshotChanges() // Gets real-time updates
      .pipe(
        map((actions:any) =>
          actions.map((a:any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  private getChatDocumentId(id1: string, id2: string): string {
    return [id1, id2].sort().join('_'); // Unique ID for a chat between two people
  }

  getUsers(): Observable<any[]> {
    return this.firestore
      .collection('users') // Query for online users
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data }; // Return user data with document ID
          });
        })
      );
  }

  // getUsers(): Observable<any[]> {
  //   return this.firestore
  //     .collection('users', ref => ref.where('isOnline', '==', true)) // Query for online users
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data: any = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return { id, ...data }; // Return user data with document ID
  //         });
  //       })
  //     );
  // }
}
