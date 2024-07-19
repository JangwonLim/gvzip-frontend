import React, { useEffect, useState } from "react";
import './profile.css';
import Card from '../../components/Card/Card';
import { getMyInfo } from "../../service/getService";

function Profile() {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      let result = await getMyInfo();
      console.log("result: ", result.data);
      setMyInfo(result.data);
      console.log("myInfo: ", myInfo);
    }

    fetchMyInfo();
  }, [myInfo]);

  return (
    <div>
      <Card data={myInfo}/>
    </div>
  )
}

export default Profile;