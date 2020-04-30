import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

  constructor() { }

  successModal(message, title?: any, ) {
    Swal.fire(
      `${title ? title : 'Successful!'}`,
      `${message}`,
      'success'
    )
  }
  customModal(message, icon, title?: any, ) {
    Swal.fire(
      `${title ? title : 'Successful!'}`,
      `${message}`,
      icon
    )
  }



  toastModal(icon, message, position) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: message
    })
  }
}
