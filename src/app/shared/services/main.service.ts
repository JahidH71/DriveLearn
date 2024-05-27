import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  getUserInfo(userId: any): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  // Update user information
  updateUserInfo(userId: string, data: any): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(data);
  }
  
  uploadImage(file: File, userId: string) {
    const filePath = `images/${userId}/${file.name}`; // Create a path for the image
    const fileRef = this.storage.ref(filePath);
    const uploadTask = fileRef.put(file);

    uploadTask.snapshotChanges().subscribe((snapshot: any) => {
      // Observe state changes, see progress, etc.
      if (snapshot.state === 'running') {
        // In progress
      } else if (snapshot.state === 'success') {
        // Upload complete
        return snapshot.ref.getDownloadURL().toPromise(); // Get download URL
      } else {
        // Upload failed
        console.error('Upload failed:', snapshot.error);
      }
    });
  }
  getAllUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  getFilteredInstructor(
    users: any[],
    location: string,
    rating: number,
    timing: string
  ) {
    let filteredUsers = users.filter((user: any) => {
      return (
        user.accountType == 1 &&
        ((user.address &&
          user.address.toLowerCase().includes(location.toLowerCase())) ||
          (user.timing &&
            timing &&
            user.timing.toLowerCase().includes(timing.toLowerCase())) ||
          (user.rating && rating && user.rating >= rating))
        // && (!rating || !user.rating || user.rating >= rating) &&
        // (!timing || (user.timing && user.timing.includes(timing)))
      );
    });
    return filteredUsers;
  }
  subscribeToTeacher(userId:any,teacherId: any) {
    if (userId && teacherId) {
      this.firestore.collection('subscriptions').add({
        teacherId,
        studentId: userId
      }).then(() => {
        // this.toastr.success('Subscribed successfully!');  // Optional
        console.log('Subscription successful');
      }).catch((error) => {
        // this.toastr.error('Subscription failed: ' + error.message);  // Optional
        console.error('Subscription failed:', error);
      });
    }
  }
  getSubscribedStudents(teacherId: any) {
    return this.firestore.collection('subscriptions', ref => ref.where('teacherId', '==', teacherId)).valueChanges();
  }

  updateLesson(lessonId: string, updatedData: any) {
    return this.firestore.collection('lessons').doc(lessonId).update(updatedData)
      .then(() => {
        console.log('Lesson updated successfully');
      })
      .catch((error) => {
        console.error('Error updating lesson: ', error);
      });
  }

  addLesson(addData: any) {
      return this.firestore.collection('lessons').add(addData)
      .then(() => {
        console.log('Lesson added successfully');
        return true
      })
      .catch((error) => {
        console.error('Error adding lesson: ', error);
        return false;
      });
  }
  getAllLessons(): Observable<any[]> {
    return this.firestore.collection('lessons').valueChanges();
  }
  

  getAllLessonsForTeacher(user_id:any): Observable<any[]> {
    return this.firestore.collection('lessons', ref => ref.where('teacherId', '==', user_id))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getAllLessonsForStudents(user_id:any): Observable<any[]> {
    return this.firestore.collection('lessons', ref => ref.where('studentId', '==', user_id))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  deleteLesson(lessonId: string) {
    return this.firestore.collection('lessons').doc(lessonId).delete()
      .then(() => {
        console.log('Lesson deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting lesson: ', error);
      });
  }

  // Method to book a lesson
bookLesson(studentId: any, lessonId: string): Promise<void> {
  const booking = {
    studentId,
    lessonId,
    bookingDate: new Date(),
    status: true
  };
  return this.firestore.collection('bookings').add(booking)
    .then(() => console.log('Lesson booked successfully'))
    .catch(error => console.error('Error booking lesson: ', error));
}

submitFeedback(feedback: any): Promise<void> {
  return this.firestore.collection('feedback').add(feedback)
    .then(() => console.log('Feedback submitted successfully'))
    .catch(error => console.error('Error submitting feedback: ', error));
}

getFeedbackForTeacher(teacherId: any): Observable<any> {
  return this.firestore.collection('feedback', ref => ref.where('teacherId', '==', teacherId)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}

getFeedbackForStudent(studentId: any): Observable<any> {
  return this.firestore.collection('feedback', ref => ref.where('studentId', '==', studentId)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}

}
