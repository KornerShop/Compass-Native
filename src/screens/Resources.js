import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Permissions, Location} from 'expo'

import Office from '../components/Office'

import {updateOffice, updateZipCode} from '../redux/actions/actions'
import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

class Resources extends Component {
	constructor() {
		super()
		this.state = {
			modalVisible: false,
			zipValid: '',
		}
	}
	updateState(obj) {
		this.setState(obj)
	}
	toggleModalVisiblity() {
		this.setState({
			modalVisible: !this.state.modalVisible,
		})
	}
	async getLocationAsync() {
		let location
		const {status: currentStatus} = await Permissions.getAsync(
			Permissions.LOCATION
		)
		if (currentStatus !== 'granted') {
			const {status: newStatus} = await Permissions.askAsync(
				Permissions.LOCATION
			)
			if (newStatus !== 'granted') {
				// zip code
				console.warn('not granted')
			} else {
				location = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true,
				}).coords
			}
		} else {
			location = await Location.getCurrentPositionAsync({
				enableHighAccuracy: true,
			}).coords
		}
		this.props.dispatchUpdateLocation({
			latitude: location.latitude,
			longitude: location.longitude,
		})
	}
	// ask for location
	// or modal for zip code
	// update location state; update office state
	render() {
		if (this.props.office === 0) {
			return (
				<Office
					height={this.props.orientation.height}
					width={this.props.orientation.width}
					getLocationAsync={this.getLocationAsync}
					updateOffice={this.props.updateOffice}
					toggleModalVisiblity={this.toggleModalVisiblity.bind(this)}
					modalVisible={this.state.modalVisible}
					zipValid={this.state.zipValid}
					updateZipCode={this.props.updateZipCode}
					updateState={this.updateState.bind(this)}
				/>
			)
		}
		return <Map office={this.props.office} location={this.props.location} />
	}
}

const mapStateToProps = ({
	language,
	orientation,
	office,
	location,
	zipCode,
}) => ({
	language,
	orientation,
	office,
	location,
	zipCode,
})

const mapDispatchToProps = dispatch => ({
	updateOffice: bindActionCreators(updateOffice, dispatch),
	dispatchUpdateLocation: bindActionCreators(dispatchUpdateLocation, dispatch),
	updateZipCode: bindActionCreators(updateZipCode, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
