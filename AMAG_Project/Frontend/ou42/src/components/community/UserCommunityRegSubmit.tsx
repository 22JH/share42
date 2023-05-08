
export interface UserCommunityRegSubmitProps {
  isSubmit: null | boolean
}

const UserCommunityRegSubmit = ({isSubmit}:UserCommunityRegSubmitProps) => {
  return (
    <button
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        height: "5vh",
        background: isSubmit ? "#FFABAB" : "#F0F0F0",
        color: isSubmit ? "#D14D72" : "#B2B2B2",
        textAlign: "center",
        lineHeight: "5vh",
        fontSize: "1.2rem",
        fontWeight: "900",
        border: "none",
      }}
      type="submit"
      disabled={isSubmit ? false : true}
    >
      완료
    </button>
  )
}

export default UserCommunityRegSubmit