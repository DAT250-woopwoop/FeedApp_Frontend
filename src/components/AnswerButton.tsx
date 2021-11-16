

type AnswerButtonProps = {
    voteType: "No" | "Yes",
    callback: () => void,
    votes: number,
    disable?: true | false ,
}

export const AnswerButton = (
    props: AnswerButtonProps,
    ) => {
    return(
        <button 
        disabled={props.disable ? props.disable : false}
        style={{
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            margin: "1rem",
            width:"10rem",
            height:"10rem"
        }}
        onClick={() => props.callback()} >{props.voteType} ({props.votes})</button>
    )
}