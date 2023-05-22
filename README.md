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
이번 프로젝트에서 Spring Boot, JPA를 활용하여 서비스 핵심 로직인 대여/반납 로직을 구현하였습니다.
덕분에 Java, JPA 코드를 작성하는데 더욱 능숙해진 계기가 되었습니다. 앞으로 더 발전시키고 싶은 점은 비슷한 코드의 중복을 줄이고 변화에 빠르게 대응할 수 있도록 코드 구조를 개선하는 리팩토링 방법을 익혀서 이번 프로젝트에 적용해보면 더욱 깔끔한 프로젝트가 될 것이라고 생각합니다. 마지막으로 밤낮없이 함께 고생해준 팀원들께 고맙다는 인사를 전하고 싶습니다. 다들 성실하고 뛰어난 팀원들인 만큼 현업에서도 좋은 모습으로 함께 만나고 싶습니다.

### 정명관
아쉬움이 많은 프로젝트입니다. 마지막으로 진행되는 프로젝트에서 밤을 새가면서 열심히 한 프로젝트였습니다. 하지만 시간을 효율적으로 사용하지 못하여 우연히 생긴 변수들에 의해 저희의 프로젝트가 미완성이 된 상태로 마무리 된 것이 아쉬웠습니다.
저 개인으로도 AI와 추천알고리증을 도전하여 프로젝트에 적용하기는 했지만 더 효율적이고, 성능이 높은 모델들을 사용해서 넣었다면 더 좋은 결과가 나왔을 것이라고 생각이 됩니다.
이번 프로젝트에서 얻은 실패들을 잘 녹여서 다른 프로젝트를 진행할 때 기억하여 효율적인 시간 관리 및 프로젝트 규모를 잘 정하여서 완성되고 수준 높은 프로젝트를 진행하겠습니다.

### 한승준
자기관리의 중요성을 뼈저리게 느꼈다. 프로젝트 중간에 병원신세를 짐에 따라서 프로젝트에서 중요한 순간에 퍼포먼스를 보여주지 못했고, 그래서 아쉬운 감이 있었다. 그리고 프로젝트할 때는 프로젝트에만 집중해야 원하는 규모의 프로젝트가 나온다는 것을 알게 되었다. 좋았던 점은 몇번의 프로젝트를 진행하면서, 어떤 측면에서 서비스를 제공해야하는지 알게되었고, 코드를 생산하는데에 있어서 두려움은 없었다. 다만 매번 새로운 기술을 써야하는 부담감이 있어서 그에 대한 공부를 했어야 했는데, 이번에 취준병행을 하다보니 새로운 기술에 대한 깊이가 전반적으로 부족했다고 본다. 그래서 과유불급이라는 말에 대해서 다시 한 번 곱씹어 보게 되었다.

### 이주형
새로운 기술을 많이 도입하는 도전적인 프로젝트였습니다. 시행착오가 많았고 다루어보지 못한 분야에 도전하다보니 시간이 많이 부족해 아쉬웠지만 배운것도 많은 프로젝트였습니다. 다음에는 조금 더 안정적으로 프로젝트를 진행 할 수 있었으면 좋겠습니다.

### 김태헌
PWA를 통해 웹에서 모바일 앱 같은 사용자 경험을 성공적으로 제공할 수 있었습니다. 하지만 시간 부족으로 푸시 알림 기능을 구현하지 못한 것이 아쉬웠습니다. D3를 활용한 막대 그래프와 파이 차트로 사용자에게 다양한 시각화를 제공함으로써 웹에서 더 직관적으로 데이터를 전달할 수 있었습니다. 이번 프로젝트를 진행하며 일정 관리의 체계적인 중요성에 대해 깊게 인식하게 된 경험적인 프로젝트였습니다.

### 김지현
이번프로젝트에서 채팅을 위해 서버와 클라이언트의 양방향통신을 담당했는데 http통신이 아닌 소켓 통신을 처음이다보니 초기 작업속도가 많이 느렸었다. 하지만 웹소켓, stomp, redis 등 여러 방법을 시도해 보며, 양방향 실시간 통신의 작동방식을 좀더 잘 이해하고자 노력했다. 덕분에 채팅을 해결하고 난 이후에도 IoT와 소켓통신을 시도하는데에는 좀더 빨리 통신에 성공할 수 있었고 이를 통해 기본적인 이해를 하는것이 중요하다는 것을 다시한번 깨닫을 수 있었던 것 같다.
또한 관리자를 위한 통계수치를 제공하기 위해 복작한 쿼리문을 작성해 봄으로써 쿼리를 좀더 잘 이해하고 활용해볼 수 있었으며, DB설계단계가 프로젝트에서 얼마나 중요한 부분을 차지 하는 지를 알 수 있었다.

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