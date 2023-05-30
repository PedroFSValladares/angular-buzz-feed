import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

type Option = {
  id:number
  name:string
  alias:string
}

type Question = {
  id:number
  question:string
  options:Option[]
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
  title:string = ''
  
  questionIndex:number = 0
  questionMaxIndex:number = 0

  questions:Question[] = []
  questionSelected:Question = {
    id: 0,
    question: '',
    options: []
  };

  answer:string[] = []
  answerSelected:string = ''

  finished:boolean = false

  ngOnInit(): void {
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
  }

  buttonPress(alias:string):void{
    this.answer.push(alias)
    this.nextStep()
  }

  nextStep():void{
    this.questionIndex += 1
    const result:string = this.checkResult()

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      this.finished = true
      this.answerSelected = quizz_questions.results[result as keyof typeof quizz_questions.results]
    }
  }

  checkResult():string{
    const result = this.answer.reduce((previous, current, index, array) => {
      if(
        array.filter(item => item === previous).length >
        array.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
