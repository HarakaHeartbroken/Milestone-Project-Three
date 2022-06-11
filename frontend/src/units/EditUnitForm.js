import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"

function EditUnitForm() {

	const history = useHistory()

    const { unitId } = useParams()

    const [unit, setUnit] = useState({
		name: '',
		pic: '',
		city: '',
		state: '',
		cuisines: ''
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
					<label htmlFor="founded">Year Founded</label>
					<input
						required
						value={unit.founded}
						onChange={e => setUnit({ ...unit, founded: e.target.value })}
						className="form-control"
						id="founded"
						name="founded"
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
					<label htmlFor="city">City</label>
					<input
						value={unit.city}
						onChange={e => setUnit({ ...unit, city: e.target.value })}
						className="form-control"
						id="city"
						name="city"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="state">State</label>
					<input
						value={unit.state}
						onChange={e => setUnit({ ...unit, state: e.target.value })}
						className="form-control"
						id="state"
						name="state"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cuisines">Cuisines</label>
					<input
						value={unit.cuisines}
						onChange={e => setUnit({ ...unit, cuisines: e.target.value })}
						className="form-control"
						id="cuisines" name="cuisines" required />
				</div>
				<input className="btn btn-primary" type="submit" value="Save" />
			</form>
		</main>
	)
}

export default EditUnitForm