import { Bootpay } from "@bootpay/client-js";
import { useEffect } from "react";
import { Swal } from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UserPay() {
  const navigate = useNavigate();
  useEffect(() => {
    Bootpay.requestSubscription({
      application_id: "6449e6343049c8001c9e071d",
      pg: "나이스페이",
      price: 100,
      tax_free: 0,
      order_name: "정기결제 입니다",
      subscription_id: new Date().getTime(),
      user: {
        username: "홍길동",
        phone: "01000000000",
      },
      extra: {
        subscription_comment: "결제 수단 등록시 100원이 결제됩니다.",
        subscribe_test_payment: true,
      },
    }).then(
      function (response) {
        if (response.event === "done") {
          Swal.fire({
            icon: "success",
            title: "카드가 등록되었습니다.",
            didclose: () => navigate(""),
          });
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  }, []);

  return <>asd</>;
}
