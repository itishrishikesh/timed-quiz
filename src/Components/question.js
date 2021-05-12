import React from 'react';

export default function Question(props){

	function handleOnChange(e){
		if(e.target.checked){
			props.sendSelectedAnswer(e.target.value)
		}
	}

	return (
		<div className = { !props.Loading ? "visible" : "invisible" }>
				
			<div className="question_title">{props.QuestionTitle}</div>
			<div className="options_container">
				<input className = "radio" type = "radio" id = "optiona" name = "answer" value = {props.OptionA} onChange = {handleOnChange} />
				<label className = "radio-label" for="optiona">{props.OptionA}</label>
				<br />
				<input type = "radio" id = "optionb" name = "answer" value = {props.OptionB} onChange = {handleOnChange} />
				<label for="optionb">{props.OptionB}</label>
				<br />
				<input type = "radio" id = "optionc" name = "answer" value = {props.OptionC} onChange = {handleOnChange} />
				<label for="optionc">{props.OptionC}</label>
				<br />
				<input type = "radio" id = "optiond" name = "answer" value = {props.OptionD} onChange = {handleOnChange} />
				<label for="optiond">{props.OptionD}</label>
				<br />
			</div>

		</div>
	);
}