import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
const Eligible = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text
				style={{
					fontSize: 100,
					marginBottom: 120,
				}}>
				👍
			</Text>
			<Button
				buttonStyle={{width: 50}}
				containerViewStyle={{borderRadius: 30}}
				backgroundColor="tomato"
				borderRadius={30}
				color="white"
				raised={false}
				title="Recheck"
				accessibilityLabel="Check your eligibility again"
				onPress={() => {}}
			/>
		</View>
	)
}

export default Eligible
