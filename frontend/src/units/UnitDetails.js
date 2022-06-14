import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router"


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
					{/* <h2>
						Rating
					</h2>
					{rating}
					<br /> */}
					<h2>
						NOOSPHERIC UPLOAD SUMMARY
					</h2>
					<h3>
						{unit.name} has been serving as a {unit.rank}, in the {unit.legion} Legion since {unit.recruited}.
					</h3>
					<h4>
						Keywords: {unit.keywords}.
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

		</main>
	)
}

export default UnitDetails