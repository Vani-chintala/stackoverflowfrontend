
import "./AskQuestion.css"
import { useState } from "react"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { askQuestion } from "../../actions/question"

const AskQuestion = () => {

    const [questionTitle,setQuestionTitle] = useState("")
    const [questionBody,setQuestionBody] = useState("")
    const [questionTags,setQuestionTags] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User= useSelector((state)=> (state.currentUserReducer))

    const handleSubmit =(e) => {
        e.preventDefault()
        //console.log({questionTitle,questionBody,questionTags})
        dispatch(askQuestion({questionTitle,questionBody,questionTags,
            userPosted : User.result.name,
            userId : User?.result?._id}, // ? not there also no problem
            navigate))//User is line no:17
         }

    const handleEnter =(e) =>{
      if(e.key === 'Enter'){
        setQuestionBody(questionBody + "\n")
      }
    }

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're
                                asking a question to another person</p>
                            <input type="text" id="ask-ques-title"
                                value={questionTitle}
                                onChange={(e)=>{setQuestionTitle(e.target.value)}}
                                placeholder="e.g. Is there an R function for 
                      finding the index of an element in a vector?"/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p> Include all the information 
                                someone would need to answer your
                                question</p>
                            <textarea name=" " cols="30" value={questionBody}
                               onChange={(e)=>{setQuestionBody(e.target.value)}}
                               onKeyPress={handleEnter}
                            rows="10" id="ask-ques-body"></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" id="ask-ques-tags"
                                value={questionTags}
                                onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}}
                                //here we are using split so that we will get tags in array of strings
                                placeholder="e.g. (xml typescript wordpress)" />
                        </label>
                    </div>
                    <input type="submit" value="Review your Question" className="review-btn" />

                </form>
            </div>
        </div>

    )
}

export default AskQuestion