const UserShareDetailContent = () => {
  return (
    <div
          style={{
            width: '98vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2vh',
            fontWeight: '900',
            paddingLeft: '1vw', 
            paddingRight: '1vw'
          }}
        >
          {/* 나중에 바꿀꺼임 */}
          <span
            style={{
              fontSize: "0.9rem",
              width: '90%',
              textAlign: 'left'
            }}
          >
            저희 목수의 드라이버는 고품질 목공 도구로, 목공 작업을 보다 쉽고
            효과적으로 수행할 수 있도록 도와줍니다. 목수의 드라이버를 사용하면
            목재를 다루는 데 필요한 힘과 정밀도를 높여 목공 작업을 더욱 즐겁고
            효율적으로 할 수 있습니다. 목수의 드라이버는 뛰어난 성능과 편의성을
            갖춘 도구로, 목공 작업의 효율성과 정밀성을 높여줍니다. 
            <br/>
            <br/>
            무엇보다, 목수의 드라이버는 목공 작업에 열정을 품고 있는 모든 목수들에게 꼭
            필요한 도구입니다. 목공 작업을 좋아하는 분들에게는 꼭 필요한
            아이템이며, 목공에 관심이 있는 분들에게도 추천해드립니다.
          </span>
          <span
            style={{
              marginTop: '10vh',
              fontSize: '0.7rem',
              color: '#adadad',
              width: '90%',
              paddingBottom: '1.5vh',
              borderBottom: '1px solid #adadad',
            }}
          >
            관심 3 · 조회 5
          </span>
        </div>
  )
}

export default UserShareDetailContent