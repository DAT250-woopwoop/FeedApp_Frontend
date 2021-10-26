

type AnswerButtonProps = {
    voteType: "No" | "Yes",
    callback: () => void,
}

export const AnswerButton = (
    props: AnswerButtonProps,
    ) => {
    return(
        <button onClick={() => props.callback()}>{props.voteType}</button>
    )
}