import React, { Component, PropTypes } from 'react';

import { StyleSheet } from 'react-native';

export var Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
    centralise: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    wrapper: {
        flex: 1,
    },
    imageContainer: {
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'space-between',
        marginRight: 10
    },
    image: {
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'space-between'
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    }
});