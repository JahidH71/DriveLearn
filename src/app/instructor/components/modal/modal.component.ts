import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  isDelete: any;
  lesson: any = {};
  isUpdateProgress: any;
  createNew: any;
  availableStudents: any = [];
  user_id = localStorage.getItem('user_id');
  users: any;
  constructor(
    private mainService: MainService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }
  cancel() {
    this.bsModalRef.hide();
  }
  getStudents() {
    this.mainService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
    console.log(this.users);
    this.mainService.getSubscribedStudents(this.user_id).subscribe((data) => {
      console.log(data);
      let usersList = data;
      this.availableStudents = usersList.map((student: any) => {
        const matchedUser = this.users.find(
          (user: any) => user.uid == student.studentId
        );
        if (matchedUser) {
          return {
            ...matchedUser,
            teacherId: student.teacherId, // Adding teacherId to the result
          };
        }
      });
      console.log('availableStudents....', this.availableStudents);
    });
  }

  addLesson() {
    let student = this.availableStudents.find((student:any)=>student.uid == this.lesson.studentId)
    const lesson = {
      studentId: this.lesson.studentId,
      teacherId: this.user_id,
      instructor_name: this.lesson.instructor_name,
      student_name: student.displayName,
      title: this.lesson.title,
      description: this.lesson.description,
      date: this.lesson.date,
      timing: this.lesson.timing,
      cost: this.lesson.cost,
      lesson_type: this.lesson.lesson_type,
      progress: 0,
      status: 0
    };
    
    this.mainService.addLesson(lesson);
    this.cancel()
    
  }

  updateLesson() {
    
    if (this.lesson.progress == 100) {
      this.mainService.getAllUsers().subscribe((users) => {
        let currentUser = users.find((user:any)=>user.uid == this.user_id)
        let completedLesson = currentUser?.completedLesson ? currentUser.completedLesson : 0
        this.mainService.updateUserInfo(this.user_id, {bookedLesson: completedLesson + 1}).then(() => {
          console.log('Profile updated successfully!');
        });
      });
    }
    let student = this.availableStudents.find((student:any)=>student.uid == this.lesson.studentId)
    const lesson = {
      studentId: this.lesson.studentId,
      teacherId: this.user_id,
      student_name: student.displayName,
      instructor_name: this.lesson.instructor_name,
      title: this.lesson.title,
      description: this.lesson.description?this.lesson.description:'',
      date: this.lesson.date,
      timing: this.lesson.timing,
      cost: this.lesson.cost,
      lesson_type: this.lesson.lesson_type,
      progress: this.lesson.progress,
      status: this.lesson.progress == 100 ? 1 : 0 
    };
    
    this.mainService.updateLesson(this.lesson.id,lesson);
    this.cancel();
  }
  lessonEvent(){
    if(this.createNew) {
      this.addLesson()
    }
    else this.updateLesson()

  }
  deleteLesson(){
      this.mainService.deleteLesson(this.lesson.id)
      this.cancel()
  }
}
