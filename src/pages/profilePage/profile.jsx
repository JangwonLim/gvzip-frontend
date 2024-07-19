import React, { useEffect, useState } from "react";
import './profile.css';
// import Card from '../../components/Card/Card';
import { getMyInfo } from "../../service/getService";

function Profile() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchMyInfo = async () => {
      let result = await getMyInfo();
      console.log("result: ", result.data);
      setData(result.data);
    }

    fetchMyInfo();
  }, []);

  return (
    <div>
      {/* <Card data={data}/> */}
    </div>
  )
}

export default Profile;