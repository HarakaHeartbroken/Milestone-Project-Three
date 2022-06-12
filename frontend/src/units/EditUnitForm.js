import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"

function EditUnitForm() {

	const history = useHistory()

    const { unitId } = useParams()

    const [unit, setUnit] = useState({
		name: '',
		pic: '',
		rank: '',
		legion: '',
		keywords: ''
	})

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/units/${unitId}`)
			const resData = await response.json()
			setUnit(resData)
		}
		fetchData()
	}, [ unitId ])

	async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`http://localhost:5000/units/${unit.unitId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(unit)
		})

		history.push(`/units/${unit.unitId}`)
	}

	return (
		<main>
			<h1>Edit Unit</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Unit Name</label>
					<input
						required
						value={unit.name}
						onChange={e => setUnit({ ...unit, name: e.target.value })}
						className="form-control"
						id="name"
						name="name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="recruited">Year Recruited</label>
					<input
						required
						value={unit.recruited}
						onChange={e => setUnit({ ...unit, recruited: e.target.value })}
						className="form-control"
						id="recruited"
						name="recruited"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="pic">Unit Picture</label>
					<input
						value={unit.pic}
						onChange={e => setUnit({ ...unit, pic: e.target.value })}
						className="form-control"
						id="pic"
						name="pic"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="rank">Rank</label>
					<input
						value={unit.rank}
						onChange={e => setUnit({ ...unit, rank: e.target.value })}
						className="form-control"
						id="rank"
						name="rank"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="legion">Legion</label>
					<input
						value={unit.legion}
						onChange={e => setUnit({ ...unit, legion: e.target.value })}
						className="form-control"
						id="legion"
						name="legion"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="keywords">Keywords</label>
					<input
						value={unit.keywords}
						onChange={e => setUnit({ ...unit, keywords: e.target.value })}
						className="form-control"
						id="keywords" name="keywords" required />
				</div>
				<input className="btn btn-primary" type="submit" value="Save" />
			</form>
		</main>
	)
}

export default EditUnitForm