import { useQuestionStore } from "../store/questions"

export const useQuestionsData = () => {
  const questions = useQuestionStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(questions => {
    const { userSelectedAnswer, correctAnswer} = questions
    if( userSelectedAnswer == null) unanswered += 1
    else if( userSelectedAnswer === correctAnswer) correct += 1
    else incorrect += 1
  })

  return { correct, incorrect, unanswered}
}