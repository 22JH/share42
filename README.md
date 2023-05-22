# 공유사이
<div align="left">
<img width="300" src="image/s42-logo.png">
</div>
<br/>

## 프로젝트 소개
- **공유사이**는 비대면 물품 대여 플랫폼입니다.
- **공유사이**는 유용한 물품이지만 비싼 비용을 지불하며 구매하기 어려운 물품을 대여해주는 서비스 입니다.
- 기존 거래 플랫폼의 대면 거래로 인한 범죄의 위험성과 얼굴 노출에 대한 부담감을 감소시키기 위한 비대면 물품 대여 플랫폼입니다.
- 비대면 대여를 통해 기존 대면 거래 플랫폼에 있었던 시간적 제약(시간 약속 등)의 불편함을 해소하였습니다.
- 크게 웹 Front-end, Back-end, Blockchain, AI, IoT 파트로 나누어 6주동안 프로젝트를 진행했습니다.


<br/>

## 목차
- [참여자](#참여자)
- [느낀점](#느낀점)
- [발표자료](#발표자료)
- [UCC](#UCC)
- [기간](#기간)
- [기능구현](#기능구현)
- [사용기술스택](#사용기술스택)
- [스크린샷](#스크린샷)

<br/>

## 참여자

### Back-end

| 한상우([@miracle3070](https://github.com/miracle3070)) | 정명관([@rhalsemd](https://github.com/rhalsemd)) | 김지현([@potatohyun](https://github.com/potatohyun)) |
|:----:|:----:|:----:|
|<img width="200" src="image/s42-swhan.png">|<img width="200" src="image/s42-mkjeong.png">|<img width="200" src="image/s42-jhkim.png">|

<br/>

### Front-end

| 이주형([@22JH](https://github.com/22JH)) | 한승준([@hanseungjune](https://github.com/hanseungjune)) | 김태헌([@gangnamssal](https://github.com/gangnamssal)) |
|:----:|:----:|:----:|
|<img width="200" src="image/s42-jhlee.png">|<img width="200" src="image/s42-sjhan.png">|<img width="200" src="image/s42-thkim.png">|

<br/>

## 느낀점

### 한상우


### 정명관


### 한승준


### 이주형


### 김태헌


### 김지현


<br/>

## 발표자료
[중간발표 자료 다운로드](data/공유사이-D102-자율중간발표.pdf) (*.pdf)

<br/>

## UCC


<br/>

## 기간
2023.04.10. ~ 2023.05.19.

<br/>

## 기능구현

- Back-end
    - Spring Security + JWT + Redis 기반의 로그인/로그아웃 구현
    - 회원가입 시 문자 인증
    - 사용자 계좌정보(결제수단) 등록
    - DB 인덱싱 처리를 통한 주소 API 조회
    - 공유 물품 등록, 수납, 대여, 반납, 회수 기능
    - 사용자 커뮤니티 기능
    - 웹 소켓을 활용한 채팅 기능
    - 지도에 표시할 대여함 지점 데이터 반환
    - 공유 물품 게시글에 협업 필터링을 적용하여 추천 알고리즘 구현
    - MultipartFile을 통한 React↔Spring Boot 파일 업로드
    - Kakao Map에 사용될 주소↔좌표 변환 API 기능
    - BootPay를 통한 자동 결제 기능 구현
    - Swagger를 통한 API 테스트 환경 구축
    - Nginx, Spring Boot 등에 SSL 적용
    - NFC 시리얼 번호를 기반으로한 대여함 오픈 기능
- Front-end
    - 회원가입 기능 구현
    - 로그인, 로그아웃 기능 구현
    - 공유 물품 사용 관련 안내가이드 조회 기능
    - 커뮤니티 글 작성, 수정, 삭제, 조회 기능 구현
    - 커뮤니티 글 목록 조회 기능 구현
    - 커뮤니티 댓글 조회, 등록, 수정, 삭제 기능 구현
    - 공유 물품 글 조회, 등록, 조회, 삭제 기능 구현
    - 공유 물품 사용 신청 및 회수 신청 기능 구현
    - 사용자 정보 변경 기능 구현
    - 사용자 결제 수단 등록 및 수정 기능 구현
    - 공유함 및 공유글 신고 기능 구현
    - 사용자 수익 통계 조회 기능 구현
    - 사용자 작성 글 목록 조회 기능 구현
    - 사용자 찜한 목록 조회 기능 구현
    - NFC 를 통한 결제 기능 구현
    - 관리자 지점별 사용 로그 조회 기능 구현
    - 관리자 시도별 사용량 조회 기능구현
    - 관리자 사물함 사용량 조회 기능 구현
- Blockchain
    - Klaytn API 호출을 통한 지갑 및 메타데이터 생성, 컨트랙트 배포
    - 공유 물품 수납, 대여, 반납, 회수 기록을 Klaytn 블록체인에 저장
- Infra
    - Jenkins(Java 17), Docker, Docker-Compose를 활용하여 Merge Request WebHook 발생시 빌드 및 배포
    - Jenkins Pipeline를 활용한 React, Spring Boot 빌드 자동화
    - Nginx를 활용한 리버스 프록시 구현
- AI
    - ONNX 기반 Yolo v5 모델을 활용하여 대여에 적합한 물품인지 판단 (이미지에서 물체 인식)
- IoT
    - 웹 소켓을 활용한 서버와 통신
    - NFC 태그 기능
    - 웹 소켓을 활용한 대여함 내부 이미지를 서버로 전송
    - 아두이노 동작 코딩
    - 대여함 케이스 제작

<br/>

## 사용 기술스택
PPT 이미지 추가


<br/>

## 스크린샷
PPT 이미지 추가

<br/>