

type AnswerButtonProps = {
    voteType: "No" | "Yes",
    callback: () => void,
    votes: number,
    disable?: true | false ,
    ans?: boolean
}

export const AnswerButton = (
    props: AnswerButtonProps,
    ) => {
        return(
            <button 
            className="answerButton"
            disabled={props.disable ? props.disable : false}
           
            onClick={() => {
                props.callback();
                window.location.reload();
            }}
            >
                {props.voteType} ({props.votes})
            </button>
        )
}

export const DisabledAnswerButton = (
    props: AnswerButtonProps,
    ) => {
        const backColor = props.ans ? "rgb(24, 144, 219)" : "lightgray"
        const textColor = props.ans ? "white" : "gray"
        return(
            <button 
                className="answerButton"
                disabled={props.disable ? props.disable : false}
                style={{
                    backgroundColor: backColor,
                    color: textColor
                }}
                onClick={() => props.callback()}
            >
                {props.voteType} ({props.votes})
            </button>
        )
}