import { useState } from "react"
import { useHistory } from "react-router"

function NewUnitForm() {

	const history = useHistory()

	const [unit, setUnit] = useState({
		name: '',
		pic: '',
		city: '',
		state: '',
		cuisines: ''
	})

	async function handleSubmit(e) {
		e.preventDefault()

		await fetch(`http://localhost:5000/units`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(unit)
		})

		history.push('/units')
	}

	return (
		<main>
			<h1>Add a New Unit</h1>
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
				<input className="btn btn-primary" type="submit" value="Add Unit" />
			</form>
		</main>
	)
}

export default NewUnitForm