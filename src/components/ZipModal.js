import React, {Component} from 'react'
import {
	Modal,
	TouchableHighlight,
	View,
	Text,
	TextInput,
	Platform,
} from 'react-native'
import styled from 'styled-components/native'

const textInputColor = prop => {
	switch (prop) {
		case '':
			return '#7C7A7A'
		case true:
			return '#7C7A7A'
		case false:
			return 'tomato'
	}
}

const textInputWrapperColor = prop => {
	switch (prop) {
		case '':
			return '1px solid #7C7A7A'
		case true:
			return '1px solid #7C7A7A'
		case false:
			return '1px solid tomato'
	}
}

const InputWrapper = styled.View`
  border: ${props => textInputWrapperColor(props.valid)};
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding:10px;
`

const StyledInput = styled.TextInput`
  font-size: 18px;
  font-weight: 300;
  color: ${props => textInputColor(props.valid)}
  height: 30px;
`

export default class ZipModal extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<Modal
					animationType="slide"
					visible={this.props.modalVisible}
					onRequestClose={this.props.toggleModalVisibility}>
					<View style={{padding: 20}}>
						<InputWrapper valid={this.props.zipValid}>
							<StyledInput
								placeholder="Zip Code"
								placeholderTextColor="#90A4AE"
								value={this.props.zipCode}
								valid={this.props.zipValid}
								maxLength={5}
								returnKeyType="done"
								keyboardType={`${Platform.OS === 'ios'
									? 'numbers-and-punctuation'
									: 'numeric'}`}
								onChangeText={zipCode => {
									this.props.updateZipCode(zipCode)
									if (/^9[0-6]\d\d\d$/.test(zipCode)) {
										return this.props.updateState({
											zipValid: true,
										})
									}
									this.props.updateState({
										zipValid: false,
									})
								}}
							/>
						</InputWrapper>
					</View>
				</Modal>
			</View>
		)
	}
}
