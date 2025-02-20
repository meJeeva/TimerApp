import { Dimensions } from "react-native"

const Colors = {
    purple: '#B58DF1',
    yellow: 'yellow'
}

const DIM = {
  deviceWidth: Math.round(Dimensions.get("window").width),
  deviceHeight: Math.round(Dimensions.get("window").height),
}

const FONTS = {
    medium : 'Montserrat-Medium',
    bold : 'Montserrat-SemiBold'
}

const IMAGES = {
    splashImg : require('../assets/splashScreenImg.jpg')
}

export {
    Colors,
    DIM,
    FONTS,
    IMAGES
}