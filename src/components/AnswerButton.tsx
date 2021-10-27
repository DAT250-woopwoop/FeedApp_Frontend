

type AnswerButtonProps = {
    voteType: "No" | "Yes",
    callback: () => void,
    votes: number,
}

export const AnswerButton = (
    props: AnswerButtonProps,
    ) => {
    return(
        <button onClick={() => props.callback()} >{props.voteType} ({props.votes})</button>
    )
}