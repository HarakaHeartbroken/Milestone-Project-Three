import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function UnitIndex(data) {

	const history = useHistory()
	
	const [units, setUnits] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/units`)
			const resData = await response.json()
			setUnits(resData)
		}
		fetchData()
	}, [])

	let unitsFormatted = units.map((unit) => {
		return (
			<div className="col-sm-6" key={unit.unitId}>
				<h2>
					<a href="#" onClick={() => history.push(`/units/${unit.unitId}`)} >
						{unit.name}
					</a>
				</h2>
				<p className="text-center">
					{unit.cuisines}
				</p>
				<img style={{ maxWidth: 200 }} src={unit.pic} alt={unit.name} />
				<p className="text-center">
					Located in {unit.city}, {unit.state}
				</p>
			</div>
		)
	})
	return (
		<main>
			<h1>Units to Rant or Rave About</h1>
			<div className="row">
				{unitsFormatted}
			</div>
		</main>
	)
}

export default UnitIndex;