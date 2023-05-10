import { Bootpay } from "@bootpay/client-js";
import { useEffect } from "react";
import Alert from "../../components/UI/Alert";
import { useNavigate } from "react-router-dom";
import { useGetUserToken } from "../../hooks/useGetToken";
import axios from "axios";

const URL = "http://k8d102.p.ssafy.io:8088/api/user/info/pay-method";

export default function UserPay() {
  const token = useGetUserToken();
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
          axios
            .patch(
              URL,
              {
                receiptId: response?.data?.receipt_id,
                type: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json;charset=UTF-8",
                  accept: "application/json;charset=UTF-8",
                },
              }
            )
            .then(() => {
              Alert("success", "카드가 등록되었습니다.", navigate("/home"));
            })
            .catch((error) => {
              console.error(error);
            });
          console.log(response);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  }, []);

  return <></>;
}
