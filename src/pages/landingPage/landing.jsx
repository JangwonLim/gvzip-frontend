import React, { useEffect } from "react";
import './landing.css';
import './../../styles/defaultDesign.css';
import Button from "./../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../../utils/usefulFunctions";
import { getIsLogIn } from "../../service/getService";

function Landing() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   setLoggedIn(isLoggedIn());
  // }, []);

  const checkAuth = async () => {
    try {
      const result = await getIsLogIn();

      return result;
    } catch (error) {
      console.log("error in checkAuth")
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])
  
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  const navigate = useNavigate();

  const DDG = [
    {
      fileName: "jimin",
      name: "Jimin Kim",
      role: "Designer"
    },
    {
      fileName: "jungmin",
      name: "Jungmin Park",
      role: "Designer"
    },
    {
      fileName: "dongwook",
      name: "Dongwook Lee",
      role: "Developer"
    },
    {
      fileName: "dabin",
      name: "Dabin Lee",
      role: "Developer"
    },
    {
      fileName: "jangwon",
      name: "Jangwon Lim",
      role: "Developer"
    },
    {
      fileName: "dahyun",
      name: "Dahyun Kim",
      role: "Planner"
    },
    {
      fileName: "hori",
      name: "Hori Lee",
      role: "Planner"
    },
    {
      fileName: "kyungmin",
      name: "Kyungmin Jeong",
      role: "Planner"
    },
  ]

  return(
    <div style={{ minWidth: "390px"}}>
      <div className="Landing--poster">
        {/* <img src={require("../../assets/landing-poster.png")} alt="" /> */}
      </div>

      <div className="Landing--about">
        <span className="Landing--about-content">
          지비집은 GVCS 커뮤니티 활성화를 위한 플랫폼입니다.
        </span>
      </div>

      <div className="Landing--values">

        <div className="Landing--values-container">
          <div className="Landing--values-picture value-1"/>
          <div className={"Landing--values-content" + ( isMobile ? "" : " to-right")}>
            {
              isMobile ?
              <>
                <span className="h3-20-b title-margin">지비집의 탄생</span>
                <span 
                  style={{ color: '#787878'}}
                  className="b3-14-m"
                >
                  TEAM DDG는 졸업 이후 GVCS 동문들이 전세계로 흩어지는 것이 강점인 동시에 약점이 되고 있는 지점을 발견했습니다. 이를 해결하기 위해 시간과 공간의 구애를 받지 않고 교류할 수 있는 온라인 공간, 지비집을 고안했습니다.
                </span>
                <span className="b7-16-sb subtitle-margin">zip & 집</span>
                <span 
                style={{ color: '#787878'}}
                className="b3-14-m">
                  <span>
                    GVCS 구성원들의 정보가 ‘zip’ 파일처럼 한 곳에 압축되어 있다는 의미이자, 학창시절 우리가 먹고 자고 함께 생활했던 ‘집’을 나타내는 뜻으로 지비집에서 GVCS 공동체가 지속적으로 온기를 주고 받을 수 있게 합니다.
                  </span>
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
          { isMobile && <div className="Landing--values-picture value-2"/> }
          <div className="Landing--values-content">
            { isMobile ?
              <>
                <span className="h3-20-b title-margin">연결의 힘</span>
                <span className="b7-16-sb subtitle-margin">Re-connect</span>
                <span 
                style={{ color: '#787878'}}
                className="b3-14-m">
                  좋은 정보가 곧 경쟁력이 되는 시대를 살아가고 있습니다.
                  <br />지비집을 통한 GVCS 커뮤니티의 ‘re-connection’이 좋은 정보의 순환을 이루어 우리 공동체에 잠재 되었던 빛을 발할 수 있기를 기대합니다.
                </span>
              </> :
              <>
                <span className="pc-head fs-42 title-margin">연결의 힘</span>
                <span className="pc-head fs-24 subtitle-margin">동문 그리고 인기모 정보 아카이브</span>
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
            <span className="Landing--connect-title">
              간편 가입하고 지금 바로<br/> 
              지비 가족들과 연결되기
            </span>
            <Button
              radius="30px"
              bg="black"
              color="white"
              width="167px"
              height="52px"
              onClick={() => navigate('/signup')}
            >
              <span className="h2-18-sb">회원가입</span>
            </Button>
          </> : 
          <>
            <span className="Landing--connect-title">
              간편 회원가입하고 지금 바로<br/> 
              지비 가족들과 연결되기
            </span>
            <Button
              radius="30px"
              bg="black"
              color="white"
              width="180px"
              height="60px"
              onClick={() => navigate('/signup')}
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
              <span className="h3-20-b" >TEAM DDG</span>
              <span className="b3-14-m">
                안녕하세요, 연결이 필요한 곳을 찾아 통로를 내는 팀,<br/>
                DDG(두더지)입니다. 저희는 소통의 부재로 인한 사회의<br/>
                단절, 혐오, 소외에 대해 맞서 싸우며, 함께하는 기쁨을<br/> 
                전하는 것을 목표로 합니다.
              </span>
            </> :
            <>
              <span className="pc-head fs-42">TEAM DDG</span>
              <span className="pc-body fs-18">
                안녕하세요, 연결이 필요한 곳을 찾아 통로를 내는 팀, DDG(두더지)입니다.<br/>
                저희는 소통의 부재로 인한 사회의 단절, 혐오, 소외에 대해 맞서 싸우며, <br/>
                함께하는 기쁨을 전하는 것을 목표로 합니다.
              </span>
            </>
          }
        </div>

        <div className="Landing--ddg-intro-section">
          {
            DDG.map((item, index) => (
              <ProfileCard fileName={item.fileName} name={item.name} role={item.role} key={index}/>
            ))
          }
        </div>
        

        <Footer/>
      </div>

    </div>
  )
}

function ProfileCard({fileName, name, role}) {
  return (
    <div className="Landing--ddg-picture-container">
      <div className="Landing--ddg-picture-wrapper">
        <img 
          className="Landing--ddg-picture"
          src={require(`./../../assets/${fileName}.png`)} 
          alt={fileName}
        />
        <span className="Landing--ddg-role">{role}</span>
      </div>
      <div className="Landing--ddg-name">
        <span className="Landing--ddg-name-font">{name}</span>
      </div>
    </div>
  )
}

export default Landing;