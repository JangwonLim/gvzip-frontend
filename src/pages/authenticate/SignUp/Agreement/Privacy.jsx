import React from "react";
import './../../../../styles/defaultDesign.css';
import './Agreement.css';

function Privacy() {
  return (
    <div className="Privacy--container">
      <div className="Privacy--title-container">
        <span className="Privacy--title">
          개인정보의 수집 및 이용에 대한 안내 
        </span>

        <div className="Privacy--content">
          <span className="Privacy--title">
            가. 수집 및 이용 목적
          </span>
          <span className="b6-16-m">
            GVCS 동문 네트워크 활성화를 위한 웹 플랫폼 지비집 내에서 프로필 카드에 정보를 표기하기 위함
          </span>
        </div>
      </div>

      <div className="Privacy--content">
        <span className="Privacy--title">
          나. 수집 및 이용 항목
        </span>
        <span className="b6-16-m">
          1. 필수항목 : 성명(한글/영문), 생년월일, 성별, 이메일, 졸업 캠퍼스, 졸업년도, 활동 위치, 활동 분야, 최종 학력
        </span>
        <span className="b6-16-m">
          2. 선택항목 : 프로필 사진, 경력/경험, 포트폴리오 링크
        </span>
      </div>

      <div className="Privacy--content">
        <span className="Privacy--title">
          다. 개인정보의 보유 및 이용 기간
        </span>
        <span className="b6-16-m">
          지비집 회원의 개인정보 수집ㆍ이용에 관한 동의일로부터 서비스 종료 시까지 위 이용목적을 위하여 보유 및 이용하게 됩니다. 단, 탈퇴 혹은 서비스 종료 후에는 민원처리, 분쟁해결 및 법령상 의무이행 등을 위하여 1년간 보유하게 됩니다.
        </span>
      </div>
      
      <div className="Privacy--content">
        <span className="Privacy--title">
          라. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익
        </span>
        <span className="b6-16-m">
          위 개인정보 중 필수정보의 수집ㆍ이용에 관한 동의는 지비집 웹사이트 서비스 제공을 위해 필수적이므로, 위 사항에 동의하셔야만 서비스 이용이 가능합니다. 지비집 회원은 개인정보의 선택항목 제공 동의를 거부할 권리가 있습니다.
        </span>
      </div>

      <div className="Privacy--title-container">
        <span className="Privacy--title">
          개인정보의 제 3자 제공에 대한 동의
        </span>

        <div className="Privacy--content">
          <span className="Privacy--title">
            가. 제공 대상
          </span>
          <span className="b6-16-m">
            GVCS 진로진학부, GVCS 총동문회
          </span>
        </div>
      </div>

      <div className="Privacy--content">
        <span className="Privacy--title">
          나. 제공 정보의 이용 목적
        </span>
        <span className="b6-16-m">
          재학생들의 대학 진학을 위한 도움 및 GVCS 총동문회 활동 활성화
        </span>
      </div>

      <div className="Privacy--content">
        <span className="Privacy--title">
          다. 제공하는 개인정보 항목
        </span>
        <span className="b6-16-m">
          성명, 이메일, 졸업 캠퍼스, 활동 분야, 최종 학력
        </span>
      </div>
      
      <div className="Privacy--content">
        <span className="Privacy--title">
          라. 개인정보의 보유 및 이용 기간
        </span>
        <span className="b6-16-m">
          1년 (개인정보를 제공받는 자는 상기 이용 목적 외에 개인정보를 이용할 수 없으며, 개인정보 보호법 등에서 정하는 바에 기록, 보관, 파기됩니다.)
        </span>
      </div>

      <div className="Privacy--content">
        <span className="Privacy--title">
          마. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익
        </span>
        <span className="b6-16-m">
          지비집 회원은 개인정보 제 3자 제공 동의를 거부할 권리가 있습니다.
        </span>
      </div>

    </div>
  )
}

export default Privacy;