import React, {Component} from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';
import { Icon, Text, H1, H2, H3, List, ListItem } from 'native-base';

export default class Section extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string.isRequired,
            label: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            active: PropTypes.bool,
            disabled: PropTypes.bool
        }))
    };

    renderRow = (item, index, color) => {
        return (
            <View
                key={index}
                style={styles.item}
            >
                {item.icon &&
                    <Icon
                        name={item.icon}
                        color={color}
                        fontSize={22}
                    />
                }
                <View style={styles.value}>
                    <Text>
                        {item.value}
                    </Text>
                </View>
                {item.label &&
                    <View style={styles.label}>
                        <Text>
                            {item.label}
                        </Text>
                    </View>
                }
            </View>
        );
    };

    render() {
        const { theme, title, items } = this.props;

        const textStyleMap = {
            light: {
                'default': 'rgba(0,0,0,.87)',
                disabled: 'rgba(0,0,0,.38)'
            },
            dark: {
                'default': '#ffffff',
                disabled: 'rgba(255,255,255,.30)'
            }
        };

        const subheaderStyleMap = {
            light: 'rgba(0,0,0,.54)',
            dark: 'rgba(255,255,255,.70)',
        };

        const activeStyleMap = {
            light: '#f5f5f5',
            dark: '#212121',
        };

        const TEXT_COLOR = textStyleMap.light.default;
        const SUB_TEXT_COLOR = subheaderStyleMap[theme];
        const ACTIVE_COLOR = activeStyleMap[theme];

        return (
            <List>
                {title &&
                    <View style={[styles.subheader, styles.item]}>
                        <Text>
                            {title}
                        </Text>
                    </View>
                }
                {items && items.map((item, i) => {
                    if (item.disabled) {
                        return this.renderRow(item, i, textStyleMap[theme]['disabled']);
                    }

                    /*if (!isCompatible('TouchableNativeFeedback')) {*/
                        return (
                            <ListItem
                                key={i}
                                onPress={item.onPress}>
                                <View style={item.active ? { backgroundColor: ACTIVE_COLOR } : {}}>
                                {this.renderRow(item, i, TEXT_COLOR)}
                                </View>
                            </ListItem>
                        );
                   /*}*/
                    /*return (
                        <TouchableNativeFeedback
                            key={i}
                            background={TouchableNativeFeedback.Ripple('rgba(153,153,153,.4)')}
                            onPress={item.onPress}
                            onLongPress={item.onLongPress}
                        >
                            <View style={item.active ? { backgroundColor: ACTIVE_COLOR } : {}}>
                                {this.renderRow(item, i, TEXT_COLOR)}
                            </View>
                        </TouchableNativeFeedback>
                    );*/
                })}
            </List>
        );
    }
}

const styles = {
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 16
    },
    subheader: {
        flex: 1,
    },
    icon: {
        position: 'absolute',
        top: 13
    },
    value: {
        paddingLeft: 56,
        top: 2
    },
    label: {
        paddingRight: 16,
        top: 2
    }
};