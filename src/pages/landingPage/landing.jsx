import React from "react";
import './landing.css';
import './../../styles/defaultDesign.css';
import Button from "./../../components/Button/Button";
import InfiniteSlider from "../../components/InfiniteSlider/InfiniteSlider";
import MobileSlider from "../../components/InfiniteSlider/MobileSlider";
import { useMediaQuery } from 'react-responsive';

function Landing() {

  const goToInsta = () => {
    window.location.href = 'https://www.instagram.com/teamddg.official/';
  };

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return(
    <div>
      <div className="Landing--poster">
        <span className="Landing--slogan">
          GATHER TOGETHER<br/>
          BETTER TOGETHER
        </span>
      </div>

      <div className="Landing--about">
        <span className={isMobile ? "b4-14-sb Landing--about-content" : "pc-head fs-32"}>지비집은 GVCS 커뮤니티 활성화를 위한 플랫폼입니다.</span>
      </div>

      <div className="Landing--values">

        <div className="Landing--values-container">
          <div className="Landing--values-picture"/>
          <div className={"Landing--values-content" + ( isMobile ? "" : " to-right")}>
            {
              isMobile ?
              <>
                <span className="h3-20-b title-margin">지비집의 탄생</span>
                <span className="b5-16-sb subtitle-margin">ZIP 그리고 집</span>
                <span 
                style={{ color: '#787878'}}
                className="b3-14-m">
                  동문들의 정보가 ‘ZIP’ 파일처럼 한 곳에 압축되어 있다는<br/>의미이자 우리가 학창시절 먹고 자고 생활했던 ‘집'을<br/>나타내는 뜻으로, 이곳에서 지비 공동체가 지속적으로<br/>서로 온기를 주고받을 수 있게 합니다.
                </span>
              </>
              :
              <>
                <span className="pc-head fs-42 title-margin">지비집의 탄생</span>
                <span className="pc-head fs-24 subtitle-margin">ZIP 그리고 집</span>
                <span 
                style={{ color: '#787878'}}
                className="pc-body fs-18">
                  동문들의 정보가 ‘ZIP’ 파일처럼 한 곳에 압축되어 있다는 의미이자<br/>
                  우리가 학창시절 먹고 자고 생활했던 ‘집'을 나타내는 뜻으로,<br/>
                  이곳에서 지비 공동체가 지속적으로 서로 온기를 주고받을 수 있게 합니다.
                </span>
              </>
            }
          </div>
        </div>

        <div className="Landing--values-container">
          { isMobile && <div className="Landing--values-picture"/> }
          <div className="Landing--values-content">
            { isMobile ?
              <>
                <span className="h3-20-b title-margin">연결의 힘</span>
                <span className="b5-16-sb subtitle-margin">동문 & 인기모 정보 아카이브</span>
                <span 
                style={{ color: '#787878'}}
                className="b3-14-m">
                  다양한 지역과 분야에서 활약하고 있는 GVCS 동문과<br/>
                  인기모의 프로필을 통해 손쉬운 정보 교환과 커넥션을<br/>
                  이루어나갑니다. 내가 궁금했던, 또 나를 궁금해하는<br/> 
                  GVCS 가족들과의 연결을 통해 좋은 정보가 곧 경쟁력이<br/>
                  되는 시대에서 더 따뜻한 세상을 누릴 수 있기를 기대합니다.
                </span>
              </> :
              <>
                <span className="pc-head fs-42 title-margin">연결의 힘</span>
                <span className="pc-head fs-24 subtitle-margin">동문 & 인기모 정보 아카이브</span>
                <span 
                style={{ color: '#787878'}}
                className="pc-body fs-18">
                  다양한 지역과 분야에서 활약하고 있는 GVCS 동문과 인기모의 프로필을<br/>
                  통해 손쉬운 정보 교환과 커넥션을 이루어나갑니다. <br/>
                  내가 궁금했던, 또 나를 궁금해하는 GVCS 가족들과의 연결을 통해 좋은 정보가 곧<br/>
                  경쟁력이 되는 시대에서 더 따뜻한 세상을 누릴 수 있기를 기대합니다.
                </span>
              </>
            }
          </div>
          { !isMobile && <div className="Landing--values-picture"/> }
        </div>
        
      </div>

      <div className="Landing--connect-container">
        {
          isMobile ?
          <>
            <span className="h4-24-b Landing--connect-title">
              간편 회원가입하고<br/> 
              지금 바로 지비 가족들과 연결되기
            </span>
            <Button
              radius="30px"
              bg="black"
              color="white"
              width="194px"
              height="60px"
            >
              <span className="h2-18-sb">회원 가입</span>
            </Button>
          </> : 
          <>
            <span className="Landing--connect-title">
              간편 회원가입하고<br/> 
              지금 바로 지비 가족들과 연결되기
            </span>
            <Button
              radius="30px"
              bg="black"
              color="white"
              width="180px"
              height="60px"
            >
              <span className="pc-button fs-20">회원 가입</span>
            </Button>
          </>
        }
        
      </div>

      <div className="Landing--ddg">
        <div className="Landing--ddg-title">
          { isMobile ?
            <>
              <span className="h3-20-b">TEAM DDG</span>
              <span className="b3-14-m">
                안녕하세요, 연결이 필요한 곳을 찾아 통로를 내는 팀,<br/>
                DDG(두더지)입니다. 저희는 소통의 부재로 인한 사회의<br/>
                단절, 혐오, 소외에 대해 맞서 싸우며,함께하는 기쁨을<br/> 
                전하는 것을 목표로 합니다.
              </span>
            </> :
            <>
              <span className="pc-head fs-42">TEAM DDG</span>
              <span className="pc-body fs-18">
                안녕하세요, 연결이 필요한 곳을 찾아 통로를 내는 팀, DDG(두더지)입니다.<br/>
                저희는 소통의 부재로 인한 사회의 단절, 혐오, 소외에 대해 맞서 싸우며,<br/>
                함께하는 기쁨을 전하는 것을 목표로 합니다.
              </span>
            </>
          }
          
        </div>

        { isMobile ? <MobileSlider/> : <InfiniteSlider/> }

        <div className="Landing--contact" onClick={goToInsta}>
          <span className="pc-button fs-20" style={{ fontWeight: "600" }}>
            CONTACT US
          </span>
        </div>
        
  
      </div>

    </div>
  )
}

export default Landing;