import Swal from "sweetalert2";
import { SweetAlertIcon } from "sweetalert2";

export default function Alert(
  icon: SweetAlertIcon,
  title: string,
  didClose: any = null
) {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  Toast.fire({ icon, title }).then(() => didClose);
}
