import React, {useState} from 'react';
import {Text, View} from 'react-native';

import UIStepper from 'react-native-ui-stepper';
import styles from "./styles";


const Stepper = ({onChangeCount, value}) => {

    const [count ,setCount] = useState(0);

    return(
        <View style={styles.countContainer}>
            <Text style={styles.countText}>Քանակը`</Text>
            <UIStepper
                tintColor={'#072C7D'}
                textColor={'black'}
                borderColor={'#D4DAE8'}
                displayValue={true}
                initialValue={0}
                minimumValue={0}
                width={150}
                value={value}
                height={50}
                displayDecrementFirst={true}
                fontSize={22}
                borderRadius={20}
                onValueChange={(value) => {
                    setCount(value);
                    onChangeCount(value)
                }}
            />
        </View>
    )
};

export default Stepper
