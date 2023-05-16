/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserShareDetailCarousel from "../../components/sharedetail/UserShareDetailCarousel";
import UserShareDetailPostInfo from "../../components/sharedetail/UserShareDetailPostInfo";
import UserShareDetailContent from "../../components/sharedetail/UserShareDetailContent";
import UserShareDetailRequest from "../../components/sharedetail/UserShareDetailRequest";
import axios from "axios";
import { useQuery } from "react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../..";
import swal from "sweetalert";

const SHARE_DETAIL_API = (id: any) => {
  // eslint-disable-next-line max-len
  return `https://www.share42-together.com/api/user/share/share-articles/${id}`;
};

const BORROW_API = (id: any) => {
  // eslint-disable-next-line max-len
  return `https://www.share42-together.com/api/user/share/borrow/${id}`;
};

const BORROW_DELETE_API = (id: any) => {
  // eslint-disable-next-line max-len
  return `https://www.share42-together.com/api/user/share/borrow/cancel/${id}`;
};

const BILLING_KEY_API = () => {
  return `https://www.share42-together.com/api/user/info/pay-method/check/0`;
};

const UserSharePost = () => {
  const { id } = useParams();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const slideWidth = 415;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentTouchStart, setCurrentTouchStart] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [userRequest, setUserRequest] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [keepImg, setKeepImg] = useState<undefined | string>(undefined);
  const [returnImg, setReturnImg] = useState<any[]>([]);

  const [billing, setBilling] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: BILLING_KEY_API(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => {
        console.log(res.data.message);
        setBilling(res.data.message);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(billing);

  // 점 클릭하면 넘어가게 일단 기능 구현
  const handleDotClick = (idx: number) => {
    if (slideRef.current) {
      slideRef.current.scrollTo({
        left: slideWidth * idx,
        behavior: "smooth",
      });
      setCurrentSlide(idx);
    }
  };

  // 슬라이드 손가락 누른부분을 시작점으로
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    setCurrentTouchStart(touchStartX);
  };

  // 누른 상태로 이동하여 거리 계산
  const handleTouchMove = (e: React.TouchEvent) => {
    if (slideRef.current) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchMoveX - currentTouchStart;
      setSlideOffset(deltaX);
    }
  };

  // 손가락을 떼로 난 다음거리 계산해서 이미지 조정하기
  const handleTouchEnd = () => {
    const slideOffsetAbs = Math.abs(slideOffset);

    if (slideOffsetAbs > slideWidth / 4) {
      const direction = slideOffset > 0 ? "right" : "left";
      const nextSlideIndex =
        direction === "right" ? currentSlide - 1 : currentSlide + 1;

      scrollToSlide(nextSlideIndex);
      setCurrentSlide(nextSlideIndex);
    } else {
      scrollToSlide(currentSlide);
    }

    setSlideOffset(0);
  };

  // 슬라이드 전체 위치를 왼쪽 오른쪽으로
  const scrollToSlide = (idx: number) => {
    if (slideRef.current) {
      slideRef.current.scrollTo({
        left: slideWidth * idx,
        behavior: "smooth",
      });
      setCurrentSlide(idx);
    }
  };

  // 사용신청 하기
  const handleUseRequest = async (id: string | undefined) => {
    if (billing === "FAIL") {
      console.log("Welcome to the home");
      // navigate('/home')
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: BORROW_API(id),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res?.data?.status === 200) {
        swal("신청 성공", "사용 신청이 완료되었습니다.", "success");
        refetch();
        return res.data;
      } else {
        swal("신청 실패", "사용 신청이 실패되었습니다.", "error");
        refetch();
      }
    } catch (e) {
      console.log(e);
      swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
    }
  };

  // 사용취소 하기
  const handleUseCancel = async (id: string | undefined) => {
    try {
      const res = await axios({
        method: "POST",
        url: BORROW_DELETE_API(id),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === 200) {
        swal("취소 성공", "사용 취소가 완료되었습니다.", "success");
        refetch();
        return res.data;
      } else {
        swal("취소 실패", "사용 취소가 실패되었습니다.", "error");
        refetch();
      }
    } catch (e) {
      console.log(e);
      swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
    }
  };

  // 채팅하기 화면으로
  const handleChating = async () => {
    const loginObject = localStorage.getItem("loginInfo");
    const { userId } = loginObject ? JSON.parse(loginObject) : null;
    const otherPerson = data?.article.accountUserId;
    /// 글 등록 유저 id 임시
    const temp_reg_user_id = "test_user_id";
    /// 유저 쿼리 찾기
    const q = query(collection(db, "users"), where("userId", "==", "test_id"));
    ////
    const querySnapshot = await getDocs(q);
    ///////
    const chatName =
      userId > otherPerson ? userId + otherPerson : otherPerson + userId;
    const chats = await getDoc(doc(db, "chats", chatName));

    if (!chats.exists()) {
      await setDoc(doc(db, "chats", chatName), { message: [] });
      await updateDoc(doc(db, "userChats", userId), {
        [chatName + ".userInfo"]: {
          id: otherPerson,
          /// 프로필 받아와야함
          // profile: `https://www.share42-together.com/images/${data?.article.accountImg}`,
        },
        [chatName + ".date"]: serverTimestamp(),
      });
    }

    navigate(`/user/chat/${chatName}`);
  };

  // NFC 화면으로
  const handleNFC = () => {
    // NFC 화면으로 가기
    navigate("/user/nfc");
  };

  // 상세조회 페이지 데이터 가져오기
  const { data, refetch } = useQuery(
    ["getShareDetail", id],
    async () => {
      try {
        const res = await axios({
          method: "GET",
          url: SHARE_DETAIL_API(id),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res?.data?.status === 200) {
          setKeepImg(res.data.message.keepImg);
          setReturnImg(res.data.message.returnImg);
          setIsLike(res.data.message.likeCheck);
          setLikeCount(res.data.message.likeCount);
          return res.data.message;
        }
      } catch (e) {
        console.log(e);
      }
    },
    {
      suspense: false,
    }
  );

  console.log(data);

  // 사용 신청 상태 저장
  useEffect(() => {
    if (data && data.article.shareStatus === 2) {
      setUserRequest(true);
    } else if (data && data.article.shareStatus === 1) {
      setUserRequest(false);
    }
  }, [data?.article.shareStatus, data]);

  return (
    <>
      <UserShareDetailCarousel
        slideRef={slideRef}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        slideWidth={slideWidth}
        handleDotClick={handleDotClick}
        currentSlide={currentSlide}
        data={data}
        keepImg={keepImg}
        returnImg={returnImg}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2.5vh",
        }}
      >
        <UserShareDetailPostInfo
          isLike={isLike}
          data={data}
          setIsLike={setIsLike}
        />
        <UserShareDetailContent data={data} likeCount={likeCount} />
        <UserShareDetailRequest
          useRequest={userRequest}
          handleUseRequest={handleUseRequest}
          handleUseCancel={handleUseCancel}
          handleNFC={handleNFC}
          handleChating={handleChating}
          data={data}
          billing={billing}
        />
      </div>
    </>
  );
};

export default UserSharePost;
