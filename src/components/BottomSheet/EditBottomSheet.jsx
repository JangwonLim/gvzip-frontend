import React from "react"
import { useDispatch } from "react-redux";
import { deleteCareer, deleteEducation } from "../../redux/store";

function EditBottomSheet({closeEdit, openEditEducation, handleChange, index, type}) {
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    closeEdit(e);
    openEditEducation();
  }

  const deleteEducationHandler = (e) => {
    // Delete the local state and Redux state
    if (type === "education") {
      handleChange(null, 'delete', index);
      dispatch(deleteEducation(index));
    } else {
      handleChange(null, 'delete', index, null, "careers");
      dispatch(deleteCareer(index));
    }
    closeEdit(e);
  };

  return (
    <div 
      className="EditBottomSheet--container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="EditBottomSheet--content">
        <span className="b6-16-m" onClick={(e)=>handleEdit(e)} style={{ cursor: "pointer" }}>수정</span>
        <span className="b6-16-m" onClick={(e) => deleteEducationHandler(e)} style={{ color: "#FE3C2A", cursor: "pointer" }}>삭제</span>
      </div>
    </div>
  )
}

export default EditBottomSheet;