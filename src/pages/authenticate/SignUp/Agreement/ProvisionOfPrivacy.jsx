import React from "react";
import './Agreement.css';
import './../../../../styles/defaultDesign.css';

function ProvisionOfPrivacy() {
  return (
    <div className="Privacy--container">
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

export default ProvisionOfPrivacy;