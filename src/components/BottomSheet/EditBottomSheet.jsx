import React from "react"

function EditBottomSheet({closeEdit, handleEducationClick}) {
  const handleEdit = (e) => {
    closeEdit(e);
    handleEducationClick();
  }

  return (
    <div 
      className="EditBottomSheet--container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="EditBottomSheet--content">
        <span className="b6-16-m" onClick={(e)=>handleEdit(e)} style={{ cursor: "pointer" }}>수정</span>
        <span className="b6-16-m" style={{ color: "#FE3C2A", cursor: "pointer" }}>삭제</span>
      </div>
    </div>
  )
}

export default EditBottomSheet;