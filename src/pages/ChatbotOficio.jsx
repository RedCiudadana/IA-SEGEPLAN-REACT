// src/pages/ChatbotOficio.jsx
import React from 'react';

function ChatbotOficio() {
  return (
		<>
			<div className="question_answer__wrapper__chatbot">
				<div className="single__question__answer">
					<div className="question_user">
						<div className="left_user_info">
							<img src="assets/images/avatar/03.png" alt="avatar" />
							<div className="question__user">what is openup?</div>
						</div>
						<div className="edit__icon openuptip" tooltip="Edit It">
							<i className="fs-20 fa-regular fa-pen-to-square" />
						</div>
					</div>
					<div className="answer__area">
						<div className="thumbnail">
							<img src="assets/images/avatar/04.png" alt="avatar" />
						</div>
						<div className="answer_main__wrapper">
							<h4 className="common__title">Openup</h4>
							<p className="disc">
								The Open Unified Process, is a simplified version of the Rational
								Unified Process (RUP) used for agile and iterative software
								development. It was developed within the Eclipse Foundation and is
								based on the donation of process content by IBM. OpenUP targets
								small and colocated teams interested in agile and iterative
								development and is a lean Unified Process that applies iterative and
								incremental approaches within a structured lifecycle. It embraces a
								pragmatic approach and is positioned as an easy and flexible version
								of RUP [1][2][3]
							</p>
						</div>
					</div>
					<div className="share-reaction-area">
						<ul>
							<li>
								<a href="#" className="openuptip" tooltip="Save It">
									<i className="fa-regular fa-bookmark" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Like">
									<i className="fa-regular fa-thumbs-up" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Unlike">
									<i className="fa-regular fa-thumbs-down" />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="single__question__answer">
					<div className="question_user">
						<div className="left_user_info">
							<img src="assets/images/avatar/03.png" alt="avatar" />
							<div className="question__user">what is openup?</div>
						</div>
						<div className="edit__icon openuptip" tooltip="Edit It">
							<i className="fs-20 fa-regular fa-pen-to-square" />
						</div>
					</div>
					<div className="answer__area">
						<div className="thumbnail">
							<img src="assets/images/avatar/04.png" alt="avatar" />
						</div>
						<div className="answer_main__wrapper">
							<h4 className="common__title">Openup</h4>
							<p className="disc">
								The Open Unified Process, is a simplified version of the Rational
								Unified Process (RUP) used for agile and iterative software
								development. It was developed within the Eclipse Foundation and is
								based on the donation of process content by IBM. OpenUP targets
								small and colocated teams interested in agile and iterative
								development and is a lean Unified Process that applies iterative and
								incremental approaches within a structured lifecycle. It embraces a
								pragmatic approach and is positioned as an easy and flexible version
								of RUP [1][2][3]
							</p>
						</div>
					</div>
					<div className="share-reaction-area">
						<ul>
							<li>
								<a href="#" className="openuptip" tooltip="Save It">
									<i className="fa-regular fa-bookmark" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Like">
									<i className="fa-regular fa-thumbs-up" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Unlike">
									<i className="fa-regular fa-thumbs-down" />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="single__question__answer">
					<div className="question_user">
						<div className="left_user_info">
							<img src="assets/images/avatar/03.png" alt="avatar" />
							<div className="question__user">what is openup?</div>
						</div>
						<div className="edit__icon openuptip" tooltip="Edit It">
							<i className="fs-20 fa-regular fa-pen-to-square" />
						</div>
					</div>
					<div className="answer__area">
						<div className="thumbnail">
							<img src="assets/images/avatar/04.png" alt="avatar" />
						</div>
						<div className="answer_main__wrapper">
							<h4 className="common__title">Openup</h4>
							<p className="disc">
								Working with a chatbot involves several steps, from designing and
								building the bot to deploying and maintaining it. Here's a general
								overview of how to work with a chatbot:
							</p>
							<div className="order_list_answer">
								<ol>
									<li>
										<p>
											Define the Purpose: Determine the purpose and goals of the
											chatbot. What tasks or interactions do you want the bot to
											handle? Who is the target audience?
										</p>
									</li>
									<li>
										<p>
											Define the Purpose: Determine the purpose and goals of the
											chatbot. What tasks or interactions do you want the bot to
											handle? Who is the target audience?
										</p>
									</li>
								</ol>
							</div>
						</div>
					</div>
					<div className="share-reaction-area">
						<ul>
							<li>
								<a href="#" className="openuptip" tooltip="Save It">
									<i className="fa-regular fa-bookmark" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Like">
									<i className="fa-regular fa-thumbs-up" />
								</a>
							</li>
							<li>
								<a href="#" className="openuptip" tooltip="Unlike">
									<i className="fa-regular fa-thumbs-down" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<form action="#" className="search-form">
				<input type="text" placeholder="Message openup..." />
				<button>
				<i className="fa-solid fa-arrow-up"/>
				</button>
			</form>
			<div className="copyright-area-bottom">
				<p>
					{" "}
					<a href="#">Reactheme©</a> 2024. All Rights Reserved.
				</p>
			</div>
		</>
	);
}

export default ChatbotOficio;