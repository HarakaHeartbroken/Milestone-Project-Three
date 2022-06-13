import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router"
import CommentCard from './CommentCard'
import NewCommentForm from "./NewCommentForm";

function UnitDetails() {

	const { unitId } = useParams()

	const history = useHistory()

	const [unit, setUnit] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/units/${unitId}`)
			const resData = await response.json()
			setUnit(resData)
		}
		fetchData()
	}, [unitId])

	if (unit === null) {
		return <h1>Loading</h1>
	}

	function editUnit() {
		history.push(`/units/${unit.unitId}/edit`)
	}

	async function deleteUnit() {
		await fetch(`http://localhost:5000/units/${unit.unitId}`, {
			method: 'DELETE'
		})
		history.push('/units')
	}

	async function deleteComment(deletedComment) {
		await fetch(`http://localhost:5000/units/${unit.unitId}/comments/${deletedComment.commentId}`, {
			method: 'DELETE'
		})

		setUnit({
			...unit,
			comments: unit.comments
				.filter(comment => comment.commentId !== deletedComment.commentId)
		})
	}

	async function createComment(commentAttributes) {
		const response = await fetch(`http://localhost:5000/units/${unit.unitId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(commentAttributes)
		})

		const comment = await response.json()

		setUnit({
			...unit,
			comments: [
				...unit.comments,
				comment
			]
		})

	}



	let comments = (
		<h3 className="inactive">
			No comments yet!
		</h3>
	)
	let rating = (
		<h3 className="inactive">
			Not yet rated
		</h3>
	)
	if (unit.comments.length) {
		let sumRatings = unit.comments.reduce((tot, c) => {
			return tot + c.stars
		}, 0)
		let averageRating = Math.round(sumRatings / unit.comments.length)
		let stars = ''
		for (let i = 0; i < averageRating; i++) {
			stars += '⭐️'
		}
		rating = (
			<h3>
				{stars} stars
			</h3>
		)
		comments = unit.comments.map(comment => {
			return (
				<CommentCard key={comment.commentId} comment={comment} onDelete={() => deleteComment(comment)} />
			)
		})
	}


	return (
		<main>
			<div className="row">
				<div className="col-sm-6">
					<img style={{ maxWidth: 200 }} src={unit.pic} alt={unit.name} />
					<h3>
						ALPHA-PRIORIS DATA BEGINS: {unit.name}: {unit.rank}, {unit.legion}
					</h3>
				</div>
				<div className="col-sm-6">
					<h1>{unit.name}</h1>
					<h2>
						Rating
					</h2>
					{rating}
					<br />
					<h2>
						Description
					</h2>
					<h3>
						{unit.name} has been serving as a {unit.rank}, in the {unit.legion} Legion since {unit.recruited}.
					</h3>
					<h4>
						Keywords: {unit.keywordss}.
					</h4>
					<br />
					<a className="btn btn-warning" onClick={editUnit}>
						Edit
					</a>{` `}
					<button type="submit" className="btn btn-danger" onClick={deleteUnit}>
						Delete
					</button>
				</div>
			</div>
			<hr />
			<h2>Comments</h2>
			<div className="row">
				{comments}
			</div>
			<hr />
			<h2>Got Your Own Rant or Rave?</h2>
			<NewCommentForm
				unit={unit}
				onSubmit={createComment}
			/>
		</main>
	)
}

export default UnitDetails