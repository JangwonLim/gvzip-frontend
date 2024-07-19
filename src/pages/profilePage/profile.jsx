import React, { useCallback, useEffect, useState } from "react";
import './profile.css';
import Card from '../../components/Card/Card';
import { getMyInfo } from "../../service/getService";

function Profile() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({});
  const fetchMyInfo = useCallback(async () => {
    try {
      const result = await getMyInfo();
      if (result.message === "Success") {
        console.log("result: ", result.data);
        setData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])
  
  useEffect(() => {
    console.log(data.campus)
    fetchMyInfo();
  }, [fetchMyInfo, data]);

  return (
    <div>
      <Card data={data}/>
    </div>
  )
}

export default Profile;