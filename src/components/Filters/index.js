import React, {useState} from "react";
import {Image, Text, View, TouchableHighlight} from 'react-native';
import styles from './styles';
import {CheckBox} from "react-native-elements";

const Filters = () => {
    const filterCategories = [
        {
            name: 'Միաշերտ և բազմաշերտ խողովակներ',
            id: 0,
            subCategories: [
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: true
                },
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Միաշերտ խողովակներ պոլիպրոպիլենից Կցամասեր',
                    checked: true
                }
            ]
        },
        {
            name: 'Կցամասեր NEXUS (Իսպանիա)',
            id: 1,
            subCategories: [
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                }
            ]
        },
        {
            name: 'Պոլիէթիլային ճնշումային խողովակներ',
            id: 2,
            subCategories: [
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                }
            ]
        },
        {
            name: 'Կոյուղու խողովակներ և կցամասեր (PVC)',
            id: 3,
            subCategories: [
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                }
            ]
        },
        {
            name: 'Տաք հատակ ջեռուցման համակարգ',
            id: 4,
            subCategories: [
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                }
            ]
        }, {
            name: 'Ոռոգման կաթիլային համակարգ',
            id: 5,
            subCategories: [
                {
                    name: 'Ապակեպլաստե խողովակներ',
                    checked: false
                },
                {
                    name: 'Մետաղապլաստե խողովակներ',
                    checked: false
                }
            ]
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [categories, setCategories ] = useState(filterCategories);

    const changeFilter = (categoryIndex, subIndex) => {
        const copyCategories = categories;
        copyCategories[categoryIndex].subCategories[subIndex].checked = !categories[categoryIndex].subCategories[subIndex].checked;
        // console.log(copyCategories[categoryIndex].subCategories[subIndex].checked);
        setCategories(copyCategories)
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Ամբողջ տեսականին</Text>
            </View>
            <View style={styles.body}>
                {categories.map((category, categoryIndex) => {
                    return <View style={styles.bodyView}>
                        <View style={styles.filterCategoriesView}>
                            <Text
                                onPress={() => setActiveIndex(activeIndex === categoryIndex ? null : categoryIndex)} key={category.name}
                                style={styles.categoryName}>{category.name}
                            </Text>
                            <Image
                                source={require("./images/right.png")}/>
                        </View>
                        {activeIndex === categoryIndex ? <View style={{width: '80%'}}>
                            {category.subCategories.map((el, index) => {
                                return <View
                                    onPress={() => changeFilter(categoryIndex, index)}
                                    style={styles.subCategoriesView}>
                                    <CheckBox
                                        containerStyle={{width: 30, borderRadius: 28}}
                                        checkedIcon={<Image style={{width: 30, height: 30}}
                                                            source={require('./images/cheked.png')}/>}
                                        uncheckedIcon={<Image style={{width: 30, height: 30}}
                                                              source={require("./images/unCheck.png")}/>}
                                        checked={el.checked}
                                        onPress={() => changeFilter(categoryIndex, index)}
                                    />
                                    <Text
                                        onPress={() => changeFilter(categoryIndex, index)}
                                        style={styles.subCategoriesText} key={el.name}>{el.name}</Text>
                                </View>
                            })}
                        </View> : null}
                    </View>
                })}
            </View>
            <View style={styles.filterSubmitView}>
                <TouchableHighlight style={styles.touchableButton}>
                    <Text style={styles.filterSubmit}>
                        Հաստատել
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
};

export default Filters;
