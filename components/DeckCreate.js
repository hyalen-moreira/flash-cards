import React from 'react'
import { View, Text, KeyboardAvoidingView, Keyboard, StyleSheet, Platform } from 'react-native'
import { Button, Card, FormInput, FormValidationMessage } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { saveDeckTitle } from '../utils/FlashCardsAPI'

export default class AddEntry extends React.Component {
    state = {
        title: '',
        errorMessage: false
    };

    handleSubmit = () => {
        if (this.state.title) {
            const { title } = this.state;
            saveDeckTitle(title);

            this.setState({
                errorMessage: false,
                title: ''
            })

            this.props.navigation.navigate(
                'DeckDetail',
                { entryId: title, navTitle: title },
                Keyboard.dismiss()
            )
        } else {
            this.setState({ errorMessage: true })
        }
    }

    render() {
        const { title, errorMessage } = this.state

        return (
            <View style={styles.container}>
                <View style = {styles.header}>
                    <MaterialCommunityIcons name='cards' size={120} color='lightblue' />
                    <Text style={{fontSize: 30, alignItems: 'center', textAlign: 'center', padding: 20 }}>
                        What is the title of your new deck?
                    </Text>
                </View>
                <KeyboardAvoidingView 
                    style = {styles.keyboard}
                    behavior="padding"
                >
                    <Card title="Title" >
                        <FormInput
                            onChangeText = {title => this.setState({ title })}
                            value = { title }
                        />
                        <FormValidationMessage>
                            {errorMessage ? 'Required field ...' : ''}
                        </FormValidationMessage>
                        <Button
                            style = {{ padding: 30 }}
                            title="Create Deck"
                            raised
                            backgroundColor = 'red'
                            onPress = { this.handleSubmit }
                        />
                    </Card>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-around'
    },
    header: {
        flex: 1, 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    keyboard: {
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: 10,
    }
})