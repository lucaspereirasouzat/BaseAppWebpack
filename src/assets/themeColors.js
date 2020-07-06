const ThemeProvider = (theme) => {
    if (theme == 'dark') {
        return {
            backgroundColor: '#2B3648',
            secondary: '#212936',
            color: '#C4C4C4',
            fontSecondary: '#4C8BF5',
            fontTer: '#fff',
            boderColor: '#1976D2',

        }
    } else {
        return {
            backgroundColor: '#fff',
            secondary: '#C4C4C4',
            color: '#000',
            fontSecondary: '#000',
            fontTer: '#000',
            boderColor: '#C4C4C4',
        }
    }
    let b = { borderBottomWidth: 0.25 };
}

export default ThemeProvider;