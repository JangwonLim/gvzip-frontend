import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import '../../../styles/defaultDesign.css';

function SignIn() {

  return(
    <div>
      <span>아직 회원이 아니신가요?</span>
      <a href="/signup">가입하기</a>
    </div>
  )
}

export default SignIn;

