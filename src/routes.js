export default {

    welcome:{
        initialRoute: true,
        title: 'Welcome',
        component: require('./scenes/Welcome').default,

        /*children: {
            example: {
                // title: 'Child Example', // optional
                component: require('./scenes/NestedExample').default
            }
        }*/
    }/*,
    signin: {
        initialRoute: true,

        title: 'Login',
        component: require('./scenes/SignIn').default,
    }*/
}