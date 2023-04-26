import Swal from "sweetalert2";

export default function Alert(icon: string, title: string) {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  Toast.fire(icon, title);
}
